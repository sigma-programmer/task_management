const express = require("express");
const dotenv = require("dotenv");
const http = require('http');
const bodyParser = require("body-parser");
const { Server } = require('socket.io');

const cors = require("cors");
const useragent = require("express-useragent");
dotenv.config({ path: './.env' });
require("./db/conn");
const { socketManager,  } = require('./socket/socketManager');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(express.static("public"));
// app.use(cors());

app.use(cors({
  origin: `${process.env.FRONTEND_BASE_URL}`, // Your React frontend URL
  // origin: "https://intaskr.com",  // Update with correct URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Include all HTTP methods you want to allow
  credentials: true,  // Optional: If you need credentials (cookies)
}));


app.use(useragent.express());
// Socket setup

// Socket setup
// const io = socketManager(server);
socketManager(server);
const io = new Server(server, {
  cors: {
      origin: `${process.env.FRONTEND_BASE_URL}`, // Your React frontend URL
      // origin: "https://intaskr.com", // Your React frontend URL
      methods: ['GET', 'POST'],
  },
});

app.set('io', io);



// ------------------contact-------------

app.use('/api/contact',require('./routes/contactRoutes'));

// --waitlist------------
app.use('/api/waitlist', require('./routes/waitlistRoutes'));

// --subscription------------
app.use('/api/subscribe', require('./routes/subscriptionRoutes'));

// ------blog part---------------

app.use('/api', require('./routes/Blog/blogPostRoutes'));
app.use('/api', require('./routes/Blog/Comments'));


// -------------signup  , signin , logout , google login-----------

app.use('/api', require('./routes/AuthSignUpOtpVerify/otpRoutes'));
app.use('/api', require('./routes/AuthSignUpOtpVerify/SignIn'));
app.use('/api', require('./routes/LogoutRouter'));

app.use('/api', require('./routes/GoogleLogin/GoogleLogin'));
// --------page authentication--------

app.use('/api', require('./routes/AuthPAge'));


// --------------------Quatation------------

app.use('/api', require('./routes/Quotation/quotationRoutes'));
// --------------------Invoice------------

app.use('/api', require('./routes/Invoice/invoiceRoutes'));


// ---------meeting calender---------------

app.use('/api', require('./routes/MeetingCalender/eventRoutes'));

// ------------------Note------------
app.use('/api', require('./routes/Note/noteRoutes'));

// ---------------------Todolist Task-------------
app.use('/api', require('./routes/Task/taskRoutes'));

// ---------------bulk email-------------
app.use('/api', require('./routes/BulkEmail/emailRoutes'));

// ----------------user data-------------------
app.use('/api', require('./routes/UserController/userRoutes'));


// ----------------reset password-------------
app.use('/api', require('./routes/ResetPass/userRouter'));

// ------------Logo-----------
app.use('/api', require('./routes/logoRoutes'));


// ----------------update master data setting-----------
app.use('/api', require('./routes/MasterDataSetting/masterDataRout'));

// ----------------task event count--------------
app.use('/api', require('./routes/taskmeetingCount/taskEventRoutes'));
// -------------------Notifications--------------
app.use('/api', require('./routes/Notifications/meetingRoutes'));



app.use('/api', require('./routes/Notifications/getAllNotifications'));



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
