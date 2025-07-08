document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các menu-tag
  const menuTags = document.querySelectorAll(
    ".section-2 .inner-menu .menu-tag"
  );

  // Đảm bảo tag đầu tiên (Tất cả) có class active mặc định
  if (menuTags.length > 0) {
    menuTags[0].classList.add("active");
  }

  // Thêm sự kiện click với xóa active ngay lập tức
  menuTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      // Xóa ngay lập tức class active từ tất cả tag khác
      menuTags.forEach((item) => {
        if (item !== this) {
          item.classList.remove("active");
        }
      });

      // Thêm class active vào tag được click
      this.classList.add("active");

      // Lọc nội dung theo tag
      const category = this.textContent.trim();
      // Nếu bạn có code lọc nội dung thì gọi ở đây
    });
  });

  document.getElementById("date").innerText = new Date().toLocaleDateString(
    "vi-VN"
  );
  // Số chạy hiệu ứng
  const counters = document.querySelectorAll(".count-up");
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      const increment = Math.ceil(target / 100); // Điều chỉnh tốc độ

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 20); // Thời gian giữa mỗi lần cập nhật
      } else {
        counter.innerText = target.toLocaleString("vi-VN");
      }
    };
    updateCount();
  });
  const lineChart = new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: ["11/04", "17/04", "23/04", "29/04", "05/05", "11/05"],
      datasets: [
        {
          label: "Cơ hội việc làm",
          data: [58000, 55000, 59000, 54000, 50000, 56000],
          borderColor: "#00ff88",
          tension: 0.3,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
    },
  });

  const barChart = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["Kinh doanh", "Hành chính", "Marketing", "Tư vấn", "Khách hàng"],
      datasets: [
        {
          label: "Nhu cầu",
          data: [13500, 9200, 8800, 7600, 7200],
          backgroundColor: [
            "#00ff88",
            "#3399ff",
            "#00ccff",
            "#ffaa00",
            "#ffaa00",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
    },
  });
});

const toggleIcons = document.querySelectorAll(".toggle-password i");

toggleIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const input = icon.closest(".input-group").querySelector("input");
    const isHidden = input.type === "password";

    // Đổi type input
    input.type = isHidden ? "text" : "password";

    // Đổi icon đúng chiều logic
    icon.classList.toggle("fa-eye-slash", !isHidden); // nếu đang là text, thì đổi về slash
    icon.classList.toggle("fa-eye", isHidden); // nếu đang ẩn, thì đổi thành eye
  });
});

// Hàm đã có của bạn
function toggleDropdown(menuId) {
  document.querySelectorAll(".dropdown-menu").forEach((menu) => {
    if (menu.id !== menuId) menu.classList.remove("show");
  });
  const menu = document.getElementById(menuId);
  window.requestAnimationFrame(() => {
    menu.classList.toggle("show");
  });
}

// Đóng dropdown khi click ngoài
document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown")) {
    document
      .querySelectorAll(".dropdown-menu")
      .forEach((menu) => menu.classList.remove("show"));
  }
});

// === Phần mới: cập nhật label "Địa điểm" ===

// 1. Lấy nút và tất cả các checkbox trong menu
const locationToggle = document.getElementById("locationToggle");
const locationCheckboxes = document.querySelectorAll(
  '#locationMenu input[type="checkbox"]'
);

// 2. Hàm cập nhật text nút dựa trên lựa chọn
function updateLocationLabel() {
  // Lấy mảng các giá trị đang check
  const chosen = Array.from(locationCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  if (chosen.length > 0) {
    // Ví dụ: "Địa điểm: Hà Nội, Đà Nẵng"
    locationToggle.textContent = "Địa điểm: " + chosen.join(", ");
  } else {
    // Trả về mặc định khi không chọn
    locationToggle.textContent = "Địa điểm";
  }
}

// 3. Gắn sự kiện change cho từng checkbox
locationCheckboxes.forEach((cb) => {
  cb.addEventListener("change", updateLocationLabel);
});

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector(".img-bg img");

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    banner.style.transform = `translate(${x}%, ${y}%) scale(1.05)`;
  });
});
