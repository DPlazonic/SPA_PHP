<?php
require "core/init.php";

$data = json_decode(file_get_contents('php://input'),true);

$id = $data['id'];
$name = $data['name'];
$deposit = $data['deposit'];
$credit_card = $data['credit_card'];

$sql = "UPDATE accounts
        SET  name = '$name', deposit = '$deposit', credit_card ='$credit_card'
        WHERE id=$id";

$query = mysqli_query($db,$sql);


if($query){
  echo "Ok";
}else{
  echo "Not ok";
}
