<?php
$l = $_GET['l'];
$f = $_GET['f'];
$u = $_GET['u'];
$p = $_GET['p'];
$e = $_GET['e'];

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

$sql = "insert into users (fname, lname, phash, username, email, admin) 
values ('".$f."', '".$l."', '".$p."', '".$u."', '".$e."',  'N')";

if ($conn->query($sql) === TRUE) {
    echo "You have been registered!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>