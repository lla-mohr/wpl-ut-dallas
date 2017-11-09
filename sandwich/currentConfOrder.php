<?php

$q = $_GET['q'];
$con = mysqli_connect('localhost','root','050793','Sandwiches');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"Sandwiches");
$sql="select distinct c.id, c.name from choices choice, conferences c, users u, sandwiches s where choice.userid = u.id and choice.confid = c.id and u.username ='".$q."' and c.datetime >= date(now()) and choice.datetime >= date(now());";
$result = mysqli_query($con,$sql);

echo "<table id ='currentConfPopulated'>
<tr>
<th></th>
<th>Conference</th>
</tr>";

while($row = mysqli_fetch_array($result)) {
  echo "<tr>";
  echo "<td><button type='button' id ='buttonTableConfOrder' onclick='getCurrentSandOrder(".$row['id'].")'>View</button></td>";
  echo "<td>" . $row['name'] . "</td>";
  echo "</tr>";
}
echo "</table>";

mysqli_close($con);
?>
