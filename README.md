# 🌩️ DRDN - Disaster-Ready Delivery Network (GCP Only)

A cloud-powered disaster response system that saves and visualizes emergency delivery routes using **only GCP services**.

## 🚀 Live Demo  
🔗 [Live Project Website](https://storage.googleapis.com/drdn-static-site/index.html)

## 🛠 Tech Stack

| Layer      | Tool                        |
|------------|-----------------------------|
| Frontend   | HTML, CSS, JS, Google Maps  |
| Database   | Firestore (REST API)        |
| Hosting    | Cloud Storage               |
| Alerts     | Pub/Sub + Cloud Function    |

## ☁️ GCP Services Used

- **Cloud Firestore** – Route data storage  
- **Google Maps API** – Live directions and visualization  
- **Cloud Storage** – Hosting the frontend  
- **Pub/Sub + Cloud Function** – Message alerts on route creation  

## 📁 Repo Structure

drdn-gcp/
├── drdn-project/ # Static website (HTML/CSS/JS)
├── drdn-pubsub-function/ # Cloud Function code
├── output/ # Screenshots for submission
└── README.md

shell
Copy
Edit

## ✅ Status: Completed  
All required GCP integrations are working and submitted via GitHub.