const toggleIcons = document.querySelectorAll('.toggle-password i');
  
    toggleIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        const input = icon.closest('.input-group').querySelector('input');
        const isHidden = input.type === 'password';
  
        // Đổi type input
        input.type = isHidden ? 'text' : 'password';
  
        // Đổi icon đúng chiều logic
        icon.classList.toggle('fa-eye-slash', !isHidden); // nếu đang là text, thì đổi về slash
        icon.classList.toggle('fa-eye', isHidden);         // nếu đang ẩn, thì đổi thành eye
      });
    });