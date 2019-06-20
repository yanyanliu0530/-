function Menu() {
    this.menu = document.querySelectorAll('.menu');
    this.menuF = document.querySelectorAll('.menuF');
    this.menuR = document.querySelectorAll('.menu .menuR')
    this.init()
}
Menu.prototype = {
    init: function () {
        this.over()
        // this.out()
    },
    over: function () {
        for (let i = 0, k = this.menuF.length; i < k; i++) {
            this.menuF[i].onmouseover = function () {
                this.over1(i)
            }.bind(this)
        }
    },
    over1: function (i) {
        this.clear();
        this.menuR[i].style.display = 'block';
    },
    clear: function () {
        for (let i = 0, k = this.menuR.length; i < k; i++) {
            this.menuR[i].style.display = 'none'
        }
    },
    // 滑出
    out: function () {
        for (let i = 0, k = this.menuF.length; i < k; i++) {
            this.menuF[i].onmouseout = function () {
                this.clear();
            }.bind(this)
        }
    },


}
new Menu()