const params = {
  de: [
    "Common/Uncommon",
    "Rare",
    "Reverse",
    "Holo",
    "V",
    "VMax/VStar",
    "GX/EX",
    "Trainer",
    "Energie",
    "XXL",
    "Strahlende / Trainergalerie",
    "ETB Boxen",
    "Pins",
    "Münzen",
    "Mini Tins"
  ],
  en: [
    "Common/Uncommon",
    "Rare",
    "Reverse",
    "Holo",
    "V",
    "VMax/VStar",
    "GX/EX",
    "Trainer",
    "Energy",
    "XXL",
    "Radiant / Trainer Gallery",
    "ETB Boxes",
    "Pins",
    "Coins",
    "Mini Tins"
  ]
};

let currentLang = 'de';

function createTable() {
  const tableBody = document.getElementById('card-table');
  tableBody.innerHTML = '';
  params[currentLang].forEach((param) => {
    const row = document.createElement('tr');

    const paramCell = document.createElement('td');
    paramCell.textContent = param;

    const countCell = document.createElement('td');
    const countInput = document.createElement('input');
    countInput.type = 'number';
    countInput.min = '0';
    countInput.step = '1';
    countInput.addEventListener('input', calculateTotal);
    countInput.classList.add('count');
    countCell.appendChild(countInput);

    const valueCell = document.createElement('td');
    const valueInput = document.createElement('input');
    valueInput.type = 'number';
    valueInput.step = '0.00001';
    valueInput.min = '0';
    valueInput.addEventListener('input', calculateTotal);
    valueInput.classList.add('value');
    valueCell.appendChild(valueInput);

    row.appendChild(paramCell);
    row.appendChild(countCell);
    row.appendChild(valueCell);
    tableBody.appendChild(row);
  });
}

function calculateTotal() {
  let total = 0;
  const rows = document.querySelectorAll('#card-table tr');
  rows.forEach(row => {
    const count = parseFloat(row.querySelector('.count').value) || 0;
    const value = parseFloat(row.querySelector('.value').value) || 0;
    total += count * value;
  });
  document.getElementById('total').textContent = total.toFixed(5);
}

function switchLanguage(lang) {
  currentLang = lang;
  createTable();
  updateLabels();
  calculateTotal();
}

function updateLabels() {
  const headers = {
    de: ["Parameter", "Anzahl", "EUR/Einheit", "Gesamtwert (EUR):"],
    en: ["Parameter", "Amount", "EUR/unit", "Total value (EUR):"]
  };
  const [param, count, value, total] = headers[currentLang];
  document.getElementById("param-header").textContent = param;
  document.getElementById("count-header").textContent = count;
  document.getElementById("value-header").textContent = value;
  document.getElementById("total-label").textContent = total;
}

createTable();
