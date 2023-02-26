import './style.css'
import { connectToServer } from './socket-client';


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
      <h2>Websocket - Client</h2>

      <input id="jwToken" placeholder="Json Web Token" />
      <button id="btn-connect">Connect</button>

      <br/>
      <span id="server-status">offline</span>

      <ul id="clients-ul"></ul>

      <form id="message-form">
        <input placehold="message" id="message-input" />
      </form>


      <h3>Messages</h3>
      <ul id="messages-ul"></ul>
  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
const inputJwt = document.querySelector<HTMLInputElement>('#jwToken')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if( inputJwt.value.trim().length <= 0 ) return;
  
  connectToServer( inputJwt.value.trim() );
});

