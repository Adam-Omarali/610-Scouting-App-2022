import Button from '@mui/material/Button';
import '../static/page.css'

function Home(props){
    return(
        <div className="App-header">
            <header>Scouting App</header>
            <div className='padding-top'>
                <Button variant="contained" onClick={() => props.setPage("editor")}>Start Match</Button>
            </div>
        </div>
    )
}

export default Home;