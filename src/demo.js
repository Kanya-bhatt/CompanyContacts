const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded
app.use(cors());
app.use(fileUpload());  // For parsing multipart/form-data

const mongoURI = 'mongodb+srv://kanyaBhatt:baba5000@clustera.9sqiopf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterA';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});

const fileTypeValidator = (value, { req }) => {
    if (!req.files || !req.files.file) {
        throw new Error('File is required');
    }

    const file = req.files.file;
    const fileExtension = file.name.split('.').pop();
    if (fileExtension !== 'xls' && fileExtension !== 'xlsx') {
        throw new Error('Invalid file type. Only .xls and .xlsx are allowed');
    }
    return true;
};

app.post('/process', [
    body('file').custom(fileTypeValidator)
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Proceed with processing the file
    res.send('File is valid and uploaded successfully');
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
