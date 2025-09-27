import { TextField , Text , Box , Button , Icon} from "@shopify/polaris"
import { useState } from "react"


import DiscountCode from './DiscountCode.jsx'




const SuccessMsg = ({code})=>{
    return (
        <Box style={{width:"100%"}}>
            <Text alignment="center" 
            fontWeight="700" 
            variant="heading2xl">Congratulations on Winning !!</Text>
            <DiscountCode code={code}/>
        </Box>
    )
}

const NoLuckMsg = ()=>{
    return (
        <Box styles={{margin:"20px"}}>
            <Text alignment="center" fontWeight="700" variant="heading2xl">Better Luck Next Time!!</Text>
        </Box>
    )
}  

const InitialMsg = ()=>{
    return (
        <Box styles={{margin:"20px"}}>
            <Text alignment="center" 
            fontWeight="700" 
            variant="heading2xl"> Spin the Wheel!</Text>
        </Box>
    )
}



const EmailBox = ({setUserEmail , userEmail , errMsg})=> {

    const handleUserEmail = (value)=>{
        setUserEmail(value)
    }
    return (
        <Box styles={{
            margin:"20px"
        }} >
            <TextField 
            label="Your email"
            alignment="center"
            helpText={errMsg =="" ? "Discount codes will be sent here" : errMsg}
            value={userEmail}
            onChange={handleUserEmail}/>
        </Box>
    )
}

const DiscountCodeItem = ({handleRemove , 
    info , setWheelInfo ,index})=>{
        // console.log(index)
        // console.log(info)
    const [labelName , setLabelName] = useState(info.label)
    const button_style = {
        border:"none",
        fontSize:"10px"
    }

    const handleLabelChange = (e)=>{
        setLabelName(e.target.value)
    }

    const handleLabelOk = () =>{
        // console.log(index)
        setWheelInfo(prev => {
            const new_arr = prev.defaultDiscountItems;
            new_arr[index].label = labelName

            return {...prev , 
                defaultDiscountItems:new_arr
            }
        })
    }
    return (
    <div style={{display:"flex" , flexDirection:"column", 
        border:"1px dashed black", margin:"10px"

    }}>
        <Box as="div" style={{
            width:"200px",
            padding:"5px",
            display:"flex"
        }}>
            <div style={{
                width:"70%"
            }}>
                {info.value}
            </div>
            <div style={{
                width:"30%",
                display:"flex",
                fontSize:"0.5rem"
            }}>
   
                <Button destructive size="micro" plain onClick={handleRemove}>Remove</Button>
            </div>

        </Box>
        <Box as="div" style={{
            width:"200px",
            padding:"5px",
            display:"flex"
        }}>
        <label style={{width:"30%" , fontSize:"0.7rem"}}>Label:</label>
        <input style={{width:"70%"}} value={labelName} onChange={handleLabelChange}></input>
        <button onClick={handleLabelOk}>OK</button>
        </Box>
        <Box as="div" style={{
            width:"200px",
            padding:"5px",
            display:"flex"
        }}>
            <div style={{width:"100%" , display:"flex"}}>
            <p style={{width:"30%" , fontSize:"0.7rem"}}>Description:</p>
            <p style={{marginLeft:"5px",width:"70%" , fontSize:"0.7rem"}}> {info.description}</p>
            </div>
        </Box>
    </div>
    )
}

export {SuccessMsg,
      EmailBox, 
      NoLuckMsg,
    InitialMsg,
    DiscountCodeItem
}