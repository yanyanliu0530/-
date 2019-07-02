function Famous() {
    this.tab = $('.fam .txt_D .tab_D');
    this.topImg = $('.top_F .topImg');
    this.img_F = $('.img_F');
    this.ospan = $('.fenye_F .top_F span')
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
        var str = '';
        for (key in data) {
            str += `
            <li>${data[key].name}</li>
            `
        }
        this.tab.html(str);
        this.Li = $('.fam .txt_D .tab_D li');
        this.Li.eq(0).addClass('daLi');

        this.over(data);
    },
    over: function (data) {
        var _this = this;
        this.Li.mouseover(function () {
            $(this).addClass('daLi').siblings().removeClass('daLi');
            _this.jiot(data, $(this).html());
        })
        this.size = this.Li.length;
        this.click(data)
    },
    jiot: function (data, txt) {
        var str1 = ''
        var str2 = ''
        for (key in data) {
            if (data[key].name == txt) {
                for (let i = 0, k = data[key].list.length; i < k; i++) {
                    str1 += `
                    <li class="topL">
                            <a href="html/list.html?name=${key}&pid=${i}">
                                <img src="${data[key].list[i].img}" alt="" class="img1">
                            </a>
                        </li>
                    `
                }
                for (let j = 0, z = data[key].list2.length; j < z; j++) {
                    str2 += `
                    <li>
                            <a href="html/list.html?name=list2&pid=${j}">
                                <img src="${data[key].list2[j].img}" alt="">
                                <div>${data[key].list2[j].txt}</div>
                            </a>
                        </li>
                    
                    `
                }
                this.img_F.html(str2)
                this.topImg.html(str1);
            }
        }
    },
    click: function (data) {
        var count = 0;
        var _this = this;
        this.ospan.click(function () {
            if ($(this).index() == 2) {
                if (count <= 0) {
                    count = _this.size-1;
                } else {
                    count--
                } 
            }
            if ($(this).index() == 3) {
                if (count >=_this.size-1) {
                    count = 0;
                } else {
                    count++
                }
            }
            _this.Li.eq(count).addClass('daLi').siblings().removeClass('daLi')
            _this.jiot(data,_this.Li.eq(count).html())
        })
    }


    // jiont: function (data) {

    //     for (key in data) {
    //         var str = ''
    //         var str2 = ''
    //         var str3 = ''
    //         // 品牌馆导航
    //         for (attr in data[key]) {
    //             str += `
    //             <li>${data[key][attr].name}</li>
    //             `
    //             if (data[key][attr].name == '奢华') {
    //                 for (let j = 0, m = data[key][attr].list.length; j < m; j++) {
    //                     str3 += `

    //                                 <li class="topL ${data[key][attr].name}" data-id="${j}">
    //                                 <a href="##">
    //                                     <img src="${data[key][attr].list[j]}" alt="" class="img1"> 
    //                                     </a>
    //                                 </li>
    //                         `
    //                 }
    //                 for (let z = 0, x = data[key][attr].dist.length; z < x; z++) {
    //                     str2 += `
    //                                 <li>
    //                                     <a href="##">
    //                                         <img src="${data[key][attr].dist[z].img}" alt="">
    //                                         <div>${data[key][attr].dist[z].txt}</div>
    //                                     </a>
    //                                 </li>
    //                         `

    //                 }
    //                 this.img_F.innerHTML = str2;
    //                 this.topImg.innerHTML = str3;
    //             }
    //         }
    //     }
    //     this.tab.innerHTML = str;
    //     this.imgLi = document.querySelectorAll('.fam .txt_D .tab_D li')
    //     this.yangshi(data)
    // },
    // //更改样式
    // yangshi: function (data) {
    //     var _this = this;
    //     for (let i = 0, k = this.imgLi.length; i < k; i++) {
    //         this.imgLi[i].onmouseover = function () {
    //             _this.clear()
    //             this.style.cssText = "background: #333;color: #f2d291;"
    //             for (key in data) {
    //                 var str1 = ''
    //                 var str2 = ''
    //                 for (attr in data[key]) {
    //                     if (data[key][attr].name == this.innerHTML) {
    //                         for (let j = 0, m = data[key][attr].list.length; j < m; j++) {
    //                             str1 += `

    //                                 <li class="topL ${data[key][attr].name}" data-id="${j}">
    //                                 <a href="##">
    //                                     <img src="${data[key][attr].list[j]}" alt="" class="img1"> 
    //                                     </a>
    //                                 </li>
    //                         `
    //                         }
    //                         for (let z = 0, x = data[key][attr].dist.length; z < x; z++) {
    //                             str2 += `
    //                                 <li  data-id="${key}">
    //                                     <a href="##">
    //                                         <img src="${data[key][attr].dist[z].img}" alt="">
    //                                         <div>${data[key][attr].dist[z].txt}</div>
    //                                     </a>
    //                                 </li>
    //                         `

    //                         }
    //                     }
    //                 }
    //             }
    //             _this.img_F.innerHTML = str2;
    //             _this.topImg.innerHTML = str1;
    //         }
    //     }

    // },
    // clear: function () {
    //     for (let i = 0, k = this.imgLi.length; i < k; i++) {
    //         this.imgLi[i].style.cssText = "background: #e6e6e6;color: #666;";
    //     }
    // }




}
new Famous()