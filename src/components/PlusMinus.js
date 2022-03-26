import { Button } from "@mui/material"

function PlusMinusDisplay(props){
    return(
        <div style={{"paddingBottom" : "20px"}}>
            <p style={{fontWeight: "bold", color: "#5ec2ff"}}>{props.name}</p>
            <div className="inline">
                <p>Current: {props.value}</p>
                <Button style={{color : "white", fontSize: "20px", backgroundColor: "green"}} onClick={() => {props.change(props.value + 1); props.test()}}>+</Button>
                <Button style={{color : "white", fontSize: "20px", backgroundColor: "red"}} onClick={() => props.change(Math.max(0, props.value - 1))}>-</Button>
            </div>
        </div>
    )
}

export default PlusMinusDisplay