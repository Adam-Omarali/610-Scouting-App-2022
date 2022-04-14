const state = {
    auto : {
        "upperScored" : 0,
        "lowerScored" : 0,
        "ballsMissed" : 0,
        "offAutoLine" : false
    },
    teleop : {
        "madeShots" : 0,
        "missedShots" : 0,
        "lowerGoalBalls" : 0,
        "cycleTimes" : [],
        "defenseTime" : 0
    },
    climb : {
        "attemptedPoints" : 0,
        "successful" : false,
    },
    general : {
        "shootEverywhere" : false,
        "teamNumber" : 0,
        "playedAgainstDefense" : false
    }
}

export default state;