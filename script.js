let dataKereta = [];

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    dataKereta = data;
    isiDropdown(data);
  });

function isiDropdown(data) {
  const asalSelect = document.getElementById("asal");
  const tujuanSelect = document.getElementById("tujuan");

  const stasiunSet = new Set();
  data.forEach(k => {
    stasiunSet.add(k.asal);
    stasiunSet.add(k.tujuan);
  });

  [...stasiunSet].sort().forEach(stasiun => {
    const opt1 = new Option(stasiun, stasiun);
    const opt2 = new Option(stasiun, stasiun);
    asalSelect.add(opt1.cloneNode(true));
    tujuanSelect.add(opt2.cloneNode(true));
  });
}

function cariRute() {
  const asal = document.getElementById("asal").value;
  const tujuan = document.getElementById("tujuan").value;
  const hasil = dataKereta.filter(k => k.asal === asal && k.tujuan === tujuan);

  let html = "<h3>Hasil Pencarian:</h3>";
  if (hasil.length > 0) {
    html += "<ul>";
    hasil.forEach(k => {
      html += `<li>${k.nama} (${k.jam})</li>`;
    });
    html += "</ul>";
  } else {
    html += "<p>Tidak ditemukan kereta langsung untuk rute ini.</p>";
  }

  document.getElementById("hasil").innerHTML = html;
}
