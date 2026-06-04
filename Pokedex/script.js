/* =========================================
   POKÉDEX — JavaScript
   Integração com PokéAPI
   ========================================= */

'use strict';

// ── Constantes ──────────────────────────────────────────────
const API_BASE   = 'https://pokeapi.co/api/v2';
const IMG_BASE   = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
const PAGE_SIZE  = 24;

// ── Estado da aplicação ─────────────────────────────────────
const state = {
  allPokemon:     [],   // cache dos pokémons carregados
  filteredList:   [],   // lista filtrada/ordenada exibida
  offset:         0,
  currentType:    'all',
  currentSort:    'id',
  searchQuery:    '',
  favorites:      new Set(JSON.parse(localStorage.getItem('pokeFavs') || '[]')),
  compareSlots:   [null, null],
  pickingSlot:    null,
  currentView:    'pokedex',
};

// ── Utilitários ─────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function typeColor(type) {
  const map = {
    fire:'#FF6B35',water:'#4FC3F7',grass:'#66BB6A',electric:'#FFD600',
    psychic:'#F06292',ice:'#80DEEA',dragon:'#7C4DFF',dark:'#546E7A',
    fairy:'#F8BBD9',fighting:'#EF5350',poison:'#AB47BC',rock:'#A1887F',
    ghost:'#5C6BC0',steel:'#90A4AE',normal:'#BDBDBD',bug:'#9CCC65',
    ground:'#FFCA28',flying:'#90CAF9',
  };
  return map[type] || '#888';
}

function statColor(statName) {
  const m = { hp:'#ff5959',attack:'#f5ac78',defense:'#fae078',
    'special-attack':'#9db7f5','special-defense':'#a7db8d',speed:'#fa92b2' };
  return m[statName] || '#888';
}

function statAbbr(name) {
  const m = { hp:'HP', attack:'ATK', defense:'DEF',
    'special-attack':'SpA', 'special-defense':'SpD', speed:'SPE' };
  return m[name] || name.slice(0,3).toUpperCase();
}

function padId(id) { return '#' + String(id).padStart(3, '0'); }

function pokemonImg(id) { return `${IMG_BASE}/${id}.png`; }

function saveFavorites() {
  localStorage.setItem('pokeFavs', JSON.stringify([...state.favorites]));
}

function showToast(msg) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

// ── Fetch helpers ────────────────────────────────────────────
async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

async function fetchPokemonBasic(nameOrId) {
  const data = await fetchJSON(`${API_BASE}/pokemon/${nameOrId}`);
  return normalizePokemon(data);
}

function normalizePokemon(data) {
  return {
    id:     data.id,
    name:   data.name,
    types:  data.types.map(t => t.type.name),
    img:    pokemonImg(data.id),
    height: data.height,
    weight: data.weight,
    stats:  data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
    moves:  data.moves.slice(0, 20).map(m => m.move.name),
    abilities: data.abilities.map(a => a.ability.name),
    species_url: data.species?.url,
  };
}

// ── Carregamento inicial ─────────────────────────────────────
async function loadPokemon(reset = false) {
  if (reset) {
    state.offset = 0;
    state.allPokemon = [];
  }

  const btn = $('#loadMoreButton');
  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Carregando...';

  // Mostra spinner se primeiro carregamento
  if (state.allPokemon.length === 0) {
    $('#pokemonList').innerHTML = `
      <li class="loading-spinner">
        <div class="spinner-ball"></div>
        <p>Capturando Pokémon...</p>
      </li>`;
  }

  try {
    const list = await fetchJSON(`${API_BASE}/pokemon?limit=${PAGE_SIZE}&offset=${state.offset}`);
    const details = await Promise.all(list.results.map(p => fetchPokemonBasic(p.name)));

    state.allPokemon.push(...details);
    state.offset += PAGE_SIZE;

    applyFiltersAndRender();
    updateCount();
  } catch (e) {
    console.error(e);
    showToast('Erro ao carregar Pokémon 😢');
  } finally {
    btn.disabled = false;
    btn.querySelector('.btn-text').textContent = 'Carregar Mais';
  }
}

