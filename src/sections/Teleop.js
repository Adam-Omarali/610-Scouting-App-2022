import { Button } from "@mui/material";
import { useState } from "react";
import PlusMinusDisplay from "../components/PlusMinus";
import state from "../static/state";

function TeleopDisplay(props){
    const [missedHighShots, setMissedHighShots] = useState(0)
    const [missedLowShots, setMissedLowShots] = useState(0)
    const [highShots, setHighShots] = useState(0)
    const [lowShots, setLowShots] = useState(0)
    const [cycleTimes, setCycleTimes] = useState([])
    const [currCycle, setCurrCycle] = useState(0)
    const [defense, setDefense] = useState(false)
    const [totalDefenseTime, setTotalDefenseTime] = useState(0)
    const [defenseTime, setDefenseTime] = useState(0)


    if(props.save){
        state.teleop.cycleTimes = cycleTimes
        state.teleop.defenseTime = totalDefenseTime
        state.teleop.madeLowShots = lowShots
        state.teleop.madeHighShots = highShots
        state.teleop.missedHighShots = missedHighShots
        state.teleop.missedLowShots = missedLowShots
    }

    const checkCycleTime = () => {
        if((missedHighShots + highShots + missedLowShots + lowShots) % 2 === 0){
            let currD = new Date()
            let diff = currD.getMinutes() * 60 + currD.getSeconds() - currCycle
            if(diff < 120){
                setCycleTimes([...cycleTimes, diff])
            }
            setCurrCycle(new Date().getSeconds() + new Date().getMinutes() * 60)
        }
    }

    const checkDefenseTime = () => {
        setDefense(!defense)
        if(defense){
            let d = new Date()
            setDefenseTime(d.getSeconds() + d.getMinutes() * 60)
            let diff = d.getSeconds() + d.getMinutes() * 60 - currCycle;
            setCurrCycle(diff)
        }
        else{
            let d = new Date()
            let diff = d.getSeconds() + d.getMinutes() * 60 - defenseTime;
            if(diff < 2000){
                setTotalDefenseTime(totalDefenseTime + diff);
            }
            setCurrCycle(d.getSeconds() + d.getMinutes() * 60 - currCycle)
        }
    }


    return(
        <div>
            <header className="title">Teleop</header>
            {/* <PlusMinusDisplay name="Balls in Intake" value={ballsIntake} change={setIntakeBalls}/> */}
            <PlusMinusDisplay name="Made Upper Shots" value={highShots} change={setHighShots} test={checkCycleTime}/>
            <PlusMinusDisplay name="Missed Upper Shots" value={missedHighShots} change={setMissedHighShots} test={checkCycleTime}/>
            <PlusMinusDisplay name="Made Lower Shots" value={lowShots} change={setLowShots} test={checkCycleTime}/>
            <PlusMinusDisplay name="Missed Lower Shots" value={missedLowShots} change={setMissedLowShots} test={checkCycleTime}/>

            <Button variant="contained" onClick={() => checkDefenseTime()}>{defense ? "Stop Defense Timer" : "Start Defense Timer"}</Button>
        </div>
    )
}

export default TeleopDisplay;