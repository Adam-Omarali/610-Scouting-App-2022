import { useState } from "react";
import PlusMinusDisplay from "../components/PlusMinus";
import state from "../static/state";

function AutoDisplay(props){
    const [autoLower, setAutoLower] = useState(0)
    const [autoUpper, setAutoUpper] = useState(0)
    const [autoUpperMissed, setAutoUpperMissed] = useState(0)
    const [autoLowerMissed, setAutoLowerMissed] = useState(0)

    if(props.save){
        state.auto.lowerScored = autoLower
        state.auto.upperScored = autoUpper
        state.auto.upperMissed = autoUpperMissed
        state.auto.lowerMissed = autoLowerMissed
    }
    return(
        <div>
            <header className="title">Auto</header>
            <div>
                <PlusMinusDisplay name={"Auto Upper Balls Scored"} value={autoUpper} change={setAutoUpper} test={() => {}}/>
                <PlusMinusDisplay name={"Auto Upper Balls Missed"} value={autoUpperMissed} change={setAutoUpperMissed} test={() => {}}/>
                <PlusMinusDisplay name={"Auto Lower Balls Scored"} value={autoLower} change={setAutoLower} test={() => {}}/>
                <PlusMinusDisplay name={"Auto Lower Balls Missed"} value={autoLowerMissed} change={setAutoLowerMissed} test={() => {}}/>
            </div>
        </div>
    )
}

export default AutoDisplay;