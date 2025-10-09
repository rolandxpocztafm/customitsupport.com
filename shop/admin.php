<?php
     session_start();
     if (!isset($_SESSION['admin'])) {
         header('Location: /shop/login.php');
         exit;
     }
     $data = json_decode(file_get_contents('data.json'), true);
     ?>
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Admin - Custom IT Support</title>
         <link rel="stylesheet" href="/shop/config.css">
         <link rel="stylesheet" href="/shop/shop.css">
         <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
     </head>
     <body>
         <header>
             <h1>Admin Panel</h1>
             <nav><a href="/shop">Shop</a><a href="/shop/logout.php">Logout</a></nav>
         </header>
         <main>
             <h2>Manage Products</h2>
             <form action="/shop/save.php" method="post" enctype="multipart/form-data">
                 <input name="name" placeholder="Product Name" required>
                 <input name="price" type="number" step="0.01" placeholder="Price" required>
                 <input name="image" type="file" accept="image/*">
                 <button>Add Product</button>
             </form>
             <h2>Products</h2>
             <div class="product-list">
                 <?php foreach ($data['products'] as $product) {
                     echo "<div class='product'>
                           <h3 class='editable' data-id='{$product['id']}'>{$product['name']}</h3>
                           <p>\${$product['price']}</p>
                           </div>";
                 } ?>
             </div>
             <h2>Settings</h2>
             <form action="/shop/save.php" method="post">
                 <input name="site_name" value="<?php echo $data['settings']['site_name']; ?>">
                 <button>Save Settings</button>
             </form>
         </main>
         <script>
             $('.editable').click(function() {
                 let id = $(this).data('id');
                 let value = $(this).text();
                 $(this).html(`<input type='text' value='${value}' onblur='saveField(${id}, this.value)'>`);
             });
             function saveField(id, value) {
                 $.post('/shop/save.php', {id: id, name: value}, function() {
                     location.reload();
                 });
             }
         </script>
     </body>
     </html>