const expres = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDb = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = expres();
dotenv.config();
connectDb();

app.use(expres.json()); //to accept json data

app.get("/", (req, res) => {
  return res.send("API is running successfully!!!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// app.get("/api/chat", (req, res) => {
//   return res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   return res.send(chats.find((chat) => chat._id === req.params.id));
// });

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6100;

app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));
