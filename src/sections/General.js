import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import state from "../static/state";

function GeneralDisplay(props){
    const [successfulClimb, setSuccessfuClimb] = useState(false)

    if(props.save){
        state.climb.successful = successfulClimb
    }

    return(
        <div>
            <header className="title">General</header>
            <div className="padding-top">
                <FormGroup>
                    <FormControlLabel control={<Checkbox value={successfulClimb} onClick={() => setSuccessfuClimb(!successfulClimb)}/>} label="Successful Climb" />
                </FormGroup>
            </div>
        </div>
    )
}

export default GeneralDisplay;