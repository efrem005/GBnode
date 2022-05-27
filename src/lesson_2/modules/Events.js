import eventEmitter from 'events'
import { log, warn, error } from './Log.js'
import { createInterval, getArgsArray, prepareDateString, TimerEvents} from './Times.js'


export default class Events extends eventEmitter {

    run() {
        warn("Запуск таймера...")
        this.init()
    }

    init() {
        this.addListeners()
        const args = getArgsArray()
        if (args.length === 0) {
            return error('Недостаточно аргументов для запуска приложения')
        }
        this.emitListeners(args)
    }

    addListeners() {
        this.addListener(TimerEvents.createTimer, this.createTimerListener.bind(this))
        this.addListener(TimerEvents.endTimer, this.endTimerListener.bind(this))
    }

    emitListeners(args) {
        args.forEach((el) => {
            this.emit(TimerEvents.createTimer, el)
        })
    }

    createTimerListener(time) {
        const date = new Date(prepareDateString(time))
        const now = new Date()
        const timeout = date - now

        if (timeout <= 0) {
            return error('Нельзя установить таймер на прошлое! <(~.^)>')
        }

        const interval = createInterval(time, date, 1000, log)

        setTimeout(() => {
            this.emit(TimerEvents.endTimer, time)
            clearInterval(interval)
        }, timeout)
    }

    endTimerListener(time) {
        error(`Таймер на ${time} завершен <(^.^)>`)
    }
}