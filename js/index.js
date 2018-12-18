const inProj  = "+proj=lcc +lat_1=44.25 +lat_2=45.75 +lat_0=45 +lon_0=3 +x_0=1700000 +y_0=4200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
const outProj = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
var map;

const colletColour = '#c12456';
const houppierColour = '#82db32';
const racineColour = '#e1e408';
const troncColour = '#2d7fd2';

const MAX_MARKER = 100;

const colletMarkerStyles = `
  background-color: ${colletColour};
  width: 2rem;
  height: 2rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

const houppierMarkerStyles = `
  background-color: ${houppierColour};
  width: 2rem;
  height: 2rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

const racineMarkerStyles = `
  background-color: ${racineColour};
  width: 2rem;
  height: 2rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

const troncMarkerStyles = `
  background-color: ${troncColour};
  width: 2rem;
  height: 2rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

const iconCollet = L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${colletMarkerStyles}" />`
});

const iconHouppier = L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${houppierMarkerStyles}" />`
});

const iconRacine = L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${racineMarkerStyles}" />`
});

const iconTronc = L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${troncMarkerStyles}" />`
})

$( document ).ready(function() {
    console.log('lol');
    map = L.map('map').setView([45.1666700, 5.7166700], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        id: 'mapbox.streets',
    }).addTo(map);

    $.ajax({
        type: "GET",
        url: "datas/donnees-defi-egc.csv",
        dataType: "text",
        success: function(data) {processData(data);}
    });
});


function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    allTextLines = shuffle(allTextLines);
    var lines = [];
    var c = 0;
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            var tarr = [];
            if(c <= MAX_MARKER) {
                if (data[29] === '1' || data[30] === '1' || data[31] === '1' || data[32] === '1' || data[33] === '1') {
                    let latlng = proj4(inProj, outProj).forward([parseFloat(data[27]), parseFloat(data[28])]);
                    //console.log(data[27] + ';' + data[28]);
                    //console.log(latlng);
                    if(data[30] === '1') {
                        //L.marker([latlng[1], latlng[0]],
                        //    {icon: iconCollet}).addTo(map);
                        //c++;
                    } else if (data[31] === '1') {
                       // L.marker([latlng[1], latlng[0]],
                        //   {icon: iconHouppier}).addTo(map);
                        //c++;
                    } else if (data[32] === '1') {
                        //L.marker([latlng[1], latlng[0]],
                        //  {icon: iconRacine}).addTo(map);
                        //c++;
                    } else if (data[33] === '1') {
                        L.marker([latlng[1], latlng[0]],
                           {icon: iconTronc}).addTo(map);
                        c++;
                    }
                }
            }
            /*for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
                if(headers[j] === 'coord_x') {
                    console.log(data[j]);
                } else if (headers[j] === 'coord_y') {
                    console.log(data[j]);
                }
            }*/
            lines.push(tarr);
        }
    }
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}