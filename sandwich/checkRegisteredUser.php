<?php
$q = $_GET['q'];

$con = mysqli_connect('localhost','root','050793','Sandwiches');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"Sandwiches");
$sql="SELECT * FROM users WHERE username = '".$q. "'";
$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_array($result)) {
  echo "" . $row['admin'] . "";
}

mysqli_close($con);
?>