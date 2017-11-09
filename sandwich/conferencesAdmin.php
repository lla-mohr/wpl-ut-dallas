<?php
$con = mysqli_connect('localhost','root','050793','Sandwiches');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"Sandwiches");
$sql="SELECT * FROM conferences where datetime >= date(now()) order by datetime asc;";
$result = mysqli_query($con,$sql);


echo "<table id ='conferencesPopulatedAdmin'>
<tr>
<th>Name</th>
<th>Location</th>
<th>Datetime</th>
<th></th>
<th></th>
<th style='display:none'></th>
</tr>";

while($row = mysqli_fetch_array($result)) {
  echo "<tr>";
  echo "<td>" . $row['name'] . "</td>";
  echo "<td>" . $row['location'] . "</td>";
  echo "<td>" . $row['datetime'] . "</td>";
  echo "<td><button type='button' id ='buttonTableConferenceEdit' onclick='editConference(".$row['id'].")'>Edit</button></td>";
  echo "<td><button type='button' id ='buttonTableConferenceDelete' onclick='deleteConference(".$row['id'].")'>Delete</button></td>";
  echo "<td style='display:none'>" . $row['id'] . "</td>";
  echo "</tr>";
}
echo "</table>";

mysqli_close($con);
?>
