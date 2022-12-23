class TaskList{
    constructor(){
        this.list = document.querySelector('.list')
        this.iptAdd = document.querySelector('#ipt-add');
        this.helperText = document.querySelector('.helperText');
    }

    init(){
        this.cacheSelectors()
        this.bindEvents()
    }

    cacheSelectors(){
        this.btnAdd = document.querySelector('.btn-add')
        this.listItem = document.querySelectorAll('li')
    }

    bindEvents(){
        this.btnAdd.onclick = this.events().btnAdd_Click.bind(this)
        this.iptAdd.onkeypress = this.events().iptAdd_Enter.bind(this)
        this.listItem.forEach(item => {
            item.onclick = this.events().listItem_Click
        })
    }

    events(){
        function addItem(){
            const li = document.createElement('li')
            li.innerHTML = this.addLi(this.iptAdd.value)
            this.list.insertAdjacentElement('beforeend', li)
            this.iptAdd.focus()
            
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
                        return el.parentElement.classList.remove('finished')
                    }
                    return el.parentElement.classList.add('finished')
                }

                if(el.classList.contains('remove')){
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