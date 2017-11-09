<?php
$q = $_GET['q'];
$l = $_GET['l'];
$d = $_GET['d'];

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

$sql = "insert into conferences (name, location, datetime) values (".$q.", ".$l.", ".$d.");";

if ($conn->query($sql) === TRUE) {
    echo "Conference Added.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>