import { TitleBar } from "@shopify/app-bridge-react";
import { Page , Layout, Button , Box , Text} from "@shopify/polaris";
import { Navigation } from "@shopify/polaris";
import { useState , useRef, useEffect } from "react";
import { LiveWheelPreview, WheelComp } from "../components";
import { SuccessMsg, EmailBox , InitialMsg, NoLuckMsg , DiscountCodeItem} from "../components/utils";
import {Wheel} from 'spin-wheel'
import DiscountCode from "../components/DiscountCode";

const WheelPage = ()=>{

    const [defaultDiscountItems , setDefaultDiscountItems]  = useState([
        {label:"10% OFF" , value:"10OFF"},
        {label:"Free Shipping" , value:"FSHIP"},
        {label:"No Luck" , value:"NIL"},
        {label:"Free Gift" , value:"FREEG"},
        {label:"Gift Card" , value:"GIFTC"},
        {label:"No Luck" , value:"NILI"}
    ])
    
    const [wheelInfo , setWheelInfo] = useState({
        defaultDiscountItems: defaultDiscountItems
    })
    const containerRef = useRef(null);
    const [spin , setSpin] = useState(false);
    const [currIndex , setCurrIndex] = useState(0);
    const [success , setSuccess] = useState("");


    // useEffect(()=>{
    //     const container = document.createElement("div");
    //     containerRef.current.append(container);
    //     const wheel = new Wheel(container);

    // },[containerRef])
    useEffect(()=>{
        setWheelInfo({...wheelInfo , 
            defaultDiscountItems:defaultDiscountItems
        })
    },[defaultDiscountItems])

    const handleEdit = ()=>{

    }

    const handleRemove=(key)=>{
        const updated_defaultDiscountItems = [...defaultDiscountItems]
        updated_defaultDiscountItems.splice(key,1)
        // console.log(updated_defaultDiscountItems)
        setDefaultDiscountItems(updated_defaultDiscountItems)
    }

    const handleSpin = ()=>{
        setSpin(true)
    }
    return(
        <Page 
            fullWidth
        >
            <TitleBar title="Make a new Wheel!"></TitleBar>
            <div style={{display:"flex" , flexWrap:"wrap", width:"100%" , padding:"20px"}}>
                <Box  as="div" style={{
                    width:"50%",
                    display:"flex" ,
                    flexDirection:"column" ,
                    border:"solid black 2px",
                    margin:"10px"
                      }}>
                    <WheelComp wheelInfo={wheelInfo} setWheelInfo={setWheelInfo} setsuccess_message={setSuccess}/>
                </Box>
                 <Box  minHeight="100%" style={{
                    display:"flex" ,
                     flexDirection:"column",
                     margin:"10px",
                     border:"2px solid black"}}>
                    <Text alignment="center" variant="headingXl">Preview wheel</Text>
                   <div ref={containerRef} style={{width:"500px" , height:"400px"}}>

                        <LiveWheelPreview   
                        container={containerRef} 
                        wheelInfo={wheelInfo}
                        spin={spin}
                        setSpin={setSpin}
                        setCurrIndex={setCurrIndex}
                        setSuccess={setSuccess}
                        />
                    </div>
                    <Box>
                        <div style={{margin:"20px"}}>
                            <div style={{margin:"20px"}}>
                            <EmailBox/>
                            </div>
                            <div style={{margin:"20px"}}>
                            {success == "" ? <InitialMsg/> : success == "true" ? <SuccessMsg code={wheelInfo.sectionData[currIndex].value}/> : <NoLuckMsg/>}
                            </div>
                            <Text alignment="center">{wheelInfo.sectionData ? wheelInfo.sectionData[currIndex].value : "" }</Text> 
                        </div>
                        <div style={{marginTop:"20px"}}>
                            <Button onClick={handleSpin} primary fullWidth>SPIN ME</Button>
                        </div>
                    </Box>
                      
                </Box>
                <Box as="div" style={{
                    width:"50%",
                    display:"flex" ,
                    flexWrap:"wrap",
                    border:"solid black 2px",
                    margin:"10px"
                }}>
                {defaultDiscountItems.map((item ,key)=>{
                return <DiscountCodeItem handleRemove={()=>handleRemove(key)} info={item}/>})}</Box>

            </div>
        </Page>
    )
}

export default WheelPage