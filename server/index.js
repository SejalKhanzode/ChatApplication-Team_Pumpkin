const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const database = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes")

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());

database.connect();

app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:5173",
		credentials:true,
	})
)

app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoutes);


//def route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})