// ── Filtros e Ordenação ──────────────────────────────────────
function applyFiltersAndRender() {
  let list = [...state.allPokemon];

  // Filtro de tipo
  if (state.currentType !== 'all') {
    list = list.filter(p => p.types.includes(state.currentType));
  }

  // Busca
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p =>
      p.name.includes(q) || String(p.id).includes(q)
    );
  }

  // Ordenação
  list.sort((a, b) => {
    if (state.currentSort === 'name') return a.name.localeCompare(b.name);
    if (state.currentSort === 'hp')   return getStat(b, 'hp') - getStat(a, 'hp');
    if (state.currentSort === 'attack') return getStat(b, 'attack') - getStat(a, 'attack');
    return a.id - b.id;
  });

  state.filteredList = list;
  renderGrid(list, $('#pokemonList'));
}

function getStat(p, name) {
  return p.stats.find(s => s.name === name)?.value || 0;
}

function updateCount() {
  const visible = state.filteredList.length;
  const total = state.allPokemon.length;
  $('#pokemonCount').textContent =
    `Mostrando ${visible} de ${total} Pokémon carregados`;
}

// ── Renderização dos Cards ───────────────────────────────────
function renderGrid(list, container) {
  if (list.length === 0) {
    container.innerHTML = `
      <li style="grid-column:1/-1; text-align:center; padding:60px; color:var(--text-muted); font-weight:700;">
        Nenhum Pokémon encontrado 🔍
      </li>`;
    return;
  }

  container.innerHTML = list.map((p, i) => renderCard(p, i)).join('');

  // Event listeners nos cards
  $$('.pokemon-card', container).forEach(card => {
    const id = parseInt(card.dataset.id);
    const poke = state.allPokemon.find(p => p.id === id);

    card.addEventListener('click', (e) => {
      if (e.target.closest('.fav-btn') || e.target.closest('.compare-add-btn')) return;
      openModal(poke);
    });

    card.querySelector('.fav-btn').addEventListener('click', () => toggleFav(poke));
    card.querySelector('.compare-add-btn').addEventListener('click', () => addToCompare(poke));
  });
}

function renderCard(p, index) {
  const isFav = state.favorites.has(p.id);
  const mainType = p.types[0];
  const color = typeColor(mainType);

  const typeTags = p.types.map(t =>
    `<span class="type-tag type-${t}">${t}</span>`
  ).join('');

  const hp  = getStat(p, 'hp');
  const atk = getStat(p, 'attack');
  const def = getStat(p, 'defense');

  return `
    <li class="pokemon-card" data-id="${p.id}" style="animation-delay:${Math.min(index * 0.04, 0.6)}s">
      <div class="card-actions">
        <button class="fav-btn ${isFav ? 'active' : ''}" title="Favoritar">
          ${isFav ? '❤️' : '🤍'}
        </button>
        <button class="compare-add-btn" title="Comparar">⚖️</button>
      </div>
      <div class="card-bg" style="background: linear-gradient(135deg, ${color}22, ${color}11)">
        <span class="pokeball-bg">⚪</span>
        <img class="card-img" src="${p.img}" alt="${p.name}"
             loading="lazy" onerror="this.src='https://via.placeholder.com/96?text=?'"/>
      </div>
      <div class="card-body">
        <div class="card-number">${padId(p.id)}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-types">${typeTags}</div>
        <div class="card-stats">
          ${renderMiniStat('HP',  hp,  'stat-hp')}
          ${renderMiniStat('ATK', atk, 'stat-atk')}
          ${renderMiniStat('DEF', def, 'stat-def')}
        </div>
      </div>
    </li>`;
}

function renderMiniStat(label, value, cls) {
  const pct = Math.min((value / 255) * 100, 100);
  return `
    <div class="stat-row">
      <span class="stat-label">${label}</span>
      <div class="stat-bar-bg">
        <div class="stat-bar-fill ${cls}" style="width:${pct}%"></div>
      </div>
      <span class="stat-value">${value}</span>
    </div>`;
}

