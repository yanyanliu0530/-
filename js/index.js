function Index() {
    this.init()
}
Index.prototype = {
    init: function () {
        // this.adve = document.querySelector
        this.dl = document.querySelectorAll('.menu .menuF');
        this.dd = document.querySelectorAll('dl .menuR')
        this.adv()
    },
    //
    adv: function () {
        var _this = this;
        for (let i = 0; i < this.dl.length; i++) {
            this.dl[i].onmouseover = function () {
                var index = i;
                for (let j = 0; j < _this.dl.length; j++) {
                    _this.dd[j].style.display = 'none'
                }
                _this.dd[index].style.display = 'block'
            }
            this.dl[i].onmouseout = function () {
                for (let j = 0; j < _this.dl.length; j++) {
                    _this.dd[j].style.display = 'none'
                }
            }
        }

    }
}
new Index()