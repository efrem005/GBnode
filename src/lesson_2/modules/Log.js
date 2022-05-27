import Colors from "colors";

class Log {
    log(text) {
        console.log(Colors.green(text))
    }
    error(text) {
        console.log(Colors.red(text))
    }
    warn(text) {
        console.log(Colors.yellow(text))
    }
}

export const { log, error, warn } = new Log()