import {Wheel} from "spin-wheel"
import { useEffect , useRef} from "react"
import overlay_image from "../assets/border.svg"
import { Spinner } from "@shopify/polaris"



const LiveWheelPreview = ({
    container
    , spin
    , setSpin 
    , setCurrIndex
    , setSuccess
    , wheelInfo
    })=>{

    const wheelRef = useRef(null)
    const sections = wheelInfo.sectionData ? wheelInfo.sectionData : wheelInfo.defaultDiscountItems
    const colorPallet = wheelInfo.colorPallet
    const winningIndex = wheelInfo.winningIndex

    // console.log(defaultDiscountItems)

    // console.log(sections)
    useEffect(()=>{
        if(!wheelRef.current || !spin){
            return
        }
        console.log(spin)
        console.log(wheelRef.current)
        const winIndex = winningIndex == "-1" ? Math.floor(Math.random() * sections.length) : parseInt(winningIndex);
        wheelRef.current.spinToItem(winIndex , 5000,1,20,1);
    },[spin])


    
    useEffect(()=>{

        if (!container.current || !sections?.length) return ;
        container.current.innerHTML="";
        const items = sections.map((item , key)=>{
            return {
                label:item?.label,
                value:item?.value
            }
        })
        
        const overlay = new Image()
        overlay.src = overlay_image
        const wheel = new Wheel(container.current , {
            items :items,
            itemLabelAlign:"center" ,
            itemBackgroundColors: colorPallet,
            radius :0.85,
            itemLabelRadius:0.55,
            itemLabelRotation:180,
            isInteractive:false,
            overlayImage: overlay,
            itemLabelFontSizeMax:40,
            itemLabelBaselineOffset: 0,
            lineWidth: 2,
            lineColor:"white",
            itemLabelStrokeWidth:1,
            

            onRest: (e)=>{
                setSpin(false)
                setCurrIndex(()=>{
                    const currIndex = e.currentIndex
                    console.log(sections[currIndex].value)
                    if(sections[currIndex].value != "NIL"){
                        setSuccess(()=>"true")
                    }
                    else{
                        setSuccess(()=>"false")
                    }
                    return e.currentIndex
                })
            },
            
          
           
            

        })
        wheelRef.current = wheel
    } ,[wheelInfo])

    return null


}


export {LiveWheelPreview}