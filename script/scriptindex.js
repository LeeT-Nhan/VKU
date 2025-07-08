document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các menu-tag
  const menuTags = document.querySelectorAll(
    ".section-2 .inner-menu .menu-tag"
  );

  if (menuTags.length > 0) {
    menuTags[0].classList.add("active");
  }

  menuTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      menuTags.forEach((item) => {
        if (item !== this) {
          item.classList.remove("active");
        }
      });
      this.classList.add("active");
      // const category = this.textContent.trim();
    });
  });

  // Hiển thị ngày hiện tại
  const dateEl = document.getElementById("date");
  if (dateEl) {
    dateEl.innerText = new Date().toLocaleDateString("vi-VN");
  }

  // Số chạy hiệu ứng
  const counters = document.querySelectorAll(".count-up");
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      let count = +counter.innerText.replace(/\./g, ""); // Loại bỏ dấu chấm nếu có

      // Nếu target nhỏ và count lớn (do lỗi parse ban đầu), reset count
      if (
        isNaN(count) ||
        (target > 0 && count > target * 2 && target < 10000)
      ) {
        count = 0;
      }

      const increment = Math.ceil(target / 100) || 1;

      if (count < target) {
        count += increment;
        if (count > target) {
          count = target;
        }
        counter.innerText = count.toLocaleString("vi-VN");
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target.toLocaleString("vi-VN");
      }
    };
    updateCount();
  });

  // Hiệu ứng banner mousemove
  const banner = document.querySelector(".img-bg img");
  if (banner) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      banner.style.transform = `translate(${x}%, ${y}%) scale(1.05)`;
    });
  }

  // Countdown time
  function updateCountdown() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeRemaining = tomorrow - now;

    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (hoursEl && minutesEl && secondsEl) {
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");
    }
  }

  if (document.getElementById("hours")) {
    // Chỉ chạy nếu có element countdown
    setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  // — LINE CHART —
  const lineEl = document.getElementById("lineChart");
  if (lineEl) {
    const ctx = lineEl.getContext("2d");

    // Tạo gradient cho đường line chart
    const lineGradient = ctx.createLinearGradient(0, 0, 0, 300);
    lineGradient.addColorStop(0, "rgba(0, 255, 76, 1)");
    lineGradient.addColorStop(1, "rgba(0, 255, 76, 0.1)");

    const lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["21/04", "25/04", "29/04", "03/05", "09/05", "14/05"],
        datasets: [
          {
            label: "Tăng trưởng cơ hội việc làm",
            data: [56000, 58500, 55000, 58000, 48000, 53000],
            borderColor: "#00FF4C",
            backgroundColor: lineGradient,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: "#00FF4C",
            fill: true, // Bật chế độ fill để hiển thị gradient
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Tăng trưởng cơ hội việc làm",
            color: "#ffffff",
            position: "top",
            align: "start",
            font: { size: 14, weight: 500 },
            padding: { bottom: 10 },
          },
          tooltip: {
            backgroundColor: "rgba(0,0,0,0.8)",
            titleFont: { size: 14, weight: 500 },
            bodyFont: { size: 14, weight: 500 },
            padding: 12,
            callbacks: {
              label: (ctx) => ctx.parsed.y.toLocaleString("vi-VN"),
            },
          },
        },
        scales: {
          x: {
            grid: { display: false, drawBorder: false },
            ticks: { color: "#fff", font: { size: 14, weight: 500 } },
          },
          y: {
            min: 48000,
            max: 60000,
            grid: { color: "rgba(255,255,255,0.1)", drawBorder: false },
            ticks: {
              color: "#fff",
              font: { size: 14, weight: 500 },
              stepSize: 2000,
              callback: (v) => v.toLocaleString("vi-VN"),
            },
          },
        },
      },
    });
  }

  // — BAR CHART DATASETS & INIT —
  const barEl = document.getElementById("barChart");
  if (barEl) {
    const ctx = barEl.getContext("2d");

    // Tạo các gradient cho biểu đồ ngành nghề
    const industryGradients = [];
    const industryColors = [
      ["rgba(32, 201, 151, 0.95)", "rgba(32, 201, 151, 0.15)"], // Xanh ngọc đẹp
      ["rgba(86, 130, 255, 0.95)", "rgba(86, 130, 255, 0.15)"], // Xanh dương sáng
      ["rgba(255, 128, 80, 0.95)", "rgba(255, 128, 80, 0.15)"], // Cam san hô
      ["rgba(240, 78, 152, 0.95)", "rgba(240, 78, 152, 0.15)"], // Hồng đậm
      ["rgba(255, 193, 7, 0.95)", "rgba(255, 193, 7, 0.15)"], // Vàng amber
    ];

    for (let i = 0; i < 5; i++) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, industryColors[i][0]);
      gradient.addColorStop(0.6, industryColors[i][0].replace("0.95", "0.5")); // Thêm điểm giữa để hiệu ứng mượt hơn
      gradient.addColorStop(1, industryColors[i][1]);
      industryGradients.push(gradient);
    }

    // Tạo các gradient cho biểu đồ mức lương
    const salaryGradients = [];
    const salaryColors = [
      ["rgba(0, 177, 79, 0.9)", "rgba(0, 177, 79, 0.2)"], // Xanh lá
      ["rgba(65, 105, 225, 0.9)", "rgba(65, 105, 225, 0.2)"], // Xanh dương
      ["rgba(255, 165, 0, 0.9)", "rgba(255, 165, 0, 0.2)"], // Cam
      ["rgba(0, 206, 209, 0.9)", "rgba(0, 206, 209, 0.2)"], // Xanh ngọc
      ["rgba(255, 215, 0, 0.9)", "rgba(255, 215, 0, 0.2)"], // Vàng
      ["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.2)"], // Trắng
    ];

    for (let i = 0; i < 6; i++) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, salaryColors[i][0]);
      gradient.addColorStop(1, salaryColors[i][1]);
      salaryGradients.push(gradient);
    }

    // Định nghĩa các datasets với gradient
    const dataByIndustry = {
      labels: ["CNTT", "Marketing", "Kế toán", "Bán hàng", "Nhân sự"],
      datasets: [
        {
          label: "Số lượng",
          data: [9500, 8000, 6300, 11200, 4200],
          backgroundColor: industryGradients,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
        },
      ],
    };

    const dataBySalary = {
      labels: ["< 3tr", "3-10tr", "10-20tr", "20-30tr", "> 30tr", "Thỏa thuận"],
      datasets: [
        {
          label: "Số lượng",
          data: [2000, 9500, 30000, 32000, 3500, 19000],
          backgroundColor: salaryGradients,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
        },
      ],
    };

    // Tạo biểu đồ với dữ liệu mặc định
    const barChart = new Chart(ctx, {
      type: "bar",
      data: dataByIndustry,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(0,0,0,0.8)",
            titleFont: { size: 14, weight: 500 },
            bodyFont: { size: 14, weight: 500 },
            padding: 12,
            callbacks: {
              label: (ctx) => ctx.parsed.y.toLocaleString("vi-VN") + " vị trí",
            },
          },
        },
        scales: {
          x: {
            grid: { display: false, drawBorder: false },
            ticks: { color: "#fff", font: { size: 14, weight: 500 } },
          },
          y: {
            grid: { color: "rgba(255,255,255,0.1)", drawBorder: false },
            ticks: {
              color: "#fff",
              font: { size: 14, weight: 500 },
              callback: (v) => (v >= 1000 ? (v / 1000).toFixed(0) + ".000" : v),
            },
          },
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
      },
    });

    // Xử lý sự kiện khi thay đổi select
    const selectChartType = document.querySelector(
      ".section-5 .chart-header select"
    );
    if (selectChartType) {
      selectChartType.addEventListener("change", function () {
        console.log("Selected value:", this.value);

        if (this.value === "salary") {
          // Cập nhật biểu đồ với dữ liệu theo mức lương
          barChart.data = dataBySalary;
        } else {
          // Cập nhật biểu đồ với dữ liệu theo ngành nghề
          barChart.data = dataByIndustry;
        }

        // Cập nhật biểu đồ với animation
        barChart.update({
          duration: 800,
          easing: "easeOutCubic",
        });

        console.log(
          "Chart updated with:",
          this.value === "salary" ? "salary" : "industry",
          "data"
        );
      });
    }
  }

  // Xử lý toggle password
  const togglePasswordIcons = document.querySelectorAll(".toggle-password i");
  if (togglePasswordIcons.length > 0) {
    togglePasswordIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const input = icon.closest(".input-group").querySelector("input");
        if (input) {
          const isHidden = input.type === "password";
          input.type = isHidden ? "text" : "password";
          icon.classList.toggle("fa-eye-slash", !isHidden);
          icon.classList.toggle("fa-eye", isHidden);
        }
      });
    });
  }

  // Xử lý dropdown menu trong phần tìm kiếm
  const dropdownTriggers = document.querySelectorAll(
    ".Q_section-1 .dropdown-toggle"
  );
  if (dropdownTriggers.length > 0) {
    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const menuId = this.getAttribute("data-target");
        toggleDropdown(menuId);
      });
    });
  }

  // Đóng dropdown khi click ra ngoài
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".Q_section-1 .dropdown")) {
      document
        .querySelectorAll(".Q_section-1 .dropdown-menu")
        .forEach((menu) => menu.classList.remove("show"));
    }
  });

  // Xử lý location filter
  const locationToggle = document.getElementById("locationToggle");
  const locationCheckboxes = document.querySelectorAll(
    '#locationMenu input[type="checkbox"]'
  );

  if (locationToggle && locationCheckboxes.length > 0) {
    // Hàm cập nhật label location
    function updateLocationLabel() {
      const chosen = Array.from(locationCheckboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);

      locationToggle.textContent =
        chosen.length > 0 ? "Địa điểm: " + chosen.join(", ") : "Địa điểm";
    }

    // Gắn event cho các checkbox
    locationCheckboxes.forEach((cb) => {
      cb.addEventListener("change", updateLocationLabel);
    });

    // Cập nhật label lần đầu (nếu có checkbox được chọn mặc định)
    updateLocationLabel();
  }
}); // End DOMContentLoaded

