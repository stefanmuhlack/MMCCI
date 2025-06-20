// JS Platzhalter
fetch('/api/session')
  .then(res => res.json())
  .then(data => {
    document.getElementById('sidebarUser').textContent = data.user?.username || 'Unbekannt';
  });
