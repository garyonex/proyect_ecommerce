const socket = io();

const guardarTexto = (user, texto) => {
    socket.emit('client:chat', {
        user: user,
        texto: texto,
    });
};
socket.on('server:chat', crearChat);

export { guardarTexto}