import express from "express";
import exphbs from "express-handlebars";
import routerViews from "./routes/view.js";
import { Server } from "socket.io";

const PORT = 8080;
const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static('./src/public'));

app.use("/", routerViews);

const httpServer = app.listen(PORT, () => {
    console.log(`Listen port ${PORT}`);
});

const io = new Server(httpServer);
import { loadMessages, saveMessages, addMessage } from "./fileSystem/data.js";

io.on("connection", (socket)=>{
  console.log(`connected client ${socket.id}`);
  socket.on('disconnect', () => console.log(`client disconnect ${socket.id}`));

  socket.on("message", (data)=>{
    //recibo la data del chat de los cliente y lo guardo en json con filesystem
    addMessage(data);
    io.emit("messageLogs", loadMessages());
  });

});
