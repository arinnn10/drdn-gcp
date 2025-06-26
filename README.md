# 🌩️ DRDN - Disaster-Ready Delivery Network

A smart disaster-response system built using 100% Google Cloud Platform services. DRDN allows mapping of emergency zones, real-time delivery routing, and logs emergency delivery routes to Firestore, integrated with Pub/Sub alerts.

---

## 🌐 Live Demo

**Frontend**: [View Project](https://storage.googleapis.com/drdn-static-site/index.html)

---

## 🧱 Architecture Diagram

![DRDN Architecture](https://raw.githubusercontent.com/arinnn10/drdn-gcp/main/architecture.png)

---

## 🔧 Tech Stack

- HTML, CSS, JavaScript
- Google Maps JavaScript API
- Firestore (GCP-native, not Firebase)
- Cloud Functions (Node.js)
- Cloud Pub/Sub
- Cloud Storage (Static Hosting)

---

## ☁️ GCP Services Used

| Service              | Use Case                               |
|----------------------|----------------------------------------|
| Google Maps API      | Map display + Directions Routing       |
| Cloud Firestore      | Route + Zone data storage              |
| Cloud Storage        | Hosting the frontend app               |
| Cloud Pub/Sub        | Publishing zone alerts via backend     |
| Cloud Functions      | Pub/Sub trigger for sending messages   |

---

## 🗺️ Features

- Submit **Disaster Zone**, **Pickup**, and **Drop** locations
- Automatically draw route on map
- Save route details to Firestore
- Trigger Pub/Sub event for monitoring
- Fully serverless using GCP-only stack

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/arinnn10/drdn-gcp.git
cd drdn-gcp

# 2. Deploy frontend
gsutil mb -p drdn-project-464017 -l asia-south1 gs://drdn-static-site/
gsutil web set -m index.html -e 404.html gs://drdn-static-site/
gsutil cp index.html script.js style.css gs://drdn-static-site/
gsutil iam ch allUsers:objectViewer gs://drdn-static-site/

# 3. Deploy Cloud Function
cd drdn-pubsub-function
gcloud functions deploy publishRoute \
  --runtime nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --region asia-south1 \
  --entry-point publishRoute
