   function selectAll() {
    fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
        const d = new Date();
        let htmlAusgabe = "<table><tr><th>PLZ</th><th>Ort</th><th>Menge</th><th>Zeiten</th><th>Droge</th></tr>";
        for (let i = 0; i < data.length; i++) {
            const PLZ = data[i].PLZ;
            const Ort = data[i].Ort;
            const Menge = data[i].Menge;
            const Zeiten = data[i].Zeiten;
            const Droge = data[i].Droge;
            
            const currentTime = d.getHours() * 60 + d.getMinutes(); // current time in minutes
            let isNow = false;
            if (Zeiten) {
                const [timeStart, timeEnd] = Zeiten.split('-').map(time => {
                    const [hours, minutes] = time.split(':').map(Number);
                    return hours * 60 + minutes;
                });
                isNow = currentTime >= timeStart && currentTime <= timeEnd;
            }
            
            let color = isNow ? 'green' : (Zeiten ? 'red' : 'white');
            htmlAusgabe += `<tr id=${color}><td>${PLZ}</td><td>${Ort}</td><td>${Menge}</td><td>${Zeiten}</td><td>${Droge}</td></tr>`;
        }
        htmlAusgabe += "</table>";
        document.getElementById('content').innerHTML = `<h1>Dealer</h1><input type="button" class="button" id="selectAll" value="Alle" onclick="selectAll()"> <input type="button" class="button" value="Anwesend" onclick="onlyAnwesend()"> <input type="button" class="button" value="Nicht anwesend" onclick="onlyAbwesend()"> <br>` + htmlAusgabe;
    });
}
function onlyAnwesend() {
    fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
        let htmlAusgabe = "<table><tr><th>PLZ</th><th>Ort</th><th>Menge</th><th>Zeiten</th><th>Droge</th></tr>";
        for (let i = 0; i < data.length; i++) {
            const PLZ = data[i].PLZ;
            const Ort = data[i].Ort;
            const Menge = data[i].Menge;
            const Zeiten = data[i].Zeiten;
            const Droge = data[i].Droge;
            
            const currentTime = new Date().getHours() * 60 + new Date().getMinutes(); // current time in minutes
            let isNow = false;
            if (Zeiten) {
                const [timeStart, timeEnd] = Zeiten.split('-').map(time => {
                    const [hours, minutes] = time.split(':').map(Number);
                    return hours * 60 + minutes;
                });
                isNow = currentTime >= timeStart && currentTime <= timeEnd;
            }
            
            if (isNow) {
                let color = 'green';
                htmlAusgabe += `<tr id=${color}><td>${PLZ}</td><td>${Ort}</td><td>${Menge}</td><td>${Zeiten}</td><td>${Droge}</td></tr>`;
            }
        }
        htmlAusgabe += "</table>";
        document.getElementById('content').innerHTML = `<h1>Dealer</h1><input type="button" class="button" id="selectAll" value="Alle" onclick="selectAll()"> <input type="button" class="button" value="Anwesend" onclick="onlyAnwesend()"> <input type="button" class="button" value="Nicht anwesend" onclick="onlyAbwesend()"> <br>` + htmlAusgabe;
    });
}
function onlyAbwesend() {
    fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
        let htmlAusgabe = "<table><tr><th>PLZ</th><th>Ort</th><th>Menge</th><th>Zeiten</th><th>Droge</th></tr>";
        for (let i = 0; i < data.length; i++) {
            const PLZ = data[i].PLZ;
            const Ort = data[i].Ort;
            const Menge = data[i].Menge;
            const Zeiten = data[i].Zeiten;
            const Droge = data[i].Droge;
            
            const currentTime = new Date().getHours() * 60 + new Date().getMinutes(); // current time in minutes
            let isNow = false;
            if (Zeiten) {
                const [timeStart, timeEnd] = Zeiten.split('-').map(time => {
                    const [hours, minutes] = time.split(':').map(Number);
                    return hours * 60 + minutes;
                });
                isNow = currentTime >= timeStart && currentTime <= timeEnd;
            }
            
            if (!isNow) {
                let color = 'red';
                htmlAusgabe += `<tr id=${color}><td>${PLZ}</td><td>${Ort}</td><td>${Menge}</td><td>${Zeiten}</td><td>${Droge}</td></tr>`;
            }
        }
        htmlAusgabe += "</table>";
        document.getElementById('content').innerHTML = `<h1>Dealer</h1><input type="button" class="button" id="selectAll" value="Alle" onclick="selectAll()"> <input type="button" class="button" value="Anwesend" onclick="onlyAnwesend()"> <input type="button" class="button" value="Nicht anwesend" onclick="onlyAbwesend()"> <br>` + htmlAusgabe;
    });
}