<?php
	
	$filename = $_FILES['file']['name'];
	$location = "img/".$filename;
		move_uploaded_file($_FILES['file']['tmp_name'], $location)
         
?>
		