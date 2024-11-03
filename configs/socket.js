const WebSocket = require("ws");
const Pothole = require("../models/Pothole");

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("Client connected");

        ws.on("message", async (message) => {
            try {
                const data = JSON.parse(message);
                const { latitude, longitude } = data;

                // Look for pothole near by client 
                const nearbyPotholes = await Pothole.find({
                    latitude: { $gte: latitude - 0.0001, $lte: latitude + 0.0001 },
                    longitude: { $gte: longitude - 0.0001, $lte: longitude + 0.0001 }
                });

                if (nearbyPotholes.length > 0) {
                    ws.send(JSON.stringify({ found: true, potholes: nearbyPotholes }));
                } else {
                    ws.send(JSON.stringify({ found: false }));
                }
            } catch (error) {
                console.error("Error processing location data", error);
                ws.send(JSON.stringify({ error: "Error processing location data" }));
            }
        });

        ws.on("close", () => {
            console.log("Client disconnected");
        });
    });
};

module.exports = setupWebSocket;
