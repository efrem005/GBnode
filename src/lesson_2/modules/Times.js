export const TimerEvents = {
    createTimer: Symbol.for('createTimer'),
    endTimer: Symbol.for('endTimer')
}

export const getArgsArray = () => {
    return process.argv.slice(2)
}

export const prepareDateString = (time) => {
    let dateNow = new Date()
    let reverseArr = time.split('-').reverse()
    let dateStr = reverseArr.slice(0, 3).join('-')
    let timeStr = reverseArr.slice(3).reverse().join(':') + ':' +  dateNow.getSeconds()
    return dateStr + ' ' + timeStr
}

export const createInterval = (time, date, interval, logger) => {
    return setInterval(() => {

        let timeout = new Date(Date.parse(date) - new Date())
        let days = Number(timeout.getDate()) - 1 <= 0 ? 0 : Number(timeout.getDate()) - 1
        let hours = Number(timeout.getHours()) - 3
        let minutes = timeout.getMinutes()
        let seconds = timeout.getSeconds()

        logger(`таймер на ${time} будет завершен через ${days} дн. ${hours} час. ${minutes} мин. ${seconds} сек.`)

    }, 1000)
}