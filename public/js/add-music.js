async function searchMusicAPI() {
  const query = document.getElementById("apiSearchInput").value.trim();
  if (!query) return;
  try {
    const response = await fetch("/music/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) throw new Error("Erro na resposta da API");
    const data = await response.json();
    displayAPIResults(data.results);
  } catch (error) {
    console.error("Error searching:", error);
    showNotification("Erro ao buscar músicas na API", "error");
  }
}

function displayAPIResults(results) {
  const container = document.getElementById("apiResults");
  container.innerHTML = "";
  if (!results || results.length === 0) {
    container.innerHTML = '<p class="empty-state">Nenhum resultado encontrado</p>';
    return;
  }
  results.forEach(result => {
    const div = document.createElement("div");
    div.className = "api-result-item";
    div.innerHTML = `
      <img src="${result.coverUrl || '/placeholder.svg'}" alt="${result.title}" class="api-result-cover"/>
      <div class="api-result-info">
        <strong>${result.title || "Desconhecido"}</strong>
        <p>${result.artist || "Artista desconhecido"}</p>
      </div>
    `;
    div.addEventListener("click", () => {
      console.log("ID enviado:", result.id);
      fetchMusicDetails(result.id)
    });
    container.appendChild(div);
  });
}

async function fetchMusicDetails(id) {
  try {
    const response = await fetch("/music/api/fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) throw new Error("Erro ao buscar detalhes");
    const data = await response.json();
    fillFormWithAPIData(data);
  } catch (error) {
    console.error("Error fetching details:", error);
    showNotification("Erro ao carregar detalhes da música", "error");
  }
}

function fillFormWithAPIData(data) {
  document.getElementById("title").value = data.title || "";
  document.getElementById("artist").value = data.artist || "";
  document.getElementById("genre").value = data.genre || "Pop";
  document.getElementById("coverUrl").value = data.coverUrl || data.albumArt || "";
  document.getElementById("duration").value = data.duration || 0;
  showNotification("Formulário preenchido com a música selecionada");
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

async function submitManualForm(event) {
  event.preventDefault();
  const formData = {
    title: document.getElementById("title").value.trim(),
    artist: document.getElementById("artist").value.trim(),
    genre: document.getElementById("genre").value.trim(),
    coverUrl: document.getElementById("coverUrl").value.trim(),
    duration: parseInt(document.getElementById("duration").value) || 0,
  };
  try {
    const response = await fetch("/music/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Erro ao adicionar música");
    const data = await response.json();
    if (data.success) {
      showNotification("Música adicionada com sucesso");
      setTimeout(() => (window.location.href = "/music/library"), 1500);
    }
  } catch (error) {
    console.error("Error adding music:", error);
    showNotification("Erro ao adicionar música", "error");
  }
}

document.getElementById("manualMusicForm").addEventListener("submit", submitManualForm);
document.getElementById("apiSearchInput").addEventListener("keypress", e => {
  if (e.key === "Enter") searchMusicAPI();
});
document.querySelector(".btn-primary").addEventListener("click", searchMusicAPI);
window.searchMusicAPI = searchMusicAPI;
window.fetchMusicDetails = fetchMusicDetails;