import io from 'socket.io-client';

const server = io(`${process.env.REACT_APP_BASE_URL}`);

export default server;
