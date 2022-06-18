import {fileURLToPath} from "url";
import http from 'http'
import path, {dirname} from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const genHTMLBody = async (dir, path) => {
    const dirName = dir === "/" ? "" : dir + "/";
    const list = await readdir(path);
    const listContent = `
                  ${list
        .map((item, idx) => `<div style="padding: 10px"><a style="font-size: 18px; padding: 5px 15px; background-color: #CCC; border-radius: 10px; color: black;" href="${dirName}${item}">${item}</a></div>`)
        .join("\n")}
            `;

    return  HTML.replace("{{body}}", listContent);
};

const promisifyFs =
    (method, error, callback = (data) => data) =>
        (path) =>
            new Promise((resolve, reject) => {
                fs[method](path, (err, data) => {
                    if (err) {
                        return reject(error);
                    }
                    resolve(callback(data));
                });
            });

const readFile = promisifyFs("readFile", "Error when read file");
const readdir = promisifyFs("readdir", "Error when read dir");
const isFile = promisifyFs("lstat", "Error when read dir or file", (stats) =>
    stats.isFile()
);

const HTML = fs.readFileSync("src/lesson_5/public/index.html", "utf-8");

const server = http.createServer(async (req, res) => {

    if (req.method === "GET") {

        if (req.url === "/") {
            return res.end(await genHTMLBody('', __dirname))
        }

        const getPath = path.join(__dirname, req.url)
        const getIsFile = await isFile(getPath)

        if (getIsFile) {
            return res.end(await readFile(getPath));
        }

        return res.end(await genHTMLBody(req.url, getPath))
    }
})


server.listen(3000, () => console.log('start server...'))