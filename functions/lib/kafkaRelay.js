const { Kafka, logLevel } = require("kafkajs");

function getKafkaConfig() {
  const brokers = (process.env.KAFKA_BROKERS || "")
    .split(",")
    .map(x => x.trim())
    .filter(Boolean);

  const topic = process.env.KAFKA_TOPIC_INTAKE || "intake.leads.v1";
  const clientId = process.env.KAFKA_CLIENT_ID || "socioprophet-intake-relay";
  const mode = process.env.KAFKA_MODE || "disabled";

  return { brokers, topic, clientId, mode };
}

async function getProducer() {
  const { brokers, clientId, mode } = getKafkaConfig();
  if (!brokers.length || mode === "disabled") {
    throw new Error("Kafka not configured");
  }

  const config = {
    clientId,
    brokers,
    ssl: true,
    logLevel: logLevel.NOTHING,
  };

  // Optional OAuth bearer path for managed Kafka later
  if (mode === "oauthbearer") {
    const token = process.env.KAFKA_OAUTH_BEARER_TOKEN || "";
    if (!token) throw new Error("Missing KAFKA_OAUTH_BEARER_TOKEN");
    config.sasl = {
      mechanism: "oauthbearer",
      oauthBearerProvider: async () => ({ value: token }),
    };
  }

  const kafka = new Kafka(config);
  const producer = kafka.producer();
  await producer.connect();
  return producer;
}

function buildEnvelope(outboxDoc) {
  const f = outboxDoc.fields || {};
  const mv = (x) => (x && x.mapValue && x.mapValue.fields) || {};
  const sv = (x) => (x && x.stringValue) || "";
  const tv = (x) => (x && x.timestampValue) || "";
  const summary = mv(f.summary);
  const platform = mv(f.platform);
  const experiment = mv(f.experiment);
  const policy = mv(f.policy);
  const udm = mv(f.udm);

  return {
    event_id: outboxDoc.name.split("/").pop(),
    event_type: sv(f.kind),
    event_version: 1,
    occurred_at: tv(f.createdAt),
    lead_id: sv(f.leadId),
    status: sv(f.status),
    summary: {
      surface: sv(summary.surface),
      audience: sv(summary.audience),
      email: sv(summary.email),
      intent: sv(summary.intent),
      reason: sv(summary.reason),
      page: sv(summary.page),
    },
    platform,
    experiment,
    policy,
    udm,
  };
}

module.exports = {
  getKafkaConfig,
  getProducer,
  buildEnvelope,
};
