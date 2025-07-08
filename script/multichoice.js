document.addEventListener("DOMContentLoaded", function () {
  // bỏ setTimeout hoặc để delay = 0
  const slideTrack = document.querySelector(".section-1 .slide-track");
  slideTrack.classList.add("animate");
});

// hiệu ứng section-1
document.addEventListener("DOMContentLoaded", function () {
  // Thêm hiệu ứng fade-in cho section-1 và các thành phần con
  const section1 = document.querySelector(".section-1");

  // Thêm độ trễ nhỏ để đảm bảo hiệu ứng diễn ra sau khi trang đã tải
  setTimeout(function () {
    section1.classList.add("visible");

    // Khởi tạo hiệu ứng slide track sau khi section đã hiển thị
    const slideTrack = document.querySelector(".section-1 .slide-track");
    setTimeout(() => {
      slideTrack.classList.add("animate");
    }, 1500); // Đợi thêm 1.5s sau khi section hiển thị để carousel bắt đầu chạy
  }, 100);

  // Theo dõi sự kiện cuộn trang nếu section-1 nằm dưới màn hình đầu tiên
  window.addEventListener("scroll", checkVisibility);

  function checkVisibility() {
    const section1Top = section1.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Nếu section-1 đã vào viewport
    if (section1Top < windowHeight - 100) {
      section1.classList.add("visible");
      window.removeEventListener("scroll", checkVisibility);
    }
  }

  // Gọi hàm kiểm tra ngay lập tức trong trường hợp section đã hiển thị ban đầu
  checkVisibility();
});
// END HIỆU ỨNG SECTION-1

// hiêu ứng section-2

// Thêm vào cuối file JavaScript hiện có

// Hiệu ứng fade-in cho section-2
document.addEventListener("DOMContentLoaded", function () {
  // Lấy tham chiếu đến section-2
  const section2 = document.querySelector(".section-2");

  // Kiểm tra nếu phần tử đã hiển thị trong viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }

  // Hàm xử lý khi cuộn trang
  function checkVisibility() {
    if (isElementInViewport(section2)) {
      section2.classList.add("visible");
      window.removeEventListener("scroll", checkVisibility);
    }
  }

  // Đăng ký sự kiện scroll
  window.addEventListener("scroll", checkVisibility);

  // Kiểm tra ngay khi trang tải
  checkVisibility();

  // Thêm một hàm để kiểm tra lại khi trang được reload
  window.addEventListener("load", function () {
    // Đặt delay nhỏ để đảm bảo trang đã render hoàn toàn
    setTimeout(() => {
      checkVisibility();
    }, 100);
  });
});

// END HIỆU ỨNG SECTION-2

// HIÊU ỨNG SECTION-3

// Thêm vào cuối file JavaScript hiện có

// Hiệu ứng fade-in cho section-3
document.addEventListener("DOMContentLoaded", function () {
  // Lấy tham chiếu đến section-3
  const section3 = document.querySelector(".section-3");

  // Kiểm tra nếu phần tử đã hiển thị trong viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }

  // Hàm xử lý khi cuộn trang
  function checkVisibility() {
    if (isElementInViewport(section3)) {
      section3.classList.add("visible");
      window.removeEventListener("scroll", checkVisibility);
    }
  }

  // Đăng ký sự kiện scroll
  window.addEventListener("scroll", checkVisibility);

  // Kiểm tra ngay khi trang tải
  setTimeout(function () {
    checkVisibility();
  }, 100);
});

// END HIÊU ỨNG SECTION-3

// HIỆU ỨNG SECTION-4

// Hiệu ứng fade-in cho section-4
document.addEventListener("DOMContentLoaded", function () {
  // Lấy tham chiếu đến section-4
  const section4 = document.querySelector(".section-4");

  // Kiểm tra nếu phần tử đã hiển thị trong viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }

  // Hàm xử lý khi cuộn trang
  function checkVisibility() {
    if (isElementInViewport(section4)) {
      section4.classList.add("visible");
      window.removeEventListener("scroll", checkVisibility);
    }
  }

  // Đăng ký sự kiện scroll
  window.addEventListener("scroll", checkVisibility);

  // Kiểm tra ngay khi trang tải
  setTimeout(function () {
    checkVisibility();
  }, 100);
});

// END HIỆU ỨNG SECTION-4

// HIỆU ỨNG SECTION-5

document.addEventListener("DOMContentLoaded", function () {
  // Lấy tham chiếu đến section-5
  const section5 = document.querySelector(".section-5");

  // Kiểm tra nếu phần tử đã hiển thị trong viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }

  // Hàm xử lý khi cuộn trang
  function checkVisibility() {
    if (isElementInViewport(section5)) {
      section5.classList.add("visible");
      window.removeEventListener("scroll", checkVisibility);
    }
  }

  // Đăng ký sự kiện scroll
  window.addEventListener("scroll", checkVisibility);

  // Kiểm tra ngay khi trang tải
  setTimeout(function () {
    checkVisibility();
  }, 100);

  // Xử lý sự kiện click cho nút "Xem chi tiết"
  const viewMoreButtons = document.querySelectorAll(".section-5 .view-more");
  viewMoreButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Ngăn sự kiện click lan ra thẻ cha
      const mbtiType = this.closest(".item-details")
        .querySelector("h4")
        .textContent.split(" - ")[0];
      alert("Sẽ chuyển đến trang chi tiết của " + mbtiType);
      // Có thể thay thế dòng alert bằng chuyển hướng đến trang chi tiết
      // window.location.href = '/mbti-types/' + mbtiType.toLowerCase() + '.html';
    });
  });
});

// END HIỆU ỨNG SECTION-5

// HIỆU ỨNG SECTION-6

// HIỆU ỨNG SECTION-6

// END HIỆU ỨNG SECTION-6

// HIỆU ỨNG SECTION-7

// HIỆU ỨNG SECTION-7 - FAQs

document.addEventListener("DOMContentLoaded", function () {
  // Lấy tham chiếu đến section-7
  const section7 = document.querySelector(".section-7");

  if (!section7) return;

  // Xử lý sự kiện click vào câu hỏi
  const faqItems = document.querySelectorAll(".section-7 .faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Nếu item đã active, đóng nó
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      } else {
        // Đóng tất cả các câu hỏi khác đang mở
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active");
          }
        });

        // Mở item được click
        item.classList.add("active");
      }
    });
  });

  // Kiểm tra nếu phần tử đã hiển thị trong viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }

  // Hàm xử lý khi cuộn trang
  function checkVisibility() {
    if (isElementInViewport(section7)) {
      section7.classList.add("visible");
      window.removeEventListener("scroll", checkVisibility);
    }
  }

  // Đăng ký sự kiện scroll
  window.addEventListener("scroll", checkVisibility);

  // Kiểm tra ngay khi trang tải
  setTimeout(function () {
    checkVisibility();
  }, 100);
});

// END HIỆU ỨNG SECTION-7
