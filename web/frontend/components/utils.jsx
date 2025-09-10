import { TextField , Text , Box} from "@shopify/polaris"
import DiscountCode from './DiscountCode.jsx'


const SuccessMsg = ({code})=>{
    return (
        <Box styles={{margin:"20px"}}>
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
        <Box width="250px">
            <TextField 
            label="Your email"
            
            helpText="Discount code will be sent here!"/>
        </Box>
    )
}

export {SuccessMsg,
      EmailBox, 
      NoLuckMsg,
    InitialMsg}