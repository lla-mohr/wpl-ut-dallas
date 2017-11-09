<?php
$q = $_GET['q'];
$s = $_GET['s'];
$c = $_GET['c'];
$date = date('Y-m-d H:i:s');

$servername = "localhost";
$username = "root";
$password = "050793";
$dbname = "Sandwiches";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "insert into choices (datetime, confid, userid, sandid) values ('".$date."', ".$c.", ".$q.", ".$s.");";

if ($conn->query($sql) === TRUE) {
    echo "You have selected this sandwich, please check your placed orders";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>