const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('transfers.json')
  .then(res => res.json())
  .then(data => {
    const player = data.find(p => p.id == id);
    const container = document.getElementById('details');
    if (!player) {
      container.innerHTML = '<p>Трансфер не найден</p>';
      return;
    }
    container.innerHTML = `
      <h2>${player.player}</h2>
      <p>Из: ${player.from}</p>
      <p>В: ${player.to}</p>
      <p>Дата: ${player.date}</p>
      <p>Цена: ${player.price}</p>
      <p>Позиция: ${player.position}</p>
      <img src="${player.photo}" alt="${player.player}" style="max-width: 300px;">
    `;
  });
