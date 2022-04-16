import React, { useState } from 'react';
import DataRoom from '../pages/Data';
import Editor from '../pages/Editor';
import Home from '../pages/LandingPage';
import Results from '../pages/Results';

function PageSwitcher(){
    const [currPage, setCurrPage] = useState("home")

    switch(currPage){
        case "home":
            return <Home setPage={setCurrPage}/>
        case "editor":
            return <Editor setPage={setCurrPage}/>
        case "results":
            return <Results setPage={setCurrPage}/>
        case "data":
            return <DataRoom setPage={setCurrPage} all={true}/>
        case "comparison":
            return <div className='App-header'>
            <DataRoom all={false} setPage={null}/>
            <DataRoom all={false} setPage={setCurrPage}/>
            </div>
        default:
            return <>page does not exist</>
    }
}

export default PageSwitcher;