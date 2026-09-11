// DroidX Global Smart Search — searches Settings, Apps and Utilities
(() => {
  const input = document.getElementById('globalSearch');
  const clear = document.getElementById('globalSearchClear');
  const results = document.getElementById('globalSearchGrid');
  const count = document.getElementById('globalSearchCount');
  const empty = document.getElementById('globalSearchEmpty');
  const filters = [...document.querySelectorAll('.global-filter')];
  if (!input || !results) return;

  const groups = { all: DATA, settings: SETTINGS, apps: APPS, utilities: UTILITIES };
  let active = 'all';

  function runSearch() {
    const query = input.value.trim().toLowerCase();
    const source = groups[active] || DATA;
    const matches = source.filter(item => {
      if (!query) return false;
      return item.slice(1).join(' ').toLowerCase().includes(query);
    });
    results.replaceChildren(...matches.map(item => card(item, true)));
    const label = active === 'all' ? 'All' : active[0].toUpperCase() + active.slice(1);
    count.textContent = query ? `${matches.length} result${matches.length === 1 ? '' : 's'} · ${label}` : 'Type to search';
    empty.hidden = matches.length > 0 || !query;
  }

  filters.forEach(button => button.addEventListener('click', () => {
    active = button.dataset.filter || 'all';
    filters.forEach(item => item.classList.toggle('active', item === button));
    runSearch();
    input.focus();
  }));

  input.addEventListener('input', runSearch);
  clear?.addEventListener('click', () => {
    input.value = '';
    runSearch();
    input.focus();
  });

  empty.hidden = true;
  count.textContent = 'Type to search';
})();
