class Timer{
    constructor(){
        this.milliseconds = document.querySelector('.milliseconds')
        this.sMin = document.querySelector('.sMin')
        this.interval = null
        this.time = new Date(0)
    }

    init(){
        this.selectors()
        this.bindEvents()
    }

    selectors(){
        this.start = document.querySelector('.start')
        this.stop = document.querySelector('.stop')
        this.reset = document.querySelector('.reset')
    }

    bindEvents(){
        this.start.onclick = () => {
            if (this.interval) return
            this.startTimer()
            this.noneClass(this.start, this.stop)
        }

        this.stop.onclick = () => {
            clearInterval(this.interval)
            this.interval = null
            this.noneClass(this.stop, this.start)
        }

        this.reset.onclick = () => {
            clearInterval(this.interval)
            this.interval = null
            this.time = new Date(0)
            this.updateTimer(this.time)
            this.noneClass(this.stop, this.start)
        }
    }

    noneClass(add, rm){
        add.classList.add('none')
        rm.classList.remove('none')
    }

    attValues(time){
        time.setMilliseconds(time.getMilliseconds() + 10)
    }

    startTimer(){
        this.interval = setInterval(() => {
            this.updateTimer(this.time)
            this.attValues(this.time)
        }, 10)
    }

    updateTimer(time){
        const milliseconds = time.getMilliseconds() >= 100 ? time.getMilliseconds() / 10 : time.getMilliseconds()
        const seconds = time.getSeconds() >= 10 ? time.getSeconds() : `0${time.getSeconds()}`
        const minutes = time.getMinutes() >= 10 ? time.getMinutes() : `0${time.getMinutes()}`
        
        this.milliseconds.innerText = `.${milliseconds >= 10 ? Math.floor(milliseconds) : `0${Math.floor(milliseconds)}`}`
        this.sMin.innerText == `${minutes}:${seconds}` ? '' : this.sMin.innerText = `${minutes}:${seconds}`
        document.title = `${minutes}:${seconds} - Cronômetro`
        
    }
}

const timer = new Timer()
timer.init()