function Daren() {
    this.Ul = document.querySelector('.txt_D .tabUl');
    this.fenye = document.querySelector('.perMain .fenye_D .fenyy')
    this.famous = document.querySelector('.famous .tab_D');
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
            // 拼接选项卡
            for (var i = 0, k = data[key].name.length; i < k; i++) {
                str += `
             <li>${data[key].name[i]}</li>
            `
            }
            var str1 = ''
            // for (var i = 0, k = data[key].list[0]; i < k; i++) {
            str1 += `
                        <a href="html/list.html?name=${key}&pid=${i}" class="fenyeA" data-id=${key}>
                        <img src="${data[key].list[0].img}" alt="">

                        <div class="fenTxt">
                            <p class="p_1">${data[key].list[0].txt}</p>
                            <p class="p_2">${data[key].list[0].text}</p>
                        </div>
                    </a>
                    <div class="fenCon" data-id=${key}>
                        <a href="html/list.html?name=${key}&pid=${i}" class="fen1">
                            <img src="${data[key].list[0].img1}" alt="">
                        </a>
                        <a href="html/list.html?name=${key}&pid=${i}">
                            <img src="${data[key].list[0].img2}" alt="">
                        </a>
                    </div>
                    <div class="fenCon fenR" data-id=${key}>
                        <a href="html/list.html?name=${key}&pid=${i}" class="fen1">
                            <img src="${data[key].list[0].img3}" alt="">
                        </a>
                        <a href="html/list.html?name=${key}&pid=${i}">
                            <img src="${data[key].list[0].img4}" alt="">
                        </a>
                    </div>
                        `
            this.fenye.innerHTML = str1;
            // }
        }

        this.Ul.innerHTML = str;
        this.tabLi = $('.tabUl li')

        this.tabLi[0].className = 'daLi';
        this.ospan(data);

    },

    //
    ospan: function (data) {
        var _this = this
        this.tabLi.mouseover(function () {
            $(this).addClass('daLi').siblings().removeClass('daLi')
            for (key in data) {
                var str = ''
                for (var i = 0, k = data[key].list.length; i < k; i++) {
                    if ($(this).index() == i) {
                        str += `
                        <a href="##" class="fenyeA" data-id=${key}>
                        <img src="${data[key].list[i].img}" alt="">

                        <div class="fenTxt">
                            <p class="p_1">${data[key].list[i].txt}</p>
                            <p class="p_2">${data[key].list[i].text}</p>
                        </div>
                    </a>
                    <div class="fenCon" data-id=${key}>
                        <a href="##" class="fen1">
                            <img src="${data[key].list[i].img1}" alt="">
                        </a>
                        <a href="##">
                            <img src="${data[key].list[i].img2}" alt="">
                        </a>
                    </div>
                    <div class="fenCon fenR" data-id=${key}>
                        <a href="##" class="fen1">
                            <img src="${data[key].list[i].img3}" alt="">
                        </a>
                        <a href="##">
                            <img src="${data[key].list[i].img4}" alt="">
                        </a>
                    </div>
                        `
                    }

                }
                _this.fenye.innerHTML = str;
            }


        })

    }


}
new Daren()