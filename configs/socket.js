const WebSocket = require("ws");
const Pothole = require("../models/Pothole");

const clients = new Set();

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("Client connected");
        clients.add(ws);

        ws.on("message", async (message) => {
            try {
                const data = JSON.parse(message);
                const { latitude, longitude } = data;

                // Tìm ổ gà gần vị trí người dùng
                const nearbyPotholes = await Pothole.find({
                    latitude: { $gte: latitude - 0.0001, $lte: latitude + 0.0001 },
                    longitude: { $gte: longitude - 0.0001, $lte: longitude + 0.0001 },
                });

                if (nearbyPotholes.length > 0) {
                    ws.send(
                        JSON.stringify({ found: true, potholes: nearbyPotholes })
                    );
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
            clients.delete(ws); // Loại bỏ client khi ngắt kết nối
        });
    });
};


// Khi có lỗi
socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
};

// Khi kết nối bị đóng
socket.onclose = () => {
    console.log('WebSocket connection closed');
};

// Sent notification to all client
const broadcastMessage = (message) => {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
};


// Gửi dữ liệu từ client đến server
const sendLocationData = (latitude, longitude) => {
    const data = { latitude, longitude };
    socket.send(JSON.stringify(data));
};



module.exports = { setupWebSocket, broadcastMessage };
