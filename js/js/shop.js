function Shop() {
    this.txt1 = document.querySelector('.txt1');
    this.IMG = document.querySelector('.IMG img');
    this.pri = document.querySelector('.pri')
    this.text1 = document.querySelector('.text1');
    this.text2 = document.querySelector('.text2');
    this.text = document.querySelector(' .Li1 input');
    this.goods = document.querySelector('.goods_G');
    this.num_li = document.querySelector('.num_li i');
    this.flag = false;
    this.init()
}
Shop.prototype = {
    init: function () {
        this.cook()
    },
    cook: function () {
        this.str = localStorage.getItem('goods');

        if (this.str) {
            this.arr1 = JSON.parse(this.str);
            var str1 = '';
            this.arr1.forEach((pro) => {
                str1 += `
                <div class="listImg">
                    <div class="listTop">
                        <div class="check check1">
                            <span></span>
                        </div>
                        <div class="txt txt1">
                            ${pro.name}
                        </div>
                    </div>
                    <div class="listBot">
                        <div class="check check2">
                            <span></span>
                        </div>
                        <div class="IMG">
                            <img src="${pro.src}" alt="">
                        </div>
                        <div class="style">
                            <span class="text1">${pro.name}</span>
                            <span class="text2">${pro.txt}</span>
                        </div>
                        <ul class="list list1">
                            <li class="pri">${pro.pri}</li>
                            <li class="Li1">
                                <span class="L">-</span>
                                <input type="text" value="${pro.num}">
                                <span class="R">+</span>
                            </li>
                            <li class="pr_li">${pro.num * pro.pri}</li>
                            <li class="shezhi">
                                <span class="del_li" data-id="${pro.name}">删除</span>
                                <span class="hodd_li" data-id="${pro.name}">移入收藏</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                `
            })

            this.goods.innerHTML += str1
        }
        this.check = document.querySelectorAll('.check');
        var size = this.check.length;
        for (let i = 0; i < this.check.length; i++) {
            var _this = this;
            this.check[i].onclick = function () {
                if (_this.flag == false) {
                    if (i == 0 || i == size - 1) {
                        for (let j = 0; j < size; j++) {
                            _this.check[j].firstElementChild.style.cssText = "background-position:-576px -233px;";
                            _this.flag = true;

                        }


                    }
                    else {
                        this.firstElementChild.style.cssText = "background-position:-576px -233px;";
                        _this.flag = true;
                    }

                }
                else {
                    if (i == 0 || i == size - 1) {
                        for (let m = 0; m < size; m++) {
                            _this.check[m].firstElementChild.style.cssText = "background-position:-576px -255px;";
                            _this.flag = false;
                        }
                    } else {
                        this.firstElementChild.style.cssText = "background-position:-576px -255px;";
                        _this.flag = false;
                    }

                }
            }
        }

        //删除功能
        this.del_li = document.querySelectorAll('.del_li');
        this.del();
        //加减
        this.ospan = document.querySelectorAll('.Li1 span')
        // this.sum()
    },
    del: function () {
        var _this = this;
        for (let i = 0, k = this.del_li.length; i < k; i++) {
            this.del_li[i].onclick = function () {
                this.parentNode.parentNode.parentNode.parentNode.remove();
                var name = this.getAttribute('data-id');
                _this.arr1.forEach((pro, index) => {
                    if (name == pro.name) {
                        console.log(name == pro.name)
                        _this.arr1.splice(index, 1);
                        localStorage.setItem('goods', JSON.stringify(_this.arr1))
                    }
                })
            }
        }
    },
    sum: function () {
        for (let x = 0, y = this.ospan.length; x < y; x++) {
            this.ospan[x].onclick = function () {
                //获取自定义属性
                var numb = this.getAttribute('data-number');
                //input
                var oinput = this.parentNode.firstElementChild.previousElementSibling
                console.log(numb, ',' + oinput)
            }
        }

    }
}
new Shop()