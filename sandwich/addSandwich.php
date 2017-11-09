<?php
$q = $_GET['q'];
$c = $_GET['c'];
$s = $_GET['s'];

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

$sql = "insert into conference_sandwiches (confid, sandid) values (".$c.", ".$s.");";

if ($conn->query($sql) === TRUE) {
    echo "Sandwich Added.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>