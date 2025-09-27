
import {Wheel} from 'https://cdn.jsdelivr.net/npm/spin-wheel@5.0.2/dist/spin-wheel-esm.js';
const button = document.getElementById("click-me");
// const new_cont = document.querySelector('.main-div')


document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("click-me");
  const modal = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("close-modal");

  if (openBtn && modal && closeBtn) {
    // Open modal
    openBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal if background is clicked
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});


//  button.addEventListener("click", () => {
//       // Create a container
//       const container = document.createElement("div");
//       container.id = "wheel-container";
//       container.style.position = "fixed";
//       container.style.top = "50%";
//       container.style.left = "50%";
//       container.style.transform = "translate(-50%, -50%)";
//       container.style.zIndex = "99999";
//       container.style.width = "400px";
//       container.style.height = "400px";
//       document.body.appendChild(container);

//       // ✅ Pass the actual element to Wheel
//       new Wheel(document.getElementById("wheel-container"), {
//         items: ["Prize 1", "Prize 2", "Prize 3", "Prize 4"]
//       });
//     });

