const state = {
    auto : {
        "upperScored" : 0,
        "lowerScored" : 0,
        "upperMissed" : 0,
        "lowerMissed" : 0,
        "offAutoLine" : false
    },
    teleop : {
        "madeHighShots" : 0,
        "madeLowShots" : 0,
        "missedHighShots" : 0,
        "missedLowShots" : 0,
        "cycleTimes" : [],
        "defenseTime" : 0
    },
    climb : {
        "attemptedPoints" : 0,
        "successful" : false,
        "climbTime" : 0
    },
    general : {
        "shootEverywhere" : false,
        "teamNumber" : 0,
        "playedAgainstDefense" : false,
        "notes" : "",
        "match" : ""
    }
}

export default state;