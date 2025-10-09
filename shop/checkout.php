<?php
     if ($_SERVER['REQUEST_METHOD'] === 'POST') {
         $data = json_decode(file_get_contents('data.json'), true);
         $data['orders'][] = [
             'name' => $_POST['name'],
             'email' => $_POST['email'],
             'timestamp' => date('Y-m-d H:i:s')
         ];
         file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT));
         header('Location: /shop');
     }
     ?>
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Checkout - Custom IT Support</title>
         <link rel="stylesheet" href="/shop/config.css">
         <link rel="stylesheet" href="/shop/shop.css">
     </head>
     <body>
         <header>
             <h1>Checkout</h1>
             <nav><a href="/shop">Shop</a></nav>
         </header>
         <main>
             <form method="post">
                 <input name="name" placeholder="Full Name" required>
                 <input name="email" type="email" placeholder="Email" required>
                 <button>Place Order</button>
             </form>
         </main>
         <footer>
             <p>&copy; 2025 Custom IT Support</p>
         </footer>
     </body>
     </html>