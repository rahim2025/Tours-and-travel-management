mapboxgl.accessToken = mapToken;
console.log(coordinate);
const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinate, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });

const marker1 = new mapboxgl.Marker()
    .setLngLat(coordinate)
    .addTo(map);