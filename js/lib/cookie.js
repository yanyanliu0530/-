//写入cookie

    // cookie的名称
    // cookie的值  
    // 储存的时间

function setcookie(Cname,Cval,expires){
    var d = new Date();
    d.setDate(d.getDate() + expires);
    document.cookie = Cname + '=' + Cval + ';path = /;expires =' + d.toGMTString(); 
}


//读取cookie

    //cookie的名称      
function getcookie(Cname){
    //获取cookie的值            //"sex=nan; name=xiao; sore=sfs; ljij=df"
    var cookiestr = document.cookie;
    var cookiearr = cookiestr.split('; ');
    for(var i = 0,k = cookiearr.length; i < k;i++){
        var items = cookiearr[i].split('=');
        if(items[0] == Cname){
            return items[1];
        }
    }
}

//删除cookie

function removeCookie(Cname){
    setcookie(Cname,null,-1);       //将时间更改为过期时间 -1；
}
