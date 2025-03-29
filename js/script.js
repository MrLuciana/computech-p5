// ฟังก์ชันสำหรับโหลดส่วนประกอบต่างๆ จากไฟล์ HTML
function loadHTMLComponents() {
  // โหลด head
  fetch('includes/head.html')
    .then(response => {
      if (!response.ok) throw new Error(`Cannot load head: ${response.status}`);
      return response.text();
    })
    .then(data => {
      document.getElementById("head-content").innerHTML = data;
    })
    .catch(error => console.error('Error loading head:', error));

  // โหลด navbar
  fetch('includes/navbar.html')
    .then(response => {
      if (!response.ok) throw new Error(`Cannot load navbar: ${response.status}`);
      return response.text();
    })
    .then(data => {
      document.getElementById("navbar-content").innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar:', error));

  // โหลด sidebar
  fetch('includes/sidebar.html')
    .then(response => {
      if (!response.ok) throw new Error(`Cannot load sidebar: ${response.status}`);
      return response.text();
    })
    .then(data => {
      document.getElementById("sidebar-content").innerHTML = data;
      initSidebar(); // เรียกใช้ฟังก์ชันจัดการ sidebar
    })
    .catch(error => {
      console.error('Error loading sidebar:', error);
      document.getElementById("sidebar-content").innerHTML = 
        '<div class="alert alert-danger">โหลดเมนูไม่สำเร็จ</div>';
    });

  // โหลด footer
  fetch('includes/footer.html')
    .then(response => {
      if (!response.ok) throw new Error(`Cannot load footer: ${response.status}`);
      return response.text();
    })
    .then(data => {
      document.getElementById("footer-content").innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
}

// ฟังก์ชันจัดการ Sidebar
// ในส่วนของฟังก์ชัน initSidebar()
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('main');
  const sidebarToggle = document.getElementById('sidebarToggle');

  // ตรวจสอบสถานะจาก localStorage
  const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  
  // ตั้งค่าสถานะเริ่มต้น
  if (isCollapsed) {
    collapseSidebar(sidebar, mainContent);
  }

  // จัดการเหตุการณ์คลิกปุ่ม toggle
  sidebarToggle.addEventListener('click', () => {
    if (sidebar.classList.contains('sidebar-collapsed')) {
      expandSidebar(sidebar, mainContent);
    } else {
      collapseSidebar(sidebar, mainContent);
    }
  });

  // สำหรับหน้าจอขนาดเล็ก
  window.addEventListener('resize', () => {
    adjustLayout(sidebar, mainContent);
  });
}

function collapseSidebar(sidebar, mainContent) {
  sidebar.classList.add('sidebar-collapsed');
  mainContent.style.width = '100%';
  localStorage.setItem('sidebarCollapsed', 'true');
}

function expandSidebar(sidebar, mainContent) {
  sidebar.classList.remove('sidebar-collapsed');
  mainContent.style.width = 'calc(100% - 250px)';
  localStorage.setItem('sidebarCollapsed', 'false');
}

function adjustLayout(sidebar, mainContent) {
  if (window.innerWidth < 768) {
    mainContent.style.width = '100%';
  } else {
    if (sidebar.classList.contains('sidebar-collapsed')) {
      mainContent.style.width = '100%';
    } else {
      mainContent.style.width = 'calc(100% - 250px)';
    }
  }
}


// ปรับเนื้อหาหลักเมื่อ sidebar เปลี่ยนขนาด
function adjustMainContent() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('main');
  
  if (window.innerWidth >= 768) {
    if (sidebar.classList.contains('sidebar-collapsed')) {
      mainContent.style.marginLeft = '0';
    } else {
      mainContent.style.marginLeft = '25%';
    }
  }
}

// เพิ่ม listener สำหรับการเปลี่ยนขนาดหน้าจอ
window.addEventListener('resize', adjustMainContent);


// ฟังก์ชันเปลี่ยนโหมดสี
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// เรียกใช้ฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
  loadHTMLComponents();
  
  // ตรวจสอบการตั้งค่าโหมดสีจาก localStorage
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  
  // เปิดใช้งาน tooltips และ popovers ของ Bootstrap
  [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    .forEach(el => new bootstrap.Tooltip(el));
  
  [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    .forEach(el => new bootstrap.Popover(el));
});
