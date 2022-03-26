import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import state from "../static/state";

function GeneralDisplay(props){
    const [playedAgainstDefense, setPlayedAgainstDefense] = useState(state.general.playedAgainstDefense)
    const [shootAnywhere, setShootAnywhere] = useState(state.general.shootEverywhere)
    const [offAutoLine, setOffAutoLine] = useState(state.auto.offAutoLine)
    const [successfulClimb, setSuccessfuClimb] = useState(state.climb.successful)

    if(props.save){
        state.climb.successful = successfulClimb
        state.general.playedAgainstDefense = playedAgainstDefense
        state.general.shootEverywhere = shootAnywhere
    }

    return(
        <div>
            <header className="title">General</header>
            <div className="padding-top">
                <FormGroup>
                    <FormControlLabel control={<Checkbox value={playedAgainstDefense} onClick={() => setPlayedAgainstDefense(!playedAgainstDefense)}/>} label="Played Against Defense" />
                    <FormControlLabel control={<Checkbox value={shootAnywhere} onClick={() => setShootAnywhere(!shootAnywhere)}/>} label="Can shoot from everywhere" />
                    <FormControlLabel control={<Checkbox value={offAutoLine} onClick={() => setOffAutoLine(!offAutoLine)}/>} label="Moved off auto line" />
                    <FormControlLabel control={<Checkbox value={successfulClimb} onClick={() => setSuccessfuClimb(!successfulClimb)}/>} label="Successful Climb" />
                </FormGroup>
            </div>
        </div>
    )
}

export default GeneralDisplay;