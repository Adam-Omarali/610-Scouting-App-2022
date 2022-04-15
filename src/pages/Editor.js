import { Button, TextField } from "@mui/material";
import { useState } from "react";
import AutoDisplay from "../sections/Auto";
import ClimbDisplay from "../sections/Climb";
import GeneralDisplay from "../sections/General";
import TeleopDisplay from "../sections/Teleop";
import '../static/page.css'
import state from "../static/state";

function Editor(props){
    const [save, setSave] = useState(false)
    const [notes, setNotes] = useState("")

    if(save){
        state.general.notes = notes
    }

    return(
        <div className="background">
            <div className="side-by-side">
                <div style={{flexBasis: "40%"}}>
                    <AutoDisplay save={save}/>
                    <ClimbDisplay save={save}/>
                    {/* <GeneralDisplay save={save}/> */}
                </div>

                <div>
                    <TeleopDisplay save={save}/>
                </div>
            </div>

            <div className="padding-top">
                <hr></hr>
                <div className="padding-top">
                    <TextField placeholder="Notes" value={notes} onChange={(e) => {setNotes(e.target.value)}} fullWidth>Notes</TextField>
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