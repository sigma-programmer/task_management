
const socketIo = require('socket.io');  // Import socket.io

// let io;  // Declare io as a variable to be accessed later

const socketManager = (server) => {
    // Attach the socket.io server to the existing HTTP server
   let io = socketIo(server, {
        cors: {
            // origin: `${process.env.FRONTEND_BASE_URL}`,  // Adjust the CORS settings as needed
            origin: `${process.env.FRONTEND_BASE_URL}`,  // Adjust the CORS settings as needed
            // origin: "https://intaskr.com",  // Adjust the CORS settings as needed
            methods: ['GET', 'POST'],
        },
    });
    

    // WebSocket connection handling
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Listen for 'new-meeting' event
        socket.on('new-meeting', (data) => {
            console.log('New meeting data received:', data);
            io.emit('new-meeting', data);  // Emit to all connected clients
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};

// Export both the function and io object
module.exports = { socketManager };


// // socketManager.js
// const socketIo = require('socket.io');  // Import socket.io
// let io;  // Declare io as a variable to be accessed later

// const socketManager = (server) => {
//     // Attach the socket.io server to the existing HTTP server
//      io = socketIo(server, {
//         cors: {
//             origin: 'http://localhost:3000',  // Adjust the CORS settings as needed
//             methods: ['GET', 'POST'],
//         },
//     });

//     // WebSocket connection handling
//     io.on('connection', (socket) => {
//         console.log('A user connected:', socket.id);

//         // Listen for 'new-meeting' event
//         socket.on('new-meeting', (data) => {
//             console.log('New meeting data received:', data);
//             io.emit('new-meeting', data);  // Emit to all connected clients
//         });

//         // Handle disconnection
//         socket.on('disconnect', () => {
//             console.log('A user disconnected:', socket.id);
//         });
//     });
// };
// module.exports = { socketManager, io };

// // module.exports = socketManager;
