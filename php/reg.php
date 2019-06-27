<?php
    header("content-type:text/html;charset=utf8");
    include('common/public.php');

    $uname = $_REQUEST["username"];
    $upass = $_REQUEST["userpass"];
    
    $sql = "select * from class where uname = '$uname'";
    $res = mysqli_query($connect,$sql);
    $arr = mysqli_fetch_assoc($res);
    if($arr){
        echo json_encode(array(
            'state'=>'0',
            'info'=>'账号已存在，重新注册'
        ));
    }
    else{
        $ins = "insert into class (uname,upass) values ('$uname','$upass')";
        $reg= mysqli_query($connect,$ins);
        if($reg){
            echo json_encode(array(
            'state'=>'1',
            'info'=>'注册成功'
        ));
      }
      
    }
?>