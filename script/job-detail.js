// SEARCH BAR 
document.addEventListener('DOMContentLoaded', function() {
    initSearchClearButton();
    initCustomCategoryDropdown();
    initCustomLocationDropdown();
    updateJobStats();
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
//   SEARCH BAR 

document.addEventListener('DOMContentLoaded', function() {
  initSearchClearButton();
  initCustomCategoryDropdown();
  initCustomLocationDropdown();
  updateJobStats();
  initSafeAOS(); // Thêm khởi tạo AOS an toàn
});

// Khởi tạo AOS an toàn không gây lỗi hiển thị
function initSafeAOS() {
  AOS.init({
      duration: 800,         // Thời gian animation (ms)
      easing: 'ease-out',    // Kiểu hiệu ứng mượt mà
      once: true,            // Animation chỉ chạy một lần
      offset: 50,            // Giảm offset để tránh vấn đề hiển thị
      delay: 0,              // Không delay mặc định
      anchorPlacement: 'top-bottom' // Thay đổi điểm neo để hiển thị tốt hơn
  });

  // Thêm sự kiện để làm mới AOS khi resize cửa sổ
  window.addEventListener('resize', function() {
      setTimeout(function() {
          AOS.refresh();
      }, 100);
  });
  
  // Đảm bảo AOS không gây lỗi sau khi tải trang
  window.addEventListener('load', function() {
      AOS.refresh();
  });

  // Fix cho footer
  const footer = document.querySelector('footer');
  if (footer) {
      footer.removeAttribute('data-aos');
      footer.style.opacity = 1;
  }
}

// Thêm class animation không phụ thuộc AOS để tránh xung đột
document.addEventListener('scroll', function() {
  const elements = document.querySelectorAll('.job-detail-info, .item-salary, .item-location, .item-exp, .detail-company');
  
  elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top <= windowHeight * 0.85 && !element.classList.contains('animated')) {
          element.classList.add('animated');
          element.style.opacity = 1;
      }
  });
});