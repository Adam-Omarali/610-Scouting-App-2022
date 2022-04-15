import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import state from "../static/state";

function ClimbDisplay(props){
    const [climbPoints, setClimbPoints] = useState(false)
    const [climbing, setClimbing] = useState(false) 
    const [climbTime, setClimbTime] = useState(0)
    const [totalClimbTime, setTotalClimbTime] = useState(0)
    const [successfulClimb, setSuccessfuClimb] = useState(false)

    if(props.save){
        state.climb.attemptedPoints = climbPoints
        state.climb.climbTime = totalClimbTime
        state.climb.successful = successfulClimb
    }

    const countClimbTime = () => {
        setClimbing(!climbing)
        console.log(climbing)
        if(climbing){
            let d = Date.now() / 1000
            let diff = d - climbTime;
            setTotalClimbTime(totalClimbTime + diff);
        }
        else{
            let d = Date.now() / 1000
            setClimbTime(d)
        }
    }

    return(
        <div>
            <header className="title">Climb</header>
            {/* <div className="padding-top">
                <Button variant="contained">Start Climb Timer</Button>
            </div> */}
            <div className="padding-top">
                <FormControl sx={{width: "60%"}}>
                    <InputLabel id="demo-simple-select-standard-label">Attempted Climb Points</InputLabel>
                    <Select labelId="demo-simple-select-standard-label" label="Attempted Climb Points" value={climbPoints} onChange={(e) => setClimbPoints(e.target.value)}>
                        <MenuItem value={0}>No Climb</MenuItem>
                        <MenuItem value={4}>4pt</MenuItem>
                        <MenuItem value={6}>6pt</MenuItem>
                        <MenuItem value={10}>10pt</MenuItem>
                        <MenuItem value={15}>15pt</MenuItem>
                    </Select>
                </FormControl>
                <div className="padding-top">
                    <Button variant="contained" onClick={() => countClimbTime()}>{climbing ? "Stop Climb Timer" : "Start Climb Timer"}</Button>
                </div>
                <div className="padding-top">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox value={successfulClimb} onClick={() => setSuccessfuClimb(!successfulClimb)}/>} label="Successful Climb" />
                    </FormGroup>
                </div>
            </div>
        </div>
    )
}

export default ClimbDisplay;