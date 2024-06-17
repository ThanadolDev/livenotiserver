const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8005 });


const clients = new Set();


wss.on('connection', (ws) => {
  clients.add(ws);

  console.log('New client connected');

  ws.on('message', (data) => {
    let message;

    if (Buffer.isBuffer(data)) {
      message = data.toString('utf-8');
    } else {
      message = data;
    }

    console.log('Received message:', message);

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on port 8080');