
document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('/api/profiles');
  const ids = await res.json();
  const container = document.getElementById('profileContainer');

  for (const id of ids) {
    const data = await fetch(`/api/profil/${id}`).then(r => r.json());
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3>${data.vorname} ${data.nachname}</h3>
      <small>${data.beruf}</small>
      <p>👨‍👩‍👧 ${data.familie}<br>❤️ ${data.partnerschaft}</p>
      <p style="font-size:0.9em; color:#aaa;">${data.beschreibung.slice(0, 120)}...</p>
      <button onclick="alert('Details für ${id} laden')">➡ Öffnen</button>
    `;
    container.appendChild(div);
  }
});
