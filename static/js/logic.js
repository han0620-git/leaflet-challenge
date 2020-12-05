// Create a map object
var myMap = L.map("mapid", {
    center: [32.7767, -96.7970],
    zoom: 5
});

// Define greymap layers
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    function createFeatures(feature) {
        return {
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            color: "black",
            radius: chosenRadius(feature.properties.mag),
            stroke: true,
            weight: 1.0,
            opacity: 1,
            fillOpacity: 1
        };