// Hàm toggle dropdown - định nghĩa bên ngoài để có thể tái sử dụng
function toggleDropdown(menuId) {
  // Đóng các dropdown khác
  document.querySelectorAll(".Q_section-1 .dropdown-menu").forEach((menu) => {
    if (menu.id !== menuId) menu.classList.remove("show");
  });

  // Toggle dropdown hiện tại
  const menu = document.getElementById(menuId);
  if (menu) {
    requestAnimationFrame(() => {
      menu.classList.toggle("show");
    });
  }
}

// con số ấn tượng

// con số ấn tượng
document.addEventListener("DOMContentLoaded", function () {
  // Hàm để tạo số ngẫu nhiên trong khoảng
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Hàm kiểm tra phần tử có nằm trong viewport không
  function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    // Chỉ trả về true nếu phần tử đã vào viewport một khoảng đủ lớn (25%)
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
      rect.bottom >=
        (window.innerHeight || document.documentElement.clientHeight) * 0.25
    );
  }

  // Khởi tạo biến để theo dõi xem hiệu ứng đã chạy chưa
  let animationStarted = false;

  // Observer cho section-15
  const createSectionObserver = () => {
    const section = document.querySelector(".section-15");
    if (!section) return;

    // Tạo Intersection Observer để theo dõi khi section-15 xuất hiện trong viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Thêm class khi phần tử xuất hiện trong viewport
            section.classList.add("animate-section");
            // Bắt đầu animation số sau khi section hiện ra
            setTimeout(startNumberAnimation, 800);
            // Ngừng theo dõi sau khi đã hiệu ứng
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.2 } // Hiệu ứng bắt đầu khi 20% section xuất hiện
    );

    // Bắt đầu theo dõi section
    observer.observe(section);
  };

  // Hàm bắt đầu hiệu ứng số
  function startNumberAnimation() {
    if (animationStarted) return; // Tránh chạy nhiều lần

    const numberSection = document.querySelector(".number-impress");
    if (!numberSection) return; // Đảm bảo phần tử tồn tại

    // Chỉ bắt đầu animation sau khi đã thêm animate-section class vào section-15
    animationStarted = true;

    // Lấy tất cả các phần tử số trong number-impress
    const numbers = document.querySelectorAll(".number-impress .number");

    // Cho mỗi phần tử số
    numbers.forEach((numberElement) => {
      // Lưu giá trị cuối cùng
      const finalValue = numberElement.textContent;

      // Phân tích giá trị cuối để lấy số (bỏ dấu + và dấu chấm)
      const finalNumberValue = parseInt(finalValue.replace(/[^\d]/g, ""));

      // Thiết lập số lần lặp và thời gian hiệu ứng
      const iterations = 30; // Tăng số lần để animation diễn ra lâu hơn
      const duration = 2000; // Kéo dài thời gian animation (ms)

      // Đặt biến đếm
      let count = 0;

      // Tạo hiệu ứng
      const interval = setInterval(() => {
        // Tạo số ngẫu nhiên với cùng độ dài số ký tự
        const randomLength = finalNumberValue.toString().length;
        let randomValue;

        if (count < iterations - 5) {
          // Trong phần lớn thời gian, hiển thị các số hoàn toàn ngẫu nhiên
          const minValue = Math.pow(10, randomLength - 1);
          const maxValue = Math.pow(10, randomLength) - 1;
          randomValue = getRandomNumber(minValue, maxValue);
        } else {
          // Trong 5 lần cuối, dần dần tiến gần đến giá trị cuối
          const diff =
            finalNumberValue -
            parseInt(numberElement.textContent.replace(/[^\d]/g, "") || "0");
          const step = diff / (iterations - count);
          randomValue =
            parseInt(numberElement.textContent.replace(/[^\d]/g, "") || "0") +
            Math.floor(step);
        }

        // Định dạng số theo cùng kiểu với giá trị cuối (thêm dấu chấm và dấu +)
        let formattedValue = randomValue.toLocaleString("de-DE");
        if (finalValue.includes("+")) {
          formattedValue += "+";
        }

        // Cập nhật giá trị hiển thị
        numberElement.textContent = formattedValue;

        // Tăng biến đếm
        count++;

        // Khi đạt đủ số lần, hiển thị giá trị cuối và dừng
        if (count >= iterations) {
          numberElement.textContent = finalValue;
          clearInterval(interval);
        }
      }, duration / iterations);
    });
  }

  // Khởi chạy observer để theo dõi khi section-15 xuất hiện
  createSectionObserver();
});

