// Dark mode functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
  
  // Create dark mode toggle
  const navbar = document.querySelector('.navbar-custom .navbar-nav');
  if (navbar) {
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'dark-mode-toggle nav-item';
    
    const toggleIcon = document.createElement('span');
    toggleIcon.className = 'toggle-icon';
    toggleIcon.innerHTML = document.documentElement.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️';
    
    const toggleTrack = document.createElement('span');
    toggleTrack.className = 'toggle-track';
    
    toggleContainer.appendChild(toggleIcon);
    toggleContainer.appendChild(toggleTrack);
    
    // Add toggle to navbar
    navbar.appendChild(toggleContainer);
    
    // Toggle functionality
    toggleContainer.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      toggleIcon.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
    });
  }
});
