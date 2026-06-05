console.log("NEW VERSION LOADED");
const express = require("express");
const axios = require("axios");

const app = express();

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM2JxMWEwNTk3QHZ2aXQubmV0IiwiZXhwIjoxNzgwNjQxNzQ1LCJpYXQiOjE3ODA2NDA4NDUsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIyYjcxMTEyYi1iMGUxLTQzZGMtYjUzYS0zNWU5ZDFmMzYxNGMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrYXJ0aGlrZXlhIiwic3ViIjoiZmY4ZTBjOTMtYzNiYi00YTBjLWFmODYtZWJkMTRkY2E1OTFiIn0sImVtYWlsIjoiMjNicTFhMDU5N0B2dml0Lm5ldCIsIm5hbWUiOiJrYXJ0aGlrZXlhIiwicm9sbE5vIjoiMjNicTFhMDU5NyIsImFjY2Vzc0NvZGUiOiJRUWRFWXkiLCJjbGllbnRJRCI6ImZmOGUwYzkzLWMzYmItNGEwYy1hZjg2LWViZDE0ZGNhNTkxYiIsImNsaWVudFNlY3JldCI6IlJHc3BUbldZeFBGZ2p5cXMifQ.f5CgO-a_1YccuscM9yzZTg-nU9IcFLlEv9SKIm1DY-A";
app.use(express.json());

async function getDepots() {
    const response = await axios.get(
        "http://4.224.186.213/evaluation-service/depots",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.depots;
}

async function getVehicles() {
    const response = await axios.get(
        "http://4.224.186.213/evaluation-service/vehicles",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.vehicles;
}

function solveKnapsack(vehicles, capacity) {

    const n = vehicles.length;

    let dp = Array(n + 1)
        .fill()
        .map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {

        let duration = vehicles[i - 1].Duration;
        let impact = vehicles[i - 1].Impact;

        for (let j = 0; j <= capacity; j++) {

            if (duration <= j) {
                dp[i][j] = Math.max(
                    dp[i - 1][j],
                    impact + dp[i - 1][j - duration]
                );
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    let selectedVehicles = [];
    let j = capacity;

    for (let i = n; i > 0; i--) {

        if (dp[i][j] !== dp[i - 1][j]) {

            selectedVehicles.push(vehicles[i - 1]);

            j = j - vehicles[i - 1].Duration;
        }
    }

    return {
        maxImpact: dp[n][capacity],
        selectedVehicles: selectedVehicles
    };
}
app.use((req,res,next)=>{
    console.log("REQUEST RECEIVED:", req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    res.send("Vehicle Maintenance Scheduler Running");
});

app.get("/schedule", async (req, res) => {

    try {

        console.log("Getting depots...");
        const depots = await getDepots();

        console.log("Getting vehicles...");
        const vehicles = await getVehicles();

        console.log("Depots:", depots.length);
        console.log("Vehicles:", vehicles.length);

        res.json({
            depots,
            vehicles
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});
app.listen(3333, () => {
    console.log("Server running on port 3333");
});