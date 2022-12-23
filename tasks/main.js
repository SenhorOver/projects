class TaskList{
    constructor(){
        this.list = document.querySelector('.list')
        this.iptAdd = document.querySelector('#ipt-add');
        this.helperText = document.querySelector('.helperText');
        this.id = 0
    }

    init(){
        this.localStrg()
        this.cacheSelectors()
        this.bindEvents()
    }

    localStrg(){
        let tasksList = localStorage.getItem('tasks-list')
        if(!tasksList) return
        tasksList = JSON.parse(tasksList)
        tasksList = tasksList.filter(task => task.removed !== true)
        tasksList.forEach((task, ix) => {
            this.id = ix

            const li = document.createElement('li')
            li.innerHTML = this.addLi(task.content)
            li.dataset.id = ix

            if(task.finished === true) li.classList.add('finished')

            this.list.insertAdjacentElement('beforeend', li)
        })
        localStorage.setItem('tasks-list', JSON.stringify(tasksList))
    }

    cacheSelectors(){
        this.btnAdd = document.querySelector('.btn-add')
        this.listItem = document.querySelectorAll('li')
    }

    bindEvents(){
        this.btnAdd.onclick = this.events().btnAdd_Click.bind(this)
        this.iptAdd.onkeypress = this.events().iptAdd_Enter.bind(this)
        this.listItem.forEach(item => {
            item.onclick = this.events().listItem_Click.bind(this)
        })
    }

    addLocalStrg(content){
        let tasksList = localStorage.getItem('tasks-list')
        if(!tasksList) return localStorage.setItem('tasks-list', JSON.stringify([{
            finished: false,
            content,
            removed: false,
        }]))

        tasksList = JSON.parse(tasksList)

        tasksList = [
            ...tasksList,
            {
                finished: false,
                content,
                removed: false,
            }
        ]
        tasksList = JSON.stringify(tasksList)
        localStorage.setItem('tasks-list', tasksList)
    }

    rmLocalStrg(li){
        const id = li.dataset.id

        let tasksList = localStorage.getItem('tasks-list')
        tasksList = JSON.parse(tasksList)

        tasksList[id].removed = true
        tasksList = JSON.stringify(tasksList)
        localStorage.setItem('tasks-list', tasksList) 
    }

    finishedLocalStrg(li){
        const id = li.dataset.id

        let tasksList = localStorage.getItem('tasks-list')
        tasksList = JSON.parse(tasksList)

        tasksList[id].finished = tasksList[id].finished === true ? false : true
        tasksList = JSON.stringify(tasksList)
        localStorage.setItem('tasks-list', tasksList) 
    }

    events(){
        function addItem(){
            const id = this.list.children.length
            const li = document.createElement('li')
            li.innerHTML = this.addLi(this.iptAdd.value)
            li.dataset.id = id
            this.list.insertAdjacentElement('beforeend', li)
            this.iptAdd.focus()

            this.addLocalStrg(li.children[1].innerText)
            
            this.cacheSelectors()
            this.bindEvents()
        }

        return {
            btnAdd_Click: function (e){
                if(!this.iptAdd.value){
                    this.helperText.innerText = 'Campo não pode estar vazio'
                    return this.iptAdd.classList.add('error')
                }
                this.iptAdd.classList.remove('error')
                this.helperText.innerText = ''

                addItem.bind(this)()
            },


            iptAdd_Enter: function (e){
                if(e.code === 'Enter'){
                    addItem.bind(this)()
                }
            },



            listItem_Click: function (e){
                const el = e.target
                if(el.classList.contains('concluded')){
                    if(el.parentElement.classList.contains('finished')){
                        this.finishedLocalStrg(el.parentElement)
                        return el.parentElement.classList.remove('finished')
                    }
                    this.finishedLocalStrg(el.parentElement)
                    return el.parentElement.classList.add('finished')
                }

                if(el.classList.contains('remove')){
                    this.rmLocalStrg(el.parentElement)
                    el.parentElement.classList.add('removed')
                    setTimeout(() => {
                        el.parentElement.classList.add('none')
                    }, 200)
                }
            }
        }
    }

    addLi(content){
        this.iptAdd.value = ''
        return `
            <span class="concluded">✓</span>
            <span class="content">${content}</span>
            <span class="remove">X</span>
        `
    }
}

const list = new TaskList()
list.init()