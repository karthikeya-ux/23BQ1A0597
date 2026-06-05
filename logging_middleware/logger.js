const axios=require("axios");
async function log(stack,level,packageName,message,token){
    const data={
        stack:stack,
        level:level,
        package:packageName,
        message:message
    };
    try{
        const response=await axios.post("http://4.224.186.213/evaluation-service/logs",data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        console.log("log created");
        return response.data;
    }
    catch(error){

    console.log("FULL ERROR");

    if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
    }

    console.log(error.message);

    return {
        error: true,
        message: error.message
    };
}
}
module.exports = log;