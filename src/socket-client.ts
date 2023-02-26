import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = ( token: string ) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: token
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');

    addListeners();

}

const addListeners = () => {
    
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientUl = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector('#messages-ul')!;

    socket.on('connect', () => {
        console.log('connected');
        serverStatusLabel.innerHTML = 'Online';
    })

    socket.on('disconnect', () => {
        console.log('disconnected');
        serverStatusLabel.innerHTML = 'Offline';
    });

    socket.on('clients-updated', ( clients: string[] ) => {
        let clientsHtml = '';
        clients.forEach( clientId => clientsHtml += `<li>${ clientId }</li>`);

        clientUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if( messageInput.value.trim().length <= 0 ) return;

        socket.emit('message-from-client', {
            id: socket.id,
            message: messageInput.value
        });

        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: any) => {
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;

        const li = document.createElement('li');
        li.innerHTML = newMessage;

        messagesUl.append(li);
    })
}

