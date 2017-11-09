<?php

$q = intval($_GET['q']);
$con = mysqli_connect('localhost','root','050793','Sandwiches');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"Sandwiches");
$sql="select cs.sandid as sandwichID, c.name, s.name as sandwichname, s.description as descript from conferences c, sandwiches s, conference_sandwiches cs where cs.confid = c.id and cs.confid = ".$q." and cs.sandid = s.id;";
$result = mysqli_query($con,$sql);

echo "<table id ='sandwichesPopulated'>
<tr>
<th></th>
<th>Conference</th>
<th>Sandwiches</th>
<th>Description</th>
</tr>";

while($row = mysqli_fetch_array($result)) {
  echo "<tr>";
  echo "<td><button type='button' id ='buttonTableSandwich' onclick='persistSandwichChoice(".$q.",".$row['sandwichID'].")'>Select</button></td>";
  echo "<td>" . $row['name'] . "</td>";
  echo "<td>" . $row['sandwichname'] . "</td>";
  echo "<td>" . $row['descript'] . "</td>";
  echo "</tr>";
}
echo "</table>";

mysqli_close($con);
?>