// việc làm hôm nay

// Thêm hiệu ứng xuất hiện khi cuộn tới section-5
document.addEventListener("DOMContentLoaded", function () {
  const section5 = document.querySelector(".section-5");
  if (!section5) return;

  // Sử dụng Intersection Observer để phát hiện khi phần tử xuất hiện trong viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section5.classList.add("visible");

          // Bắt đầu đếm số khi section xuất hiện
          if (!section5.classList.contains("counted")) {
            section5.classList.add("counted");
            countUp();
          }

          // Ngừng quan sát sau khi đã kích hoạt hiệu ứng
          observer.unobserve(section5);
        }
      });
    },
    { threshold: 0.2 }
  ); // Hiệu ứng bắt đầu khi 20% phần tử xuất hiện trong viewport

  // Bắt đầu quan sát section-5
  observer.observe(section5);

  // Hàm đếm số
  function countUp() {
    const countElements = document.querySelectorAll(".count-up");

    countElements.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 1500; // Thời gian đếm (ms)
      const steps = 50; // Số bước đếm
      const stepTime = duration / steps;
      const stepValue = target / steps;
      let current = 0;
      let step = 0;

      const countInterval = setInterval(() => {
        step++;
        current = Math.floor(step * stepValue);

        if (current > target) {
          current = target;
          clearInterval(countInterval);
        }

        // Định dạng số có dấu phân cách hàng nghìn
        counter.textContent = current.toLocaleString("vi-VN");

        if (step >= steps) {
          clearInterval(countInterval);
        }
      }, stepTime);
    });
  }
});

