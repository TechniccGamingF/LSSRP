function fetchAllDataDealer() {
    fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
        renderTableDealer(data.Dealer, 'Dealer'); // Render table using only "Dealer" array
    });
}

function fetchAllDataCrafting() {
    fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
        renderTableCrafting(data.Crafting, 'Crafting'); // Render table using only "Crafting" array
    });
}

function selectAllDealer() {
    fetchDataAndRenderTable('Dealer');
}

function onlyAnwesendDealer() {
    fetchDataAndRenderTable('Dealer', true);
}

function onlyAbwesendDealer() {
    fetchDataAndRenderTable('Dealer', false);
}

function selectAllCrafting() {
    fetchDataAndRenderTable('Crafting');
}

function fetchDataAndRenderTable(tableName, isNow = null) {
    fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
        if (tableName === 'Crafting') {
            renderTableCrafting(data[tableName], tableName);
        } else if (tableName === 'Dealer') {
            renderTableDealer(data[tableName], tableName, isNow);
        }
    });
}

function renderTableDealer(dataArray, tableName, isNow = null) {
    let htmlAusgabe = "<table id='body table'><tr><th>PLZ</th><th>Ort</th><th>Menge</th><th>Zeiten</th><th>Droge</th></tr>";
    const currentTime = new Date().getHours() * 60 + new Date().getMinutes(); // current time in minutes

    dataArray.forEach(item => {
        const { PLZ, Ort, Menge, Zeiten, Droge } = item;
        
        let isNowItem = false;
        if (Zeiten && !Zeiten === 'Immer') {
            const [timeStart, timeEnd] = Zeiten.split('-').map(time => {
                const [hours, minutes] = time.split(':').map(Number);
                return hours * 60 + minutes;
            });
            isNowItem = currentTime >= timeStart && currentTime <= timeEnd;
        }

        if (isNow === null || isNowItem === isNow) {
            let color = isNowItem ? 'green' : (Zeiten ? 'red' : 'black');
            const maxAge = 60 * 60 * 24 * 60; // 60 days in seconds
            if (Zeiten === 'Immer') {
                color = 'green';
            }
            if (document.cookie.includes(`darkmode=true`)) {
                color = 'white';
            }
            htmlAusgabe += `<tr id="${color}"><td>${PLZ}</td><td>${Ort}</td><td>${Menge}</td><td>${Zeiten}</td><td>${Droge}</td></tr>`;
        }
    });
    htmlAusgabe += "</table>";

    document.getElementById('content').innerHTML = `
        <h1>Dealer</h1>
        <input type="button" class="button" id="selectAllDealer" value="Alle" onclick="selectAllDealer()">
        <input type="button" class="button" value="Anwesend" onclick="onlyAnwesendDealer()">
        <input type="button" class="button" value="Nicht anwesend" onclick="onlyAbwesendDealer()">
        <br>
        ${htmlAusgabe}`;
}
function renderTableCrafting(dataArray, tableName) {
    let htmlAusgabe = "<table id='body'><tr><th>Erste Zutat</th><th>Zweite Zutat</th><th>Endprodukt</th></tr>";

    dataArray.forEach(item => {
        const { first, second, solution } = item;
            htmlAusgabe += `<tr><td>${first}</td><td>${second}</td><td>${solution}</td></tr>`;
    });
    htmlAusgabe += "</table>";

    document.getElementById('content2').innerHTML = `
        <h1>Crafting</h1>
        <br>
        ${htmlAusgabe}`;
}

function toggleContent(id) {
    const content = document.getElementById('content');
    const content2 = document.getElementById('content2');
    if (id === 'content') {
        content.style.display = 'block';
        content2.style.display = 'none';
        document.getElementById("selectAll").click();
    } else if (id === 'content2') {
        content.style.display = 'none';
        content2.style.display = 'block';
        document.getElementById("selectAllCrafting").click();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAllDataDealer();
    checkDarkMode();
});

function checkDarkMode() {
    const cookieName = 'darkmode';
    const cookieValue = 'true';
    if (document.cookie.includes(`${cookieName}=${cookieValue}`)) {
        document.getElementById('body').classList.add('dark-mode');
    }
}

function toggleDarkMode() {
    const cookieName = 'darkmode';
    const cookieValue = 'true';
    const expirationDate = new Date(0); // 1 January 1970

    if (document.cookie.includes(`${cookieName}=${cookieValue}`)) {
        document.cookie = `${cookieName}=; expires=${expirationDate.toUTCString()}; path=/;`;
        document.getElementById('body').classList.remove('dark-mode');
    } else {
        document.cookie = `${cookieName}=${cookieValue}; path=/; max-age=63042000`; // 2 months
        document.getElementById('body').classList.add('dark-mode');
    }
}