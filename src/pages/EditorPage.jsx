import React ,{useState} from 'react'
import Client from '../components/Client';
import Editor from '../components/Editor';

const EditorPage = () => {
  const [clients, setClients] = useState([
    {socketId: 1, username: 'Dhruvin Borad' },
    { socketId: 2, username: 'Alice' },
    { socketId: 3, username: 'Bob' },
  ]);
  return (
    <div className='mainWrap'>
      <div className='aside'> 
        <div className='asideInner'>
          <div className='logo'>
            <img src="/logo_codenest.png" alt="CodeNest_logo" className='logoImage' />
          </div>
          <h3>Connected Users:</h3>
          <div className='clientList'>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className='btn copyBtn'>Copy ROOM ID</button>
        <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className='editorWrap'>
        <Editor />
      </div>
    </div>
  )
}

export default EditorPage