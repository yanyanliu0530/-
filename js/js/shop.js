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
                            <li class="Li1" data-id="${pro.name}">
                                <span class="L" data-number='-1'>-</span>
                                <input type="text" value="${pro.num}" class="inpu">
                                <span class="R" data-number='1'>+</span>
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
                            _this.check[j].firstElementChild.className = 'checked';
                            _this.flag = true;
                        }
                    }
                    else {
                        this.firstElementChild.style.cssText = "background-position:-576px -233px;";
                        this.firstElementChild.className = 'checked';
                        _this.flag = true;
                    }
                }
                else {
                    if (i == 0 || i == size - 1) {
                        for (let m = 0; m < size; m++) {
                            _this.check[m].firstElementChild.style.cssText = "background-position:-576px -255px;";
                            _this.check[m].firstElementChild.className = ''
                            _this.flag = false;
                        }
                    } else {
                        this.firstElementChild.style.cssText = "background-position:-576px -255px;";
                        this.firstElementChild.className = ''
                        _this.flag = false;
                    }
                }
                _this.ck()
            }
        }

        //删除功能
        this.del_li = document.querySelectorAll('.del_li');
        this.del();
        //加减
        this.ospan = document.querySelectorAll('.Li1 span')
        this.sum();

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
                        _this.ck()
                    }
                })
            }
        }
    },
    sum: function () {
        _this = this;
        for (let i = 0; i < this.ospan.length; i++) {
            this.ospan[i].onclick = function () {
                var numb = parseInt(this.getAttribute('data-number'));
                var name = this.parentNode.getAttribute('data-id');
                var summ = this.parentNode.previousElementSibling;
                //input
                var oinput = this.parentNode.firstElementChild.nextElementSibling;
               var zonge= this.parentNode.nextElementSibling
                var oin= this.parentNode.firstElementChild.nextElementSibling.value;
                if (numb == -1 && oinput.value == 1) {
                    return;
                }
                _this.arr1.forEach(function (pro) {
                    if (pro.name == name) {
                        var count = parseInt(pro.num);
                        count += numb;
                        pro.num = count
                        //页面变化
                        oinput.value = pro.num;
                        //价格
                        zonge.innerHTML = oinput.value * summ.innerHTML;
                        _this.ck()
                        localStorage.setItem('goods', JSON.stringify(_this.arr1));
                    }
                })
            }
        }
    },
    //结算
    ck: function () {
        var count = 0;
        var money = 0;
        var check1 = document.querySelectorAll('.listTop .check1 .checked');
        var check2 = document.querySelectorAll(' .check2 .checked');
        var jian = document.querySelector('.ul_bot .num_li i');
        var zong = document.querySelectorAll('.pri_li i');
       
        var value = 0;
        for (let i = 0; i < check2.length; i++) {
            value = Number(check2[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.value)
            count += value;
            mon =Number (check2[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.innerHTML)
           money += mon
        }
        jian.innerHTML = count;
        for (let j = 0; j < zong.length; j++){
             zong[j].innerHTML = money
        }
       
    }
}
new Shop()