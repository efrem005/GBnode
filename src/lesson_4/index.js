#!/usr/bin/env node

import fs from "fs"
import path, { dirname } from 'path'
import inquirer from "inquirer"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isFile = (fileName) => {
    return fs.lstatSync(fileName).isDirectory();
};

let dirList = []

const main = async () => {
    let list = fs.readdirSync(__dirname + "\\" + dirList.join('\\'))
    const answer = await inquirer.prompt([
        {
            name: "fileName",
            type: "list",
            message: "Choose file:",
            choices: list,
        },
    ]);

    if (path.parse(answer.fileName).ext === '') {
        dirList.push(answer.fileName)
        return main()
    }

    const filePath = path.join(__dirname + "\\" + dirList.join('\\'), answer.fileName);
    const data = fs.readFileSync(filePath, "utf8");

    return console.log(data)
};

main();