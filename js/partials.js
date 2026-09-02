document.addEventListener('DOMContentLoaded', () => {
  const fallbackHeader = () => (
    '<header>\n' +
    '  <div class="container navbar">\n' +
    '    <div class="logo">\n' +
    '      <a href="index.html"><img src="images/logo-white.png" alt="XOCLASS Logo"></a>\n' +
    '    </div>\n' +
    '    <nav>\n' +
    '      <ul class="nav-links">\n' +
    '        <li><a href="index.html">Home</a></li>\n' +
    '        <li><a href="about.html">About Us</a></li>\n' +
    '        <li><a href="values.html">Our Values</a></li>\n' +
    '        <li><a href="commitment.html">Commitment</a></li>\n' +
    '      </ul>\n' +
    '    </nav>\n' +
    '  </div>\n' +
    '</header>'
  );

  const fallbackFooter = () => (
    '<footer>\n' +
    '  <div class="container">\n' +
    '    <p>&copy; 2025 XOCLASS. All rights reserved.</p>\n' +
    '  </div>\n' +
    '</footer>'
  );
  const inject = (elId, url, after) => {
    const el = document.getElementById(elId);
    if (!el) return;
    fetch(url)
      .then(r => r.text())
      .then(html => {
        el.innerHTML = html;
        if (after) after(el);
      })
      .catch(() => {
        el.innerHTML = elId === 'site-header' ? fallbackHeader() : fallbackFooter();
        if (after) after(el);
      });
  };

  const setActiveLink = (root) => {
    const current = location.pathname.split('/').pop() || 'index.html';
    const links = root.querySelectorAll('.nav-links a');
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      const target = href.split('/').pop();
      if (target === current || (current === '' && target === 'index.html')) {
        a.classList.add('active');
      }
    });
  };

  inject('site-header', 'partials/header.html', setActiveLink);
  inject('site-footer', 'partials/footer.html');
});
