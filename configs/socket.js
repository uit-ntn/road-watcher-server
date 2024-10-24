const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Danh sách ổ gà (mock data)
const potholes = [
    { id: 1, longitude: -73.935242, latitude: 40.730610 },
    { id: 2, longitude: -73.935242, latitude: 40.731000 }
];

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        const userLocation = JSON.parse(message);

        // Tính khoảng cách giữa người dùng và ổ gà (ví dụ dùng hàm Haversine)
        potholes.forEach(pothole => {
            const distance = calculateDistance(userLocation, pothole);
            if (distance < 100) { // nếu cách ổ gà dưới 100m
                ws.send(JSON.stringify({ warning: "Pothole nearby!", pothole }));
            }
        });
    });
});

function calculateDistance(loc1, loc2) {
    // Hàm tính khoảng cách giữa 2 tọa độ (sử dụng công thức Haversine)
    // Trả về khoảng cách bằng mét
}

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
