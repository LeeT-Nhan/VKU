// SECTION 1

document.addEventListener("DOMContentLoaded", function () {
  // Hiệu ứng cho section-1
  const section1 = document.querySelector(".section-1");
  const bannerHeader = document.querySelector(".section-1 .banner-header");
  const bannerDesc = document.querySelector(".section-1 .banner-desc");
  const learnButton = document.querySelector(".section-1 .btn-learn-about");

  // Tạo hiệu ứng hiển thị văn bản cho tiêu đề
  if (bannerHeader) {
    // Tách nội dung tiêu đề
    const headerText = bannerHeader.textContent;
    const firstPart = "Đánh giá kỹ năng ";
    const highlightPart = "Kết nối cơ hội cho người khuyết tật";
    const lastPart = "Tự tin tìm việc làm phù hợp";

    // Tạo span với màu khác cho phần highlight
    bannerHeader.innerHTML = `${firstPart}<br><span>${highlightPart}</span><br>${lastPart}`;
  }

  // Thêm hiệu ứng hover cho button
  if (learnButton) {
    learnButton.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    learnButton.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });

    // Thêm hiệu ứng ripple khi click
    learnButton.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.width = "1px";
      ripple.style.height = "1px";
      ripple.style.borderRadius = "50%";
      ripple.style.backgroundColor = "rgba(255,255,255,0.7)";
      ripple.style.transform = "scale(0)";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.animation = "ripple 0.6s linear";

      learnButton.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // Kiểm tra khi cuộn trang để hiển thị section (nếu không trong viewport khi load)
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  function checkScroll() {
    if (isInViewport(section1)) {
      section1.classList.add("visible");
      window.removeEventListener("scroll", checkScroll);
    }
  }

  // Thêm class visible ngay lập tức vì section-1 thường hiển thị đầu tiên
  setTimeout(() => {
    section1.classList.add("visible");
  }, 100);

  // Nhưng vẫn đăng ký sự kiện scroll phòng hờ khi refresh ở vị trí khác
  window.addEventListener("scroll", checkScroll);

  // Kiểm tra ngay khi tải trang
  checkScroll();

  // Thêm hiệu ứng ripple CSS
  const style = document.createElement("style");
  style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(100);
          opacity: 0;
        }
      }
    `;
  document.head.appendChild(style);
});

//   END SECTION 1

// SECTION 2

// SECTION 2
function initCustomDropdown() {
  const skillsSelect = document.querySelector(".skills-select");
  if (!skillsSelect) return;

  const selectElement = skillsSelect.querySelector("select");
  if (!selectElement) return;

  // 1. Ẩn select gốc
  selectElement.style.display = "none";

  // 2. Tạo custom select value
  const selectValue = document.createElement("div");
  selectValue.className = "select-value";
  selectValue.innerText =
    selectElement.options[selectElement.selectedIndex].text;

  // 3. Tạo dropdown container
  const customDropdown = document.createElement("div");
  customDropdown.className = "custom-dropdown";

  // 4. Tạo overlay
  const dropdownOverlay = document.createElement("div");
  dropdownOverlay.className = "dropdown-overlay";
  document.body.appendChild(dropdownOverlay);

  // 5. Tạo các item từ options
  Array.from(selectElement.options).forEach((option) => {
    const item = document.createElement("div");
    item.className = "dropdown-item";
    item.innerText = option.text;
    item.dataset.value = option.value;

    if (option.value === selectElement.value) {
      item.classList.add("active");
    }

    // Event click cho mỗi item
    item.addEventListener("click", function (e) {
      // Hiệu ứng ripple
      const x = e.clientX - this.getBoundingClientRect().left;
      const y = e.clientY - this.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);

      // Cập nhật giá trị hiển thị
      selectValue.innerText = this.innerText;

      // Cập nhật giá trị select gốc
      selectElement.value = this.dataset.value;

      // Highlight option đã chọn
      Array.from(selectElement.options).forEach((opt) => {
        if (opt.value === this.dataset.value) {
          opt.selected = true;
        } else {
          opt.selected = false;
        }
      });

      // Update active state trong dropdown tùy chỉnh
      customDropdown.querySelectorAll(".dropdown-item").forEach((i) => {
        i.classList.remove("active");
      });
      this.classList.add("active");

      // Đóng dropdown
      closeDropdown();

      // Thêm hiệu ứng đã chọn cho selectValue
      selectValue.classList.add("selected");
      setTimeout(() => {
        selectValue.classList.remove("selected");
      }, 600);

      // Trigger change event
      const event = new Event("change", { bubbles: true });
      selectElement.dispatchEvent(event);
    });

    customDropdown.appendChild(item);
  });

  // 6. Thêm phần tử vào DOM
  skillsSelect.appendChild(selectValue);
  skillsSelect.appendChild(customDropdown);

  // 7. Xử lý mở/đóng dropdown
  function openDropdown() {
    skillsSelect.classList.add("active");
    dropdownOverlay.classList.add("active");

    // Scroll tới item đang active (đã chọn)
    const activeItem = customDropdown.querySelector(".dropdown-item.active");
    if (activeItem) {
      setTimeout(() => {
        activeItem.scrollIntoView({ block: "center", behavior: "auto" });
      }, 100);
    }
  }

  function closeDropdown() {
    skillsSelect.classList.remove("active");
    dropdownOverlay.classList.remove("active");
  }

  // 8. Handle clicks
  selectValue.addEventListener("click", function (e) {
    e.stopPropagation();
    if (skillsSelect.classList.contains("active")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  dropdownOverlay.addEventListener("click", closeDropdown);
  document.addEventListener("click", function (e) {
    if (!skillsSelect.contains(e.target)) {
      closeDropdown();
    }
  });

  // 9. Xử lý keyboard
  document.addEventListener("keydown", function (e) {
    if (!skillsSelect.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeDropdown();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const items = customDropdown.querySelectorAll(".dropdown-item");
      const activeItem = customDropdown.querySelector(".dropdown-item.active");
      let index = -1;

      if (activeItem) {
        for (let i = 0; i < items.length; i++) {
          if (items[i] === activeItem) {
            index = i;
            break;
          }
        }
      }

      if (e.key === "ArrowDown") {
        index = (index + 1) % items.length;
      } else {
        index = (index - 1 + items.length) % items.length;
      }

      if (items[index]) {
        items[index].click();
        items[index].scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    } else if (e.key === "Enter") {
      const activeItem = customDropdown.querySelector(".dropdown-item.active");
      if (activeItem) {
        activeItem.click();
      }
    }
  });
}

// Khởi tạo khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", function () {
  initCustomDropdown();

  // Code cho search input
  const searchInput = document.querySelector(".seacrch-block input");
  const searchBlock = document.querySelector(".seacrch-block");
  const searchBar = document.querySelector(".search-bar");

  if (searchInput && searchBlock && searchBar) {
    searchInput.addEventListener("focus", () => {
      searchBlock.classList.add("focused");
      searchBar.classList.add("focused");
    });

    searchInput.addEventListener("blur", () => {
      searchBlock.classList.remove("focused");
      searchBar.classList.remove("focused");
    });
  }

  // Ripple cho search button
  const searchBtn = document.querySelector(".search-btn button");
  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      const x = e.clientX - this.getBoundingClientRect().left;
      const y = e.clientY - this.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);

      // Hiệu ứng tìm kiếm
      searchBar.classList.add("searching");
      setTimeout(() => {
        searchBar.classList.remove("searching");
      }, 800);
    });
  }
});

// Skill-group
document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra các skills-group khi scroll
  const skillsGroups = document.querySelectorAll(".skills-group");

  // Hàm kiểm tra phần tử có trong viewport không
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  }

  // Hàm xử lý sự kiện scroll
  function handleScroll() {
    skillsGroups.forEach((group) => {
      if (isInViewport(group) && !group.classList.contains("visible")) {
        group.classList.add("visible");
      }
    });
  }

  // Kích hoạt ngay khi trang tải để kiểm tra các phần tử ban đầu
  handleScroll();

  // Kích hoạt khi scroll
  window.addEventListener("scroll", handleScroll);
});

//   END SECTION 2
