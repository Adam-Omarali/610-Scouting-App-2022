import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import '../static/page.css'
import state from '../static/state';

function Home(props){
    const [teamNumber, setTeamNumber] = useState(0)
    const [matchNumber, setMatchNumber] = useState(0)

    const changePage = (page) => {
        state.general.teamNumber = teamNumber
        state.general.match = matchNumber
        if(teamNumber !== 0 && matchNumber !== 0){
            props.setPage(page)
        }
    }

    return(
        <div className="App-header">
            <header>Scouting App</header>
            <div className="padding-top">
                    <TextField placeholder="Team Number" label="Team Number" value={teamNumber} onChange={(e) => {setTeamNumber(e.target.value.trim())}}>Team Number</TextField>
            </div>
            <div className="padding-top">
                    <TextField placeholder="Match Number" label="Match Number" value={matchNumber} onChange={(e) => {setMatchNumber(e.target.value.trim())}}>Match Number</TextField>
            </div>
            <div className='padding-top'>
                <Button variant="contained" onClick={() => changePage("editor")}>Start Match</Button>
            </div>
            <div className='padding-top'>
                <Button variant="contained" onClick={() => changePage("data")}>Data Room</Button>
            </div>
            <div className='padding-top'>
                <Button variant="contained"><a href="https://docs.google.com/spreadsheets/d/1CL8XwDPuNzGKTbXyt3ekynBhL7UYL8HeRJWB9_3mBmE/edit#gid=1441878395" target="_blank">Spreadsheet</a></Button>
            </div>
            
        </div>
    )
}

export default Home;