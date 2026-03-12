<?php

$conn = new mysqli("localhost","username","password","database");

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$sql = "INSERT INTO contact_messages (name,email,phone,message)
VALUES ('$name','$email','$phone','$message')";

$conn->query($sql);

/* Send Email */

$to = "hovedantgupta@email.com";
$subject = "New Contact Form Message";

$body = "
Name: $name
Email: $email
Phone: $phone
Message: $message
";

$headers = "From: $email";

mail($to,$subject,$body,$headers);

echo "<span style='color:green'>Message Sent Successfully</span>";

?>