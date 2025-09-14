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
ButtonGroup , Button} 
from "@shopify/polaris"
import {useState , useRef , useCallback , useEffect} from "react"
import { LiveWheelPreview } from "./LiveWheelPreview"

const WheelComp = ({wheelInfo, setWheelInfo , setsuccess_message})=>{
 


    const [wheelname , setWheelName] = useState("");
    const [countSections , setCountSections] = useState(6);
    const [sectionData , setSectionData] = useState();
    const [winningIndex  , setWinningIndex] = useState("-1")
    const [colorPallet , setColorPallet] = useState("SD")

    useEffect(()=>{
        let newSectionData = [...wheelInfo.defaultDiscountItems]
        let start=0
        while(newSectionData.length < countSections){
            newSectionData.push(wheelInfo.defaultDiscountItems[start])
        }
        setSectionData(newSectionData)
    },[])


    useEffect(()=>{
        setWheelInfo({...wheelInfo,
            sectionData:sectionData,
            colorPallet:colorPallet,
            winningIndex:winningIndex
        })
    },[sectionData , colorPallet , winningIndex . wheelInfo])

    useEffect(()=>{

        if(!sectionData) return
        if(countSections <= sectionData.length){
            setSectionData(sectionData.slice(0,countSections));
        }
        else{
            const newSections = [...sectionData];
            for(let i =sectionData.length ; i<countSections ; i++){
                newSections.push(sectionData[i]? sectionData[i] : defaultDiscountItems[i] ? defaultDiscountItems[i] : {label:"10% OFF" , value:"10OFF"})
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

    const colorPalletOptions = [
        {label:"Black & White" , value:"BW"},
        {label:"Sunny Day" , value:"SD"},
        {label:"Red & Pink" , value:"RP"},
        {label:"Minty Green" , value:"GM"},
        {label:"Light" , value:"LG"}
    ]

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
        setColorPallet("SD")
        // setCountSections(6)
        setSectionData(defaultDiscountItems)
        setWheelName("")
        setsuccess_message("")
    }

    const handleWinningIndex = (value)=>{
        // alert(value)
        setWinningIndex(value)
        console.log(winningIndex)
    }



    const handleSave = ()=>{
        console.log("Saved")
    }
    return (
        <Box 
        borderColor="#000"
        background="#000"
        style={{marginLeft:"20px" , height:"100vh"}}
        >
            <Form>
                <FormLayout >
                    <Stack spacing="loose" wrap={true}>
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
                                options={colorPalletOptions}
                                value={colorPallet}
                                onChange={handleColorPallet}
                                

                                />
                        </Box>
                        <Box width="200px">
                            <Select
                                label="Winning Index"
                                value={winningIndex}
                                options={[
                                    {label:"random",value:"-1"},
                                    {label:"1",value:"0"},
                                    {label:"2",value:"1"},
                                    {label:"3",value:"2"},
                                    {label:"4",value:"3"},
                                    {label:"5",value:"4"},
                                    {label:"6",value:"5"},
                                ]}
                                onChange={handleWinningIndex}
                                helpText="Choose a Winning Item"
                               
                            
                                />
                        </Box>
                    </Stack>

                    <Stack spacing="loose" wrap={true}>
          
                        {sectionData && sectionData.map((item , key)=>{
                            return (
                            <Box key={key}  
                                width="200px"
                               
                            >

                                <Select 
                                label={`Item #${key+1}`}
                                key={key}
                                options={wheelInfo.defaultDiscountItems}
                                value={item.value}
                                onChange={(value)=>handleSectionData(key,value)}
                                helpText={winningIndex != "-1" ? (key == parseInt(winningIndex) ? "Win ratio: 100%" : "Win ratio: 0%") : `Win ratio: ${(parseFloat(1 /sectionData.length)*100).toPrecision(4)}%`}
                                />
                            </Box>
                            )
                        })}

                    </Stack>
                    {/* <Box minHeight="500px">
                        <h1> Live Preview</h1>
                        <div ref={containerRef} style={{height:"500px"}}></div>
                        {containerRef.current &&<LiveWheelPreview container={containerRef.current} sections={sectionData} colorPallet={colorPallet}/>}
                    </Box>
                    */}   
                    <ButtonGroup>
                        <Button onClick={handleReset}>Reset</Button>
                        <Button primary onClick={handleSave}>Save</Button>
                    </ButtonGroup> 

                </FormLayout>
            </Form>
            
        </Box>

    )
}



export {WheelComp}