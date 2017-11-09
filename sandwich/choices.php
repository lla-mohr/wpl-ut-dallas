<?php

$q = $_GET['q'];
$con = mysqli_connect('localhost','root','050793','Sandwiches');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"Sandwiches");
$sql="select u.fname, u.lname, c.name, s.name as sandwichname, choice.datetime from choices choice, conferences c, users u, sandwiches s where choice.userid = u.id and choice.confid = c.id and choice.sandid = s.id and u.username = '".$q."' order by choice.datetime desc;";
$result = mysqli_query($con,$sql);


echo "<table id ='choicesPopulated'>
<tr>
<th>User</th>
<th>Conference</th>
<th>Sandwich</th>
<th>Order Date</th>
</tr>";

while($row = mysqli_fetch_array($result)) {
  echo "<tr>";
  echo "<td>" . $row['fname'] . "</td>";
  echo "<td>" . $row['name'] . "</td>";
  echo "<td>" . $row['sandwichname'] . "</td>";
  echo "<td>" . $row['datetime'] . "</td>";
  echo "</tr>";
}
echo "</table>";

mysqli_close($con);
?>
