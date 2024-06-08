const express = require("express");

//importing routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const contactUsRoutes = require("./routes/Contact");

//connections for db and cloudinary
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

//other necessary pakeges
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");


require('dotenv').config()

const app = express();

// Connecting to database
database.connect();

// Connecting to cloudinary
cloudinaryConnect();
 
// Middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/reach", contactUsRoutes);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Setting up port number
const PORT = process.env.PORT || 4000;

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});