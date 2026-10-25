<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    header("Location: order.html");

    exit;

}


$name =
    htmlspecialchars(
        $_POST["name"] ?? ""
    );


$phone =
    htmlspecialchars(
        $_POST["phone"] ?? ""
    );


$email =
    htmlspecialchars(
        $_POST["email"] ?? ""
    );


$address =
    htmlspecialchars(
        $_POST["address"] ?? ""
    );


$payment =
    htmlspecialchars(
        $_POST["payment"] ?? "Cash on Delivery"
    );


$orderData =
    htmlspecialchars(
        $_POST["order_data"] ?? ""
    );

?>


<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>
Order Received | The Vintage Cup
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
Thank You, <?= $name ?>!
</h1>


<p>
Your order has been received successfully.
</p>


<div class="success-info">

<p>
<b>Phone:</b>
<?= $phone ?>
</p>


<p>
<b>Address:</b>
<?= $address ?>
</p>


<p>
<b>Payment:</b>
<?= $payment ?>
</p>

</div>


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