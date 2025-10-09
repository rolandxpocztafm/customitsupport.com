<?php
     session_start();
     if ($_SERVER['REQUEST_METHOD'] === 'POST') {
         $data = json_decode(file_get_contents('data.json'), true);
         $username = $_POST['username'];
         $password = $_POST['password'];
         foreach ($data['users'] as $user) {
             if ($user['username'] === $username && password_verify($password, $user['password'])) {
                 $_SESSION['admin'] = ($username === 'admin');
                 header('Location: /shop/admin.php');
                 exit;
             }
         }
         echo "Invalid credentials";
     }
     ?>
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Login - Custom IT Support</title>
         <link rel="stylesheet" href="/shop/config.css">
         <link rel="stylesheet" href="/shop/shop.css">
     </head>
     <body>
         <header>
             <h1>Login</h1>
             <nav><a href="/shop">Shop</a></nav>
         </header>
         <main>
             <form method="post">
                 <input name="username" placeholder="Username" required>
                 <input name="password" type="password" placeholder="Password" required>
                 <button>Login</button>
             </form>
             <p><a href="/shop/register.php">Register</a></p>
         </main>
         <footer>
             <p>&copy; 2025 Custom IT Support</p>
         </footer>
     </body>
     </html>