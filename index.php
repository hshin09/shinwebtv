<!DOCTYPE html>
<html>
<body style="background-color:white">

<h1>My first PHP page</h1>

<?php
echo "오늘은 "."여기까지...";
?>

<a href="app-release.zip">download</a>
<?php
        // 파일을 직접 실행하면 동작되지 않도록 하기 위해서
        if(isset($_GET['sid'])) {
            @extract($_GET); // $_GET['id'] 라고 쓰지 않고, $id 라고 써도 인식되게 함
            include "db_info.php"; // db 연결
            $sql = "SELECT * FROM deviceInfo";
            $sql.=" where device_id='".$sid."'"; // 조건문에서 얻는 결과가 1개
            echo "<br>".$sql;
            $result=mysqli_query($conn,$sql);
            if($result && mysqli_num_rows($result)>0) {
                echo "<br>이미 이전에 사용하신 경험이 있으신 고객입니다(무료체험포험)";
            }
            else {
                $sql = "INSERT INTO deviceInfo VALUES('".$sid."')";
                echo "<br>".$sql;
                $result=mysqli_query($conn,$sql);
                echo "<br>등록성공";
            }
            mysqli_close($conn);
        }
        ?>
        
<?php
// 파일을 직접 실행하면 동작되지 않도록 하기 위해서
//if(isset($_GET['sid'])){
    @extract($_GET); // $_GET['id'] 라고 쓰지 않고, $id 라고 써도 인식되게 함
    include "db_info.php"; // db 연결
    $sql = "SELECT * FROM deviceInfo WHERE 1";
    //$sql.=" where id='".$sid."'"; // 조건문에서 얻는 결과가 1개
    
    $result=mysqli_query($conn,$sql);
    if($result) 
    {
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        echo mysqli_num_rows($result)." ";
        echo $row['device_id'];
    }
    mysqli_close($conn);
//}
?>

<?php
// 파일을 직접 실행하면 동작되지 않도록 하기 위해서
if(isset($_POST) && $_SERVER['REQUEST_METHOD'] == "POST"){
    @extract($_GET); // $_GET['id'] 라고 쓰지 않고, $id 라고 써도 인식되게 함
    include "db_info.php"; // db 연결
    $sql ="SELECT sid,name FROM deviceinfo";
    $sql.=" where id='".$sid."'"; // 조건문에서 얻는 결과가 1개
    if($result=mysql_query($sql,$conn)){
        $row=mysql_fetch_array($result);
        if($sid == $row['sid'] ){
        echo $row['sid'];
        echo $row['name'];
        } else {
        echo "틀림";
        }
    }
}
?>

</body>
</html>