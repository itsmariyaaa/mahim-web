<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    header("Location: contact.html");

    exit;

}


$name =
    htmlspecialchars(
        $_POST["name"] ?? ""
    );


$email =
    htmlspecialchars(
        $_POST["email"] ?? ""
    );


$message =
    htmlspecialchars(
        $_POST["message"] ?? ""
    );

?>


<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>
Message Sent | The Vintage Cup
</title>

<link rel="stylesheet" href="style.css">

</head>


<body>


<div class="success-page">

<div class="success-card">


<div class="success-icon">
✓
</div>


<h1>
Message Sent!
</h1>


<p>
Thank you, <?= $name ?>.
We received your message.
</p>


<p>
<?= $message ?>
</p>


<a
href="index.html"
class="btn dark"
>
Back to Home
</a>


</div>

</div>


</body>

</html>