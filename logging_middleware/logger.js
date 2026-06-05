const axios=require("axios");
async function log(stack,level,packageName,message,token){
    const data={
        stack:stack,
        level:level,
        package:packageName,
        message:message
    };
    try{
        const response=await axios.post("https://4.224.186.213/evaluation-service/logs",data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        console.log("log created");
        return response.data;
    }
    catch(error){
        console.log("Error");
    }
}
module.exports = log;