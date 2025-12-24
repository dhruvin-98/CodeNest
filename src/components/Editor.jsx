import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {
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
  }, []);

  return <textarea id="realtimeEditor" />;
};

export default Editor;
