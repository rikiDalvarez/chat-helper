import { io } from 'socket.io-client';


const socket = io('http://localhost:5000');

socket.on("connect", () => {
	console.log("connection:", socket.connected); // true
});

socket.on("login", (data) => {
	console.log(data);
});

socket.on("disconnect", () => {
	console.log("connection:", socket.connected); // false
})

export default socket;