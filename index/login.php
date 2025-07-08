<?php
include 'db.php';

$username = $_POST['username'];
$password = $_POST['password'];

// Bảo vệ khỏi SQL injection
$username = mysqli_real_escape_string($conn, $username);
$password = mysqli_real_escape_string($conn, $password);

$sql = "SELECT * FROM login WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    header("Location: index.html");
    exit;
    // Bạn có thể redirect hoặc tạo session tại đây
} else {
    echo "Sai tên đăng nhập hoặc mật khẩu!";
}
$conn->close();
?>