<?php
     if ($_SERVER['REQUEST_METHOD'] === 'POST') {
         $data = json_decode(file_get_contents('data.json'), true);
         $data['users'][] = [
             'username' => $_POST['username'],
             'password' => password_hash($_POST['password'], PASSWORD_DEFAULT)
         ];
         file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT));
         header('Location: /shop/login.php');
     }
     ?>
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Register - Custom IT Support</title>
         <link rel="stylesheet" href="/shop/config.css">
         <link rel="stylesheet" href="/shop/shop.css">
     </head>
     <body>
         <header>
             <h1>Register</h1>
             <nav><a href="/shop">Shop</a></nav>
         </header>
         <main>
             <form method="post">
                 <input name="username" placeholder="Username" required>
                 <input name="password" type="password" placeholder="Password" required>
                 <button>Register</button>
             </form>
         </main>
         <footer>
             <p>&copy; 2025 Custom IT Support</p>
         </footer>
     </body>
     </html>