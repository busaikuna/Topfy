function renderHTML(currentUser) {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Topfy - Sistema de Recomendação de Músicas</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --bg-primary: #0a0e27;
            --bg-secondary: #151932;
            --bg-card: #1e2139;
            --accent: #00d4ff;
            --accent-hover: #00b8e6;
            --success: #00ff88;
            --danger: #ff4757;
            --warning: #ffa502;
            --text-primary: #ffffff;
            --text-secondary: #b8c5d6;
            --text-muted: #6c7a89;
            --border: #2d3561;
            --shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.6);
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0a0e27 0%, #1a1d3e 100%);
            min-height: 100vh;
            color: var(--text-primary);
            line-height: 1.6;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: var(--bg-card);
            padding: 24px 32px;
            border-radius: 16px;
            box-shadow: var(--shadow);
            margin-bottom: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
            border: 1px solid var(--border);
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, var(--accent), var(--success));
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .header h1 {
            font-size: 28px;
            background: linear-gradient(135deg, var(--accent), var(--success));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .badge {
            padding: 8px 16px;
            border-radius: 24px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .badge-admin {
            background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
            color: white;
        }

        .badge-listener {
            background: linear-gradient(135deg, var(--accent), #0066ff);
            color: white;
        }

        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            display: inline-block;
            position: relative;
            overflow: hidden;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            transition: left 0.3s;
        }

        .btn:hover::before {
            left: 100%;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--accent), #0066ff);
            color: white;
        }

        .btn-danger {
            background: linear-gradient(135deg, var(--danger), #c23616);
            color: white;
        }

        .btn-success {
            background: linear-gradient(135deg, var(--success), #00b894);
            color: var(--bg-primary);
        }

        .btn-sm {
            padding: 8px 16px;
            font-size: 13px;
        }

        .login-container {
            max-width: 450px;
            margin: 120px auto;
            background: var(--bg-card);
            padding: 48px;
            border-radius: 20px;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border);
        }

        .login-header {
            text-align: center;
            margin-bottom: 40px;
        }

        .login-header h2 {
            font-size: 32px;
            margin-bottom: 12px;
            background: linear-gradient(135deg, var(--accent), var(--success));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .login-header p {
            color: var(--text-secondary);
            font-size: 14px;
        }

        .form-group {
            margin-bottom: 24px;
        }

        .form-group label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
            color: var(--text-primary);
            font-size: 14px;
        }

        .form-control {
            width: 100%;
            padding: 14px 16px;
            background: var(--bg-secondary);
            border: 2px solid var(--border);
            border-radius: 12px;
            font-size: 15px;
            color: var(--text-primary);
            transition: all 0.3s;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 4px rgba(0, 212, 255, 0.1);
        }

        .alert {
            padding: 14px 18px;
            border-radius: 12px;
            margin-bottom: 24px;
            font-size: 14px;
            display: none;
        }

        .alert.show {
            display: block;
        }

        .alert-error {
            background: rgba(255, 71, 87, 0.15);
            color: var(--danger);
            border: 1px solid rgba(255, 71, 87, 0.3);
        }

        .alert-success {
            background: rgba(0, 255, 136, 0.15);
            color: var(--success);
            border: 1px solid rgba(0, 255, 136, 0.3);
        }

        .content {
            background: var(--bg-card);
            border-radius: 20px;
            box-shadow: var(--shadow);
            overflow: hidden;
            border: 1px solid var(--border);
        }

        .tabs {
            display: flex;
            background: var(--bg-secondary);
            border-bottom: 2px solid var(--border);
            overflow-x: auto;
        }

        .tab {
            flex: 1;
            min-width: 150px;
            padding: 18px 24px;
            background: transparent;
            border: none;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            color: var(--text-muted);
            transition: all 0.3s;
            position: relative;
        }

        .tab::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(135deg, var(--accent), var(--success));
            transform: scaleX(0);
            transition: transform 0.3s;
        }

        .tab:hover {
            background: rgba(0, 212, 255, 0.05);
            color: var(--text-primary);
        }

        .tab.active {
            color: var(--accent);
        }

        .tab.active::after {
            transform: scaleX(1);
        }

        .tab-content {
            padding: 32px;
        }

        .tab-pane {
            display: none;
        }

        .tab-pane.active {
            display: block;
        }

        .filters {
            display: flex;
            gap: 12px;
            margin-bottom: 28px;
            flex-wrap: wrap;
        }

        .filter-btn {
            padding: 10px 20px;
            background: var(--bg-secondary);
            border: 2px solid var(--border);
            border-radius: 24px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            color: var(--text-secondary);
            transition: all 0.3s;
        }

        .filter-btn:hover, .filter-btn.active {
            background: linear-gradient(135deg, var(--accent), #0066ff);
            color: white;
            border-color: var(--accent);
            transform: translateY(-2px);
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 24px;
        }

        .music-card {
            background: var(--bg-secondary);
            border: 2px solid var(--border);
            border-radius: 16px;
            padding: 24px;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }

        .music-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(135deg, var(--accent), var(--success));
            transform: scaleY(0);
            transition: transform 0.3s;
        }

        .music-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
            border-color: var(--accent);
        }

        .music-card:hover::before {
            transform: scaleY(1);
        }

        .music-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 16px;
        }

        .music-title {
            font-size: 18px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 6px;
        }

        .music-artist {
            font-size: 14px;
            color: var(--text-secondary);
        }

        .genre-badge {
            padding: 6px 12px;
            background: rgba(0, 212, 255, 0.15);
            border-radius: 8px;
            font-size: 11px;
            font-weight: 700;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .music-info {
            display: flex;
            gap: 16px;
            margin: 16px 0;
            padding: 16px 0;
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
        }

        .info-item {
            flex: 1;
            text-align: center;
        }

        .info-label {
            font-size: 11px;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }

        .info-value {
            font-size: 15px;
            font-weight: 700;
            color: var(--text-primary);
        }

        .popularity-bar {
            width: 100%;
            height: 6px;
            background: var(--bg-primary);
            border-radius: 3px;
            overflow: hidden;
            margin-top: 4px;
        }

        .popularity-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--accent), var(--success));
            border-radius: 3px;
            transition: width 0.5s;
        }

        .sponsor-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: var(--bg-primary);
            border-radius: 8px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
        }

        .music-actions {
            display: flex;
            gap: 10px;
            margin-top: 16px;
        }

        .play-btn {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px;
            background: linear-gradient(135deg, var(--success), #00b894);
            border: none;
            border-radius: 12px;
            color: var(--bg-primary);
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .play-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 255, 136, 0.3);
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            margin-bottom: 32px;
        }

        .stat-card {
            background: linear-gradient(135deg, var(--bg-secondary), var(--bg-card));
            padding: 28px;
            border-radius: 16px;
            border: 2px solid var(--border);
            position: relative;
            overflow: hidden;
        }

        .stat-card::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
        }

        .stat-label {
            font-size: 13px;
            color: var(--text-muted);
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 1px;
            margin-bottom: 12px;
        }

        .stat-value {
            font-size: 36px;
            font-weight: 700;
            background: linear-gradient(135deg, var(--accent), var(--success));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 14, 39, 0.9);
            backdrop-filter: blur(10px);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: var(--bg-card);
            border-radius: 20px;
            max-width: 550px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: var(--shadow-lg);
            border: 2px solid var(--border);
        }

        .modal-header {
            padding: 24px 32px;
            border-bottom: 2px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-header h3 {
            font-size: 22px;
            background: linear-gradient(135deg, var(--accent), var(--success));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .close-btn {
            background: var(--bg-secondary);
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 10px;
            cursor: pointer;
            color: var(--text-secondary);
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }

        .close-btn:hover {
            background: var(--danger);
            color: white;
            transform: rotate(90deg);
        }

        .modal-body {
            padding: 32px;
        }

        .empty-state {
            text-align: center;
            padding: 80px 20px;
            color: var(--text-muted);
        }

        .empty-icon {
            font-size: 64px;
            margin-bottom: 20px;
            opacity: 0.3;
        }

        .login-info {
            background: var(--bg-secondary);
            padding: 24px;
            border-radius: 12px;
            margin-top: 28px;
            font-size: 13px;
            border: 1px solid var(--border);
        }

        .login-info strong {
            display: block;
            margin-bottom: 12px;
            color: var(--accent);
            font-size: 14px;
        }

        .login-info p {
            margin: 8px 0;
            color: var(--text-secondary);
        }

        .genre-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 16px;
            margin-top: 20px;
        }

        .genre-card {
            padding: 20px;
            background: var(--bg-secondary);
            border: 2px solid var(--border);
            border-radius: 12px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        }

        .genre-card:hover {
            background: linear-gradient(135deg, var(--accent), #0066ff);
            border-color: var(--accent);
            transform: translateY(-4px);
            box-shadow: var(--shadow);
        }

        .genre-icon {
            font-size: 32px;
            margin-bottom: 8px;
        }

        .genre-name {
            font-weight: 600;
            font-size: 14px;
        }

        .history-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            background: var(--bg-secondary);
            border-radius: 12px;
            margin-bottom: 12px;
            border: 1px solid var(--border);
        }

        .history-info h4 {
            font-size: 15px;
            margin-bottom: 4px;
        }

        .history-info p {
            font-size: 13px;
            color: var(--text-secondary);
        }

        .history-time {
            font-size: 12px;
            color: var(--text-muted);
        }

        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                text-align: center;
            }

            .tabs {
                flex-direction: column;
            }

            .grid {
                grid-template-columns: 1fr;
            }

            .stats {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    ${currentUser ? renderDashboard(currentUser) : renderLogin()}

    <script>
        let currentUser = ${currentUser ? JSON.stringify(currentUser.getProfile()) : "null"};
        let musics = [];
        let users = [];
        let currentFilter = 'Todas';

        async function register(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const data = Object.fromEntries(formData)

  // sempre cria como Listener
  data.type = "Listener"

  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (result.success) {
      showAlert("Conta criada com sucesso! Faça login.", "success")
      closeModal("registerModal")
      event.target.reset()
    } else {
      showAlert(result.message, "error")
    }
  } catch (error) {
    showAlert("Erro ao criar conta", "error")
  }
}

        // Carregar músicas
        async function loadMusics() {
            try {
                const response = await fetch('/api/musics');
                const data = await response.json();
                if (data.success) {
                    musics = data.musics;
                    renderMusics();
                    if (currentUser && currentUser.type === 'Administrator') {
                        loadStatistics();
                    }
                }
            } catch (error) {
                showAlert('Erro ao carregar músicas', 'error');
            }
        }

        // Login
        async function login(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (data.success) {
                    location.reload();
                } else {
                    showAlert(data.message, 'error');
                }
            } catch (error) {
                showAlert('Erro ao fazer login', 'error');
            }
        }

        // Logout
        async function logout() {
            try {
                await fetch('/api/logout', { method: 'POST' });
                location.reload();
            } catch (error) {
                showAlert('Erro ao fazer logout', 'error');
            }
        }

        // Filtrar músicas
        function filterMusics(genre) {
            currentFilter = genre;
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            renderMusics();
        }

        // Renderizar músicas
        function renderMusics() {
            const container = document.getElementById('musics-container');
            let filteredMusics = currentFilter === 'Todas' 
                ? musics 
                : musics.filter(m => m.genre === currentFilter);

            if (filteredMusics.length === 0) {
                container.innerHTML = '<div class="empty-state"><div class="empty-icon"></div><p>Nenhuma música encontrada</p></div>';
                return;
            }

            container.innerHTML = filteredMusics.map(music => {
                const maxPopularity = Math.max(...musics.map(m => m.popularity));
                const popularityPercent = (music.popularity / maxPopularity) * 100;
                
                return \`
                    <div class="music-card">
                        <div class="music-header">
                            <div>
                                <div class="music-title">\${music.title}</div>
                                <div class="music-artist">\${music.artist}</div>
                            </div>
                            <span class="genre-badge">\${music.genre}</span>
                        </div>
                        
                        \${music.type === 'SponsoredMusic' ? \`
                            <div class="sponsor-badge">
                                ⭐ \${music.sponsor}
                            </div>
                        \` : ''}
                        
                        <div class="music-info">
                            <div class="info-item">
                                <div class="info-label">Duração</div>
                                <div class="info-value">\${music.duration}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Plays</div>
                                <div class="info-value">\${music.popularity}</div>
                                <div class="popularity-bar">
                                    <div class="popularity-fill" style="width: \${popularityPercent}%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="music-actions">
                            <button class="play-btn" onclick="playMusic(\${music.id})">
                                ▶ Tocar
                            </button>
                            \${currentUser && currentUser.type === 'Administrator' ? \`
                                <button class="btn btn-danger btn-sm" onclick="removeMusic(\${music.id})">
                                    Remover
                                </button>
                            \` : ''}
                        </div>
                    </div>
                \`;
            }).join('');
        }

        // Tocar música (POLIMORFISMO em ação!)
        async function playMusic(id) {
            try {
                const response = await fetch(\`/api/play/\${id}\`, {
                    method: 'POST'
                });

                const data = await response.json();

                if (data.success) {
                    showAlert(\`Tocando: \${data.music.title}!\`, 'success');
                    await loadMusics();
                    if (currentUser && currentUser.type === 'Listener') {
                        loadHistory();
                        loadRecommendations();
                    }
                } else {
                    showAlert(data.message, 'error');
                }
            } catch (error) {
                showAlert('Erro ao tocar música', 'error');
            }
        }

        // Carregar recomendações
        async function loadRecommendations() {
            try {
                const response = await fetch('/api/recommendations');
                const data = await response.json();
                if (data.success) {
                    renderRecommendations(data.recommendations);
                }
            } catch (error) {
                console.error('Erro ao carregar recomendações');
            }
        }

        // Renderizar recomendações
        function renderRecommendations(recommendations) {
            const container = document.getElementById('recommendations-container');
            if (!container) return;

            if (recommendations.length === 0) {
                container.innerHTML = '<div class="empty-state"><div class="empty-icon">💡</div><p>Adicione preferências para receber recomendações personalizadas</p></div>';
                return;
            }

            container.innerHTML = recommendations.map(music => \`
                <div class="music-card">
                    <div class="music-header">
                        <div>
                            <div class="music-title">\${music.title}</div>
                            <div class="music-artist">\${music.artist}</div>
                        </div>
                        <span class="genre-badge">\${music.genre}</span>
                    </div>
                    <div class="music-info">
                        <div class="info-item">
                            <div class="info-label">Duração</div>
                            <div class="info-value">\${music.duration}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Popularidade</div>
                            <div class="info-value">\${music.popularity}</div>
                        </div>
                    </div>
                    <button class="play-btn" onclick="playMusic(\${music.id})">
                        ▶ Tocar
                    </button>
                </div>
            \`).join('');
        }

        // Adicionar preferência
        async function addPreference(genre) {
            try {
                const response = await fetch('/api/preferences', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ genre })
                });

                const data = await response.json();

                if (data.success) {
                    showAlert(\`Preferência "\${genre}" adicionada!\`, 'success');
                    loadRecommendations();
                }
            } catch (error) {
                showAlert('Erro ao adicionar preferência', 'error');
            }
        }

        // Carregar histórico
        async function loadHistory() {
            try {
                const response = await fetch('/api/history');
                const data = await response.json();
                if (data.success) {
                    renderHistory(data.history);
                }
            } catch (error) {
                console.error('Erro ao carregar histórico');
            }
        }

        // Renderizar histórico
        function renderHistory(history) {
            const container = document.getElementById('history-container');
            if (!container) return;

            if (history.length === 0) {
                container.innerHTML = '<div class="empty-state"><div class="empty-icon">📜</div><p>Seu histórico está vazio</p></div>';
                return;
            }

            container.innerHTML = history.reverse().map(item => \`
                <div class="history-item">
                    <div class="history-info">
                        <h4>\${item.title}</h4>
                        <p>\${item.artist} • \${item.genre}</p>
                    </div>
                    <div class="history-time">
                        \${new Date(item.playedAt).toLocaleString('pt-BR')}
                    </div>
                </div>
            \`).join('');
        }

        // Adicionar música
        async function addMusic(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch('/api/musics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    showAlert('Música adicionada com sucesso!', 'success');
                    closeModal('addMusicModal');
                    event.target.reset();
                    await loadMusics();
                } else {
                    showAlert(result.message, 'error');
                }
            } catch (error) {
                showAlert('Erro ao adicionar música', 'error');
            }
        }

        // Remover música
        async function removeMusic(id) {
            if (!confirm('Tem certeza que deseja remover esta música?')) return;

            try {
                const response = await fetch(\`/api/musics/\${id}\`, {
                    method: 'DELETE'
                });

                const data = await response.json();

                if (data.success) {
                    showAlert('Música removida com sucesso!', 'success');
                    await loadMusics();
                } else {
                    showAlert(data.message, 'error');
                }
            } catch (error) {
                showAlert('Erro ao remover música', 'error');
            }
        }

        // Carregar estatísticas
        async function loadStatistics() {
            try {
                const response = await fetch('/api/statistics');
                const data = await response.json();
                if (data.success) {
                    const stats = data.statistics;
                    document.getElementById('total-musics').textContent = stats.totalMusics;
                    document.getElementById('total-plays').textContent = stats.totalPlays;
                    
                    const topGenresContainer = document.getElementById('top-genres');
                    if (topGenresContainer && stats.topGenres.length > 0) {
                        topGenresContainer.innerHTML = stats.topGenres.slice(0, 3).map(g => 
                            \`<div>\${g.genre}: \${g.count}</div>\`
                        ).join('');
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar estatísticas');
            }
        }

        // Criar usuário
        async function createUser(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    showAlert('Usuário criado com sucesso!', 'success');
                    closeModal('createUserModal');
                    event.target.reset();
                    await loadUsers();
                } else {
                    showAlert(result.message, 'error');
                }
            } catch (error) {
                showAlert('Erro ao criar usuário', 'error');
            }
        }

        // Carregar usuários
        async function loadUsers() {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                if (data.success) {
                    users = data.users;
                    renderUsers();
                }
            } catch (error) {
                console.error('Erro ao carregar usuários');
            }
        }

        // Renderizar usuários
        function renderUsers() {
            const container = document.getElementById('users-container');
            if (!container) return;

            if (users.length === 0) {
                container.innerHTML = '<div class="empty-state"><div class="empty-icon">👥</div><p>Nenhum usuário encontrado</p></div>';
                return;
            }

            container.innerHTML = users.map(user => \`
                <div class="music-card">
                    <div class="music-header">
                        <div>
                            <div class="music-title">\${user.name}</div>
                            <div class="music-artist">\${user.email}</div>
                        </div>
                        <span class="badge badge-\${user.type.toLowerCase()}">\${user.type}</span>
                    </div>
                </div>
            \`).join('');
        }

        // Controle de abas
        function switchTab(tabName) {
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });

            event.target.classList.add('active');
            document.getElementById(tabName).classList.add('active');

            if (tabName === 'recommendations') {
                loadRecommendations();
            } else if (tabName === 'history') {
                loadHistory();
            } else if (tabName === 'users') {
                loadUsers();
            }
        }

        // Controle de modais
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('active');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
        }

        // Mostrar alertas
        function showAlert(message, type) {
            const alertDiv = document.createElement('div');
            alertDiv.className = \`alert alert-\${type} show\`;
            alertDiv.textContent = message;
            alertDiv.style.position = 'fixed';
            alertDiv.style.top = '20px';
            alertDiv.style.right = '20px';
            alertDiv.style.zIndex = '9999';
            alertDiv.style.minWidth = '300px';
            
            document.body.appendChild(alertDiv);
            
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
        }

        // Alternar tipo de música
        function toggleMusicType() {
            const type = document.getElementById('musicType').value;
            const sponsorField = document.getElementById('sponsorField');
            if (sponsorField) {
                sponsorField.style.display = type === 'SponsoredMusic' ? 'block' : 'none';
            }
        }

        // Inicialização
        if (currentUser) {
            loadMusics();
            if (currentUser.type === 'Listener') {
                loadRecommendations();
                loadHistory();
            }
        }
    </script>
</body>
</html>
  `
}

function renderLogin() {
    return `
    <div class="login-container">
        <div class="login-header">
            <h2>Topfy</h2>
            <p>Sistema de Recomendação de Músicas</p>
        </div>
        
        <div id="alert-container"></div>
        
        <form onsubmit="login(event)">
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="email" class="form-control" required>
            </div>
            
            <div class="form-group">
                <label>Senha</label>
                <input type="password" id="password" class="form-control" required>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%;">
                Entrar
            </button>

            <button 
  type="button" 
  class="btn btn-success" 
  style="width: 100%; margin-top: 16px;"
  onclick="openModal('registerModal')"
>
  Criar conta
</button>

        </form>
        
    </div>

    <div id="registerModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3>Criar Conta</h3>
      <button class="close-btn" onclick="closeModal('registerModal')">×</button>
    </div>
    <div class="modal-body">
      <form onsubmit="register(event)">
        <div class="form-group">
          <label>Nome</label>
          <input type="text" name="name" class="form-control" required>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" name="email" class="form-control" required>
        </div>

        <div class="form-group">
          <label>Senha</label>
          <input type="password" name="password" class="form-control" minlength="6" required>
        </div>

        <button type="submit" class="btn btn-success" style="width: 100%;">
          Criar conta
        </button>
      </form>
    </div>
  </div>
</div>
  `
}

function renderDashboard(user) {
    const profile = user.getProfile()
    const isAdmin = profile.type === "Administrator"
    const isListener = profile.type === "Listener"

    return `
    <div class="container">
        <header class="header">
            <div class="logo">
                <div class="logo-icon"></div>
                <h1>Topfy</h1>
            </div>
            
            <div class="user-info">
                <span>${profile.name}</span>
                <span class="badge badge-${profile.type.toLowerCase()}">${profile.type}</span>
                <button class="btn btn-danger" onclick="logout()">Sair</button>
            </div>
        </header>

        ${isAdmin
            ? `
        <div class="stats">
            <div class="stat-card">
                <div class="stat-label">Total de Músicas</div>
                <div class="stat-value" id="total-musics">0</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total de Plays</div>
                <div class="stat-value" id="total-plays">0</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Top Gêneros</div>
                <div id="top-genres" style="font-size: 14px; color: var(--text-secondary); margin-top: 10px;"></div>
            </div>
        </div>
        `
            : ""
        }

        <div class="content">
            <div class="tabs">
                <button class="tab active" onclick="switchTab('biblioteca')">Biblioteca</button>
                ${isListener ? '<button class="tab" onclick="switchTab(\'recommendations\')">Recomendações</button>' : ""}
                ${isListener ? '<button class="tab" onclick="switchTab(\'preferences\')">Preferências</button>' : ""}
                ${isListener ? '<button class="tab" onclick="switchTab(\'history\')">Histórico</button>' : ""}
                ${isAdmin ? '<button class="tab" onclick="switchTab(\'users\')">Usuários</button>' : ""}
            </div>

            <div class="tab-content">
                <!-- Biblioteca -->
                <div id="biblioteca" class="tab-pane active">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <h2 style="font-size: 24px;">Todas as Músicas</h2>
                        ${isAdmin
            ? '<button class="btn btn-success" onclick="openModal(\'addMusicModal\')">Adicionar Música</button>'
            : ""
        }
                    </div>
                    
                    <div class="filters">
                        <button class="filter-btn active" onclick="filterMusics('Todas')">Todas</button>
                        <button class="filter-btn" onclick="filterMusics('Pop')">Pop</button>
                        <button class="filter-btn" onclick="filterMusics('Rock')">Rock</button>
                        <button class="filter-btn" onclick="filterMusics('Soul')">Soul</button>
                    </div>
                    
                    <div id="musics-container" class="grid"></div>
                </div>

                ${isListener
            ? `
                <!-- Recomendações -->
                <div id="recommendations" class="tab-pane">
                    <h2 style="font-size: 24px; margin-bottom: 24px;">Recomendadas para Você</h2>
                    <div id="recommendations-container" class="grid"></div>
                </div>

                <!-- Preferências -->
                <div id="preferences" class="tab-pane">
                    <h2 style="font-size: 24px; margin-bottom: 16px;">Suas Preferências Musicais</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 32px;">Selecione os gêneros que você mais gosta para receber recomendações personalizadas</p>
                    
                    <div class="genre-grid">
                        <div class="genre-card" onclick="addPreference('Pop')">
                            <div class="genre-icon">🎤</div>
                            <div class="genre-name">Pop</div>
                        </div>
                        <div class="genre-card" onclick="addPreference('Rock')">
                            <div class="genre-icon">🎸</div>
                            <div class="genre-name">Rock</div>
                        </div>
                        <div class="genre-card" onclick="addPreference('Soul')">
                            <div class="genre-icon">🎹</div>
                            <div class="genre-name">Soul</div>
                        </div>
                    </div>
                </div>

                <!-- Histórico -->
                <div id="history" class="tab-pane">
                    <h2 style="font-size: 24px; margin-bottom: 24px;">Histórico de Reprodução</h2>
                    <div id="history-container"></div>
                </div>
                `
            : ""
        }

                ${isAdmin
            ? `
                <!-- Usuários -->
                <div id="users" class="tab-pane">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <h2 style="font-size: 24px;">Gerenciar Usuários</h2>
                        <button class="btn btn-success" onclick="openModal('createUserModal')">Criar Usuário</button>
                    </div>
                    <div id="users-container" class="grid"></div>
                </div>
                `
            : ""
        }
            </div>
        </div>
    </div>

    <!-- Modal Adicionar Música -->
    ${isAdmin
            ? `
    <div id="addMusicModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Adicionar Música</h3>
                <button class="close-btn" onclick="closeModal('addMusicModal')">×</button>
            </div>
            <div class="modal-body">
                <form onsubmit="addMusic(event)">
                    <div class="form-group">
                        <label>Tipo</label>
                        <select name="type" id="musicType" class="form-control" onchange="toggleMusicType()" required>
                            <option value="Music">Música Normal</option>
                            <option value="SponsoredMusic">Música Patrocinada</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>ID</label>
                        <input type="number" name="id" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Título</label>
                        <input type="text" name="title" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Artista</label>
                        <input type="text" name="artist" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Gênero</label>
                        <select name="genre" class="form-control" required>
                            <option value="Pop">Pop</option>
                            <option value="Rock">Rock</option>
                            <option value="Soul">Soul</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Duração</label>
                        <input type="text" name="duration" class="form-control" placeholder="3:45" required>
                    </div>
                    
                    <div class="form-group" id="sponsorField" style="display: none;">
                        <label>Patrocinador</label>
                        <input type="text" name="sponsor" class="form-control" placeholder="Nome do patrocinador">
                    </div>
                    
                    <button type="submit" class="btn btn-success" style="width: 100%;">
                        Adicionar
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal Criar Usuário -->
    <div id="createUserModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Criar Novo Usuário</h3>
                <button class="close-btn" onclick="closeModal('createUserModal')">×</button>
            </div>
            <div class="modal-body">
                <form onsubmit="createUser(event)">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" name="name" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Senha</label>
                        <input type="password" name="password" class="form-control" minlength="6" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Tipo</label>
                        <select name="type" class="form-control" required>
                            <option value="Listener">Ouvinte</option>
                            <option value="Administrator">Administrador</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="btn btn-success" style="width: 100%;">
                        Criar Usuário
                    </button>
                </form>
            </div>
        </div>
    </div>
    `
            : ""
        }
  `
}

module.exports = { renderHTML }
