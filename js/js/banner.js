function Banner() {
    this.Ul = document.querySelector('.banBox ul');
    this.liAll = this.Ul.getElementsByTagName('li');
    this.liW = this.liAll[0].offsetWidth;
    this.clone = this.liAll[0].cloneNode(true);
    this.Ul.appendChild(this.clone);
    this.size = this.liAll.length
    this.allW = this.liW * this.size;
    // 动态设置ul的宽
    this.Ul.style.width = this.allW + 'px';
    this.count = 0;
    this.timer = null;
    this.main = document.querySelector('.banMain')
    this.obtn = document.querySelectorAll('.banMain span');
    this.dis = document.querySelector('.banMain .dis');
    this.init()
}
Banner.prototype = {
    init: function () {
        this.auto();
        this.click();
        this.stop();
        this.dot();
        this.click1()
    },
    // imgMove
    imgMove: function () {
        move(this.Ul, { 'left': -this.liW * this.count });
    },
    //下一张
    nextImg: function () {
        if (this.count >= this.size - 2) {

            this.Ul.style.left = 0;
            this.count = 1;
        } else {
            this.count++
        }
        this.style();
        this.disI[this.count = this.count >= this.disSize ? 0 : this.count].className = 'active'
        this.imgMove();
    },
    proImg: function () {
        if (this.count <= 0) {
            this.count = this.size - 2;
            this.Ul.style.left = -(this.size - 1) * this.liW + 'px'
        } else {
            this.count--;
        }
        this.style();
        this.disI[this.count].className = 'active'
        this.imgMove();
    },
    //自动轮播
    auto: function () {
        var _this = this;
        this.timer = setInterval(() => {
            _this.nextImg()
        }, 3000);
    },
    // 切换
    tab: function (e) {
        e = e || e.event;
        var target = e.target || e.srcElement;
        if (target.tagName == 'SPAN' && target.className == 'bntL') {
            this.proImg()
        }
        if (target.tagName == 'SPAN' && target.className == 'bntR') {
            this.nextImg()
        }
    },
    // 点击
    click: function () {
        this.main.addEventListener('click', this.tab.bind(this))
    },
    //鼠标划入 定时器停
    stop: function () {
        this.main.onmouseover = function () {
            clearInterval(this.timer)
        }.bind(this);
        this.main.onmouseout = function () {
            this.auto()
        }.bind(this)
    },
    // 拼接小圆点
    dot: function () {
        var str = '';
        for (var i = 0, k = this.size - 1; i < k; i++) {
            str += `
                <i></i>
            `
        }

        this.dis.innerHTML = str;
        this.disI = document.querySelectorAll('.dis  i');
        this.disSize = this.disI.length;
        this.disI[0].className = 'active'
    },
    //清除圆点样式
    style: function () {
        for (var i = 0, k = this.disSize; i < k; i++) {
            this.disI[i].className = ''
        }
    },
    //控制小圆点
    click1: function () {
        var _this = this;
        for (let i = 0, k = this.disSize; i < k; i++) {
            this.disI[i].onmouseover = function () {
                console.log(i)
                _this.count = i;
                _this.style();
                this.className = 'active';
                _this.imgMove()
            }
        }
    }

}
new Banner()