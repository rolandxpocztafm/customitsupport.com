<?php
     $data = json_decode(file_get_contents('data.json'), true);
     if (isset($_POST['name']) && isset($_POST['price'])) {
         $newProduct = [
             'id' => count($data['products']) + 1,
             'name' => $_POST['name'],
             'price' => floatval($_POST['price']),
             'image' => $_FILES['image']['name'] ? $_FILES['image']['name'] : 'default.jpg'
         ];
         if ($_FILES['image']['name']) {
             move_uploaded_file($_FILES['image']['tmp_name'], 'images/' . $_FILES['image']['name']);
         }
         $data['products'][] = $newProduct;
     } elseif (isset($_POST['id']) && isset($_POST['name'])) {
         foreach ($data['products'] as &$product) {
             if ($product['id'] == $_POST['id']) {
                 $product['name'] = $_POST['name'];
                 break;
             }
         }
     } elseif (isset($_POST['site_name'])) {
         $data['settings']['site_name'] = $_POST['site_name'];
     }
     file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT));
     header('Location: /shop/admin.php');
     ?>