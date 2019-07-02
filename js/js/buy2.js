function Play() {
    this.buy = document.querySelector('#buy2 .buy2_ul');
    this.count = 0;
    this.time = null;
    this.ospan = document.querySelectorAll('#buy2 span');
    this.buy2 = document.querySelector('#buy2');
    this.init()
}
Play.prototype = {
    init: function () {
        this.data();
    },
    //拼接数据
    data: function () {
        var _this = this;
        axios({
            method: 'get',
            url: 'json/buy.json',
            data: {}
        }).then((data) => {
            _this.info(data)
        }).catch((info) => {
            console.log(info)
        })
    },
    info: function (data) {
        for (key in data) {
            if (key == '02') {
                var str = ''
                for (var i = 0, k = data[key].list.length; i < k; i++) {
                    str += `
                        <li class = "${key}">
                            <a href="html/list.html?name=${key}&pid=${i}"  title = "${data[key].list[i].txt}">
                                <img src="${data[key].list[i].img}" alt="" class="daImg">
                                <div class="P_txt">
                                    <p class="txt_1">${data[key].list[i].txt}</p>
                                    <p class="txt_2" id="daTxt">
                                        <span class="daSpan"></span>
                                        <span class="daTxt">12:14:51</span>
                                    </p>
                                    <i>${data[key].list[i].pri}</i>
                                    <del id="dell">${data[key].list[i].del}</del>
                                </div>
                            </a>
                        </li>
                    `
                }
            }
        }
        this.buy.innerHTML = str;
        //克隆四张
        this.buyLi = this.buy.getElementsByTagName('li');

        for (var j = 0, z = this.buyLi.length; j < z; j++) {
            if (j < 4) {
                var clone = this.buyLi[j].cloneNode(true);
                this.buy.appendChild(clone);
            }
        }
        this.size = this.buyLi.length;
        //动态添加宽度
        this.Wid = this.buyLi[0].offsetWidth;
        this.buy.style.width = this.Wid * this.size + 'px';
        this.now = document.querySelectorAll('#daTxt .daTxt');

        this.auto();
        this.tag();
        this.date1()
    },
    //运动
    mover: function () {
        move(this.buy, { 'left': -this.Wid * 4 * this.count });
    },
    //下一张
    next: function () {
        if (this.count >= this.size / 4 - 1) {
            this.buy.style.left = 0;
            this.count = 1;
        } else {
            this.count++;
        }
        this.mover()
    },
    //上涨
    pro: function () {
        if (this.count <= 0) {
            this.buy.style.left = -this.Wid * (this.size / 4 - 2) * 4 + 'px'
            this.count = this.size / 4 - 1
        } else {
            this.count--
        }
        this.mover()
    },
    auto: function () {
        this.time = setInterval(function () {
            this.next()
        }.bind(this), 6000);
    },
    //点击
    click1: function (e) {
        e = e || event;
        var target = e.target || e.srcElement;
        if (target.tagName == 'SPAN' && target.className == "spanR ospan") {

            this.next();
        }
        if (target.tagName == 'SPAN' && target.className == "spanL ospan") {
            this.pro()
        }
    },
    tag: function () {
        this.buy2.addEventListener('click', this.click1.bind(this))

    },


    //倒计时
    date1: function () {
        var arr = ["2019-08-01 12:23:10", "2019-08-10 03:42:07", "2019-10-01 10:45:10", "2019-07-01 11:23:10", "2019-08-07 04:07:24", "2019-08-07 05:06:12", "2019-08-01 12:23:10", "2019-08-10 03:42:07", "2019-10-01 10:45:10", "2019-07-01 11:23:10", "2019-08-07 04:07:24", "2019-08-07 05:06:12", "2019-08-01 12:23:10", "2019-08-10 03:42:07", "2019-10-01 10:45:10", "2019-07-01 11:23:10", "2019-08-07 04:07:24", "2019-08-07 05:06:12", "2019-08-10 03:42:07", "2019-10-01 10:45:10"];

        for (let i = 0, k = this.now.length; i < k; i++) {
            setInterval(() => {
                futu(new Date(), new Date(arr[i]), this.now[i]);
            }, 1000)
        }



    }

}
new Play()