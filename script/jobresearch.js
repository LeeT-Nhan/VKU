document.addEventListener('DOMContentLoaded', function() {
  initSearchClearButton();
  initCustomCategoryDropdown();
  initCustomLocationDropdown();
  updateJobStats();
  initFilterCheckboxes();
  initFilterRadioButtons();
  enhanceAOSAnimations(); // Thêm hàm mới cho animation
});

// 1) Xóa nội dung ô tìm kiếm
function initSearchClearButton() {
  const searchInput = document.querySelector('.search-bar .enter-box');
  const clearIcon   = document.querySelector('.search-bar .fa-delete-left');
  if (!searchInput || !clearIcon) return;

  clearIcon.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    clearIcon.style.display = 'none';
  });

  searchInput.addEventListener('input', () => {
    clearIcon.style.display = searchInput.value ? 'block' : 'none';
  });

  // trạng thái ban đầu
  clearIcon.style.display = searchInput.value ? 'block' : 'none';
}

// 2) Dropdown tùy chỉnh cho "category"
function initCustomCategoryDropdown() {
  const select = document.getElementById('category-works');
  if (!select) return;
  const container = select.closest('.category');
  buildCustomDropdown(select, container);
}

// 3) Dropdown tùy chỉnh cho "location"
function initCustomLocationDropdown() {
  const select = document.getElementById('location-work');
  if (!select) return;
  const container = select.closest('.location-box');
  buildCustomDropdown(select, container);
}

// 4) Hàm chung build dropdown từ <select>
function buildCustomDropdown(selectEl, container) {
  // 1) Ẩn select gốc
  selectEl.style.display = 'none';

  // 2) Tạo & chèn div hiển thị giá trị
  const valueDiv = document.createElement('div');
  valueDiv.className = 'custom-select-value';
  valueDiv.textContent = selectEl.options[selectEl.selectedIndex].text;
  container.appendChild(valueDiv);

  // 3) Tạo dropdown list
  const dropdown = document.createElement('div');
  dropdown.className = 'custom-dropdown';
  Array.from(selectEl.options).forEach((opt, i) => {
    const a = document.createElement('a');
    a.href = 'javascript:void(0)';
    a.className = 'dropdown-item';
    a.textContent = opt.text;
    if (i === selectEl.selectedIndex) a.classList.add('active');
    a.addEventListener('click', e => {
      e.preventDefault();
      // ripple
      const r = document.createElement('span');
      r.className = 'ripple';
      const rect = a.getBoundingClientRect();
      r.style.left = (e.clientX - rect.left) + 'px';
      r.style.top  = (e.clientY - rect.top)  + 'px';
      a.appendChild(r);
      setTimeout(() => r.remove(), 600);

      // cập nhật select + UI
      selectEl.selectedIndex = i;
      valueDiv.textContent   = opt.text;
      dropdown.querySelectorAll('.dropdown-item').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      valueDiv.classList.add('selected');
      setTimeout(() => valueDiv.classList.remove('selected'), 600);

      closeAllDropdowns();
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
    });
    dropdown.appendChild(a);
  });
  container.appendChild(dropdown);

  // 4) overlay để click ngoài đóng
  let overlay = document.querySelector('.dropdown-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'dropdown-overlay';
    document.body.appendChild(overlay);
  }

  // 5) mở/đóng
  function open() {
    dropdown.classList.add('show');
    overlay.classList.add('active');
    container.querySelector('.fa-angle-down').style.transform = 'translateY(-50%) rotate(180deg)';
  }
  function close() {
    dropdown.classList.remove('show');
    overlay.classList.remove('active');
    container.querySelector('.fa-angle-down').style.transform = 'translateY(-50%) rotate(0deg)';
  }
  function toggle() {
    dropdown.classList.contains('show') ? close() : open();
  }

  valueDiv.addEventListener('click', e => { e.stopPropagation(); toggle(); });
  container.querySelectorAll('i.fa-angle-down').forEach(ic => ic.addEventListener('click', e => { e.stopPropagation(); toggle(); }));

  overlay.addEventListener('click', () => closeAllDropdowns());
  document.addEventListener('keydown', e => e.key === 'Escape' && closeAllDropdowns());

  // 6) scroll chỉ ngăn default khi overscroll (không gọi stopPropagation)
  dropdown.addEventListener('wheel', function(e) {
    const atTop    = this.scrollTop === 0 && e.deltaY < 0;
    const atBottom = this.scrollTop + this.clientHeight >= this.scrollHeight - 1 && e.deltaY > 0;
    if (atTop || atBottom) e.preventDefault();
  }, { passive: false });

  // 7) hỗ trợ touch trên mobile
  dropdown.addEventListener('touchmove', e => {/* không cần preventDefault */}, { passive: true });
}

// Đóng mọi dropdown đang mở
function closeAllDropdowns() {
  document.querySelectorAll('.custom-dropdown.show').forEach(dd => dd.classList.remove('show'));
  document.querySelectorAll('.dropdown-overlay.active').forEach(ov => ov.classList.remove('active'));
  document.querySelectorAll('.category .fa-angle-down, .location-box .fa-angle-down')
    .forEach(ic => ic.style.transform = 'translateY(-50%) rotate(0deg)');
}

