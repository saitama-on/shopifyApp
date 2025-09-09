import { TitleBar } from "@shopify/app-bridge-react";
import { Page , Layout, Button , Box , Text} from "@shopify/polaris";
import { Navigation } from "@shopify/polaris";
import { useState , useRef, useEffect } from "react";
import { LiveWheelPreview, WheelComp } from "../components";
import { SuccessMsg, EmailBox } from "../components/utils";
import {Wheel} from 'spin-wheel'

const WheelPage = ()=>{

    const [wheelInfo , setWheelInfo] = useState({})
    const containerRef = useRef(null);
    const [spin , setSpin] = useState(false);
    const [currIndex , setCurrIndex] = useState(0)
 

    // useEffect(()=>{
    //     const container = document.createElement("div");
    //     containerRef.current.append(container);
    //     const wheel = new Wheel(container);

    // },[containerRef])


    const handleSpin = ()=>{
        setSpin(true)
    }
    return(
        <Page 
            fullWidth
        >
            <TitleBar title="Make a new Wheel!"></TitleBar>
            <div style={{display:"flex" , width:"100%" , padding:"20px"}}>
                <Box width="50%" as="div" style={{
                    display:"flex" ,
                    flexDirection:"column" ,
                    border:"solid black 2px",
                    margin:"10px"
                      }}>
                    <WheelComp setWheelInfo={setWheelInfo}/>
                </Box>
                <Box width="50%" minHeight="100%" style={{display:"flex" ,
                     flexDirection:"column",
                     margin:"10px",
                     border:"2px solid black"}}>
                    <Text alignment="center" variant="headingXl">Preview wheel</Text>
                   <div ref={containerRef} style={{width:"500px" , height:"400px"}}>

                        <LiveWheelPreview   
                        container={containerRef} 
                        sections={wheelInfo.sectionData} 
                        colorPallet={wheelInfo.colorPallet}
                        spin={spin}
                        setSpin={setSpin}
                        winningIndex={wheelInfo.winningIndex}
                        setCurrIndex={setCurrIndex}
                        />
                    </div>
                    <Box>
                        <div style={{margin:"20px"}}>
                            <SuccessMsg/>
                            <Text alignment="center">{wheelInfo.sectionData ? wheelInfo.sectionData[currIndex].label : "" }</Text>
                        </div>
                        <div style={{marginTop:"20px"}}>
                            <Button onClick={handleSpin} primary fullWidth>SPIN ME</Button>
                        </div>
                    </Box>
                      
                </Box>

            </div>
        </Page>
    )
}

export default WheelPage