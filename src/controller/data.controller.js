const { DataModel } = require("../models/MyData.models");
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
        successResponse(res,FullDetails,"Successfully Add Data",200)
    } catch (error) {
        console.log(error);
        
        return validationErrorResponse(res,error,"Something Went wrong",400)
    }
}


async function HandleShowByPermissionRole(req,res) {
    const userId = req.params.id || req.query.id;
   try {

    console.log(userId);
    if (req.user.role=="Admin") {
        const user = await DataModel.findById(userId)
        successResponse(res,user,"success",200)
    }else if(req.user.role == "Manager"){
        const user = await DataModel.findById(userId).select('Name Email PhoneNo AccountNo');
        successResponse(res,user,"success",200)
    }else{
        const user = await User.findById(userId).select('Name Email -_id').lean();
        successResponse(res,user,"success",200)
    }
    
   } catch (error) {
    validationErrorResponse(res,error,"Something Went Wrong",400)
   } 
}
module.exports = {
    HandleAddData,
    HandleShowByPermissionRole
}