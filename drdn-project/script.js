let map, directionsService, directionsRenderer;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 19.0760, lng: 72.8777 } // Mumbai
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
}

document.getElementById("routeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const zone = document.getElementById("zone").value;
  const pickup = document.getElementById("pickup").value;
  const drop = document.getElementById("drop").value;

  const data = {
    zone,
    pickup,
    drop,
    timestamp: new Date().toISOString()
  };

  // Firestore REST API
  const firestoreUrl = "https://firestore.googleapis.com/v1/projects/drdn-project-464017/databases/(default)/documents/routes";

  try {
    // Save to Firestore
    const response = await fetch(firestoreUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fields: {
          zone: { stringValue: data.zone },
          pickup: { stringValue: data.pickup },
          drop: { stringValue: data.drop },
          timestamp: { timestampValue: data.timestamp }
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Firestore Error: ${errorData.error.message}`);
    }

    alert("✅ Route saved to Firestore!");

    // ✅ Call Cloud Function to publish message to Pub/Sub
    await fetch("https://asia-south1-drdn-project-464017.cloudfunctions.net/publishRoute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    

    console.log("✅ Pub/Sub message sent!");

    // Draw the route on the map
    directionsService.route({
      origin: pickup,
      destination: drop,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      } else {
        alert("❌ Could not display route. Please check your pickup/drop locations.");
      }
    });
  } catch (err) {
    console.error("Submission failed:", err.message);
    alert("❌ Failed to submit. Check console for details.");
  }
});
