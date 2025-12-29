import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import Client from '../components/Client';
import Editor from '../components/Editor';
import ACTIONS from '../Actions';
import { initSocket } from '../Socket';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  // ✅ SAFE USERNAME (works after refresh too)
  const username =
    location.state?.username || sessionStorage.getItem('username');

  const [clients, setClients] = useState([]);

  // ❌ BLOCK ENTRY IF USERNAME IS MISSING
  if (!username) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      const handleErrors = (e) => {
        console.error('Socket error', e);
        toast.error('Socket connection failed');
        navigate('/');
      };

      socketRef.current.on('connect_error', handleErrors);
      socketRef.current.on('connect_failed', handleErrors);

      // ✅ JOIN ROOM
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username,
      });

      // ✅ WHEN SOMEONE JOINS
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username: joinedUser, socketId }) => {
          if (joinedUser !== username) {
            toast.success(`${joinedUser} joined the room`);
          }

          setClients(clients);

          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // ✅ WHEN SOMEONE LEAVES
      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, username: leftUser }) => {
          toast.success(`${leftUser} left the room`);

          setClients((prev) =>
            prev.filter((client) => client.socketId !== socketId)
          );
        }
      );
    };

    init();

    // ✅ CLEANUP
    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
    };
  }, [roomId, username, navigate]);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img
              src="/logo_codenest.png"
              alt="CodeNest_logo"
              className="logoImage"
            />
          </div>

          <h3>Connected Users:</h3>

          <div className="clientList">
            {clients.map((client) => (
              <Client
                key={client.socketId}
                username={client.username}
              />
            ))}
          </div>
        </div>

        <button
          className="btn copyBtn"
          onClick={() => {
            navigator.clipboard.writeText(roomId);
            toast.success('Room ID copied to clipboard');
          }}
        >
          Copy ROOM ID
        </button>

        <button
          className="btn leaveBtn"
          onClick={() => {
            navigate('/');
          }}
        >
          Leave
        </button>
      </div>

      <div className="editorWrap">
        <Editor socketRef={socketRef}  roomId={roomId} onCodeChange={(code) => { codeRef.current = code; }} />
      </div>
    </div>
  );
};

export default EditorPage;
