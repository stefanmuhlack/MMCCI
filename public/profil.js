
const id = new URLSearchParams(window.location.search).get('id');
document.getElementById('profilName').textContent = "Profil: " + id;

let currentTab = "analyse";

async function loadContent() {
  if (!id) return;
  const container = document.getElementById('content');
  container.innerHTML = "<p>Lade " + currentTab + "...</p>";

  if (currentTab === "analyse") {
    const res = await fetch("/api/analyse/" + id);
    const text = await res.text();
    container.innerHTML = `<pre style="white-space:pre-wrap;">${text}</pre>`;
  } else if (currentTab === "einträge") {
    const res = await fetch("/api/sg-einträge/" + id);
    const einträge = await res.json();
    container.innerHTML = einträge.map(e => `
      <div class="card" style="background:#2a2a2a;margin-bottom:10px;">
        <b>${e.datum}</b><br>
        <i>${e.situation}</i><br>
        <small>${e.notiz}</small>
      </div>
    `).join('');
  } else if (currentTab === "empfehlung") {
    const res = await fetch("/api/empfehlung/" + id, { method: "POST" });
    const out = await res.json();
    container.innerHTML = `<pre style="white-space:pre-wrap;">${out.content}</pre>`;
  }
}

function switchTab(tab) {
  currentTab = tab;
  loadContent();
}

document.addEventListener("DOMContentLoaded", () => {
  switchTab("analyse");
});
