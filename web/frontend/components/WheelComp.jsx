import {
Box,
Text,
Form,
FormLayout,
TextField,
LegacyCard,
RangeSlider,
Grid,
Stack,
Select,
ButtonGroup , Button,
LegacyStack} 
from "@shopify/polaris"
import {useState , useRef , useCallback , useEffect} from "react"
import { LiveWheelPreview } from "./LiveWheelPreview"

const WheelComp = ({wheelInfo, setWheelInfo , setsuccess_message})=>{
 


    const [wheelname , setWheelName] = useState("");
    const [countSections , setCountSections] = useState(6);
    const [sectionData , setSectionData] = useState([]);
    const [winningIndex  , setWinningIndex] = useState("-1")
    const [colorPallet , setColorPallet] = useState("Sunny Day");
        const colorPalletOptions = [
        {label:"Black & White" , value:[
        "#222222", // deep black
        "#f5f5f5", // off-white
        "#444444", // dark gray
        "#e0e0e0", // light gray
        "#666666", // medium dark gray
        "#cccccc", // soft gray
        "#888888", // mid-gray
        "#ffffff"  // pure white
    ]},
        {label:"Sunny Day" , value:[
    "#fff3b3",  // pale yellow
    "#cce6ff",  // pastel blue
    "#ffe680",  // soft yellow
    "#b3d9ff",  // soft sky blue
    "#fff8cc",  // creamy yellow
    "#d6ecff",  // light blue with soft white
    "#f0f4c3" ,  // light lime green
    "#e0f7fa",  // pale turquoise
    ]},
        {label:"Red & Pink" , value:[
    "#b71c1c", // deep red
    "#ffcdd2", // light pink
    "#c62828", // dark red
    "#f8bbd0", // soft pink
    "#e53935", // medium red
    "#f48fb1", // pastel pink
    "#ef5350", // lighter red
    "#fce4ec"  // pale pink
    ]},
        {label:"Minty Green" , value:[
    "#2e7d32", // deep green
    "#c8e6c9", // mint green
    "#388e3c", // forest green
    "#a5d6a7", // soft mint
    "#43a047", // vibrant green
    "#81c784", // pastel green
    "#66bb6a", // light green
    "#e8f5e9"  // pale mint
    ]},
        {label:"Light" , value:[
        "#D6A99D",
        "#FBF3D5",
        "#D6DAC8",
        "#9CAFAA"
    ]}
    ]
    const [winIndexOptions , setWinIndexOptions] = useState([{label:"random" , value:-1}])


    useEffect(()=>{
        if(!wheelInfo.defaultDiscountItems?.length) return
        let newSectionData = [...wheelInfo.defaultDiscountItems]
        if(newSectionData == wheelInfo.defaultDiscountItems) return
        let start=0
        while (newSectionData.length < countSections) {
        const nextItem = wheelInfo.defaultDiscountItems[newSectionData.length % wheelInfo.defaultDiscountItems.length];
        newSectionData.push(nextItem);
        }
        setSectionData(newSectionData)
    },[wheelInfo.defaultDiscountItems])


    useEffect(()=>{
        //find the array of colors from options whole label is colorPallet
        const colorArray = colorPalletOptions.find((item) => item.label === colorPallet)
        setWheelInfo({...wheelInfo,
            colorPallet:colorArray.value,
            winningIndex:winningIndex,
            sectionData:sectionData,
            wheelName : wheelname
        })
        const new_win_arr = sectionData.map((item,key) =>({label:`${key+1}`, value:key}));
        // console.log(new_win_arr)
        setWinIndexOptions([{label:"random" , value:-1}, ...new_win_arr ])
        // console.log(winningIndex)
    },[sectionData , colorPallet , winningIndex , wheelname])

    useEffect(()=>{

        if(!sectionData) return
        if(countSections <= sectionData.length){
            setSectionData(sectionData.slice(0,countSections));
        }
        else{
            const newSections = [...sectionData];
            for(let i =sectionData.length ; i<countSections ; i++){
               
                    newSections.push(sectionData[i%sectionData.length])
                
            }

        setSectionData(newSections)
        }
    } , [countSections])

    const handleCountSections = (value)=>{
        // alert(value)
        setCountSections(Number(value))

    }
    const handleName = (value)=>{
        setWheelName(value)
    }
    // work on this tomorrow :0
    const handleSectionData = (key, value) =>{
        const updated = [...sectionData];
        // const old_data = sectionData[key];
        console.log(value)
        const new_label = wheelInfo.defaultDiscountItems.find((item)=> item.value == value).label
        const new_data = {label:new_label , value:value}
        updated[key] = new_data
        // console.log(updated)

        console.log(key , value);
        setSectionData(updated)
        setCountSections(sectionData.length)
    } 


    const handleColorPallet = (value)=>{
        setColorPallet(value)
    }

    const count_options = [
        {
            label:2,
            value:2
        },
        {
            label:4,
            value:4
        },
        {
            label:6,
            value:6
        }
    ]

    const handleReset= ()=>{
        setColorPallet("Sunny Day")
        // setCountSections(6)
        setSectionData
        (defaultDiscountItems)
        setWheelName("")
        setsuccess_message("")
    }

    const handleWinningIndex = (value)=>{
        // alert(value)
        setWinningIndex(value)
        console.log(winningIndex)
    }




    const handleSave = ()=>{
        console.log(wheelInfo)
    }
    return (
        <Box 
        style={{marginLeft:"20px"}}
        >
            <Form>
                <FormLayout >
                    <LegacyStack spacing="loose" wrap={true}>
                        <Box width="100%">
                            <TextField 
                                label="Wheel Name"
                                value={wheelname}
                                onChange={handleName}
                                placeholder="Enter name"
                            />
                        </Box>
                        <Box width="200px">
                            <Select
                                options={count_options}
                                label="No of Sections"
                                value={countSections}
                                onChange={handleCountSections}
                            />
                        </Box>
                        <Box width="200px">
                            <Select
                                label="Color Pallet"
                                options={colorPalletOptions.map(opt => ({ label: opt.label, value: opt.label }))}
                                value={colorPallet}
                                onChange={handleColorPallet}
                                

                                />
                        </Box>
                        <Box width="200px">
                            <Select
                                label="Winning Index"
                                value={winningIndex}
                                options={winIndexOptions.map(item => item)}
                                onChange={handleWinningIndex}
                                helpText="Choose a Winning Item"
                               
                            
                                />
                        </Box>
                    </LegacyStack>

                    <LegacyStack spacing="loose" wrap={true}>
          
                        {sectionData && sectionData.map((item , key)=>{
                            return (
                            <Box key={key}  
                                width="200px"
                               
                            >

                                <Select 
                                label={`Item #${key+1}`}
                                key={key}
                                options={wheelInfo.defaultDiscountItems}
                                value={item?.value}
                                onChange={(value)=>handleSectionData(key,value)}
                                helpText={winningIndex != "-1" ? (key == parseInt(winningIndex) ? "Win ratio: 100%" : "Win ratio: 0%") : `Win ratio: ${(parseFloat(1 /sectionData.length)*100).toPrecision(4)}%`}
                                />
                            </Box>
                            )
                        })}

                    </LegacyStack>
                    {/* <Box minHeight="500px">
                        <h1> Live Preview</h1>
                        <div ref={containerRef} style={{height:"500px"}}></div>
                        {containerRef.current &&<LiveWheelPreview container={containerRef.current} sections={sectionData} colorPallet={colorPallet}/>}
                    </Box>
                    */}   

                </FormLayout>
            </Form>
            
        </Box>

    )
}



export {WheelComp}