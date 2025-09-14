import { TextField , Text , Box , Button , Icon} from "@shopify/polaris"



import DiscountCode from './DiscountCode.jsx'




const SuccessMsg = ({code})=>{
    return (
        <Box>
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



const EmailBox = ()=> {
    return (
        <Box styles={{
            margin:"20px"
        }} >
            <TextField 
            label="Your email"
            alignment="center"
            helpText="Discount code will be sent here!"/>
        </Box>
    )
}

const DiscountCodeItem = ({handleRemove , info})=>{


    const button_style = {
        border:"none",
        fontSize:"10px"

        
    }
    return (
        <Box as="div" style={{
            width:"150px",
            margin:"10px",
            border:"1px dashed black",
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
                display:"flex"
            }}>
   
                <button style={button_style} onClick={handleRemove}>remove</button>
            </div>
        </Box>
    )
}

export {SuccessMsg,
      EmailBox, 
      NoLuckMsg,
    InitialMsg,
    DiscountCodeItem
}