document.addEventListener("DOMContentLoaded", function () {
  // --- Code cho panel radio buttons và links ---
  const panel = document.querySelector(".cv-panel");
  if (panel) {
    // Kiểm tra xem panel có tồn tại không
    const links = panel.querySelectorAll("a"); // Lấy tất cả thẻ a trong panel
    const radioButtons = panel.querySelectorAll(
      'input[type="radio"][name="source"]'
    );

    // Hàm cập nhật hiển thị link dựa trên radio button
    function updateLinkVisibility() {
      const selectedValue = panel.querySelector(
        'input[type="radio"][name="source"]:checked'
      )?.value;

      // Ẩn tất cả các link trước
      links.forEach((link) => (link.style.display = "none"));

      if (selectedValue === "linkedin") {
        const linkedInLink = Array.from(links).find((link) =>
          link.textContent.includes("LinkedIn")
        );
        if (linkedInLink) linkedInLink.style.display = "inline-block";
      } else if (selectedValue === "template") {
        const computerLink = Array.from(links).find((link) =>
          link.textContent.includes("Tải CV từ máy tính")
        );
        if (computerLink) computerLink.style.display = "inline-block";
      }
    }

    radioButtons.forEach((radio) => {
      radio.addEventListener("change", updateLinkVisibility);
    });
    updateLinkVisibility();
  }

  // --- Code cho IntersectionObserver ---
  const items = document.querySelectorAll(".job-item");
  if (items.length > 0) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((i) => obs.observe(i));
  }

  // --- Code cho xuất PDF ---
  const exportPdfButton = document.getElementById("export-pdf-btn");
  const cvPreviewElement = document.querySelector(".cv-preview");

  if (exportPdfButton && cvPreviewElement) {
    exportPdfButton.addEventListener("click", function () {
      console.log("Nút Xuất PDF được nhấp!");
      const cvPanelToHide = document.querySelector(".cv-panel");
      const headerToHide = document.querySelector(".header");
      const sectionTitleToHide = document.querySelector(".section-title");

      let originalPanelDisplay = "",
        originalHeaderDisplay = "",
        originalSectionTitleDisplay = "";

      if (cvPanelToHide) {
        originalPanelDisplay = cvPanelToHide.style.display;
        cvPanelToHide.style.display = "none";
      }
      if (headerToHide) {
        originalHeaderDisplay = headerToHide.style.display;
        headerToHide.style.display = "none";
      }
      if (sectionTitleToHide) {
        originalSectionTitleDisplay = sectionTitleToHide.style.display;
        sectionTitleToHide.style.display = "none";
      }

      // Lưu trữ style gốc của cvPreviewElement
      const originalCvPreviewStyles = {
        maxHeight: cvPreviewElement.style.maxHeight,
        overflowY: cvPreviewElement.style.overflowY,
        height: cvPreviewElement.style.height,
        paddingRight: cvPreviewElement.style.paddingRight,
      };

      // Tạm thời thay đổi style của cvPreviewElement để hiển thị toàn bộ nội dung
      cvPreviewElement.style.maxHeight = "none";
      cvPreviewElement.style.overflowY = "visible"; // Hoặc 'initial'
      cvPreviewElement.style.height = "auto";
      cvPreviewElement.style.paddingRight = "0px"; // Bỏ padding dành cho scrollbar

      function restoreOriginalStyles() {
        if (cvPanelToHide) cvPanelToHide.style.display = originalPanelDisplay;
        if (headerToHide) headerToHide.style.display = originalHeaderDisplay;
        if (sectionTitleToHide)
          sectionTitleToHide.style.display = originalSectionTitleDisplay;

        cvPreviewElement.style.maxHeight = originalCvPreviewStyles.maxHeight;
        cvPreviewElement.style.overflowY = originalCvPreviewStyles.overflowY;
        cvPreviewElement.style.height = originalCvPreviewStyles.height;
        cvPreviewElement.style.paddingRight =
          originalCvPreviewStyles.paddingRight;
      }

      if (
        typeof window.jspdf === "undefined" ||
        typeof window.jspdf.jsPDF === "undefined"
      ) {
        console.error("Thư viện jsPDF chưa được tải hoặc không đúng cách!");
        alert(
          "Lỗi: Không thể xuất PDF. Vui lòng thử lại sau hoặc kiểm tra kết nối mạng."
        );
        restoreOriginalStyles();
        return;
      }

      html2canvas(cvPreviewElement, {
        scale: 2,
        useCORS: true,
        logging: true,
        // Các tùy chọn này có thể giúp html2canvas nhận diện đúng kích thước đầy đủ
        // sau khi đã thay đổi style của element.
        // windowHeight: cvPreviewElement.scrollHeight, // Chiều cao cửa sổ ảo bằng chiều cao cuộn của element
        // height: cvPreviewElement.scrollHeight, // Chiều cao canvas bằng chiều cao cuộn của element
      })
        .then((canvas) => {
          console.log("html2canvas đã hoàn thành, canvas được tạo.");
          const imgData = canvas.toDataURL("image/png");
          const { jsPDF } = window.jspdf;
          console.log("jsPDF đã được khởi tạo.");

          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = 210;
          const pdfHeight = 297;
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;

          const canvasAspectRatio = canvasWidth / canvasHeight;
          let imgRenderWidth = pdfWidth;
          let imgRenderHeight = imgRenderWidth / canvasAspectRatio;

          if (imgRenderHeight > pdfHeight && canvasHeight > 0) {
            // Thêm kiểm tra canvasHeight > 0
            // Xử lý trường hợp nội dung dài hơn 1 trang
            console.warn(
              "Nội dung CV dài hơn một trang A4. Đang chia thành nhiều trang."
            );
            let position = 0;
            // Chiều cao của một trang PDF quy đổi ra pixel của canvas gốc
            // dựa trên việc scale chiều rộng của canvas cho vừa pdfWidth
            const pageHeightInPixels = (pdfHeight * canvasWidth) / pdfWidth;

            while (position < canvasHeight) {
              const sourceY = position;
              const sourceHeight = Math.min(
                pageHeightInPixels,
                canvasHeight - position
              );

              const tempCanvas = document.createElement("canvas");
              tempCanvas.width = canvasWidth;
              tempCanvas.height = sourceHeight;
              const tempCtx = tempCanvas.getContext("2d");
              tempCtx.drawImage(
                canvas,
                0,
                sourceY,
                canvasWidth,
                sourceHeight,
                0,
                0,
                canvasWidth,
                sourceHeight
              );

              const pageImgData = tempCanvas.toDataURL("image/png");

              if (position > 0) {
                pdf.addPage();
              }
              // Thêm ảnh vào trang PDF, scale để vừa chiều rộng (pdfWidth),
              // chiều cao sẽ được tính toán để giữ tỷ lệ của phần ảnh được cắt (sourceHeight)
              pdf.addImage(
                pageImgData,
                "PNG",
                0,
                0,
                pdfWidth,
                sourceHeight * (pdfWidth / canvasWidth)
              );
              position += sourceHeight;
            }
          } else if (canvasHeight > 0) {
            // Nếu CV vừa trong 1 trang và có nội dung
            const xOffset = (pdfWidth - imgRenderWidth) / 2;
            const yOffset = (pdfHeight - imgRenderHeight) / 2;
            pdf.addImage(
              imgData,
              "PNG",
              xOffset,
              yOffset,
              imgRenderWidth,
              imgRenderHeight
            );
          } else {
            console.warn("Canvas không có chiều cao, không thể thêm vào PDF.");
          }

          console.log("Chuẩn bị lưu PDF...");
          pdf.save("cv_superstars.pdf");
          console.log("Lệnh pdf.save() đã được gọi.");

          restoreOriginalStyles();
        })
        .catch((error) => {
          console.error("Lỗi trong quá trình html2canvas hoặc jsPDF:", error);
          alert("Đã xảy ra lỗi khi xuất PDF. Vui lòng thử lại.");
          restoreOriginalStyles();
        });
    });
  } else {
    if (!exportPdfButton) console.error("Nút 'export-pdf-btn' không tìm thấy.");
    if (!cvPreviewElement)
      console.error("Phần tử '.cv-preview' không tìm thấy.");
  }
});
