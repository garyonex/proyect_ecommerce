const socket = io();
const notes = document.getElementById('notes');
socket.on('server:productos',(productos)=>{})
socket.on('server:chat', (data) => {
    console.log(data);
    render(data);
});
socket.on('server:mensajes', (mensaje) => {
    cargar(mensaje);
});
const render = (data) => {
    notes.innerHTML += `
            <div class=" card card-body rounded-0 mb-2 animate__bounceIn">
                <div class="list-group chat">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1 usuario">${data.user}</h5>
                        <small> Enviado el: ${data.date}</small>
                        <button class="btn btn-danger" data-id="${data.id}">Eliminar</button>
                    </div>
                    <p class="mb-1">${data.text}</p>
                </div>
            </div>
            `;
    
};

// para agregar los mensajes que nos envian desde el form en la plantilla
const addMessage = (e) => {
    const message = {
        user: document.getElementById('user').value,
        text: document.getElementById('texto').value,
        date: dateNow(),
    };
    socket.emit('client:chat', message);
    return false;
};
// para tomar la hora y el minuto en cada mensaje que envian
dateNow = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
};

const cargar = (nota) => {
    nota.forEach((nota) => render(nota));
};
