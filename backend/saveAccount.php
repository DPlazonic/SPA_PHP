<?php
require "core/init.php";

$data = json_decode(file_get_contents('php://input'),true);

$name = $data['name'];
$deposit = $data['deposit'];
$credit_card = $data['credit_card'];

$sql = "INSERT INTO accounts (name,deposit,credit_card) 
        VALUES ('$name','$deposit','$credit_card')";
$query = mysqli_query($db,$sql);


if($query){
  echo "Ok";
}else{
  echo "Not ok";
}
