async function performQuery() {
  const maxPrice = document.getElementById('maxPrice').value;
  const genre = document.getElementById('genre').value.trim();

  let url = '/games?';
  if (maxPrice) url += `maxPrice=${maxPrice}&`;
  if (genre) url += `genre=${encodeURIComponent(genre)}`;

  const res = await fetch(url);
  const games = await res.json();

  let html = '<table border="1"><tr><th>Title</th><th>Studio</th><th>Genre</th><th>Price</th><th>Release Date</th></tr>';
  games.forEach(g => {
    html += `<tr>
      <td>${g.title}</td>
      <td>${g.studio}</td>
      <td>${g.genre}</td>
      <td>$${g.price}</td>
      <td>${g.releaseDate.split('T')[0]}</td>
    </tr>`;
  });
  html += '</table>';

  document.getElementById('results').innerHTML = html || '<p>No matching games found.</p>';
}