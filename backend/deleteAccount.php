<?php
require "core/init.php";

$data = json_decode(file_get_contents('php://input'),true);


$id = $data['id'];


$sql = "DELETE FROM accounts 
        WHERE id=$id";
$query = $query = mysqli_query($db,$sql);



