const express = require("express");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3001;
const INSTANCE = process.env.INSTANCE || "UNKNOWN";
let activeRequests = 0;

app.use((req, res, next) => {
  activeRequests++;
  res.on("finish", () => activeRequests--);
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Response from backend",
    instance: INSTANCE,
    port: PORT,
    hostname: os.hostname(),
    activeRequests,
    time: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK" + PORT + " " + INSTANCE);
});

app.get("/slow", async (req, res) => {
  const delay = Number(req.query.delay || 5000);
  await new Promise(resolve => setTimeout(resolve, delay));
  res.json({ instance: INSTANCE, delay });
});

app.get("/cpu", (req, res) => {
  const end = Date.now() + 3000;
  while (Date.now() < end) Math.sqrt(Math.random());
  res.json({ instance: INSTANCE, message: "CPU intensive task done" });
});

app.get("/session", (req, res) => {
  res.json({ instance: INSTANCE, message: "Sticky session demo" });
});

app.get("/crash", (req, res) => {
  res.send("Crashing server...");
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server ${INSTANCE} running on port ${PORT}`);
});