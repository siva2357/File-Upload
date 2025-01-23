const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./File-Upload/fileUploadRoutes');
const cors = require('cors');

const app = express();
const PORT = 3200;

// Middleware setup
app.use(cors({
    origin: 'http://localhost:4300',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Built-in middleware for JSON and URL-encoded data
app.use(express.json({ limit: '10mb' })); // Increase limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/project-upload', uploadRoutes);

// MongoDB connection
mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1:27017/Project-Upload", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log("Successfully connected to DB");
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
})
.catch(error => {
    console.error("Error connecting to DB", error);
});
