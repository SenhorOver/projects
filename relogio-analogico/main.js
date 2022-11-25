class Clock{
    constructor(){
        this.clock = document.querySelector('.clock')
        this.secondsPointer = document.querySelector('.seconds')
        this.minutesPointer = document.querySelector('.minutes')
        this.hoursPointer = document.querySelector('.hours')
        this.pmAm = document.querySelector('.pm-am')
    }

    init(){
        this.startTimer()
    }

    newTime(){
        return new Date()
    }

    startTimer(){
        setInterval(() => {
            const time = this.newTime()
            this.rotateClock(time)
            this.setAmPm(time)
        }, 1000)
    }

    rotateClock(time){
        const seconds = time.getSeconds()
        const minutes = time.getMinutes()
        const hours = time.getHours() >= 12 ? time.getHours() - 12 : time.getHours()
        this.secondsPointer.style.transform = `rotate(${seconds * 6}deg) translateX(-50%) translateY(0)`
        if(!seconds > 0) { this.minutesPointer.style.transform = `rotate(${minutes * 6}deg) translateX(-50%) translateY(0)` } 
        else { this.adjustMinutes(seconds, minutes) }
        if(!minutes > 0) return this.hoursPointer.style.transform = `rotate(${hours * 30}deg) translateX(-50%) translateY(0)`
        this.adjustHours(minutes, hours)
    }

    adjustHours(mins, hrs){
        const deg = hrs * 30 + (mins / 2)
        this.hoursPointer.style.transform = `rotate(${deg}deg) translateX(-50%) translateY(0)`
    }

    adjustMinutes(secs, mins){
        const deg = mins * 6 + (secs / 10)
        this.minutesPointer.style.transform = `rotate(${deg}deg) translateX(-50%) translateY(0)`
    }

    setAmPm(time){
        time.getHours() < 12 ? this.pmAm.textContent = 'AM' : this.pmAm.textContent = 'PM'
    }
}

const clock = new Clock()
clock.init()