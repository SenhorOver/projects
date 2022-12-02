class Clock{
    constructor(){
        this.hours = document.querySelector('.hours')
        this.minutes = document.querySelector('.minutes')
        this.seconds = document.querySelector('.seconds')
    }

    init(){
        this.updateClock()
    }

    static newTime(){
        return new Date()
    }

    updateClock(){
        setInterval(() => {
            const time = Clock.newTime()
            this.update(time)
        }, 1000)
    }

    update(time){
        const seconds = time.getSeconds() > 10 ? time.getSeconds().toString() : `0${time.getSeconds()}`
        const minutes = time.getMinutes() > 10 ? time.getMinutes().toString() : `0${time.getMinutes()}`
        const hours = time.getHours() > 10 ? time.getHours().toString() : `0${time.getHours()}`

        if(seconds[0] !== this.seconds.children[0].children[0].innerText) {
            this.changeTemplate('seconds', seconds, 0)
        }

        if(seconds[1] !== this.seconds.children[1].children[0].innerText) {
            this.changeTemplate('seconds', seconds, 1)
        }

        if(minutes[0] !== this.minutes.children[0].children[0].innerText) {
            this.changeTemplate('minutes', minutes, 0)
        }

        if(minutes[1] !== this.minutes.children[1].children[0].innerText) {
            this.changeTemplate('minutes', minutes, 1)
        }

        if(hours[0] !== this.hours.children[0].children[0].innerText) {
            this.changeTemplate('hours', hours, 0)
        }

        if(hours[1] !== this.hours.children[1].children[0].innerText) {
            this.changeTemplate('hours', hours, 1)
        }
    }

    changeTemplate(name, time, num){
        const flag = this[name].children[num].children[0].classList.contains('actual-number')
        if(!flag) return

        const newNumber = this[name].children[num].children[1]
        const actualNumber = this[name].children[num].children[0]
        newNumber.innerText = time[num]

        Clock.addClass(newNumber, 'on')
        Clock.addClass(actualNumber, 'on')

        setTimeout(() => {
            actualNumber.innerText = time[num]
            Clock.removeClass(actualNumber, ['on','actual-number'])
            Clock.removeClass(newNumber, ['on','new-number'])

            Clock.addClass(actualNumber, 'actual-number')
            Clock.addClass(newNumber, 'new-number')
        }, 900)
    }

    static removeClass(tag, classes){
        classes.forEach(cls => {
            tag.classList.remove(cls)
        })
    }

    static addClass(tag, cls){
        tag.classList.add(cls)
    }
}

const clock = new Clock()
clock.init()