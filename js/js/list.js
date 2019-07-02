window.onload = function () {
    new List()
}
function List() {
    this.distL = document.querySelector('.distMain .distL')
    this.filter = document.querySelector('.filter img');
    this.filter1 = document.querySelector('.filter');
    this.Img = document.querySelector('.IMG img');
    this.side = document.querySelector('.IMG');
    this.ImgBox = document.querySelector('.imgL ul')


    this.login = $('.logReg .login');
    this.Ul = $('.imgList ul');
    this.infoL = $('.bottom .infoL');
    this.infoR = $('.bottom .infoR');
    this.count = 0;
    this.show = document.querySelector('.big');
    this.oimg = document.querySelector('.filter img');
    this.pri = document.querySelector('.pri_p');
    this.head = document.querySelector('.head1');
    this.style = document.querySelector('.style div a img');
    this.sTxt = document.querySelector('.style div a span');
    this.add = document.querySelector('.add');
    this.min = document.querySelector('.min');
    this.jisuan = document.querySelector('.jisuan');
    this.input = document.querySelector('.jisuan input');
    this.cart = document.querySelectorAll('.car div')
    this.init();

}
List.prototype = {
    init: function () {
        this.cook();
        this.href();
        this.big();
        this.over();
        this.tag();
        this.submit();
    },
    cook: function () {
        var get = getcookie('name');
        if (get) {
            this.login.html('你好！' + get)
        }
    },
    //获取路径
    href: function () {
        var locat = window.location.href;
        var loca = locat.split("?")[1];
        // "name=01"
        var loc = loca.split("&")[0];
        //01
        // name
        this.name = loc.split('=')[1];
        // pid=0##
        var loc1 = loca.split("&")[1];
        // 值
        this.pid = loc1.split("=")[1];
        this.data(this.name, this.pid);

    },
    data: function (t, l) {
        var _this = this;
        axios({
            method: 'get',
            url: '../json/1.json',
            data: {}
        }).then((data) => {
            _this.play(data, t, l)
        }).catch((info) => {
            console.log(info)
        })
    },
    play: function (data, t, l) {
        var odata = data[t].list[l].img1;
        this.Img.src = odata[0];
        this.filter.src = data[t].list[l].img2[0]
        var str = ""
        for (kay in odata) {
            str += `
                <li>
                    <img src="${odata[kay]}" alt="">
                </li>
                  `
        }
        this.ImgBox.innerHTML = str;
        this.liAll = $('.imgList ul li');
        this.liImg = $('.imgList ul li img')
        this.Widt = this.liAll.eq(0).width() + 10;
        this.size = this.liAll.length;
        this.Ul.width(this.Widt * this.size);
        this.click(data[t].list[l].img2);
        this.pri.innerHTML = data[t].list[l].pri;
        this.head.innerHTML = data[t].list[l].txt;
        //    款式
        this.style.src = data[t].list[l].style[0];
        this.sTxt.innerHTML = data[t].list[l].style[1]
    },

    mover: function () {
        this.Ul.stop().animate({ left: -this.Widt * this.count }, 400);
    },
    next: function () {
        if (this.count >= this.size - 5) {
            this.count = this.size - 5;
        } else {
            this.count++;
        }
        this.mover()
    },
    pro: function () {
        if (this.count <= 0) {
            this.count = 0;
        } else {
            this.count--;
        }
        this.mover()
    },
    click: function (data) {
        var _this = this;
        this.infoL.click(function () {
            _this.pro()
        })
        this.infoR.click(function () {
            _this.next();

        })
        for (let i = 0; i < this.liImg.length; i++) {
            var _this = this;
            this.liImg[i].onmouseover = function () {
                _this.Img.src = this.src;
                _this.filter.src = data[i]
            }
        }
    },
    //放大镜
    big: function () {
        var _this = this;
        this.show.onmousemove = function (e) {
            e = e || event;

            var
                l = e.pageX - this.offsetLeft
            t = e.pageY - this.offsetTop
            l = l < 0 ? 0 : (l > 250 ? 250 : l);
            t = t < 0 ? 0 : (t > 250 ? 250 : t);

            _this.oimg.style.left = -l * 2 + "px"
            _this.oimg.style.top = -t * 2 + "px"
        }
    },
    over: function () {
        var _this = this;
        this.side.onmouseenter = function () {
            _this.filter1.style.display = 'block';
        }
        this.side.onmouseleave = function () {
            _this.filter1.style.display = 'none';
        }
    },
    tag: function () {
        this.jisuan.addEventListener('click', this.num.bind(this));
    },
    //点击数量
    num: function (e) {

        e = e || event;
        var target = e.target || e.srcElement;
        if (target.tagName == 'SPAN' && target.className == 'min') {
            if (this.input.value <= 1) {
                this.input.value = 1
            } else {
                this.input.value--;
            }
        }
        if (target.tagName == 'SPAN' && target.className == 'add') {
            this.input.value++;
        }
    },
    submit: function () {
        for (let i = 0, k = this.cart.length; i < k; i++) {
            var _this = this;

            this.cart[i].onclick = function () {
                //存放多个数据
                var arr1 = [];
                var projson = {};
                var flag = true;
                projson = {
                    "name": _this.head.innerHTML,
                    "pri": _this.pri.innerHTML,
                    "src": _this.style.src,
                    "txt": _this.sTxt.innerHTML,
                    "num": _this.input.value
                }
                // 定义一个字符串取出本地存储
                var str2 = localStorage.getItem('goods');
                if (str2 != null) {
                    //说明有数据，有数据
                    arr1 = JSON.parse(str2);
                    //要看数据中是否存在现在添加的
                    arr1.forEach((pro) => {
                        console.log(pro.name)
                        if (pro.name == projson.name) {
                            console.log(111)
                            pro.num = parseInt(pro.num) + parseInt(projson.num)
                            flag = false;
                            return;
                        }
                    })
                }
                if (flag) {
                    arr1.push(projson);
                }
                localStorage.setItem('goods', JSON.stringify(arr1));

                if (confirm("是否跳转购物车")) {
                    location.href = 'shop.html'
                }








            }
        }
    }


}