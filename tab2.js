class Tab{
    constructor(options){
        options = options || {};
        this.navSelector = options.navSelector || ".nav > li";
        this.navClass = options.navClass || "active";
        this.contentSelector = options.contentSelector || ".content";
        this.contentClass = options.contentClass || "show";
        this.type = options.type || "mouseover";
        this.interval = options.interval || 1000;
    
    }

    addEvent(){
        let _this = this;
        let navSelector = document.querySelectorAll(this.navSelector);
        let contentSelector = document.querySelectorAll(this.contentSelector);
        navSelector.forEach((e,i)=>{
            e.addEventListener(this.type,function(){
                _this.changeNavStyle(navSelector,this);
                _this.changeContentStyle(contentSelector,contentSelector[i]);
            })
        })
    }

    changeNavStyle(navSelector,currentNav){
        navSelector.forEach(e=>{
            e.classList.remove(this.navClass);
        })
        currentNav.classList.add(this.navClass);
    }

    changeContentStyle(contentSelector,currentContent){
        contentSelector.forEach(e=>{
            e.classList.remove(this.contentClass);
        })
        currentContent.classList.add(this.contentClass);
    }

    autoPlay(){
        let navSelector = document.querySelectorAll(this.navSelector);
        let contentSelector = document.querySelectorAll(this.contentSelector);
        let index = 0;
        this.timer = setInterval(()=>{
                index = ++index % navSelector.length;
                this.changeNavStyle(navSelector,navSelector[index]);
                this.changeContentStyle(contentSelector,contentSelector[index]);
        },this.interval)
    }
}