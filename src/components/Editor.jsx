import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) return; // prevents double init

    editorRef.current = Codemirror.fromTextArea(
      document.getElementById('realtimeEditor'),
      {
        mode: 'javascript',
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      }
    );

    editorRef.current.on('change', (instance, changes) => {
      // Handle code changes here if needed
      // console.log('changes', changes);
      const {origin} = changes;
      const code = instance.getValue();
      onCodeChange(code);
      if(origin !== 'setValue'){
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
          socketId: socketRef.current.id,
        });
      }
    });

    

    // editorRef.current.setValue('// Start coding...\n');

  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({code}) => {
        if(code !== null){
          editorRef.current.setValue(code);
        }
      });
    }
  }, [socketRef.current]);

  return <textarea id="realtimeEditor" />;
};

export default Editor;
