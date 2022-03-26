import { Slider, TextField } from "@mui/material";
import { useState } from "react";
import PlusMinusDisplay from "../components/PlusMinus";
import state from "../static/state";

function AutoDisplay(props){
    const [autoLower, setAutoLower] = useState(state.auto.lowerScored)
    const [autoUpper, setAutoUpper] = useState(state.auto.upperScored)

    if(props.save){
        state.auto.lowerScored = autoLower
        state.auto.upperScored = autoUpper
    }
    return(
        <div>
            <header className="title">Auto</header>
            <div>
                <PlusMinusDisplay name={"Auto Upper Balls Scored"} value={autoUpper} change={setAutoUpper} test={() => {}}/>
                <PlusMinusDisplay name={"Auto Lower Balls Scored"} value={autoLower} change={setAutoLower} test={() => {}}/>
            </div>
        </div>
    )
}

export default AutoDisplay;