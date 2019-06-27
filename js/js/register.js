$(function () {
    function Register() {
        this.flag1 = null;
        this.txt1 = $('#txt1');
        this.Img = $('.box2 p span');
        this.box2 = $('.box2 input');
        this.flag2 = null;
        this.txt2 = $('.box1 .txt2');
        this.flag3 = null;
        this.txt3 = $('.txtmi');
        this.flag4 = null;
        this.txt4 = $('.box1 .txtmi');
        this.but = $('.bnt')
        this.init()

    }
    Register.prototype = {
        init: function () {
            this.phone();
            this.Input();
            this.passN();
            this.zhuce();
        },
        // 手机号验证
        phone: function () {
            var reg = /^(13)|(15)|(17)\d{9}$/;
            var _this = this;
            $('.mobile').blur(function () {
                var val1 = $('.mobile').val();
                if (!reg.test(val1)) {
                    _this.txt1.show()
                    _this.flag1 = false;
                } if (reg.test(val1)) {
                    _this.txt1.hide();
                    _this.flag1 = true;
                }
                console.log(_this.flag1)
            })
        },
        //图像验证
        Input: function () {
            this.Img.css('background', randomColor());
            this.Img.html(randomNum(1000, 9999));
            this.val2 = this.Img.html();
            setcookie('yanzheng', this.val2)
            var _this = this
            this.Img.click(function () {
                $(this).css('background', randomColor());
                $(this).html(randomNum(1000, 9999));
                _this.val2 = $(this).html();
                setcookie('yanzheng', _this.val2);
            })
            this.box2.blur(function () {
                var val3 = $(this).val();

                var yanzheng = getcookie('yanzheng');
                if (val3 != yanzheng) {
                    _this.flag2 = false;
                }
                if (val3 == yanzheng) {
                    _this.flag2 = true;
                }
                console.log(_this.flag2)
            })
        },
        //密码应为6-20位任意字符组合
        pass: function () {
            var reg1 = /^.{6,20}$/;
            var _this = this;
            $('.mima #pwd').blur(function () {
                var val3 = $(this).val();
                if (!reg1.test(val3)) {
                    _this.txt2.show()
                    _this.flag3 = false;
                }
                else if (reg1.test(val3)) {
                    _this.txt2.hide();
                    _this.flag3 = true;
                }
            })
        },
        // 确认密码
        passN: function () {
            this.pass();
            var _this = this;
            $('#pwdN').blur(function () {
                if ($('.mima #pwd').val() != $(this).val()) {
                    _this.txt4.show();
                    _this.flag4 = false
                }
                else if ($('.mima #pwd').val() == $(this).val()) {
                    _this.txt4.hide();
                    _this.flag4 = true
                }
            })
        },
        //注册
        zhuce: function () {
            var _this = this;
            this.but.click(function () {
                if (_this.flag1 && _this.flag2 && _this.flag3 && _this.flag4) {
                    _this.data()
                }
            })
        },
        data: function () {
            axios({
                method: 'get',
                url: "http://localhost/project/php/reg.php",
                data: {
                    username: $('.mobile').val(),
                    userpass: $('.mima #pwd').val()
                }
            }).then((data) => {
                if (data.state == '0') {
                    alert(data.info)
                } else {
                    alert(data.info);

                    location.href = 'login.html'
                }
            }).catch((info) => {
                console.log(info)
            })
        }
    }
    new Register()
})
