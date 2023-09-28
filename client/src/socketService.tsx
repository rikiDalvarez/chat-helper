import { io } from 'socket.io-client';


const socket = io('http://localhost:5000');

socket.on("connect", () => {
	console.log("connection:", socket.connected); // true
});

export default socket;