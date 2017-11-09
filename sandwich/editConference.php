<?php

$q = intval($_GET['q']);
$con = mysqli_connect('localhost','root','050793','Sandwiches');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"Sandwiches");
$sql="select cs.sandid as sandwichID, c.name, s.name as sandwichname from conferences c, sandwiches s, conference_sandwiches cs where cs.confid = c.id and cs.confid = ".$q." and cs.sandid = s.id;";
$result = mysqli_query($con,$sql);

echo "<table id ='sandwichesPopulated'>
<tr>
<th>Conference</th>
<th>Sandwiches</th>
<th></th>
</tr>";

while($row = mysqli_fetch_array($result)) {
  echo "<tr>";
  echo "<td>" . $row['name'] . "</td>";
  echo "<td>" . $row['sandwichname'] . "</td>";
  echo "<td><button type='button' id ='buttonTableSandwichDelete' onclick='removeSandwich(".$q.",".$row['sandwichID'].")'>Remove from Conference</button></td>";
  echo "</tr>";
}
echo "</table>";


$sql2="SELECT * FROM sandwiches";
$result2 = mysqli_query($con,$sql2);

echo "<table id ='sandwichesPopulated2'>
<tr>
<th>Name</th>
<th>Description</th>
<th></th>
</tr>";

while($row = mysqli_fetch_array($result2)) {
  echo "<tr>";
  echo "<td>" . $row['name'] . "</td>";
  echo "<td>" . $row['description'] . "</td>";
  echo "<td><button type='button' id ='buttonTableSandwichAdd' onclick='addSandwich(".$q.",".$row['id'].")'>Add to Conference</button></td>";
  echo "</tr>";
}
echo "</table>";

mysqli_close($con);
?>
