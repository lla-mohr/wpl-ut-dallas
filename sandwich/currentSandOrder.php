<?php

$q = $_GET['q'];
$f = $_GET['f'];
$con = mysqli_connect('localhost','root','050793','Sandwiches');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"Sandwiches");
$sql="select u.fname as user, u.lname, c.id as confid, c.name as confname, s.name as sandwichname, choice.datetime as ordertime, s.description as descript from choices choice, conferences c, users u, sandwiches s where choice.userid = u.id and choice.sandid = s.id and choice.confid = c.id and c.id = ".$f." and  u.username ='".$q."' and c.datetime >= date(now()) order by choice.datetime desc limit 1;";
$result = mysqli_query($con,$sql);

echo "<table id ='currentSandPopulated'>
<tr>
<th></th>
<th>Name</th>
<th>Conference</th>
<th>Sandwich</th>
<th>Description</th>
<th>Order Date</th>
</tr>";

while($row = mysqli_fetch_array($result)) {
  echo "<tr id='getconfrow'>";
  echo "<td><button type='button' id ='buttonTableUserOrder' onclick='editCurrentSandwichOrder(this)' data-conferenceid=".$row['confid'].">Edit</button></td>";
  echo "<td>" . $row['user'] . "</td>";
  echo "<td id='getconfname'>" . $row['confname'] . "</td>";
   echo "<td>" . $row['sandwichname'] . "</td>";
   echo "<td>" . $row['descript'] . "</td>";
   echo "<td>" . $row['ordertime'] . "</td>";
  echo "</tr>";
}
echo "</table>";

mysqli_close($con);
?>
