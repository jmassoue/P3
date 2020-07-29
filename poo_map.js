class Station{
    constructor(){
        this.form = document.getElementById('formulaire')
        this.load()
    }
    load(){
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=20ab4b3b4d5f55f1c5ff502ab342ac2e0966b336", function(reponse) {
           
        var stations = JSON.parse(reponse);
        stations.forEach(function (station) {
            const name_station = station.name;
            const adresse = station.address;
            const latitude = station.position.lat;
            const longitude = station.position.lng;
            const bikes = station.available_bikes;
                if (bikes > 0){
                    var marker = L.marker([latitude, longitude],{icon: open}).addTo(map);
                }
                else {
                    var marker = L.marker([latitude, longitude],{icon: close}).addTo(map);
                }
        marker.addEventListener("click",function (){
            document.getElementById('formulaire').style.display = "block"
            let elmNameStation = document.getElementById('name_station')
            elmNameStation.textContent = name_station
            let elmBikes = document.getElementById('bikes')
            elmBikes.textContent = bikes
            let elmAdresse = document.getElementById('adresse')
            elmAdresse.textContent = adresse
            });
            });
            });

        var map = L.map('map').setView([45.75, 4.85], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // librairire JS pour la map LeafletJS
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

        var open = L.icon({
            iconUrl: 'icone_velo_vert.jpg',
            iconSize: [30, 30]
        });

        var close = L.icon({
            iconUrl: 'icone_velo_rouge.jpg',
            iconSize: [30,30]
        });

            if (localStorage.length != 0) {
                let nom = localStorage.getItem('nom')
                let prénom = localStorage.getItem('prénom')
                document.getElementById('nom').value = nom;
                document.getElementById('prénom').value = prénom;
            }

            if (sessionStorage.length != 0) {  // conserver les données de réservation après actualisation de la page
                let nom = localStorage.getItem('nom')
                let prénom = localStorage.getItem('prénom')
                let name_station = sessionStorage.getItem('name_station')
                document.getElementById('nom_resa_storage').textContent = nom;
                document.getElementById('prénom_resa_storage').textContent = prénom;
                document.getElementById('name_storage').textContent = name_station;
            }
            else {
                document.getElementById('reservationStatus_storage').style.display ="none"
            }
            

            

        this.form.addEventListener("submit", function (e) { /*pour annuler l'envoi des données du formulaire et les afficher à l'écran*/
            e.preventDefault();
            let btn_valid = document.getElementById('btn_valid') // pour valider la signature et lancer le timer de réservation
            btn_valid.addEventListener("click",function (){
                document.getElementById('reservationStatus').style.display = "block"
                document.getElementById('reservationStatus_storage').style.display ="none"
            var intervalId = setInterval(diminuerCompteur, 1000);
            let elmFormName = document.getElementById('nom_resa')
            elmFormName.innerHTML = document.getElementById("nom").value
            let elmFormNickname = document.getElementById('prénom_resa')
            elmFormNickname.innerHTML= document.getElementById("prénom").value
            let elmFormNameStation = document.getElementById('name')
            elmFormNameStation.innerHTML = document.getElementById("name_station").innerHTML
            let elmFormAdresse = document.getElementById('adresse_resa')
            elmFormAdresse.innerHTML = document.getElementById("adresse").innerHTML

            const nom = document.getElementById("nom").value;
            const prénom = document.getElementById("prénom").value;
                
                localStorage.setItem('nom', nom);
                localStorage.setItem('prénom', prénom);
                sessionStorage.setItem('name_station', name_station.textContent);
                sessionStorage.setItem('secondes', 0 );
                sessionStorage.setItem('minutes', 20);


            });
        });

        }};

const station = new Station()


            // tant que les secondes sont supérieurs à 0 tu fait -1 
            var secondesElt = document.getElementById("secondes");
            var minutesElt = document.getElementById("minutes");
            // Diminue le compteur jusqu'à 0 minutes
            function diminuerCompteur() {
            // Conversion en nombre du texte du compteur
            var secondes = sessionStorage.getItem('secondes');
            var minutes = sessionStorage.getItem('minutes');

    
                if ( minutes > 0){
                if (secondes > 0) {
                    sessionStorage.setItem('secondes', secondes - 1);
                    secondesElt.innerHTML = secondes - 1;
                } else {
                    sessionStorage.setItem('minutes', minutes - 1);
                    minutesElt.innerHTML = minutes - 1;
                    sessionStorage.setItem('secondes', 59);
                    secondesElt.textContent = 59; // pour que 59 secondes sois repris à chaque minute
                }
                } else {
                    localStorage.removeItem("nom");
                    localStorage.removeItem("prénom");
                    }
                }