// end việc làm hôm nay

// huy hiệu sấm sét

// Tùy chỉnh cấu hình AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    // Cấu hình toàn cục
    duration: 800,
    easing: "ease-out",
    once: false, // Hiệu ứng sẽ lặp lại mỗi khi scroll
    mirror: true, // Phản chiếu animation khi scroll up
    anchorPlacement: "top-bottom", // Điểm neo của hiệu ứng

    // Tùy chỉnh offset khi nào hiệu ứng bắt đầu
    offset: 120,

    // Tăng mượt mà
    delay: 100,

    // Vô hiệu hóa trên thiết bị di động nếu cần
    disable: false,

    // Vô hiệu hóa AOS trên thiết bị có chiều rộng nhỏ hơn giá trị này
    // disable: 'mobile',
    // disableMutationObserver: false,
  });

  // Tùy chỉnh đặc biệt cho center-wrapper
  const centerWrapper = document.querySelector(".center-wrapper");
  if (centerWrapper) {
    // Refresh AOS khi scroll đến center-wrapper để đảm bảo hiệu ứng mượt mà
    window.addEventListener("scroll", function () {
      const rect = centerWrapper.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setTimeout(function () {
          AOS.refresh();
        }, 100);
      }
    });
  }
});

// end huy hiệu sấm sét

// thành tựu

