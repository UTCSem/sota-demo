let transfers = [];

fetch('transfers.json')
  .then(res => res.json())
  .then(data => {
    transfers = data;
    renderTransfers(transfers);
    populateClubs(data);
  });

function renderTransfers(data) {
  const container = document.getElementById('transfers');
  container.innerHTML = '';
  data.forEach(item => {
    const block = document.createElement('div');
    block.className = 'card';
    block.innerHTML = `
      <h3>${item.player}</h3>
      <p>Из: ${item.from}</p>
      <p>В: ${item.to}</p>
      <p>Дата: ${item.date}</p>
      <a href="details.html?id=${item.id}">Подробнее</a>
    `;
    container.appendChild(block);
  });
}

function populateClubs(data) {
  const select = document.getElementById('clubFilter');
  const clubs = new Set(data.flatMap(t => [t.from, t.to]));
  clubs.forEach(club => {
    const opt = document.createElement('option');
    opt.value = club;
    opt.textContent = club;
    select.appendChild(opt);
  });
}

document.getElementById('clubFilter').addEventListener('change', applyFilters);
document.getElementById('dateFilter').addEventListener('change', applyFilters);

function applyFilters() {
  const club = document.getElementById('clubFilter').value;
  const date = document.getElementById('dateFilter').value;
  const filtered = transfers.filter(t => {
    const matchClub = !club || t.from === club || t.to === club;
    const matchDate = !date || t.date === date;
    return matchClub && matchDate;
  });
  renderTransfers(filtered);
}
