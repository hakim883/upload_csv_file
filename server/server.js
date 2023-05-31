const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require('body-parser');
const path=require('path')

require('dotenv').config();

// Create Express app
const app = express();

const corsOptions = {
  origin: "https://csvuppload.netlify.app/", // frontend URI (ReactJS)
}

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));




// Define routes
const uploadRouter = require('./routes/uploadRouter');
app.use('/api/files', uploadRouter);
app.use("/public", express.static(path.join(__dirname, "public")));


// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB is connected'))
  .catch(err => console.log('DB connection error', err));
  mongoose.connection.on("connected", () => {
    console.log("Connected to mongodb...");
  });
  
  mongoose.connection.on("error", (err) => {
    console.log("Error connecting to mongo", err);
  });

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



