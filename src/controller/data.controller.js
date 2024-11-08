
const { DataModel } = require("../models/MyData.models");
const { HandleCreateActivityuLog } = require("../utility/createActivit");
const { validationErrorResponse, successResponse } = require("../utility/response")

async function HandleAddData(req,res) {
    const {Name,Email,PhoneNo,AccountNumber,Cvv} = req.body

    try {
        const checkDuplicate = await DataModel.findOne({Email})
        if(checkDuplicate) {
            validationErrorResponse(res,"Something Went Wrong","Data Already Exits.Enter Another Data",400)
        }
        const FullDetails = new DataModel({
            Name,
            Email,
            PhoneNo,
            AccountNo:AccountNumber,
            CVV:Cvv
        })
        await FullDetails.save()
        HandleCreateActivityuLog(`create the New User Data`,req.user.role,FullDetails,"Add",req.user.name)
        successResponse(res,FullDetails,"Successfully Add Data",200)

       

    } catch (error) {
        console.log(error);
        
        return validationErrorResponse(res,error,"Something Went wrong",400)
    }
}


async function HandleShowByPermissionRole(req,res) {
    const userId = req.params.id || req.query.id;
    const userRole = req.user.role;
    
   try {
    let user
    console.log(userId);
    if (userRole=="Admin") {
         user = await DataModel.findById(userId)
        successResponse(res,[user],"success",200)
    }else if(userRole == "Manager"){
       user = await DataModel.findById(userId).select('Name Email PhoneNo AccountNo');
        successResponse(res,[user],"success",200)
    }else{
        user = await DataModel.findById(userId).select('Name Email')

        
        successResponse(res,[user],"success",200)
    }
    HandleCreateActivityuLog(`Get the User Data`,userRole,user,"GET",req.user.name)
   } catch (error) {
    validationErrorResponse(res,error,"Something Went Wrong",400)
   } 
}
module.exports = {
    HandleAddData,
    HandleShowByPermissionRole
}