import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import state from "../static/state";

function ClimbDisplay(props){
    const [climbPoints, setClimbPoints] = useState(state.climb.successful)
    const [climbing, setClimbing] = useState(false)

    if(props.save){
        state.climb.attemptedPoints = climbPoints
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
            </div>
        </div>
    )
}

export default ClimbDisplay;