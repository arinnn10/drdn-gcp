const { PubSub } = require('@google-cloud/pubsub');

const pubsub = new PubSub();

exports.publishRoute = async (req, res) => {
  try {
    const { zone, pickup, drop, timestamp } = req.body;

    const message = {
      zone,
      pickup,
      drop,
      timestamp
    };

    const dataBuffer = Buffer.from(JSON.stringify(message));

    await pubsub.topic('route-submitted').publishMessage({ data: dataBuffer });

    console.log("✅ Message published to Pub/Sub");
    res.status(200).send("Message published to Pub/Sub");
  } catch (error) {
    console.error("❌ Error publishing to Pub/Sub:", error);
    res.status(500).send("Failed to publish message");
  }
};
