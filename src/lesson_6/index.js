import {Server} from "socket.io"
import http from "http"
import fs from "fs"
import path, {dirname} from "path"
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = http.createServer(async (req, res) => {
    const indexPath = path.join(__dirname, "./index.html");
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(res);
});

const io = await new Server(server);
let count = 0
let user = []

io.on("connection", (client) => {
    user.push(client.id)
    io.emit("data", {
        count: count++,
        user: user.length
    })

    client.on("newMessage", (msg) => {
        client.broadcast.emit("newMessage", msg);
        client.emit("newMessage", msg);
    });

    client.on('disconnect', () => {
        user = user.filter(item => item !== client.id)
        io.emit("data", {
            count: count++,
            user: user.length
        })
    });
})



server.listen(3000);