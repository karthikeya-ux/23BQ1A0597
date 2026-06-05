const express=require("express");
const log=require("./logger");
const app=express();
app.use(express.json());
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM2JxMWEwNTk3QHZ2aXQubmV0IiwiZXhwIjoxNzgwNjM4NTcyLCJpYXQiOjE3ODA2Mzc2NzIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIyMzE3ODA1YS01OTQ1LTQ3YmMtYmM5ZC00MjI2YjZkNjljN2MiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrYXJ0aGlrZXlhIiwic3ViIjoiZmY4ZTBjOTMtYzNiYi00YTBjLWFmODYtZWJkMTRkY2E1OTFiIn0sImVtYWlsIjoiMjNicTFhMDU5N0B2dml0Lm5ldCIsIm5hbWUiOiJrYXJ0aGlrZXlhIiwicm9sbE5vIjoiMjNicTFhMDU5NyIsImFjY2Vzc0NvZGUiOiJRUWRFWXkiLCJjbGllbnRJRCI6ImZmOGUwYzkzLWMzYmItNGEwYy1hZjg2LWViZDE0ZGNhNTkxYiIsImNsaWVudFNlY3JldCI6IlJHc3BUbldZeFBGZ2p5cXMifQ.wJYp_WE5b37zH0rfsCQ8MuJAb4w9D8UL-O5V15vDikQ";
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
app.get('/testlog',async(req,res)=>{

    const result=await log(
        "backend",
        "info",
        "route",
        "Testing Logger",
        token
    );

    res.json(result);

});
app.listen(8888,(req,res)=>{
    console.log("running at port 8888");
})
