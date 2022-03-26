import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import state from "../static/state";

function Results(props){

    let team = state.general.teamNumber
    let avgCycleTime = 0;
    state.teleop.cycleTimes.forEach(element => {
        avgCycleTime += element
    });
    avgCycleTime /= (state.teleop.cycleTimes.length + 1)
    let teleop = (state.teleop.madeShots - state.teleop.lowerGoalBalls) * 2 + state.teleop.lowerGoalBalls
    let auto = state.auto.upperScored * 4 + state.auto.lowerScored * 2 + (state.auto.offAutoLine ? 4 : 0)
    let climb = state.climb.successful ? state.climb.attemptedPoints : 0
    let total = teleop + auto + climb
    let shotAccuracy = state.teleop.madeShots / (state.teleop.madeShots + state.teleop.missedShots)
    let defenseTime = state.teleop.defenseTime
    let cycles = (state.teleop.missedShots + state.teleop.madeShots) / 2

    return (
        <div className="App-header">
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Team Number</TableCell>
                            <TableCell align="center">Avg Cycle Time</TableCell>
                            <TableCell align="center">Teleop Points</TableCell>
                            <TableCell align="center">Auto Points</TableCell>
                            <TableCell align="center">Climb Points</TableCell>
                            <TableCell align="center">Total Points</TableCell>
                            <TableCell alight="center">Shot Accuracy</TableCell>
                            <TableCell alight="center">Defense Time</TableCell>
                            <TableCell alight="center">Cycles</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{team}</TableCell>
                            <TableCell align="center">{avgCycleTime.toFixed(3)}</TableCell>
                            <TableCell align="center">{teleop}</TableCell>
                            <TableCell align="center">{auto}</TableCell>
                            <TableCell align="center">{climb}</TableCell>
                            <TableCell align="center">{total}</TableCell>
                            <TableCell align="center">{(shotAccuracy*100).toFixed(3)}</TableCell>
                            <TableCell align="center">{defenseTime}</TableCell>
                            <TableCell align="center">{cycles}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="padding-top">
                <TextField placeholder="Notes">Notes</TextField>
            </div>
            <div className="padding-top">
                <Button variant="contained" onClick={() => props.setPage("home")}>Back Home</Button>
            </div>
        </div>
    )
}

export default Results;