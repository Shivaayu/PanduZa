import { getPlayer } from './core/store.js';

const routes = {
  home: 'Home',
  games: 'Games',
  records: 'Records',
  player: 'Player'
};

export function renderApp(active = 'home') {
  const player = getPlayer();
  const app = document.querySelector('#app');

  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div>
          <div class="brand">PañduZa</div>
          <div class="tagline">Your little gaming universe</div>
        </div>
        <button class="avatar-button" aria-label="Open player">🐼</button>
      </header>

      <main class="content">
        <section class="hero-card">
          <div class="hero-copy">
            <span class="eyebrow">WELCOME BACK</span>
            <h1>${player.tag ? `Hey, ${escapeHtml(player.tag)}!` : 'Create your Panda.'}</h1>
            <p>Play, collect, customize and make your little world yours.</p>
          </div>
          <div class="hero-panda" aria-hidden="true">🐼</div>
        </section>

        <section class="quick-grid">
          <button class="feature-card" data-route="games"><span>PLAY</span><strong>Arcade Grove</strong><small>Jump into a game</small></button>
          <button class="feature-card" data-route="player"><span>PROGRESS</span><strong>Level ${player.level}</strong><small>${player.xp} XP</small></button>
          <button class="feature-card"><span>REWARD</span><strong>Daily Reward</strong><small>Keep your streak alive</small></button>
          <button class="feature-card"><span>WORLD</span><strong>Panda Room</strong><small>Make it yours</small></button>
        </section>

        <section class="section">
          <div class="section-heading"><h2>Today</h2><span>Fresh start</span></div>
          <div class="today-card">
            <div class="leaf-stack"><span>🌿</span><span>🍃</span><span>🍀</span></div>
            <div><strong>Daily Challenge</strong><p>Play a game and earn your first leaves.</p></div>
            <button class="primary-btn" data-route="games">Play</button>
          </div>
        </section>
      </main>

      <nav class="bottom-nav" aria-label="Main navigation">
        ${Object.entries(routes).map(([key, label]) =>
          `<button class="nav-item ${active === key ? 'active' : ''}" data-route="${key}">
            <span class="nav-icon">${navIcon(key)}</span><span>${label}</span>
          </button>`).join('')}
      </nav>
    </div>
  `;

  app.querySelectorAll('[data-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.dataset.route;
      if (route === 'games') renderGames();
      else if (route === 'player') renderPlayer();
      else if (route === 'records') renderRecords();
      else renderApp('home');
    });
  });
}

function renderGames() {
  document.querySelector('#app').innerHTML = `
    <div class="app-shell">
      <header class="topbar"><div><div class="brand">Arcade Grove</div><div class="tagline">Choose your next run</div></div><button class="icon-btn" id="back">←</button></header>
      <main class="content">
        <section class="hero-card compact"><div class="hero-copy"><span class="eyebrow">GAMES</span><h1>Ready, Panda?</h1><p>Your first playable game will plug into this shared game shell.</p></div><div class="hero-panda">🐼</div></section>
        <div class="game-card"><div class="game-thumb">🎯</div><div><span class="eyebrow">COMING FIRST</span><h2>Leaf Rush</h2><p>Fast reactions. Personal records. Panda reactions.</p><button class="primary-btn" disabled>Preparing game</button></div></div>
      </main>
      <button class="back-home" id="home">Home</button>
    </div>`;
  document.querySelector('#back').onclick = () => renderApp('home');
  document.querySelector('#home').onclick = () => renderApp('home');
}

function renderPlayer() {
  const p = getPlayer();
  document.querySelector('#app').innerHTML = `
    <div class="app-shell">
      <header class="topbar"><div><div class="brand">Player</div><div class="tagline">Your Panda identity</div></div><button class="icon-btn" id="back">←</button></header>
      <main class="content">
        <section class="profile-card"><div class="profile-panda">🐼</div><div><span class="eyebrow">PLAYER</span><h1>${escapeHtml(p.tag || 'New Panda')}</h1><p>Level ${p.level} · ${p.xp} XP</p></div></section>
        <section class="resource-row"><div><strong>${p.leaves.bamboo}</strong><span>Bamboo Leaves</span></div><div><strong>${p.leaves.fern}</strong><span>Fern Leaves</span></div><div><strong>${p.food.cookie}</strong><span>Cookies</span></div></section>
        <div class="empty-state"><strong>Your collection is waiting.</strong><p>Play games to start earning leaves, XP and rare rewards.</p></div>
      </main>
      <button class="back-home" id="home">Home</button>
    </div>`;
  document.querySelector('#back').onclick = () => renderApp('home');
  document.querySelector('#home').onclick = () => renderApp('home');
}

function renderRecords() {
  document.querySelector('#app').innerHTML = `
    <div class="app-shell">
      <header class="topbar"><div><div class="brand">Records</div><div class="tagline">Your personal bests</div></div><button class="icon-btn" id="back">←</button></header>
      <main class="content"><div class="empty-state"><strong>No records yet.</strong><p>Your first personal best will appear here.</p></div></main>
      <button class="back-home" id="home">Home</button>
    </div>`;
  document.querySelector('#back').onclick = () => renderApp('home');
  document.querySelector('#home').onclick = () => renderApp('home');
}

function navIcon(key) {
  return ({home:'⌂', games:'✦', records:'◆', player:'●'})[key];
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
