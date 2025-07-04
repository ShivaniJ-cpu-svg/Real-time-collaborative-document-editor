const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const Document = require('./models/Document');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

const PORT = 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => console.log('MongoDB connected ✅'));

// Default empty document content (Quill Delta format)
const defaultValue = { ops: [] };
// Socket.IO handling
io.on('connection', (socket) => {
  socket.on('get-document', async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-document', async ({ id, content }) => {
      await Document.findByIdAndUpdate(id, { data: content });
    });
  });
});


// REST endpoint for optional manual save
app.post('/save-document', async (req, res) => {
  const { id, content } = req.body;
  try {
    await Document.findByIdAndUpdate(id, { data: content });
    res.json({ message: 'Document saved!' });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ message: 'Error saving document' });
  }
});

// Helper to create/fetch document


async function findOrCreateDocument(id) {
  if (!id) return null;
  let doc = await Document.findById(id);
  if (!doc) {
    doc = await Document.create({ _id: id, data: defaultValue });
  }
  return doc;
}


server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

