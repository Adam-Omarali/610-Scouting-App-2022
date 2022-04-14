import Button from '@mui/material/Button';
import '../static/page.css'

function Home(props){
    return(
        <div className="App-header">
            <header>Scouting App</header>
            <div className='padding-top'>
                <Button variant="contained" onClick={() => props.setPage("editor")}>Start Match</Button>
            </div>
            <div className='padding-top'>
                <Button variant="contained"><a href="https://docs.google.com/spreadsheets/d/1mA4yFXa9aS_3zlellfbV3gmDuxMTdsApWvuJy311-2I/edit#gid=0" target="_blank">Spreadsheet</a></Button>
            </div>
        </div>
    )
}

export default Home;