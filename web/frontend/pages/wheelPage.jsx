import { TitleBar } from "@shopify/app-bridge-react";
import { Page , 
    Layout,
    Button ,
    Box , 
    Text ,
    Collapsible,
    LegacyCard,
    AlphaCard,
Card,
DescriptionList} from "@shopify/polaris";
import { Navigation } from "@shopify/polaris";
import { useState , useRef, useEffect } from "react";
import { LiveWheelPreview, WheelComp } from "../components";
import { SuccessMsg, EmailBox , InitialMsg, NoLuckMsg , DiscountCodeItem} from "../components/utils";
import {Wheel} from 'spin-wheel'
import DiscountCode from "../components/DiscountCode";

const WheelPage = ()=>{

    const [defaultDiscountItems , setDefaultDiscountItems]  = useState([])
    
    const [wheelInfo , setWheelInfo] = useState({
        defaultDiscountItems: defaultDiscountItems
    })
    const containerRef = useRef(null);
    const [spin , setSpin] = useState(false);
    const [currIndex , setCurrIndex] = useState(-1);
    const [success , setSuccess] = useState("");
    const [wheelInfoOpen, setwheelInfoOpen] = useState(true);
    const [disCodeOpen , setDisCodeOpen] = useState(true);
    const [userEmail ,setUserEmail] = useState("");
    const [errMsg , setErrMsg] = useState("")
    const codeFetch = async()=>{
        const codes = await fetch('/api/discounts' ,{method:"GET"})

        const codeData = await codes.json()
        console.log("here",codeData)

        const info = codeData.code_info.map((item,key)=>{
            return {label : `Item ${key+1}` ,
             value:item.node.codeDiscount.title ,
            description : item.node.codeDiscount.summary}
        });

        setDefaultDiscountItems(info);
    }
        

    useEffect(()=>{
       codeFetch();
    },[])

    const handleToggleWheelInfo = () =>{
        setwheelInfoOpen(prev => !prev)
    };

    useEffect(()=>{
        setWheelInfo({...wheelInfo , 
            defaultDiscountItems:defaultDiscountItems
        })
    },[defaultDiscountItems])

    const handleSave = async()=>{
        // console.log(wheelInfo)
        if(!wheelInfo.wheelName || !wheelInfo.wheelName?.trim()){
            alert("Please Give a name to this Wheel!")
            return;
        }
        console.log(wheelInfo)
        const response = await fetch('/api/wheel' ,{
            method:"GET"
        })
    
        const data = await response.json();
        console.log(data)
    }

    const handleFetchCodes = () =>{
        codeFetch();
    }

    const handleRemove=(key)=>{

        if(defaultDiscountItems.length == 1){
            return
        }
        const updated_defaultDiscountItems = [...defaultDiscountItems]
        updated_defaultDiscountItems.splice(key,1)
        // console.log(updated_defaultDiscountItems)
        setDefaultDiscountItems(updated_defaultDiscountItems)
    }

    const handleSpin = ()=>{
        if(!userEmail.trim()){
            setErrMsg("Please enter your email to continue!");
            return;
        }
        setSpin(true)
    }

    const handleReset = ()=>{
        setWheelInfo({});
        // codeFetch();
    }
    return(
        <Page 
            fullWidth
        >
            <TitleBar title="Make a new Wheel!">
                <button variant="primary" onClick={handleSave}>Save Wheel</button>
                <button variant="secodary" onClick={handleReset}>Reset</button>
            </TitleBar>

            <div style={{
                display:"flex"
            }}>

                {/*left div */}
                <div style={{display:"flex",
                    width:"60%",
                    flexDirection:"column",
                    padding:"20px" , maxHeight:"100vh",
                    gap:"20px"
                }}>

                    <LegacyCard>
                        <div style={{
                            display:"flex",
                            padding:"5px",
                            justifyContent:"center",
                            alignItems:"center"

                        }}>
                            <h2 style={{width:"80%"}}>Configure Wheel</h2>
                            <Button default size="slim" onClick={handleToggleWheelInfo}>{wheelInfoOpen ? "Collasp" : "Expand"}</Button>
                        </div>
                    </LegacyCard>

                    <div style={{ display: wheelInfoOpen ? "block" : "none" }}>
                    <LegacyCard  as="div" style={{
                            width:"100%",
                            display:"flex" ,
                            flexDirection:"column" ,
                            marginBottom:"10px",
                            marginLeft:"10px"
                            }}>
                    
                            <WheelComp wheelInfo={wheelInfo} setWheelInfo={setWheelInfo} setsuccess_message={setSuccess}/>
                        </LegacyCard>
                    </div>
                  
                    <LegacyCard style={{
                        width:"100%",
                        marginBottom:"10px",
                        marginLeft:"10px"
                    }}>
                        <div style={{
                            display:"flex",
                            padding:"5px",
                            justifyContent:"center",
                            alignItems:"center"

                        }}>
                            <h2 style={{width:"80%"}}>Configure Discount codes</h2>
                            <Button variant="plain" tone="critical" size="slim" onClick={handleFetchCodes}>Refresh</Button>
                        </div>
                        <hr></hr>
                        <Box as="div" style={{
                            width:"100%",
                            display:"flex" ,
                            flexWrap:"wrap",
                            
                            
                        }}>
                        {defaultDiscountItems.map((item ,key)=>{
                            return <DiscountCodeItem handleRemove={()=>handleRemove(key)} 
                            info={item}
                            setWheelInfo={setWheelInfo}
                            index={key}
                            key={key}/>
                        })}
                        </Box>
                    </LegacyCard>

                </div>

                {/* Right Div */}
                <div style={{width:"40%", padding:"20px"}}>
                    <LegacyCard    style={{
                    height:"10vh",
                    display:"flex" ,
                    width:"100%",
                    flexDirection:"column",
                    border:"2px solid black",
                    alignItems:"center"}}>
                    <Text alignment="center" variant="headingXl">Preview wheel</Text>
                   <div ref={containerRef} style={{width:"100%" , height:"250px"}}>

                        <LiveWheelPreview   
                        container={containerRef} 
                        wheelInfo={wheelInfo}
                        spin={spin}
                        setSpin={setSpin}
                        setCurrIndex={setCurrIndex}
                        setSuccess={setSuccess}
                        />
                    </div>
                    <Box >
                        <div style={{margin:"20px"}}>
                            <div style={{margin:"20px"}}>
                            <EmailBox setUserEmail={setUserEmail} userEmail={userEmail} errMsg={errMsg}/>
                            </div>
                            <div style={{margin:"10px"}}>
                            {success == "" ? <InitialMsg/> : success == "true" ? <SuccessMsg code={wheelInfo.sectionData[currIndex].value}/> : <NoLuckMsg/>}
                            </div>
                            <Text as="p" alignment="center" style={{fontSize:"25px"}}>{wheelInfo.sectionData ? wheelInfo.sectionData[currIndex]?.description : "" }</Text> 
                        </div>
                        <div style={{marginTop:"20px"}}>
                            <Button onClick={handleSpin} primary fullWidth>SPIN ME</Button>
                        </div>
                    </Box>
                      
                    </LegacyCard>
                </div>
            </div>
        </Page>
    )
}

export default WheelPage

 