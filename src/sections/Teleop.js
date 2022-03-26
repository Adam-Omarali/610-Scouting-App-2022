import { Button } from "@mui/material";
import { useState } from "react";
import PlusMinusDisplay from "../components/PlusMinus";
import state from "../static/state";

function TeleopDisplay(props){
    const [missedShots, setMissedShots] = useState(0)
    const [madeShots, setMadeShots] = useState(0)
    const [lowShots, setLowShots] = useState(0)
    const [cycleTimes, setCycleTimes] = useState(0)
    const [currCycle, setCurrCycle] = useState(0)
    const [defense, setDefense] = useState(false)
    const [totalDefenseTime, setTotalDefenseTime] = useState(0)
    const [defenseTime, setDefenseTime] = useState(0)

    if(props.save){
        state.teleop.cycleTimes = cycleTimes
        state.teleop.defenseTime = totalDefenseTime
        state.teleop.lowerGoalBalls = lowShots
        state.teleop.madeShots = madeShots
        state.teleop.missedShots = missedShots
    }

    const checkCycleTime = () => {
        if((missedShots + madeShots) % 2 === 0){
            let currD = new Date()
            let diff = currD.getMinutes() * 60 + currD.getSeconds() - currCycle
            if(diff < 120){
                setCycleTimes([...cycleTimes, diff])
            }
            setCurrCycle(new Date().getSeconds() + new Date().getMinutes() * 60)
            console.log(diff)
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
            <PlusMinusDisplay name="Made Shots" value={madeShots} change={setMadeShots} test={checkCycleTime}/>
            <PlusMinusDisplay name="Missed Shots" value={missedShots} change={setMissedShots} test={checkCycleTime}/>
            <PlusMinusDisplay name="Shots in Low Goal" value={lowShots} change={setLowShots} test={checkCycleTime}/>

            <Button variant="contained" onClick={() => checkDefenseTime()}>{defense ? "Stop Defense Timer" : "Start Defense Timer"}</Button>
        </div>
    )
}

export default TeleopDisplay;