const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Company = require('./models/Company');
const Contact = require('./models/Contact');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

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

app.post('/process', async (req, res) => {
    try {
        
        const file1 = req.files.file1;
        const file2 = req.files.file2;

        

        const parts1 = file1.name.split('.');
        const dataAfterDot1 = parts1.slice(1).join('.');
        const parts2 = file2.name.split('.');
        const dataAfterDot2 = parts2.slice(1).join('.');

       

        if(dataAfterDot1 != 'xls' && dataAfterDot1 != 'xlsx'){
            res.status(500).json({ success: false, error: error.message });
        }

        if(dataAfterDot2 != 'xls' && dataAfterDot2 != 'xlsx'){
            res.status(500).json({ success: false, error: error.message });
        }

        //xls or .xlsx

        const workbook1 = xlsx.read(file1.data, { type: 'buffer' });
        const workbook2 = xlsx.read(file2.data, { type: 'buffer' });

        const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
        const sheet2 = workbook2.Sheets[workbook2.SheetNames[0]];

        const data1 = xlsx.utils.sheet_to_json(sheet1);
        const data2 = xlsx.utils.sheet_to_json(sheet2);

        await Company.insertMany(data1);
        await Contact.insertMany(data2);


        

       

        res.status(200).json({ success: true, message: 'Files processed successfully' });
    } catch (error) {
        console.log("hello")

        res.status(500).json({ success: false, error: error.message });
    }
});



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
