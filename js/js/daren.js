function Daren() {
    this.Ul = $('.tabUl');

    this.fenyeA = $('.fenyeA');
    this.fenCon = $('.fenCon');
    this.fenye = $('.fenyy')
    // this.count = 0;
    this.init()

}
Daren.prototype = {
    init: function () {
        this.data()
    },
    data: function () {
        var _this = this;
        axios({
            method: 'get',
            url: 'json/da.json',
            data: {}
        }).then((data) => {
            _this.show(data)
        }).catch((info) => {
            console.log(info)
        })
    },
    show: function (data) {
        var str = '';
        for (key in data) {
            str += `
            <li>${data[key].name}</li>
            `
        }
        this.Ul.html(str);
        this.over(data)
    },
    over: function (data) {
        var _this = this;
        //第一个添加样式
        $('.tabUl li').eq(0).addClass('daLi');
        var _this = this;
        $('.tabUl li').mouseover(function () {
            $(this).addClass('daLi').siblings().removeClass('daLi');
            _this.shuju(data, $(this).html());
        })
        this.click(data);

    },
    shuju: function (data, txt) {
        for (key in data) {
            var str1 = ''
            var str2 = ''

            if (data[key].name == txt) {
                str1 += `
                        <img src="${data[key].img}" alt="">

                        <div class="fenTxt">
                            <p class="p_1">${data[key].txt1}</p>
                            <p class="p_2">${data[key].txt2}</p>
                        </div> 
                    `
                for (let i = 0, k = data[key].list.length; i < k; i++) {
                    str2 += `
                        <a href="html/list.html?name=${key}&pid=${i}">
                            <img src="${data[key].list[i].img}" alt="">
                        </a>
                        `
                }
                this.fenCon.html(str2)
                this.fenyeA.html(str1)
            }
        }
    },
    //  点击
    click: function (data) {
        var _this = this;
        var count = 0;
        this.size = $('.tabUl li').length - 1;
        $('.fenye_D span').click(function () {
            if ($(this).index() == 2) {
                if (count >= _this.size) {
                    count = 0;
                } else {
                    count++;
                }
                _this.dist(data, count);
            }
            if ($(this).index() == 1) {
                if (count <= 0) {
                    count = _this.size;
                } else {
                    count--;
                }
                _this.dist(data, count);
            }
        })

    },
    //遍历列表
    dist: function (data, count) {
        for (let i = 0, k = $('.tabUl li').length; i < k; i++) {
            var str4 = $('.tabUl li').eq(count).html();
            $('.tabUl li').eq(count).addClass('daLi').siblings().removeClass('daLi')
            this.shuju(data, str4);
        }
    }


}
new Daren()