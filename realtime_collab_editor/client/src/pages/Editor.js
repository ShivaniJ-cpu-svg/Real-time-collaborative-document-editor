import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import './Editor.css';

function Editor() {
  const { id: userId } = useParams(); // Using userId instead of roomId
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const socketRef = useRef(null);
  const quillRef = useRef(null);

  // Set up socket connection
  useEffect(() => {
    const socket = io('http://localhost:5000');
    socketRef.current = socket;

    return () => socket.disconnect();
  }, []);

  // Initialize Quill editor
  useEffect(() => {
    if (quillRef.current || !editorRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder: 'Start writing your document here...',
    });

    quill.disable(); // Disable editing until document is loaded
    quill.setContents([]); // Leave blank to enable placeholder
    quillRef.current = quill;
  }, []);

  // Load document and set up syncing
  useEffect(() => {
    const socket = socketRef.current;
    const quill = quillRef.current;
    if (!socket || !quill) return;

    socket.emit('get-document', userId);

    socket.once('load-document', (document) => {
      if (document && document.ops?.length > 0) {
        quill.setContents(document);
      } else {
        quill.setContents([]); // Allow placeholder if document is empty
      }
      quill.enable();
    });

    const handleChange = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };

    quill.on('text-change', handleChange);

    socket.on('receive-changes', (delta) => {
      quill.updateContents(delta);
    });

    return () => {
      quill.off('text-change', handleChange);
      socket.off('receive-changes');
    };
  }, [userId]);

  // Save document
  const handleSave = () => {
    const quill = quillRef.current;
    const socket = socketRef.current;
    if (!quill || !socket) return;

    const contents = quill.getContents();
    socket.emit('save-document', { id: userId, content: contents });
    alert('Document Saved');
  };

  // Leave document
  const handleLeave = () => {
    if (socketRef.current) socketRef.current.disconnect();
    navigate('/');
  };

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <h2>📄 Document Editor - User: {userId}</h2>
        <div>
          <button onClick={handleSave} className="save-btn">💾 Save</button>
          <button onClick={handleLeave} className="leave-btn">🚪 Leave</button>
        </div>
      </div>

      <div className="editor-box">
        <div ref={editorRef} style={{ height: '100%' }} />
      </div>
    </div>
  );
}

export default Editor;

