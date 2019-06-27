<?php
    header("content-type:text/html;charset=utf8");
    include('common/public.php');

    $uname = $_REQUEST['username'];
    $upass = $_REQUEST['userpass'];

    $sql = "select * from class where uname = '$uname'";
    $res = mysqli_query($connect,$sql);
    $arr = mysqli_fetch_assoc($res);
    if($arr){
        if($upass==$arr['upass']){
            echo json_encode(array(
                'state'=>'1',
                'info'=>'登陆成功'
            ));
        }
        else{
            echo json_encode(array(
                'state'=>'0',
                'info'=>'密码输入错误，请重新输入'
            ));
        }
    }else{
        echo json_encode(array(
                'state'=>'0',
                'info'=>'用户不存在，请重新输入'
            )) ;
    }




?>