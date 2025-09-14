import {Wheel} from "spin-wheel"
import { useEffect , useRef} from "react"
import overlay_image from "../assets/border.svg"
import { Spinner } from "@shopify/polaris"


const pallet ={
    "BW": [
        "#222222", // deep black
        "#f5f5f5", // off-white
        "#444444", // dark gray
        "#e0e0e0", // light gray
        "#666666", // medium dark gray
        "#cccccc", // soft gray
        "#888888", // mid-gray
        "#ffffff"  // pure white
    ],


    
    "SD": [
    "#fff3b3",  // pale yellow
    "#cce6ff",  // pastel blue
    "#ffe680",  // soft yellow
    "#b3d9ff",  // soft sky blue
    "#fff8cc",  // creamy yellow
    "#d6ecff",  // light blue with soft white
    "#f0f4c3" ,  // light lime green
    "#e0f7fa",  // pale turquoise
    ],

    "RP": [
    "#b71c1c", // deep red
    "#ffcdd2", // light pink
    "#c62828", // dark red
    "#f8bbd0", // soft pink
    "#e53935", // medium red
    "#f48fb1", // pastel pink
    "#ef5350", // lighter red
    "#fce4ec"  // pale pink
    ],

    "GM": [
    "#2e7d32", // deep green
    "#c8e6c9", // mint green
    "#388e3c", // forest green
    "#a5d6a7", // soft mint
    "#43a047", // vibrant green
    "#81c784", // pastel green
    "#66bb6a", // light green
    "#e8f5e9"  // pale mint
    ] ,
    
    "LG":[
        "#D6A99D",
        "#FBF3D5",
        "#D6DAC8",
        "#9CAFAA"
    ]



}


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
        const items = sections.map((item , key)=>{
            return {
                label:item.label,
                value:item.value
            }
        })
        
       

        console.log(items)
        // alert(overlay_image)
        const overlay = new Image()
        overlay.src = overlay_image



        const wheel = new Wheel(container.current , {
            items :items,
            itemLabelAlign:"center" ,
            itemBackgroundColors:pallet[colorPallet],
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
        //  alert(pallet[colorPallet])
        // alert(pallet[colorPallet])
        return ()=>{
            container.current.innerHTML="";
        };
    } , [container , wheelInfo])


    // useEffect(()=>{
    //     wheelRef.spin()
    // },[spin])
    
    return null


}


export {LiveWheelPreview}