import { TextField } from "@mui/material";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useEffect, useState } from "react";
import config from '../config.json'

function displayChart(){

}

async function getSheet(teamNumber, doc){
    return await doc.sheetsByTitle(teamNumber)
}

function DataRoom(){
    const [teamNumber, setTeamNumber] = useState(0)

    const doc = new GoogleSpreadsheet(config.spreadsheet_id);

    useEffect(() => {
        console.log(getSheet(teamNumber, doc))
    }, [teamNumber])
    

    return (
        <div className="padding-top">
            <TextField placeholder="Team Number" label="Team Number" value={teamNumber} onChange={(e) => {setTeamNumber(e.target.value)}}>Team Number</TextField>
        </div>
    )



}

export default DataRoom;