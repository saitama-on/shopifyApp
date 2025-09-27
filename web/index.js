// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";
import { validateHeaderName } from "http";

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT || "3000", 10);
const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// ==================== Shopify Auth & Webhooks ====================
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

// ==================== Middleware ====================
app.use(express.json());
app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

// Adds shop from session to API requests if missing
const addSessionShopToReqParams = (_req, res, next) => {
  const shop = res.locals?.shopify?.session?.shop;
  if (shop && !_req.query.shop) _req.query.shop = shop;
  next();
};

// ==================== API Routes ====================
app.use("/api/*", shopify.validateAuthenticatedSession(), addSessionShopToReqParams);

app.get("/api/products/count", async (_req, res) => {
  try {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });
    const countData = await client.request(`
      query shopifyProductCount {
        productsCount { count }
      }
    `);
    res.status(200).json({ count: countData.data.productsCount.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product count" });
  }
});

app.post("/api/products", async (_req, res) => {
  try {
    await productCreator(res.locals.shopify.session);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/discounts", async (_req, res) => {
  try {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const data = await client.request(`
      query {
        codeDiscountNodes(first: 10) {
          edges {
            node {
              codeDiscount {
                ... on DiscountCodeBasic {
                  title
                  summary
                  status
                  codes(first: 10) {
                    nodes { code }
                  }
                }
                ... on DiscountCodeFreeShipping {
                  title
                  summary
                  status
                  codes(first: 10) {
                    nodes { code }
                  }
                }
              }
            }
          }
        }
      }
    `);
    console.log(data.data.codeDiscountNodes.edges)
    const code_info = data.data.codeDiscountNodes.edges;
    res.status(200).json({ code_info });
  } catch (err) {
    console.error("Error fetching discount codes:", err);
    res.status(500).json({ error: "Failed to fetch discount codes" });
  }
});

app.get("/api/wheel" , async(_req,res) => {
  // console.log("hellop")
 try{
      const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
      })
      // console.log(client)

      const data = await client.request(`
        query {
          metaobjectDefinitions(first: 10) {
            edges {
               node {
                    id
                    name
                    type
                  }
                }
            }
          }`
      )
      console.log(typeof(data))
      res.status(200).json({message:"Ok"})
  }
  catch(err){
    res.status(500).json({err})
  }
})

// ==================== Frontend Route ====================
// Only run ensureInstalledOnShop for frontend, skip /api
app.use("/*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  return shopify.ensureInstalledOnShop()(req, res, next);
});

app.use("/*", (_req, res) => {
  res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
    );
});

// ==================== Start Server ====================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
