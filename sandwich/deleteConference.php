<?php
$q = $_GET['q'];

$servername = "localhost";
$username = "root";
$password = "050793";
$dbname = "Sandwiches";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // sql to delete a record
	$sql = "DELETE FROM conference_sandwiches WHERE confid='".$q."'; DELETE FROM conferences WHERE id='".$q."'";	

    // use exec() because no results are returned
    $conn->exec($sql);
    echo "Conference deleted.";
    }
catch(PDOException $e)
    {
    echo $sql1 . "<br>" . $e->getMessage();
    }

$conn = null;

//modified from http://www.w3schools.com/php/php_mysql_delete.asp
?>