// frontend/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const txSearch = document.getElementById('txSearch');
  const txTable = document.getElementById('txTable');
  const txFilterType = document.getElementById('txFilterType');
  const reloadBtn = document.getElementById('reloadBtn');

  function filterRows() {
    const q = txSearch.value.trim().toLowerCase();
    const type = txFilterType.value;
    Array.from(txTable.tBodies[0].rows).forEach(row => {
      const cells = Array.from(row.cells).map(c => c.textContent.toLowerCase());
      const matchesQ = cells.join(' ').includes(q);
      const matchesType = !type || row.cells[4].textContent === type;
      row.style.display = (matchesQ && matchesType) ? '' : 'none';
    });
  }

  if (txSearch) txSearch.addEventListener('input', filterRows);
  if (txFilterType) txFilterType.addEventListener('change', filterRows);
  if (reloadBtn) reloadBtn.addEventListener('click', () => {
    // If you have backend: fetch('/transactions?user=...') and repopulate table.
    // For now, just re-run filter.
    filterRows();
    alert('Reloaded (frontend demo). Connect to backend to fetch real data.');
  });
});