// 8) Cập nhật số liệu việc làm
function updateJobStats() {
  // nếu bạn muốn hiển thị vào đâu đó, hãy chắc đã có <h2 class="search-job-header"></h2> trong HTML
  const el = document.querySelector('.search-job-header');
  if (!el) return;

  const now = new Date();
  const D = String(now.getDate()   ).padStart(2, '0');
  const M = String(now.getMonth()+1).padStart(2, '0');
  const Y = now.getFullYear();
  const formattedDate = `${D}/${M}/${Y}`;
  
  const base   = 13368;
  const change = Math.floor(Math.random()*200) - 100;
  const total  = (base + change).toLocaleString('vi-VN');
  
  el.textContent = `Tuyển dụng ${total} việc làm Nhân Viên Kinh Doanh [Update ${formattedDate}]`;
}

// SECTION 1 

// === SECTION 1 – FILTER CHECKBOXES & RADIO BUTTONS ===
function initFilterCheckboxes() {
  const items    = Array.from(document.querySelectorAll('.list-catgegory-job li'));
  const clearBtn = document.querySelector('.delete-filter');

  items.forEach((item, idx) => {
    item.addEventListener('click', () => {
      if (idx === 0) {
        // khi click "Tất cả"
        const isNowSelected = item.classList.toggle('selected');
        if (isNowSelected) {
          // bỏ chọn hết các mục khác
          items.slice(1).forEach(el => el.classList.remove('selected'));
        }
      } else {
        // khi click mục khác
        item.classList.toggle('selected');
        // bỏ chọn "Tất cả"
        items[0].classList.remove('selected');
        // nếu không còn mục nào được chọn, tự động chọn lại "Tất cả"
        const anyOtherSelected = items.slice(1).some(el => el.classList.contains('selected'));
        if (!anyOtherSelected) {
          items[0].classList.add('selected');
        }
      }
    });
  });

  // nút "Xoá lọc" cho danh mục
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      items.forEach(el => el.classList.remove('selected'));
      items[0]?.classList.add('selected');
    });
  }
}

function initFilterRadioButtons() {
  const filterLists = [
    '.sale-method',
    '.target-customer',
    '.filter-exp',
    '.filter-postion',
    '.filter-salary',
    '.filter-type',
    '.filter-company-type'
  ];

  filterLists.forEach(filterClass => {
    const items = document.querySelectorAll(`.section-1 ${filterClass} li`);
    items.forEach((item, idx) => {
      item.addEventListener('click', () => {
        if (idx === 0) {
          // click "Tất cả" trong nhóm radio
          items.forEach((el, i) => { if (i !== 0) el.classList.remove('selected'); });
          item.classList.add('selected');
        } else {
          // click mục khác
          items[0].classList.remove('selected');
          item.classList.toggle('selected');
          const someSelected = Array.from(items).slice(1).some(el => el.classList.contains('selected'));
          if (!someSelected) {
            items[0].classList.add('selected');
          }
        }
      });
    });
  });

  // nút Áp dụng cho salary custom
  const applyBtn = document.querySelector('.apply-salary');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const min = document.querySelector('input[name="salary-min"]').value;
      const max = document.querySelector('input[name="salary-max"]').value;
      if (min && max) {
        // bỏ chọn các mức salary mặc định
        document.querySelectorAll('.filter-salary li').forEach(el => el.classList.remove('selected'));
        console.log(`Đã áp dụng mức lương: ${min} - ${max} triệu`);
      }
    });
  }

  // nút "Xoá lọc" chung cho radio groups
  const clearBtn = document.querySelector('.delete-filter');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      filterLists.forEach(filterClass => {
        const items = document.querySelectorAll(`.section-1 ${filterClass} li`);
        items.forEach(el => el.classList.remove('selected'));
        items[0]?.classList.add('selected');
      });
      // reset input salary custom
      document.querySelectorAll('.custom-salary input').forEach(i => i.value = '');
    });
  }
}

// Khởi tạo AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,         // Thời gian chuyển động (ms)
    easing: 'ease-out-cubic', // Kiểu chuyển động
    once: false,           // Animation chỉ chạy một lần khi scroll
    offset: 50,            // Offset (px) từ edge của viewport
    delay: 50,             // Delay giữa các animation
    anchorPlacement: 'top-bottom' // Vị trí của element so với window
  });
});

// Hàm tăng cường hiệu ứng AOS cho section-1
function enhanceAOSAnimations() {
  // Tự động thêm thuộc tính animation cho job boxes
  const jobBoxes = document.querySelectorAll('.job-box');
  jobBoxes.forEach((box, index) => {
    // Xóa các thuộc tính AOS hiện có để tránh xung đột
    if (!box.hasAttribute('data-aos')) {
      box.setAttribute('data-aos', 'fade-up');
      box.setAttribute('data-aos-delay', (100 + index * 50).toString());
      box.setAttribute('data-aos-duration', '600');
    }
  });
  
  // Làm mới AOS để áp dụng các thuộc tính mới
  AOS.refresh();
  
  // Thêm hiệu ứng animation khi scroll cho job boxes
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + window.innerHeight * 0.8;
    
    jobBoxes.forEach(box => {
      const boxPosition = box.getBoundingClientRect().top + window.scrollY;
      
      if (scrollPosition > boxPosition && !box.classList.contains('animated-in')) {
        box.classList.add('animated-in');
      }
    });
  });

  // Thêm hiệu ứng trượt vào từ trái sang cho các mục filter
  const filterItems = document.querySelectorAll('.section-1 .list-catgegory-job li, .section-1 [class*="filter"] li');
  filterItems.forEach((item, index) => {
    item.style.animationDelay = (0.1 + index * 0.05) + 's';
  });
}

