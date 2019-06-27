function Menu() {
    this.menu = document.querySelectorAll('.menu');
    this.menuF = document.querySelectorAll('.menuF');
    this.menuR = document.querySelectorAll('.menu .menuR');
    this.Ul = document.querySelectorAll('.menu_2 ul');
    this.menuImg = document.querySelectorAll('.menuImg');
    this.btn = document.querySelectorAll('.btn');

    this.init()
}
Menu.prototype = {
    init: function () {
        this.out()
        this.dataA();

    },
    over: function (data) {
        for (let i = 0, k = this.menuF.length; i < k; i++) {
            this.menuF[i].onmouseenter = function (e) {
                this.over1(i);
                this.data1(data, i);
                this.overImg();
                this.clearImg()
                this.overText();
                this.clearText()
            }.bind(this)
        }

    },
    // 小图的遍历
    overImg: function () {

        for (let i = 0, k = this.pImg.length; i < k; i++) {
            var _this = this;
            this.pImg[i].onmouseenter = function () {
                this.style.display = 'none';
                _this.pText[i].style.display = 'block';
            }
        }

    },
    clearImg: function () {
        for (let i = 0, k = this.pImg.length; i < k; i++) {
            var _this = this;
            this.pImg[i].onmouseleave = function () {
                _this.pText[i].style.display = 'none';
                this.style.display = 'block';

            }
        }
    },
    //txt
    overText: function () {
        for (let i = 0, k = this.pText.length; i < k; i++) {
            var _this = this;
            this.pText[i].onmouseenter = function () {
                this.style.display = 'block';
                _this.pImg[i].style.display = 'none';
            }
        }
    },
    clearText: function () {
        for (let i = 0, k = this.pText.length; i < k; i++) {
            var _this = this;
            this.pText[i].onmouseleave = function () {
                this.style.display = 'none';
                _this.pImg[i].style.display = 'block';
            }
        }
    },

    over1: function (i) {
        this.menuR[i].style.display = 'block';
    },
    // 请求数据
    data1: function (data, i) {
        var str = ''
        var strA = ''
        var strCi = ''
        for (var key in data) {

            if (Number(key.split('class')[1]) == i + 1) {
                for (var j = 0, k = data[key].list.length; j < k; j++) {
                    str += `
                    <li>
                        <a href="##">
                            <p class="pImg">
                                <img src="${data[key].list[j].img}" alt="">
                            </p>
                            <p class="pText">${data[key].list[j].txt}</p>
                        </a>
                    </li> 
                    `
                }
                strA = `<img src="${data[key].Img}" alt="">`
                for (var m = 0, n = data[key].ci.length; m < n; m++) {
                    strCi += `
                        <a href="">${data[key].ci[m]}</a>
                    `
                }

            }
            this.btn[i].innerHTML = strCi;
            this.menuImg[i].innerHTML = strA;
            this.Ul[i].innerHTML = str;
        }
        this.pImg = document.querySelectorAll(' .menu_2 ul li .pImg');
        this.pText = document.querySelectorAll(' .menu_2 ul li .pText');

    },
    clear: function () {
        for (let i = 0, k = this.menuR.length; i < k; i++) {
            this.menuR[i].style.display = 'none'
        }
    },
    // 滑出
    out: function () {
        for (let i = 0, k = this.menuF.length; i < k; i++) {
            var _this = this;
            this.menuF[i].onmouseleave = function () {
                this.clear();
            }.bind(this)
        }
    },
    // 数据渲染
    dataA: function () {
        var _this = this;
        axios({
            method: 'get',
            url: 'json/menu.json',
            data: {}
        }).then((data) => {
            _this.over(data);
        }).catch((info) => {
            console.log(info)
        })
    }

}
new Menu()