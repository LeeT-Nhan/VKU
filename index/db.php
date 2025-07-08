<?php
$host = 'localhost';
$user = 'root';
$password = ''; // nếu dùng XAMPP thì để trống
$dbname = 'website'; // tên database

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die('Kết nối thất bại: ' . $conn->connect_error);
}
?>
