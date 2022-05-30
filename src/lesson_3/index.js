import fs from "fs";
import { Transform } from "stream"

class Index {

    constructor() {
        this.readStream = fs.createReadStream("./src/lesson_3/log/access.log", "utf-8")
        this.ip = ["89.123.1.41", "34.48.240.111"]
    }

    run() {
        this.ip.map(ip => this.forArray(ip))
    }

    regTransLog (ip) {
        return new Transform({
            transform(chunk, _encoding, callback) {
                const searchArray = chunk.toString().match(new RegExp(`^${ip}+...+\"`, "gm"));
                let arrayChunk = searchArray.join("\n") + "\n";
                callback(null, arrayChunk);
            },
        });
    }

    forArray(ip) {
            let outFile = `./src/lesson_3/log/%${ip}%_requests.log`
            let transformStream = this.regTransLog(ip)
            const writeStream = fs.createWriteStream(outFile, "utf-8");
            this.readStream.pipe(transformStream).pipe(writeStream);
    }
}


const app = new Index()

app.run()

