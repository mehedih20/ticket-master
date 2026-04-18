export const getLeafletHtml = (lat: number, lng: number) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    html, body { margin:0; height:100%; }
    #map { height:100vh; }
  </style>
</head>
<body>
  <div id="map"></div>

  <script>
    const map = L.map('map', {
      maxZoom: 19
    }).setView([${lat}, ${lng}], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    L.marker([${lat}, ${lng}]).addTo(map);
  </script>
</body>
</html>
`;
