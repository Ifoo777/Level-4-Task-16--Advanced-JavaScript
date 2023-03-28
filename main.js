//jQuery run once document has loaded
$(document).ready(function () {

    // Instructions of how to setup a map on https://leafletjs.com/

    // Making a Map
    // Parameters , latitude, longitude, zoom level
    let map = L.map('ISSMap').setView([0, 0], 2);
    // Making tiles of the map
    let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors';
    let tileURL = 'https:{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let tiles = L.tileLayer(tileURL, {
        attribution
    });
    tiles.addTo(map);

    // Marker with a custom Icon
    // Create the icon
    let ISSIcon = L.icon({
        iconUrl: 'nasa-iss.png',
        iconSize: [75, 50],
        iconAnchor: [25, 16],
    });
    // Initialize the marker on the map
    let marker = L.marker([0, 0], {
        icon: ISSIcon
    }).addTo(map);


    // async function
    async function getISS() {
        // Fetch the information from ISS
        let response = await fetch("http://api.open-notify.org/iss-now.json");
        // Parse the data to JSON
        let data = await response.json();

        // Declare variables based on information received
        let longitude = data.iss_position.longitude;
        let latitude = data.iss_position.latitude;
        let unixTimestamp = data.timestamp;
        // Convert the time 
        let milliseconds = unixTimestamp * 1000
        let dateObject = new Date(milliseconds)
        let DateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15

        // Set the position on the map for the icon
        marker.setLatLng([latitude, longitude]);

        // Display the information on the web page
        document.getElementById('long').textContent = longitude;
        document.getElementById('lat').textContent = latitude;
        document.getElementById('timeUpdate').textContent = DateFormat;
    }

    // Call the GetISS function
    getISS();

    //reload the page on click
    $('#refresh').on('click', function () {
        location.reload(true);
    });

});