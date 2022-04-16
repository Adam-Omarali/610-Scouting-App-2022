import { Button, getAccordionDetailsUtilityClass, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useEffect, useState } from "react";
import config from '../config.json'
import { headers, ratingHeaders, simpleHeaders } from "../static/columns";
import '../static/page.css'

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

function RadarChart(props){

    const chartColors = {
        red: 'rgba(255, 99, 132, 0.2)',
        orange: 'rgba(255, 159, 64, 0.2)',
        yellow: 'rgba(255, 205, 86, 0.2)',
        green: 'rgba(75, 192, 192, 0.2)',
        blue: 'rgba(54, 162, 235, 0.2)',
        purple: 'rgba(153, 102, 255, 0.2)',
        grey: 'rgba(231,233,237, 0.2)'
    }
    const data = {
        labels: simpleHeaders,
        datasets: [
          {
            label: 'Team Avg',
            data: props.team,
            backgroundColor: chartColors.red,
            borderColor: chartColors.red,
            pointBackgroundColor: chartColors.red,
            borderWidth: 1,
          },
          {
            label: 'Ovr Avg',
            data: props.ovr,
            backgroundColor: chartColors.green,
            borderColor: chartColors.green,
            pointBackgroundColor: chartColors.green,
            borderWidth: 1,
          },
          {
            label: 'Top 24 Avg',
            data: props.top,
            backgroundColor: chartColors.blue,
            borderColor: chartColors.blue,
            pointBackgroundColor: chartColors.blue,
            borderWidth: 1,
          },
        ],
    };
    return (
        <div style={{"backgroundColor" : "white", width : '30%'}}>
            <Radar data={data} style={{color : "white"}}/>
        </div>
    )
}

function DisplayTable(props){
    return(
        <div className="">
            <header className="title">{props.title}</header>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        {simpleHeaders.map((header, id) => {
                            return <TableCell key={id}>{header}</TableCell>
                        })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.rows.map((row, id) => {
                        if(row['Auto_Points'] !== '' && !props.title.includes("Avg")){
                            if(row['Match_Number'] !== '' && row['Match_Number']){
                                return(
                                    <TableRow key={id}>
                                        {simpleHeaders.map((header, id) => {
                                            return <TableCell key={id}>{row[header]}</TableCell>
                                        })}
                                    </TableRow>
                                )
                            }
                        }
                    })}
                    {props.title.includes("Avg") && props.rows.length > 0 &&
                        <TableRow>
                            {simpleHeaders.map((header, id) => {
                                return <TableCell key={id}>{props.rows[13][header]}</TableCell>
                            })}
                        </TableRow>
                    }   
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

async function getSheet(teamNumber, doc){
    return doc.sheetsByTitle[teamNumber.toString()]
}

function getRadioData(idx, rows){
    let arr = []
    ratingHeaders.map(header => {
        if(header === 'POWER-RATING'){
            arr.push(rows[idx][header.toString()] / 1000)
        }
        else if(header === 'CLIMB-POINTS'){
            arr.push(rows[idx][header.toString()] * 10)
        }
        else{
            arr.push(rows[idx][header.toString()])
        }
    })
    return arr
}

function TeamNumber(props){
    return(
    <div className="padding-top">
        <TextField placeholder="Team Number" label="Team Number" value={props.teamNumber} onChange={(e) => {props.setNum(e.target.value)}}>Team Number</TextField>
    </div> )
}

function RadioChartImage(props){
    return(
        <div className="padding-top">
                <img src={`https://github.com/LeonLiur/notScoutnotData/blob/main/${props.teamNumber}_PostDay2.png?raw=true`} style={{backgroundColor:'white'}}/>
        </div>
    )
}

function AllData(props){
    return(
    <div>
        {/* <div style={{width : "20vw"}}>
            <RadarChart ovr={ovrAvg} top={topAvg} team={teamAvg}/>
        </div> */}
        <TeamNumber teamNumber={props.teamNumber} setNum={props.setTeamNumber} />
        <RadioChartImage teamNumber={props.teamNumber} />

        <DisplayTable rows={props.rows} title={"All Data"}/>
        <DisplayTable rows={props.rows} title={"Avg"} />
        <header className="title">All Data</header>
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    {headers.map((header, id) => {
                        return <TableCell key={id}>{header}</TableCell>
                    })}
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.rows.map((row, id) => {
                    if(row['Auto_Points'] !== ''){
                        if(row['Match_Number'] !== '' && row['Match_Number']){
                            return(
                                <TableRow key={id}>
                                    {headers.map((header, id) => {
                                        return <TableCell key={id}>{row[header]}</TableCell>
                                    })}
                                </TableRow>
                            )
                        }
                    }
                })}
                </TableBody>
            </Table>
        </TableContainer>

        <header className="title">Avg</header>
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    {headers.map((header, id) => {
                        return <TableCell key={id}>{header}</TableCell>
                    })}
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.rows.length > 0 &&
                    <TableRow>
                        {headers.map((header, id) => {
                            return <TableCell key={id}>{props.rows[13][header]}</TableCell>
                        })}
                    </TableRow>
                }   
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    )
}

