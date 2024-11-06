
// Déclaration des variables
var osm, esriIMG, map, arbres, arbresLayer;


// ---------------- Chargement des détails d'incendies avec une promesse --------------
function getAllData() {
    return new Promise(function(resolve, reject) {
        var url_objet = 'http://127.0.0.1:8000/gestionArbres/getData/';

        $.ajax({
            url: url_objet,
            type: 'GET',
            success: function(data) {
                // Mettre à jour la variable arbres
                arbres = JSON.parse(data);
                console.log("Données des arbres chargées :", arbres);
                resolve(arbres); // Résoudre la promesse avec les données des arbres
            },
            error: function(error) {
                console.log("Erreur lors du chargement des données :", error);
                reject(error); // Rejeter la promesse en cas d'erreur
            }
        });
    });
}

function getTreePopUp(tree_id, layer) {
    $.ajax(
        {
            url: `http://127.0.0.1:8000/gestionArbres/getTreeInfo/${tree_id}`,
            type: 'GET',
            success: function(data) {
                layer.bindPopup(data)
            }
        });
}

// Fonction qui initialise la carte
function initialiserCarte() {
    // Tuilage de couches raster
    osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    esriIMG = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // Création de la carte et ajout de la couche OSM
    map = L.map('map', {
        layers: [osm]
    });
    map.setView([35.28, -5.48], 9);

    // Appeler getAllData() et attendre que la promesse se résolve
    getAllData().then(function(data) {
        // Créer arbresLayer avec les données chargées
        arbresLayer = L.geoJSON(data, {
            onEachFeature: function(feature, layer) {
                layer.on(
                    'click',
                    function(e) {getTreePopUp(feature.properties.pk, layer)}
                );
                layer.bindTooltip("Arbre : " + feature.properties.espece);
            }
        }).addTo(map);

        // Groupage des couches
        var fondsCarto = {'Open Street Map': osm, 'Imagery Satellitaire': esriIMG};
        var overlayLayers = {
            "Arbres": arbresLayer,
        };

        // Ajouter le contrôle des couches à la carte
        L.control.layers(fondsCarto, overlayLayers, {
            collapsed: false
        }).addTo(map);

    }).catch(function(error) {
        console.log("Erreur lors de l'initialisation de la carte :", error);
    });
}

document.addEventListener('DOMContentLoaded', initialiserCarte);


