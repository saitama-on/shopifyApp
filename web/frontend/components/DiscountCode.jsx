import { Text } from "@shopify/polaris"

export default function DiscountCode({code}){
    return (
        <div style={{
            display:"flex",
            margin:"5px",
            width:"100%"
        }}>

            <div style={{
                borderStyle:"dashed",
                width:"60%",
                fontSize:"1rem",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
            }}><span style={{
                display:"flex",
               
            }}>{code}</span></div>

            <div style={{
                width:"40%"
            }}><button style={{
                fontSize:"1rem",
                padding:"5px",
                width:"100%"
                
            }}>Copy code</button></div>
        </div>
    )
}