// ── Favoritos ────────────────────────────────────────────────
function toggleFav(poke) {
  if (state.favorites.has(poke.id)) {
    state.favorites.delete(poke.id);
    showToast(`${poke.name} removido dos favoritos`);
  } else {
    state.favorites.add(poke.id);
    showToast(`${poke.name} adicionado aos favoritos ❤️`);
  }
  saveFavorites();
  updateFavBadge();

  // Atualiza botão no card
  const btn = $(`.pokemon-card[data-id="${poke.id}"] .fav-btn`);
  if (btn) {
    const fav = state.favorites.has(poke.id);
    btn.textContent = fav ? '❤️' : '🤍';
    btn.classList.toggle('active', fav);
  }

  // Atualiza view de favoritos se visível
  if (state.currentView === 'favorites') renderFavorites();
}

function updateFavBadge() {
  $('#favCount').textContent = state.favorites.size;
}

function renderFavorites() {
  const list = state.allPokemon.filter(p => state.favorites.has(p.id));
  const empty = $('#favEmpty');
  const grid  = $('#favoritesList');

  if (list.length === 0) {
    empty.style.display = '';
    grid.innerHTML = '';
  } else {
    empty.style.display = 'none';
    renderGrid(list, grid);
  }
}

// ── Modal ────────────────────────────────────────────────────
async function openModal(poke) {
  const modal = $('#modal');
  const content = $('#modalContent');

  content.innerHTML = `
    <div class="loading-spinner" style="padding:60px">
      <div class="spinner-ball"></div>
      <p>Carregando dados...</p>
    </div>`;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  // Busca dados extras (espécie + evolução)
  let evoChain = [];
  try {
    if (poke.species_url) {
      const species = await fetchJSON(poke.species_url);
      if (species.evolution_chain?.url) {
        const evoData = await fetchJSON(species.evolution_chain.url);
        evoChain = await parseEvoChain(evoData.chain);
      }
    }
  } catch (_) {}

  content.innerHTML = buildModalHTML(poke, evoChain);
  setupModalTabs();
  animateModalStats();
}

function buildModalHTML(p, evoChain) {
  const mainType = p.types[0];
  const color    = typeColor(mainType);

  const typeTags = p.types.map(t =>
    `<span class="type-tag type-${t}" style="font-size:0.8rem;padding:4px 12px">${t}</span>`
  ).join('');

  const statsHTML = p.stats.map(s => {
    const pct = Math.min((s.value / 255) * 100, 100);
    const clr = statColor(s.name);
    return `
      <div class="modal-stat-row">
        <span class="modal-stat-label">${statAbbr(s.name)}</span>
        <div class="modal-stat-bar-bg">
          <div class="modal-stat-bar-fill" style="width:0%;background:${clr}" data-target="${pct}"></div>
        </div>
        <span class="modal-stat-value">${s.value}</span>
      </div>`;
  }).join('');

  const total = p.stats.reduce((acc, s) => acc + s.value, 0);

  const movesHTML = p.moves.map(m =>
    `<span class="move-tag">${m}</span>`
  ).join('');

  const abilitiesHTML = p.abilities.map(a =>
    `<span class="move-tag" style="border-color:var(--accent);color:var(--accent)">${a}</span>`
  ).join('');

  const evoHTML = evoChain.length
    ? buildEvoChainHTML(evoChain)
    : '<p style="color:var(--text-muted);text-align:center;padding:20px">Sem dados de evolução</p>';

  return `
    <div class="modal-header" style="background:linear-gradient(135deg,${color}22,${color}08)">
      <div class="modal-img-wrap" style="background:${color}18">
        <img class="modal-img" src="${p.img}" alt="${p.name}"
             onerror="this.src='https://via.placeholder.com/130?text=?'"/>
      </div>
      <div class="modal-info">
        <div class="modal-number">${padId(p.id)}</div>
        <h2 class="modal-name">${p.name}</h2>
        <div class="modal-types">${typeTags}</div>
        <div class="modal-meta">
          <div class="meta-item">
            <div class="meta-label">Altura</div>
            <div class="meta-value">${(p.height / 10).toFixed(1)} m</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Peso</div>
            <div class="meta-value">${(p.weight / 10).toFixed(1)} kg</div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-tabs">
      <button class="modal-tab active" data-tab="stats">📊 Estatísticas</button>
      <button class="modal-tab" data-tab="moves">⚔️ Movimentos</button>
      <button class="modal-tab" data-tab="abilities">✨ Habilidades</button>
      <button class="modal-tab" data-tab="evo">🔀 Evolução</button>
    </div>

    <div class="modal-tab-content">
      <div class="modal-tab-panel active" id="tab-stats">
        <div class="modal-stats">${statsHTML}</div>
        <div class="stat-total">
          <span class="stat-total-label">Total</span>
          <span class="stat-total-value">${total}</span>
        </div>
      </div>

      <div class="modal-tab-panel" id="tab-moves">
        <div class="moves-grid">${movesHTML}</div>
      </div>

      <div class="modal-tab-panel" id="tab-abilities">
        <div class="moves-grid">${abilitiesHTML}</div>
      </div>

      <div class="modal-tab-panel" id="tab-evo">
        <div class="evolution-chain">${evoHTML}</div>
      </div>
    </div>`;
}

