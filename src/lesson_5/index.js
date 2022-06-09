import {fileURLToPath} from "url";
import http from 'http'
import path, {dirname} from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const genHTMLBody = (url, dir) => {
    let list = fs.readdirSync(dir)
    let dirUrl = url === "/"?"":"." +url+"/";
    const listContent = `
                  ${list
        .map((item, idx) => `<div style="padding: 10px"><a style="font-size: 18px; padding: 5px 15px; background-color: #CCC; border-radius: 10px; color: black;" href="${dirUrl}${item}">${item}</a></div>`)
        .join("\n")}
            `;

    return  HTML.replace("{{body}}", listContent);

};

const HTML = fs.readFileSync("src/lesson_5/public/index.html", "utf-8");

const server = http.createServer(async (req, res) => {

    if (req.method === "GET") {
        const itemPath = path.join(__dirname, req.url);
        if (req.url === "/") {
            return res.end(genHTMLBody(req.url, itemPath))
        }

        const lstat = fs.lstatSync(itemPath, (data, err) => {
                if(err) {
                    res.writeHead(400, "error lstat")
                    return res.end()
                }
                return res.end(data)
        })

        if (lstat.isFile()) {
            const data = fs.readFileSync(itemPath, (err, data) => {
                if (err) {
                    res.writeHead(400, "error isFile")
                    return res.end()
                }
                return res.end(data)
            })
            return res.end(data);
        }

        return res.end(genHTMLBody(req.url, itemPath))
    }
})


server.listen(3000, () => console.log('start server...'))