function rowToHeaders(obj){
    let newArr = []
    if(obj !== undefined){
        simpleHeaders.map(header => {
            newArr.push(parseInt(obj[header.toString()]))
        })
    }
    else{
        newArr = [0, 0, 0, 0, 0, 0]
    }
    return newArr;
}

function calcCombinedScore(list1, list2, list3){
    let res = [0, 0, 0, 0, 0, 0]
    for (let i = 0; i < list1.length; i++) {
        if (i < 2 || i == 3) {
            res[i] = list1[i] + list2[i] + list3[i]
        }
        if (i == 2) {
            let choices = [list1[i], list2[i], list3[i]]
            choices.sort()
            if (choices[2] > 10) {
                res[i] = choices[0] + choices[1] + 10
            }
            else if (choices[1] > 10) {
                res[i] = choices[0] + choices[1] + choices[2]
            }
            else if (choices[1] < 10) {
                res[i] = choices[0] + choices[1] + choices[2]
            }
        } if (i == 4 || i == 5) {
            res[i] = Math.max(Math.max(list1[i], list2[i]), list3[i])
        }
    }
    return res
}

function Comparison(props){
    let combinedScores = calcCombinedScore(rowToHeaders(props.rows[13]), rowToHeaders(props.rows2[13]), rowToHeaders(props.rows3[13]))
    return(
        <div>
            <div style={{display : 'flex', flexDirection : 'row', columnGap: '20px'}}>
                <div>
                    <TeamNumber teamNumber={props.teamNumber} setNum={props.setTeamNumber} />
                    <RadioChartImage teamNumber={props.teamNumber} />
                </div>
                <div>
                    <TeamNumber teamNumber={props.teamNumber2} setNum={props.setTeamNumber2} />
                    <RadioChartImage teamNumber={props.teamNumber2} />
                </div>
                <div>
                    <TeamNumber teamNumber={props.teamNumber3} setNum={props.setTeamNumber3} />
                    <RadioChartImage teamNumber={props.teamNumber3} />
                </div>
            </div>
            <div>
                <DisplayTable rows={props.rows} title={`${props.teamNumber} Avg`} />
                <DisplayTable rows={props.rows2} title={`${props.teamNumber2} Avg`} />
                <DisplayTable rows={props.rows3} title={`${props.teamNumber3} Avg`} />
            </div>
            <div>
            <header className="title">Team Total Avg</header>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            {simpleHeaders.map((header, id) => {
                                return <TableCell key={id}>{header}</TableCell>
                            })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.rows.length > 0 &&
                            <TableRow>
                                {simpleHeaders.map((header, id) => {
                                    return <TableCell key={id}>{combinedScores[id]}</TableCell>
                                })}
                            </TableRow>
                        }   
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

function DataRoom(props){
    const [teamNumber, setTeamNumber] = useState(610)
    const [teamNumber2, setTeamNumber2] = useState(610)
    const [teamNumber3, setTeamNumber3] = useState(610)
    const [rows, setRows] = useState([])
    const [rows2, setRows2] = useState([])
    const [rows3, setRows3] = useState([])
    const [teamAvg, setTeamAvg] = useState([])
    const [topAvg, setTopAvg] = useState([])
    const [ovrAvg, setOvrAvg] = useState([])

    const doc = new GoogleSpreadsheet(config.spreadsheet_id);

    useEffect(() => {
        async function fetchData(){
            await doc.useServiceAccountAuth({
                // env var values are copied from service account credentials generated by google
                // see "Authentication" section in docs for more info
                client_email: config.client_email,
                private_key: config.private_key,
            });
            await doc.loadInfo();
            const sheet = doc.sheetsByTitle[teamNumber.toString()]
            setRows(await sheet.getRows())

            const sheet2 = doc.sheetsByTitle[teamNumber2.toString()]
            setRows2(await sheet2.getRows())

            const sheet3 = doc.sheetsByTitle[teamNumber3.toString()]
            setRows3(await sheet3.getRows())

            const mainSheet = doc.sheetsByTitle['All Teams']
            const mainRows = await mainSheet.getRows()
            const ovrAvg = getRadioData(0, mainRows)
            const topAvg = getRadioData(1, mainRows)
            let team = []
            mainRows.map((row, idx) => {
                if(row._rawData[0] === teamNumber.toString()){
                    team = getRadioData(idx, mainRows)
                }
            })

            setOvrAvg(ovrAvg)
            setTopAvg(topAvg)
            setTeamAvg(team)
        }
        fetchData()
    }, [teamNumber, teamNumber2, teamNumber3])
    

    return (
        <div className={props.all ? "App-header" : ""} style={{alignContent : props.all ? 'flex-start' : '', paddingLeft : props.all ? '20px' : ''}}>
            {props.all && <AllData rows={rows} teamNumber={teamNumber} setTeamNumber={setTeamNumber}/>}
            {props.setPage !== null && 
            <div className="padding-top">
                <Button onClick={() => props.setPage("home")}>Back Home</Button>
            </div>
            }
            {!props.all && 
            <Comparison teamNumber={teamNumber} setTeamNumber={setTeamNumber} teamNumber2={teamNumber2} setTeamNumber2={setTeamNumber2}
            teamNumber3={teamNumber3} setTeamNumber3={setTeamNumber3} rows={rows} rows2={rows2} rows3={rows3}/>}
        </div>
    )



}

export default DataRoom;