function setupModalTabs() {
  $$('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.modal-tab').forEach(t => t.classList.remove('active'));
      $$('.modal-tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      $(`#tab-${tab.dataset.tab}`).classList.add('active');
      if (tab.dataset.tab === 'stats') animateModalStats();
    });
  });
}

function animateModalStats() {
  requestAnimationFrame(() => {
    $$('.modal-stat-bar-fill').forEach(bar => {
      const target = bar.dataset.target;
      bar.style.width = target + '%';
    });
  });
}

// Evolução
async function parseEvoChain(chain) {
  const result = [];
  let current = chain;
  while (current) {
    const name = current.species.name;
    const id   = parseInt(current.species.url.split('/').filter(Boolean).pop());
    result.push({ name, id, img: pokemonImg(id) });
    current = current.evolves_to?.[0] || null;
  }
  return result;
}

function buildEvoChainHTML(chain) {
  return chain.map((p, i) => `
    ${i > 0 ? '<span class="evo-arrow">→</span>' : ''}
    <div class="evo-item" onclick="openModalById(${p.id})">
      <img class="evo-img" src="${p.img}" alt="${p.name}"
           onerror="this.src='https://via.placeholder.com/80?text=?'"/>
      <span class="evo-name">${p.name}</span>
    </div>
  `).join('');
}

async function openModalById(id) {
  const cached = state.allPokemon.find(p => p.id === id);
  if (cached) { openModal(cached); return; }
  try {
    const poke = await fetchPokemonBasic(id);
    openModal(poke);
  } catch (_) {}
}

