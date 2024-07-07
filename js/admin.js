document.addEventListener('DOMContentLoaded', () => {
    loadData();
    checkDarkMode();
});

function checkDarkMode() {
    const cookieName = 'darkmode';
    const cookieValue = 'true';
    if (document.cookie.includes(`${cookieName}=${cookieValue}`)) {
        document.body.classList.add('dark-mode');
    }
}

function toggleDarkMode() {
    const cookieName = 'darkmode';
    const cookieValue = 'true';
    const expirationDate = new Date(0); // 1 January 1970

    if (document.cookie.includes(`${cookieName}=${cookieValue}`)) {
        document.cookie = `${cookieName}=; expires=${expirationDate.toUTCString()}; path=/;`;
        document.body.classList.remove('dark-mode');
    } else {
        document.cookie = `${cookieName}=${cookieValue}; path=/; max-age=63072000`; // 2 years
        document.body.classList.add('dark-mode');
    }
}

let jsonData = [];

async function loadData() {
    const response = await fetch('../data/data.json');
    jsonData = await response.json();
    renderTable('Dealer');
    renderTable('Crafting');
}

function renderTable(type) {
    const tableBody = document.getElementById(`${type.toLowerCase()}-table`).getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    if (type === 'Dealer') {
        jsonData[type].forEach((item, index) => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = item.PLZ;
            row.insertCell(1).innerText = item.Ort;
            row.insertCell(2).innerText = item.Menge;
            row.insertCell(3).innerText = item.Zeiten;
            row.insertCell(4).innerText = item.Droge;
            const actionsCell = row.insertCell(5);
            actionsCell.innerHTML = `
                <button class="button" onclick="editData('${type}', ${index})">Edit</button>
                <button class="button" onclick="deleteData('${type}', ${index})">Delete</button>
            `;
        });
    } else if (type === 'Crafting') {
        jsonData[type].forEach((item, index) => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = item.first;
            row.insertCell(1).innerText = item.second;
            row.insertCell(2).innerText = item.solution;
            const actionsCell = row.insertCell(3);
            actionsCell.innerHTML = `
                <button class="button" onclick="editData('${type}', ${index})">Edit</button>
                <button class="button" onclick="deleteData('${type}', ${index})">Delete</button>
            `;
        });
    }
}

function showForm(type) {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('form-title').innerText = `Add New ${type} Entry`;
    document.getElementById('data-form').reset();
    document.getElementById('row-index').value = '';
    document.getElementById('form-type').value = type;

    if (type === 'Dealer') {
        document.getElementById('dealer-fields').style.display = 'block';
        document.getElementById('crafting-fields').style.display = 'none';
    } else if (type === 'Crafting') {
        document.getElementById('dealer-fields').style.display = 'none';
        document.getElementById('crafting-fields').style.display = 'block';
    }
}

function hideForm() {
    document.getElementById('form-container').style.display = 'none';
}

function saveData() {
    const type = document.getElementById('form-type').value;
    const rowIndex = document.getElementById('row-index').value;

    let newData;
    if (type === 'Dealer') {
        const plz = document.getElementById('plz').value;
        const ort = document.getElementById('ort').value;
        const menge = document.getElementById('menge').value;
        const zeiten = document.getElementById('zeiten').value;
        const droge = document.getElementById('droge').value;
        newData = { PLZ: plz, Ort: ort, Menge: menge, Zeiten: zeiten, Droge: droge };
    } else if (type === 'Crafting') {
        const first = document.getElementById('first').value;
        const second = document.getElementById('second').value;
        const solution = document.getElementById('solution').value;
        newData = { first: first, second: second, solution: solution };
    }

    if (rowIndex === '') {
        jsonData[type].push(newData);
    } else {
        jsonData[type][rowIndex] = newData;
    }

    renderTable(type);
    hideForm();
}

function editData(type, index) {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('form-title').innerText = `Edit ${type} Entry`;
    document.getElementById('row-index').value = index;
    document.getElementById('form-type').value = type;

    if (type === 'Dealer') {
        document.getElementById('plz').value = jsonData[type][index].PLZ;
        document.getElementById('ort').value = jsonData[type][index].Ort;
        document.getElementById('menge').value = jsonData[type][index].Menge;
        document.getElementById('zeiten').value = jsonData[type][index].Zeiten;
        document.getElementById('droge').value = jsonData[type][index].Droge;
        document.getElementById('dealer-fields').style.display = 'block';
        document.getElementById('crafting-fields').style.display = 'none';
    } else if (type === 'Crafting') {
        document.getElementById('first').value = jsonData[type][index].first;
        document.getElementById('second').value = jsonData[type][index].second;
        document.getElementById('solution').value = jsonData[type][index].solution;
        document.getElementById('dealer-fields').style.display = 'none';
        document.getElementById('crafting-fields').style.display = 'block';
    }
}

function deleteData(type, index) {
    jsonData[type].splice(index, 1);
    renderTable(type);
}

function download() {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
