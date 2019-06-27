function Famous() {
    this.tab = document.querySelector('.fam .txt_D .tab_D');
    this.topImg = document.querySelector('.top_F .topImg');
    this.img_F = document.querySelector('.img_F');

    this.init()
}
Famous.prototype = {
    init: function () {
        this.data();

    },
    data: function () {
        var _this = this;
        axios({
            method: 'get',
            url: 'json/famous.json',
            data: {}
        }).then((data) => {
            _this.jiont(data)
        }).catch((info) => {
            console.log(info)
        })
    },
    jiont: function (data) {

        for (key in data) {
            var str = ''
            var str2 = ''
            var str3 = ''
            // 品牌馆导航
            for (attr in data[key]) {
                str += `
                <li>${data[key][attr].name}</li>
                `
                if (data[key][attr].name == '奢华') {
                    for (let j = 0, m = data[key][attr].list.length; j < m; j++) {
                        str3 += `
                         
                                    <li class="topL ${data[key][attr].name}" data-id="${j}">
                                    <a href="##">
                                        <img src="${data[key][attr].list[j]}" alt="" class="img1"> 
                                        </a>
                                    </li>
                            `
                    }
                    for (let z = 0, x = data[key][attr].dist.length; z < x; z++) {
                        str2 += `
                                    <li>
                                        <a href="##">
                                            <img src="${data[key][attr].dist[z].img}" alt="">
                                            <div>${data[key][attr].dist[z].txt}</div>
                                        </a>
                                    </li>
                            `

                    }
                    this.img_F.innerHTML = str2;
                    this.topImg.innerHTML = str3;
                }
            }
        }
        this.tab.innerHTML = str;
        this.imgLi = document.querySelectorAll('.fam .txt_D .tab_D li')
        this.yangshi(data)
    },
    //更改样式
    yangshi: function (data) {
        var _this = this;
        for (let i = 0, k = this.imgLi.length; i < k; i++) {
            this.imgLi[i].onmouseover = function () {
                _this.clear()
                this.style.cssText = "background: #333;color: #f2d291;"
                for (key in data) {
                    var str1 = ''
                    var str2 = ''
                    for (attr in data[key]) {
                        if (data[key][attr].name == this.innerHTML) {
                            for (let j = 0, m = data[key][attr].list.length; j < m; j++) {
                                str1 += `
                               
                                    <li class="topL ${data[key][attr].name}" data-id="${j}">
                                    <a href="##">
                                        <img src="${data[key][attr].list[j]}" alt="" class="img1"> 
                                        </a>
                                    </li>
                            `
                            }
                            for (let z = 0, x = data[key][attr].dist.length; z < x; z++) {
                                str2 += `
                                    <li  data-id="${key}">
                                        <a href="##">
                                            <img src="${data[key][attr].dist[z].img}" alt="">
                                            <div>${data[key][attr].dist[z].txt}</div>
                                        </a>
                                    </li>
                            `

                            }
                        }
                    }
                }
                _this.img_F.innerHTML = str2;
                _this.topImg.innerHTML = str1;
            }
        }

    },
    clear: function () {
        for (let i = 0, k = this.imgLi.length; i < k; i++) {
            this.imgLi[i].style.cssText = "background: #e6e6e6;color: #666;";
        }
    }




}
new Famous()