import io from 'socket.io-client';

const server = io('http://localhost:8000/');

export default server;
