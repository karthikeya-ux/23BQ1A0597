const express=require("express");
const log=require("./logger");
const app=express();
app.use(express.json());
const token="Token_here";
app.get('/',async(req,res)=>{
    await log(
        "backend",
        "info",
        "route",
        "Home Route Accessed",
        token
    );
    res.send("server Running");
});
app.get('/users',async(req,res)=>{
    await log(
        "backend",
        "info",
        "handler",
        "fetching user",
        token
    );
    const users=[
        {
            id:1,
            name:"ravi"
        },
        {
            id:2,
            name:"raju"
        },
        {
            id:3,
            name:"ramesh"
        },
    ];
    res.json(users);
});
app.listen(8888,(req,res)=>{
    console.log("running at port 8888");
})
