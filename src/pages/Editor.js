import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Slider, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import AutoDisplay from "../sections/Auto";
import ClimbDisplay from "../sections/Climb";
import GeneralDisplay from "../sections/General";
import PlusMinusDisplay from "../components/PlusMinus";
import TeleopDisplay from "../sections/Teleop";
import '../static/page.css'
import state from "../static/state";

function Editor(props){
    const [teamNumber, setTeamNumber] = useState(state.general.teamNumber)
    const [save, setSave] = useState(false)

    if(save){
        state.general.teamNumber = teamNumber
    }

    return(
        <div className="background">
            <div className="side-by-side">
                <div style={{flexBasis: "50%"}}>
                    <AutoDisplay save={save}/>
                    <ClimbDisplay save={save}/>
                    <GeneralDisplay save={save}/>
                </div>

                <div>
                    <TeleopDisplay save={save}/>
                </div>
            </div>

            <div className="padding-top">
                <hr></hr>
                <div className="padding-top">
                    <TextField label="Team Number" value={teamNumber} onChange={(e) => {setTeamNumber(e.target.value)}}/>
                </div>
                <div className="padding-top">
                    <Button style={{backgroundColor: 'green', color:'white'}} variant="contained" onClick={() => setSave(!save)}>{save ? "Done" : "Save"}</Button>
                </div>
                {save && <div className="padding-top">
                    <Button variant="contained" onClick={() => props.setPage("results")}>Finish Match</Button>
                </div>}
                <div className="padding-top">
                    <Button onClick={() => props.setPage("home")}>Back Home</Button>
                </div>
            </div>
            
        </div>
    )
}

export default Editor;