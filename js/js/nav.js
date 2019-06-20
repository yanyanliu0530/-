function Index() {
    // adv
    this.oimg = document.querySelector('.advMain img')
    this.adv = document.querySelector('.adv')
    this.ospan = document.querySelector('.advMain span')
    // nav
    this.Li = document.querySelector('.Li');
    this.liList = document.querySelector('.liList')
    // 搜索
    this.Input = document.querySelector('.Input')
    this.findIn = document.querySelector('.findL input')
    this.init()
}
Index.prototype = {
    init: function () {
        this.click()
        this.over()
        this.out()
        this.find()
        this.blur()
    },
    // adv
    click: function () {
        this.ospan.addEventListener('click', this.none.bind(this))
    },
    none: function () {
        this.oimg.style.height = 0;
        this.ospan.style.display = 'none';
    },
    // nav
    over: function () {
        this.Li.addEventListener('mouseover', this.block.bind(this))
    },
    // block
    block: function () {
        this.liList.style.display = 'block'
    },
    out: function () {
        this.Li.addEventListener('mouseout', this.outNo.bind(this))
    },
    outNo: function () {
        this.liList.style.display = 'none'
    },
    // 搜索
    find: function () {
        this.findIn.addEventListener('focus', this.findBlock.bind(this));

    },
    findBlock: function () {
        this.Input.style.display = 'block'
    },
    blur: function () {
        this.findIn.addEventListener('blur', this.blurNo.bind(this));
    },
    blurNo: function () {
        this.Input.style.display = 'none'
    }



}
new Index()