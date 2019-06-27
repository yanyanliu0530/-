function Buy() {
    this.iAll = document.querySelectorAll('.right_b span i');
    this.Ul = document.querySelector('.play_B .playSide ul')
    this.ospan = document.querySelectorAll('.play_B .ospan')
    this.count = 0;
    this.timer = null;
    this.buyA = document.querySelector('.buy .buyMain .buyB .right_B a')
    this.spanR = document.querySelectorAll(' .buyB .right_B span')
    this.Div = document.querySelector('.buy .buyMain .buyB .right_B')

    this.num = 0;
    this.timeImg = null;
    this.init()
}
Buy.prototype = {
    init: function () {
        this.set();
        this.data();
        this.Ospan();
        this.auto();

        // this.clickImg()
    },
    // 定时器
    set: function () {
        setInterval(() => {
            var now = new Date();
            var future = new Date('2019-08-07 14:12:00');

            var ms = future.getTime() - now.getTime();
            var day = parseInt(ms / (1000 * 60 * 60 * 24))
            var hour = parseInt(ms % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            var min = parseInt(ms % (1000 * 60 * 60 * 24) % (1000 * 60 * 60) / (1000 * 60));
            var secon = parseInt(ms % (1000 * 60 * 60 * 24) % (1000 * 60 * 60) % (1000 * 60) / 1000);
            this.iAll[0].innerHTML = mendZero(day);
            this.iAll[1].innerHTML = mendZero(hour);
            this.iAll[2].innerHTML = mendZero(min);
            this.iAll[3].innerHTML = mendZero(secon);
        }, 1000)
    },
    data: function () {
        var _this = this;
        axios({
            method: 'get',
            url: 'json/buy.json',
            data: {}
        }).then((data) => {
            _this.play(data)
        }).catch((info) => {
            console.log(info)
        })
    },
    // play限时购
    play: function (data) {
        for (var key in data) {
            if (key == "01") {
                var str = '';
                for (var i = 0, k = data[key].list.length; i < k; i++) {
                    str += `
                        <li class= "${key}">
                            <a href="html/list.html?name=${key}&pid=${i}" title="${data[key].list[i].txt}">
                                <img src="${data[key].list[i].img}" alt="">
                                <div class="P_txt">
                                    <p class="txt_1">${data[key].list[i].txt}</p>
                                    <p class="txt_2">
                                        <span class="txtL">
                                           ${data[key].list[i].txt1}
                                        </span>
                                        <span class="txtR">${data[key].list[i].txt2}</span>
                                    </p>
                                    <del>${data[key].list[i].del}</del>
                                </div>
                            </a>
                        </li>
                    `
                }
            }

            if (key == "03") {
                var str1 = '';
                for (var j = 0, x = data[key].length; j < x; j++) {
                    str1 += `
                        <img src="${data[key][j]}" alt="">
                    `
                }
            }
        }
        this.buyA.innerHTML = str1;

        this.imgAll = document.querySelectorAll('.buyB .right_B a img')
        this.imgSize = this.imgAll.length;
        this.dotUl = document.querySelector('.right_B ul');


        var str2 = '';
        for (var i = 0, k = this.imgSize; i < k; i++) {
            str2 += `
                <li></li>
            `
        }
        this.dotUl.innerHTML = str2;
        this.dotLi = document.querySelectorAll('.right_B ul li')
        this.imgdot = document.querySelectorAll('.right_B a img')
        for (var i = 0, k = this.dotLi.length; i < k; i++) {
            if (i == 0) {
                this.dotLi[i].className = 'act';
            }
        }
        this.imgdot[0].style.opacity = 1;

        this.clickImg();
        this.playImg()
        this.stopImg()
        this.dot()

        this.Ul.innerHTML = str;
        this.liAll = document.querySelectorAll(' .playSide #ulAll li')
        this.Wid = this.liAll[0].offsetWidth;

        this.size = this.liAll.length;
        this.Ul.style.width = this.Wid * (this.size + 3) + 'px';
        for (var i = 0, k = this.liAll.length; i < k; i++) {
            if (i < 3) {
                var clone = this.liAll[i].cloneNode(true);
                this.Ul.appendChild(clone);
            }
        }


    },
    //点击下张切换
    next: function () {
        if (this.count >= this.size / 3) {
            this.Ul.style.left = 0;
            this.count = 1;

        } else {
            this.count++;
        }
        this.mover();
    },
    //运动
    mover: function () {
        move(this.Ul, { 'left': -this.Wid * this.count * 3 });
    },

    //上张切换
    pro: function () {
        if (this.count <= 0) {
            this.count = this.size / 3 - 1;
            this.Ul.style.left = -(this.size * this.Wid) + 'px';
        } else {
            this.count--
        }
        this.mover();
    },
    //按钮右
    Ospan: function () {
        var _this = this;
        for (let i = 0, k = this.ospan.length; i < k; i++) {
            this.ospan[i].onclick = function () {
                if (i == 1) {
                    _this.next();
                }
                //按钮左
                if (i == 0) {
                    _this.pro()
                }

            }
        }
    },
    auto: function () {
        this.timer = setInterval(function () {
            this.next()
        }.bind(this), 6000);
    },

    //运动
    moveImg: function (img) {
        for (var i = 0, k = this.imgdot.length; i < k; i++) {
            this.imgdot[i].style.opacity = 0;
        }
        move(img, { 'opacity': 100 });

    },
    //下张
    nexImg: function () {
        if (this.num >= this.imgdot.length - 1) {
            this.num = 0;
        } else {
            this.num++;
        }

        this.clear()
        this.dotLi[this.num].className = 'act'
        this.moveImg(this.imgdot[this.num]);

    },
    //上张
    proImg: function () {
        if (this.num <= 0) {
            this.num = this.imgdot.length - 1;

        } else {
            this.num--;
        }
        this.clear()
        this.dotLi[this.num].className = 'act'
        this.moveImg(this.imgdot[this.num]);
    },
    //点击
    clickImg: function () {
        var _this = this;
        for (let i = 0, k = this.spanR.length; i < k; i++) {
            this.spanR[i].onclick = function () {
                if (i == 1) {
                    _this.nexImg()
                }
                if (i == 0) {
                    _this.proImg()
                }
            }

        }
    },
    //自动
    playImg: function () {
        this.timeImg = setInterval(function () {
            this.nexImg()
        }.bind(this), 6000)
    },
    //划入
    stopImg: function () {
        this.Div.onmouseover = function () {
            clearInterval(this.timeImg)
        }.bind(this);
        this.Div.onmouseout = function () {
            this.playImg()
        }.bind(this);
    },
    //控制圆点
    dot: function () {
        var _this = this;
        for (let i = 0, k = this.dotLi.length; i < k; i++) {
            this.dotLi[i].onmouseover = function () {
                _this.clear()
                this.className = 'act';
                _this.num = i;
                _this.moveImg(_this.imgdot[_this.num])
            }
        }

    },
    //清楚元点
    clear: function () {
        for (let i = 0, k = this.dotLi.length; i < k; i++) {
            this.dotLi[i].className = ''
        }
    }




}
new Buy()