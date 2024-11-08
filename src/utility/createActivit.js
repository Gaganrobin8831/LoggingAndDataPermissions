const Activity = require("../models/activity.models")



async function HandleCreateActivityuLog(ActionPerfom,role,newData,ActionType,Name) {
    let activitData =  new Activity({
        ActionPerfom:ActionPerfom,
        role:role,
        newData:newData,
        ActionType:ActionType,
        Name:Name
    })
    await activitData.save()
}

module.exports={
    HandleCreateActivityuLog
}