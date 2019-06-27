$(function () {
    function Login() {
        this.txt1 = $('.txt1');
        this.flag1 = null;
        this.txt2 = $('.txt2');
        this.flag2 = null;
        this.tijiao = $('.bnt')
        this.init()
    }
    Login.prototype = {
        init: function () {
            this.phone();
            this.pass();
            this.bnt()
        },
        //phone
        phone: function () {
            var _this = this;
            var reg = /^(13)|(15)|(17)\d{9}$/;
            $('.username').blur(function () {
                var val1 = $(this).val();
                if (!reg.test(val1)) {
                    _this.flag1 = false;
                    _this.txt1.show()
                } else if (reg.test(val1)) {
                    _this.flag1 = true;
                    _this.txt1.hide()
                }
            })
        },
        pass: function () {
            var reg1 = /^.{6,20}$/;
            var _this = this;
            $('.pwd').blur(function () {
                var val2 = $(this).val();
                if (!reg1.test(val2)) {
                    _this.txt2.show()
                    _this.flag2 = false;
                }
                else if (reg1.test(val2)) {
                    _this.txt2.hide();
                    _this.flag2 = true;
                }
            })
        },
        bnt: function () {
            var _this = this;
            this.tijiao.click(function () {
                if (_this.flag1 && _this.flag2) {
                    _this.data()
                }
            })

        },
        data: function () {
            axios({
                method: 'get',
                url: "../php/login.php",
                data: {
                    username: $('.username').val(),
                    userpass: $('.pwd').val()
                }
            }).then((data) => {
                if (data.state == '0') {
                    alert(data.info)
                } else {
                    alert(data.info);
                    setcookie('name', $('.username').val());
                    location.href = '../index.html';
                }
            }).catch((info) => {
                console.log(info)
            })
        }
    }
    new Login()
})