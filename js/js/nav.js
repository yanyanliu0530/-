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
    this.findIn = document.querySelector('.findL input');
    this.login = document.querySelector('.logReg .login');

    //楼梯
    this.fix = document.querySelectorAll('.fixMain span');
    this.pro_none = document.querySelector('#pro_none')
    this.init()
}
Index.prototype = {
    init: function () {
        this.click()
        this.over()
        this.out()
        this.find()
        this.blur();
        this.cook();
        this.celi();
        this.foot()
    },

    //楼梯
    foot: function () {
        for (let i = 0, k = this.fix.length; i < k; i++) {
            this.fix[i].onmouseenter = function () {
                this.firstElementChild.nextElementSibling.style.display = 'block';
                this.firstElementChild.nextElementSibling.style.cssText = "display:block; opacity: 1;"
            }
            this.fix[i].onmouseleave = function () {
                this.firstElementChild.nextElementSibling.style.cssText = 'display:none;opacity: 0;'
            }
        }
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
    },


    // 登陆显示
    cook: function () {
        var get = getcookie('name')
        if (get) {
            this.login.innerHTML = '你好！' + get;
        }
    },
    // 吸顶
    celi: function () {
        this.produ = document.querySelector('.produ');
        this.menu = document.querySelector('.menu');
        _this = this;
        window.onscroll = function () {
            var scroll = document.body.scrollTop || document.documentElement.scrollTop;
            if (scroll >= 203) {
                _this.pro_none.style.cssText = "display:block;position:fixed;top:0;";
            }
            if (scroll <= 0) {
                _this.pro_none.style.cssText = "display:none";
            }
        }
    }



}
new Index()