function closeModal() {
  const modal = $('#modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

// ── Comparação ───────────────────────────────────────────────
function addToCompare(poke) {
  // Encontra slot vazio
  let slot = state.compareSlots.indexOf(null);
  if (slot === -1) slot = 0; // substitui o primeiro
  state.compareSlots[slot] = poke;
  renderCompareSlot(slot);
  showToast(`${poke.name} adicionado para comparar ⚖️`);

  // Vai para view compare
  switchView('compare');
  updateCompareStats();
}

function renderCompareSlot(slotIndex) {
  const poke = state.compareSlots[slotIndex];
  const container = $(`#compareSlot${slotIndex + 1}`);

  if (!poke) {
    container.classList.remove('filled');
    container.innerHTML = `
      <div class="compare-placeholder">
        <span>➕</span>
        <p>Selecione um Pokémon</p>
        <button class="pick-btn" data-slot="${slotIndex + 1}">Escolher</button>
      </div>`;
    container.querySelector('.pick-btn').addEventListener('click', () => openPickModal(slotIndex));
    return;
  }

  container.classList.add('filled');
  const types = poke.types.map(t => `<span class="type-tag type-${t}">${t}</span>`).join('');
  container.innerHTML = `
    <div class="compare-card-inner">
      <img class="compare-img" src="${poke.img}" alt="${poke.name}"/>
      <div class="compare-poke-name">${poke.name}</div>
      <div class="compare-types">${types}</div>
      <button class="compare-change-btn">Trocar</button>
    </div>`;
  container.querySelector('.compare-change-btn').addEventListener('click', () => openPickModal(slotIndex));
}

function updateCompareStats() {
  const [p1, p2] = state.compareSlots;
  const section = $('#compareStats');
  if (!p1 || !p2) { section.style.display = 'none'; return; }

  section.style.display = '';
  const stats = ['hp','attack','defense','special-attack','special-defense','speed'];
  const rows = stats.map(statName => {
    const v1 = getStat(p1, statName);
    const v2 = getStat(p2, statName);
    const max = Math.max(v1, v2, 1);
    const pct1 = (v1 / max) * 50;
    const pct2 = (v2 / max) * 50;
    const w1 = v1 > v2 ? 'winner' : '';
    const w2 = v2 > v1 ? 'winner' : '';
    const clr = statColor(statName);
    return `
      <div class="compare-stat-row">
        <span class="compare-stat-val ${w1}">${v1}</span>
        <div>
          <span class="compare-stat-label-center">${statAbbr(statName)}</span>
          <div class="compare-bar-container">
            <div class="compare-bar-left" style="width:${pct1}%;background:${typeColor(p1.types[0])}"></div>
            <div class="compare-bar-right" style="width:${pct2}%;background:${typeColor(p2.types[0])}"></div>
          </div>
        </div>
        <span class="compare-stat-val ${w2}">${v2}</span>
      </div>`;
  }).join('');

  section.innerHTML = `<h3>⚖️ Comparação de Estatísticas</h3>${rows}`;
}

// ── Pick Modal ───────────────────────────────────────────────
function openPickModal(slotIndex) {
  state.pickingSlot = slotIndex;
  const modal = $('#pickModal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  renderPickList('');
  $('#pickSearch').value = '';
  $('#pickSearch').focus();
}

function closePickModal() {
  const modal = $('#pickModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  state.pickingSlot = null;
}

function renderPickList(query) {
  const q = query.toLowerCase();
  const list = state.allPokemon.filter(p =>
    !query || p.name.includes(q) || String(p.id).includes(q)
  ).slice(0, 60);

  $('#pickList').innerHTML = list.map(p => `
    <li class="pick-item" data-id="${p.id}">
      <img src="${p.img}" alt="${p.name}" loading="lazy" width="56" height="56"/>
      <p>${p.name}</p>
    </li>`).join('');

  $$('.pick-item').forEach(item => {
    item.addEventListener('click', () => {
      const poke = state.allPokemon.find(p => p.id === parseInt(item.dataset.id));
      state.compareSlots[state.pickingSlot] = poke;
      renderCompareSlot(state.pickingSlot);
      updateCompareStats();
      closePickModal();
    });
  });
}

// ── Navegação entre views ─────────────────────────────────────
function switchView(viewName) {
  state.currentView = viewName;

  $$('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewName));
  $$('.view').forEach(v => v.classList.remove('active'));
  $(`#view-${viewName}`).classList.add('active');

  if (viewName === 'favorites') renderFavorites();
  if (viewName === 'compare') {
    renderCompareSlot(0);
    renderCompareSlot(1);
    updateCompareStats();
  }
}

// ── Event Listeners ──────────────────────────────────────────
function init() {
  // Navegação
  $$('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  // Filtros de tipo
  $$('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentType = btn.dataset.type;
      applyFiltersAndRender();
      updateCount();
    });
  });

  // Ordenação
  $('#sortSelect').addEventListener('change', (e) => {
    state.currentSort = e.target.value;
    applyFiltersAndRender();
  });

  // Busca
  let searchTimeout;
  $('#searchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.searchQuery = e.target.value.trim();
      applyFiltersAndRender();
      updateCount();
    }, 300);
  });

  // Load more
  $('#loadMoreButton').addEventListener('click', () => loadPokemon());

  // Modal fecha
  $('#modalClose').addEventListener('click', closeModal);
  $('#modal').addEventListener('click', (e) => {
    if (e.target === $('#modal')) closeModal();
  });

  // Pick modal fecha
  $('#pickModalClose').addEventListener('click', closePickModal);
  $('#pickModal').addEventListener('click', (e) => {
    if (e.target === $('#pickModal')) closePickModal();
  });

  // Pick search
  $('#pickSearch').addEventListener('input', (e) => {
    renderPickList(e.target.value);
  });

  // Keyboard: Escape fecha modais
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closePickModal();
    }
  });

  // Init badge
  updateFavBadge();

  // Carrega primeiros pokémons
  loadPokemon(true);
}

// Expõe função global para evolutioncain
window.openModalById = openModalById;

// Inicializa quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);