// Thêm vào file scriptindex.js
document.addEventListener("DOMContentLoaded", function () {
  // Tạo Observer cho phần Thành tựu
  const createThanhTuuObserver = () => {
    const section = document.querySelector(".thanhtuu");
    if (!section) return;

    // Tạo Intersection Observer để theo dõi khi thanhtuu xuất hiện trong viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Thêm class khi phần tử xuất hiện trong viewport
            section.classList.add("visible");

            // Tạo hiệu ứng parallax nhẹ khi scroll
            window.addEventListener("scroll", function () {
              if (isElementInViewport(section)) {
                const scrollPosition = window.scrollY;
                const offset = (scrollPosition - section.offsetTop) * 0.05;

                // Hiệu ứng parallax cho hình ảnh bên phải
                const rightImage = section.querySelector(".right-image");
                if (rightImage) {
                  rightImage.style.transform = `translateY(${offset * -0.5}px)`;
                }

                // Hiệu ứng parallax cho các grid-item
                const items = section.querySelectorAll(".grid-item");
                items.forEach((item, index) => {
                  const itemOffset = offset * (index % 3 === 0 ? 0.3 : -0.2);
                  item.style.transform = `translateY(${itemOffset}px)`;
                });
              }
            });

            // Ngừng quan sát sau khi đã kích hoạt hiệu ứng chính
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.15 } // Hiệu ứng bắt đầu khi 15% section xuất hiện
    );

    // Bắt đầu quan sát section
    observer.observe(section);
  };

  // Hàm kiểm tra phần tử có nằm trong viewport không
  function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Khởi chạy observer
  createThanhTuuObserver();

  // Thêm hiệu ứng hover riêng biệt cho các grid item
  const items = document.querySelectorAll(".thanhtuu .grid-item");
  items.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      // Highlight item này và làm mờ các item khác
      items.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.style.opacity = "0.7";
          otherItem.style.transform = "scale(0.98)";
        } else {
          this.style.transform = "scale(1.03)";
        }
      });
    });

    item.addEventListener("mouseleave", function () {
      // Khôi phục tất cả các item về trạng thái bình thường
      items.forEach((otherItem) => {
        otherItem.style.opacity = "";
        otherItem.style.transform = "";
      });
    });
  });
});

// end thành tựu

// thương hiệu lớn tiêu biểu
document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các menu-tag
  const menuTags = document.querySelectorAll(
    ".section-2 .inner-menu .menu-tag"
  );

  if (menuTags.length > 0) {
    // Đảm bảo tag đầu tiên được active
    menuTags[0].classList.add("active");

    // Xử lý sự kiện click cho các menu-tag
    menuTags.forEach((tag) => {
      tag.addEventListener("click", function () {
        // Xóa active class khỏi tất cả các tag khác
        menuTags.forEach((item) => {
          if (item !== this) {
            item.classList.remove("active");
          }
        });
        // Thêm active class vào tag được click
        this.classList.add("active");
        // Có thể thêm logic lọc dữ liệu theo danh mục nếu cần
      });
    });
  }

  // Thêm hiệu ứng ripple khi click vào menu-tag
  menuTags.forEach((tag) => {
    tag.addEventListener("click", function (e) {
      // Tạo phần tử ripple
      const ripple = document.createElement("span");
      ripple.classList.add("ripple-effect");

      // Tính toán kích thước và vị trí
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      // Thiết lập CSS cho ripple
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      // Thêm vào menu-tag
      this.appendChild(ripple);

      // Xóa sau khi animation kết thúc
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Thêm hiệu ứng hover nâng cao cho các list-item
  const listItems = document.querySelectorAll(".section-2 .list-item");
  listItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transition =
        "all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      this.style.transform = "translateY(-8px)";
      this.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.15)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    });
  });

  // Hiệu ứng cho main-banner
  const mainBanner = document.querySelector(".section-2 .main-banner");
  if (mainBanner) {
    mainBanner.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)";

      const bannerImg = this.querySelector(".banner-img-avt img");
      if (bannerImg) {
        bannerImg.style.transform = "scale(1.05)";
      }
    });

    mainBanner.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "";

      const bannerImg = this.querySelector(".banner-img-avt img");
      if (bannerImg) {
        bannerImg.style.transform = "scale(1)";
      }
    });
  }

  // Tối ưu hiệu ứng AOS cho section-2
  const section2 = document.querySelector(".section-2");
  if (section2) {
    const section2Observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Refresh AOS cho section-2
            setTimeout(() => {
              AOS.refresh();
            }, 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    section2Observer.observe(section2);
  }
});
