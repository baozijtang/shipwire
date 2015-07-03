<?php
$file= "data.json";
$content = file_get_contents($file);
$json_content = json_decode($content,true);
?>
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="order.css">


<!--[if lt IE 9]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js">
</script>
<![endif]-->

</head>

<body>
<header>
<h1>Product Order List</h1>
</header>

<nav>
<ul>
  <li><a href="order.html">Enter Order</a></li>
  <li><a href="list.php">Product List</a></li>
</ul>
</nav>

<section>
<form id="order" name="orderForm" action="ordersave.php" method="post" onsubmit="return validateForm()" >

<fieldset>
<legend><h2>Recipient Info</h2></legend>
    <div> 
	<label>Recipient Info
	<input id="recipient-name" name="recipient-name" type="text" value="<?php echo $json_content['recipient']; ?>" placeholder="Recipient name" required autofocus autocomplete="on">
	<span class="help-block"></span>
	</label>
    </div>
    <div>
	<label>Stree Address
	<input id="street-address" name="street-address" type="text" value="<?php echo $json_content['address']; ?>" placeholder="Street address" required autofocus>
	</label>
    </div>
    <div>
	<label>City
	<input id="city" name="city" type="text" placeholder="City" value="<?php echo $json_content['city']; ?>" required autofocus>
	</label>
    </div>
    <div>
	<label>State
	<input id="state" name="state" type="text" placeholder="State" value="<?php echo $json_content['state']; ?>" required pattern="[A-Z]{2}" autofocus title="State">
	</label>
    </div>
    <div>
	<label>Zip
	<input id="Zip" name="Zip" type="text" placeholder="Zip" value="<?php echo $json_content['zip']; ?>" required pattern="[0-9]{5}" autofocus title="Five number zip code">
	</label>
    </div>
</fieldset>
<fieldset>
    <legend><h2>Product Info</h2></legend> 
    <?php
	$i =0; 
        foreach ($json_content['product'] as $key=> $val)  {
   	?> 
    <div>
	<label>Product Name
	<input id="product-name" name="product-name" value="<?php echo $json_content['product'][$i]['productname']; ?>" type="text" placeholder="Product name" required autofocus>
	</label>
    </div>
    <div>
	<label>Description
	<textarea id="desc" name="desc" rows=5 required><?php echo $json_content['product'][$i]['desc']; ?></textarea>
	</label>
    </div>
    <div>
	<label>Width
	<input id="width" name="width" type="number" min="0" max="100" step="2" required value="<?php echo $json_content['product'][$i]['width']; ?>">
	</label>
    </div>
    <div>
	<label>Height
	<input id="height" name="height" type="number" min="0" max="100" step="2" required value="<?php echo $json_content['product'][$i]['height']; ?>">
    </div>
    <div>
	<label>Weight
	<input id="weight" name="weight" type="number" min="0" max="100" step="2" required value="<?php echo $json_content['product'][$i]['weight']; ?>">
    </div>
    <div>
	<label>Quantity
	<input id="quantity" name="quantity" type="number" min="0" max="100" step="2" required value="<?php echo $json_content['product'][$i]['quantity']; ?>">
    </div>
    <div>
	<label>Value
	<input id="price" name="price" type="text" required value="<?php echo $json_content['product'][$i]['price']; ?>">
    </div>
   <?php $i++ ; } ?>  
</fieldset>
<fieldset>
    <div>
	<button type="submit" value="Submit">Place Order</button>
    </div>
</fieldset>

</form>
</section>
<script type="text/javascript">
    function validateForm() {
        var x = document.forms["orderForm"]["recipient-name"].value;
        if (x == null || x == "") {
            alert("Name must be filled out");
            return false;
        }
    }
</script>
<footer>
footer footer footer
</footer>
</body>
</html>
