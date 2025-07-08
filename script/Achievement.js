// 1) Các biến cơ bản (như trước)
const track = document.querySelector(".carousel-track-slide");
const slides = Array.from(track.children);
const prevBtnbn = document.querySelector(".prev-btn-banner");
const nextBtnbn = document.querySelector(".next-btn-banner");
const dotsNav = document.querySelector(".carousel-dots");

const slideWidth = slides[0].getBoundingClientRect().width;

// 2) Clone đầu/cuối
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = "first-clone";
lastClone.id = "last-clone";
track.appendChild(firstClone);
track.insertBefore(lastClone, track.firstChild);

// 3) Cập nhật danh sách slides và đặt index bắt đầu
const allSlides = Array.from(track.children);
let currentIndex = 1;
track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

// 4) Khởi tạo các dot tương ứng slides gốc
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dot.dataset.index = i + 1; // vì index thực = i+1 (clone ở đầu)
  dotsNav.appendChild(dot);

  dot.addEventListener("click", () => {
    moveTo(i + 1);
  });
});

// 5) Hàm di chuyển và update dot
function moveTo(index) {
  track.style.transition = "transform 0.6s ease";
  currentIndex = index;
  track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
}

// 6) Nút next/prev
nextBtnbn.addEventListener("click", () => {
  if (currentIndex >= allSlides.length - 1) return;
  moveTo(currentIndex + 1);
});
prevBtnbn.addEventListener("click", () => {
  if (currentIndex <= 0) return;
  moveTo(currentIndex - 1);
});

// 7) Sau khi transition kết thúc: loop lại và cập nhật dot
track.addEventListener("transitionend", () => {
  // Loop vô hạn
  if (allSlides[currentIndex].id === "first-clone") {
    track.style.transition = "none";
    currentIndex = 1;
    track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
  }
  if (allSlides[currentIndex].id === "last-clone") {
    track.style.transition = "none";
    currentIndex = allSlides.length - 2;
    track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
  }

  // Cập nhật active dot
  updateDots();
});

// 8) Hàm bật active dot
function updateDots() {
  const dots = Array.from(dotsNav.children);
  dots.forEach((d) => d.classList.remove("active"));

  // Tính chỉ số dot tương ứng (slides gốc có index 1 → dot[0], v.v.)
  let dotIndex = currentIndex - 1;
  if (currentIndex === 0) dotIndex = slides.length - 1;
  if (currentIndex === allSlides.length - 1) dotIndex = 0;

  dots[dotIndex].classList.add("active");
}
// --- Auto slide every 1.5s ---
let slideInterval = setInterval(() => {
  // gọi sự kiện click lên nút Next
  nextBtnbn.click();
}, 1500);

// (Tùy chọn) Nếu muốn dừng auto khi hover vào carousel, rồi resume khi rời chuột:
const carousel = document.querySelector(".carousel-wrapper-slide");

carousel.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

carousel.addEventListener("mouseleave", () => {
  slideInterval = setInterval(() => {
    nextBtnbn.click();
  }, 1500);
});
const chkOther = document.getElementById("chkOther");
const otherDetail = document.querySelector(".other-detail");

chkOther.addEventListener("change", () => {
  if (chkOther.checked) {
    otherDetail.style.display = "block";
    otherDetail.querySelector("input").focus();
  } else {
    otherDetail.style.display = "none";
    otherDetail.querySelector("input").value = "";
  }
});

const form = document.querySelector(".survey-form");
form.addEventListener("reset", () => {
  document.querySelectorAll(".other-detail").forEach((el) => {
    el.classList.remove("show");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("surveyForm");
  const steps = Array.from(form.querySelectorAll(".form-step"));
  const progress = document.getElementById("progressBar");
  const dots = Array.from(form.querySelectorAll(".progress-steps .step"));
  let current = 0;

  function showStep(idx) {
    // 1. Hiển thị đúng bước
    steps.forEach((fs, i) => fs.classList.toggle("active", i === idx));
    // 2. Cập nhật dots
    dots.forEach((d, i) => d.classList.toggle("active", i <= idx));
    // 3. Cập nhật progress bar
    progress.style.width = (idx / (steps.length - 1)) * 100 + "%";
  }

  // Next
  form.querySelectorAll(".next-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (current < steps.length - 1) {
        current++;
        showStep(current);
      }
    });
  });

  // Prev
  form.querySelectorAll(".prev-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (current > 0) {
        current--;
        showStep(current);
      }
    });
  });

  // Khởi hiển thị bước 0
  showStep(0);
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("surveyForm");
  const modal = document.getElementById("customModal");
  const closeBtn = document.getElementById("closeModal");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // 1. Ẩn form wizard
    document.querySelector(".form-main").style.display = "none";
    // 2. Hiển thị modal
    modal.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    // Ẩn luôn modal và bạn có thể redirect hoặc reset form ở đây:
    form.reset();
    form
      .querySelectorAll(".form-step")
      .fodocument.addEventListener("DOMContentLoaded", () => {
        const progress = document.querySelector(".progress-container");

        // mỗi lần bấm nút
        document.querySelectorAll(".next-btn, .prev-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            progress.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          });
        });
      });
    rEach((fs) => fs.classList.remove("active"));
    form.querySelector(".form-step").classList.add("active");
    document.querySelector(".form-main").style.display = "block";
    // Ẩn progress:
    document.getElementById("progressBar").style.width = "0%";
    document.querySelectorAll(".progress-steps .step").forEach((d, i) => {
      d.classList.toggle("active", i === 0);
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("surveyForm");
  const wizard = document.querySelector(".form-main");
  const results = document.querySelector(".section-6");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Ngăn reload trang
    // 1) Ẩn wizard form
    wizard.style.display = "none";
    // 2) Show section-6
    results.classList.add("active");
    // 3) Cuộn mượt xuống section-6
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".progress-container");

  // mỗi lần bấm nút
  document.querySelectorAll(".next-btn, .prev-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      progress.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
// load trang
// 1) Khi DOM + tài nguyên đã load xong, thêm .loaded
window.addEventListener("load", () => {
  document.documentElement.classList.add("loaded");
});

// 2) Trước khi chuyển trang (reload hoặc click link), thêm .fading-out để fade out
window.addEventListener("beforeunload", () => {
  document.documentElement.classList.add("fading-out");
});
