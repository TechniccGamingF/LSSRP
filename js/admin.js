let jsonData = [];

async function loadData() {
    const response = await fetch('../data/data.json');
    jsonData = await response.json();
    renderTable();
}

function renderTable() {
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    jsonData.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = item.PLZ;
        row.insertCell(1).innerText = item.Ort;
        row.insertCell(2).innerText = item.Menge;
        row.insertCell(3).innerText = item.Zeiten;
        row.insertCell(4).innerText = item.Droge;
        const actionsCell = row.insertCell(5);
        actionsCell.innerHTML = `
            <button class="button" onclick="editData(${index})">Edit</button>
            <button class="button" onclick="deleteData(${index})">Delete</button>
        `;
    });
}

function showForm() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('form-title').innerText = 'Add New Entry';
    document.getElementById('data-form').reset();
    document.getElementById('row-index').value = '';
}

function hideForm() {
    document.getElementById('form-container').style.display = 'none';
}

function saveData() {
    const plz = document.getElementById('plz').value;
    const ort = document.getElementById('ort').value;
    const menge = document.getElementById('menge').value;
    const zeiten = document.getElementById('zeiten').value;
    const droge = document.getElementById('droge').value;
    const rowIndex = document.getElementById('row-index').value;

    const newData = { PLZ: plz, Ort: ort, Menge: menge, Zeiten: zeiten, Droge: droge };

    if (rowIndex === '') {
        jsonData.push(newData);
    } else {
        jsonData[rowIndex] = newData;
    }

    renderTable();
    hideForm();
}

function editData(index) {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('form-title').innerText = 'Edit Entry';
    document.getElementById('plz').value = jsonData[index].PLZ;
    document.getElementById('ort').value = jsonData[index].Ort;
    document.getElementById('menge').value = jsonData[index].Menge;
    document.getElementById('zeiten').value = jsonData[index].Zeiten;
    document.getElementById('droge').value = jsonData[index].Droge;
    document.getElementById('row-index').value = index;
}

function deleteData(index) {
    jsonData.splice(index, 1);
    renderTable();
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();
});
