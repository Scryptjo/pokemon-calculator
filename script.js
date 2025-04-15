const paramLabels = [
  { de: "Common/Uncommon", en: "Common/Uncommon", jp: "ノーマル/アンコモン" },
  { de: "Rare", en: "Rare", jp: "レア" },
  { de: "Reverse", en: "Reverse", jp: "リバース" },
  { de: "Holo", en: "Holo", jp: "ホロ" },
  { de: "V", en: "V", jp: "V" },
  { de: "VMax/VStar", en: "VMax/VStar", jp: "VMax/VStar" },
  { de: "GX/EX", en: "GX/EX", jp: "GX/EX" },
  { de: "Trainer", en: "Trainer", jp: "トレーナー" },
  { de: "Energie", en: "Energy", jp: "エネルギー" },
  { de: "XXL", en: "XXL", jp: "ジャンボ" },
  { de: "Strahlende / Trainergalerie", en: "Radiant / Trainer Gallery", jp: "かがやく / トレーナーズギャラリー" },
  { de: "ETB Boxen", en: "ETB Boxes", jp: "ETB ボックス" },
  { de: "Pins", en: "Pins", jp: "ピンズ" },
  { de: "Münzen", en: "Coins", jp: "コイン" },
  { de: "Mini Tins", en: "Mini Tins", jp: "ミニ缶" }
];

const inputs = {
  de: [], en: [], jp: []
};

function createTable() {
  const tableBody = document.getElementById('card-table');
  tableBody.innerHTML = '';
  paramLabels.forEach((label, index) => {
    const row = document.createElement('tr');

    const paramCell = document.createElement('td');
    paramCell.textContent = label.de;
    row.appendChild(paramCell);

    ['de', 'en', 'jp'].forEach(lang => {
      const countCell = document.createElement('td');
      const countInput = document.createElement('input');
      countInput.type = 'number';
      countInput.step = '1';
      countInput.min = '0.0001';
      countInput.classList.add('count');
      countInput.dataset.lang = lang;
      countInput.dataset.index = index;
      countInput.value = inputs[lang][index]?.count || '';
      countInput.addEventListener('input', () => {
        saveInput(lang, index, countInput.value, inputs[lang][index]?.value);
        calculateTotal();
      });
      countCell.appendChild(countInput);
      row.appendChild(countCell);

      const valueCell = document.createElement('td');
      const valueInput = document.createElement('input');
      valueInput.type = 'number';
      valueInput.step = '0.0001';
      valueInput.min = '0';
      valueInput.classList.add('value');
      valueInput.dataset.lang = lang;
      valueInput.dataset.index = index;
      valueInput.value = inputs[lang][index]?.value || '';
      valueInput.addEventListener('input', () => {
        saveInput(lang, index, inputs[lang][index]?.count, valueInput.value);
        calculateTotal();
      });
      valueCell.appendChild(valueInput);
      row.appendChild(valueCell);
    });

    tableBody.appendChild(row);
  });
}

function saveInput(lang, index, count, value) {
  inputs[lang][index] = { count, value };
}

function calculateTotal() {
  let total = 0;
  ['de', 'en', 'jp'].forEach(lang => {
    (inputs[lang] || []).forEach(entry => {
      const count = parseFloat(entry?.count) || 0;
      const value = parseFloat(entry?.value) || 0;
      total += count * value;
    });
  });
  document.getElementById('total').textContent = total.toFixed(5);
}

function clearInputs() {
  ['de', 'en', 'jp'].forEach(lang => {
    inputs[lang] = paramLabels.map(() => ({ count: '', value: '' }));
  });
  createTable();
  calculateTotal();
}

createTable();
