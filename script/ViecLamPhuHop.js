document.addEventListener("DOMContentLoaded", function () {
  const pageButtons = document.querySelectorAll(".page-btn");
  const jobCards = document.querySelectorAll(".job-box");
  const itemsPerPage = 5;
  let currentPage = 1;

  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    jobCards.forEach((card, index) => {
      if (index >= start && index < end) {
        card.style.removeProperty("display"); // ✅ Không phá vỡ flex
      } else {
        card.style.display = "none";
      }
    });

    currentPage = page;
  }

  pageButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const target = btn.getAttribute("data-page");

      if (target === "next") {
        const nextPage = Math.min(
          currentPage + 1,
          Math.ceil(jobCards.length / itemsPerPage)
        );
        showPage(nextPage);
      } else {
        showPage(parseInt(target));
      }
    });
  });

  // ✅ Hiển thị trang đầu tiên khi tải
  showPage(1);
});


document.addEventListener("DOMContentLoaded", function () {
  const pageButtons = document.querySelectorAll(".page-btn");
  const jobBoxes = document.querySelectorAll(".job-box");
  const jobIntro = document.querySelector(".job-intro");
  const sidebar = document.querySelector(".sidebar");
  const pagination = document.querySelector(".pagination");
  const itemsPerPage = 5;
  let currentPage = 1;

  // Khởi tạo AOS nếu có
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 50,
      disable: 'mobile' // Tắt hiệu ứng trên mobile để tránh xung đột với animation reload
    });
  }

  // Animation khi trang tải
  function animateOnLoad() {
    // Thêm class animate cho job-intro
    setTimeout(() => {
      if (jobIntro) jobIntro.classList.add('animate');
    }, 100);

    // Thêm class animate cho các job-box theo thứ tự
    jobBoxes.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add('animate');
      }, 500 + (index * 150)); // Delay tăng dần 150ms cho mỗi box
    });

    // Thêm class animate cho sidebar và pagination
    setTimeout(() => {
      if (sidebar) sidebar.classList.add('animate');
      if (pagination) pagination.classList.add('animate');
    }, 1000);
  }

  // Hàm hiển thị trang với hiệu ứng
  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    jobBoxes.forEach((box, index) => {
      // Reset animation
      box.classList.remove('animate');

      if (index >= start && index < end) {
        box.style.display = "flex"; // Hiển thị box
        
        // Thêm animation sau một thời gian nhỏ
        setTimeout(() => {
          box.classList.add('animate');
        }, (index - start) * 150); // Delay tăng dần cho từng box
      } else {
        box.style.display = "none"; // Ẩn box
      }
    });

    currentPage = page;
    
    // Cập nhật trạng thái active cho nút phân trang
    pageButtons.forEach(btn => {
      const btnPage = btn.getAttribute("data-page");
      if (btnPage !== "next" && parseInt(btnPage) === page) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Thêm event listener cho nút phân trang
  pageButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const target = btn.getAttribute("data-page");

      if (target === "next") {
        const nextPage = Math.min(
          currentPage + 1,
          Math.ceil(jobBoxes.length / itemsPerPage)
        );
        showPage(nextPage);
      } else {
        showPage(parseInt(target));
      }
      
      // Scroll mượt mà đến đầu danh sách công việc
      document.querySelector('.job-wrapper').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Hiệu ứng cho nút interest (trái tim)
  const interestButtons = document.querySelectorAll('.interest-btn');
  
  interestButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const icon = this.querySelector('i');
      
      if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        icon.style.color = '#a594f9';
        
        // Hiệu ứng "bùng nổ" nhỏ
        this.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.3)' },
          { transform: 'scale(1)' }
        ], {
          duration: 500,
          easing: 'ease-in-out'
        });
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        icon.style.color = '';
      }
    });
  });

  // Thêm hiệu ứng splash cho apply button
  const applyButtons = document.querySelectorAll('.apply-btn');
  
  applyButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Tạo hiệu ứng splash
      const splash = document.createElement('div');
      splash.classList.add('button-splash');
      this.appendChild(splash);
      
      // Xóa phần tử splash sau khi animation hoàn thành
      setTimeout(() => {
        splash.remove();
      }, 700);
    });
  });

  // Khởi chạy animation khi trang load
  animateOnLoad();
  
  // Hiển thị trang đầu tiên
  showPage(1);
});