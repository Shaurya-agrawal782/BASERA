<script>
  const lat = <%= listing.coordinates.coordinates[1] %>;
  const lng = <%= listing.coordinates.coordinates[0] %>;

  const map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup("<b><%= listing.title %></b>")
    .openPopup();
</script>
