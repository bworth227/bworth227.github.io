<?php
 $path = 'scores.txt';
 if (isset($_POST['score']) && isset($_POST['name'])) {
    $fh = fopen($path,"a+");
    $string = "\n".$_POST['name'].': '.$_POST['score'];
    fwrite($fh,$string); // Write information to the file
    fclose($fh); // Close the file
 }
?>

<!doctype html>

<html>

<head>
<title>Battleship Scores</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<meta http-equiv="refresh" content="0; URL=<?php print $continue; ?>">

<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; URL=scoreboard.html">
<meta name="keywords" content="automatic redirection">
</head>

<body bgcolor="#383838" text="#ffffff">

</body>
</html>