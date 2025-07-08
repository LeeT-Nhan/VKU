// banner.js
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-item");
  const images = document.querySelectorAll(".img-stack .stack");
  const duration = 500; // ms — phải khớp với CSS transition

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 1. Active nút
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // 2. Lấy src mới
      const newSrc = btn.dataset.src;

      // 3. Fade out
      images.forEach((img) => {
        img.style.opacity = "0";
      });

      // 4. Sau khi fade-out xong, đổi src và fade-in
      setTimeout(() => {
        images.forEach((img) => {
          img.src = newSrc;
          img.style.opacity = "1";
        });
      }, duration);
    });
  });
});

const swiper = new Swiper(".swiper", {
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

// Thêm vào cuối file, sau các hàm đã có

// Thêm hiệu ứng xuất hiện cho các thành phần khi scroll
function addScrollAppearEffect() {
  // Lấy tất cả CV Cards
  const cvCards = document.querySelectorAll('.cv-card');
  
  // Thêm hiệu ứng cuộn cho cards
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + window.innerHeight * 0.8;
    
    // Hiệu ứng cho CV cards
    cvCards.forEach((card, index) => {
      const cardPosition = card.getBoundingClientRect().top + window.scrollY;
      
      if (scrollPosition > cardPosition && !card.classList.contains('card-visible')) {
        setTimeout(() => {
          card.classList.add('card-visible');
        }, index * 20); // Delay tăng dần để tạo hiệu ứng lần lượt
      }
    });
  });
  
  // Kích hoạt kiểm tra ban đầu (để hiển thị các phần tử đã có trong viewport)
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 300);
}

// Khởi tạo tất cả hiệu ứng khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
  // Các hàm khởi tạo đã có...
  
  // Thêm hiệu ứng xuất hiện khi scroll
  addScrollAppearEffect();
  
  // Kích hoạt AOS nếu đã được import
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }
});


// Thêm vào cuối file đã có
document.addEventListener('DOMContentLoaded', function() {
  // Lấy tất cả các button có class cv-button
  const cvButtons = document.querySelectorAll('.cv-button');
  
  // Thêm event listener cho từng button để mở CV1.html
  cvButtons.forEach(button => {
    button.addEventListener('click', function() {
      window.location.href = 'CV1.html';
    });
  });
});
