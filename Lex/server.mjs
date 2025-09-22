import express from "express";
import { VertexAI } from "@google-cloud/vertexai";

const app = express();
app.use(express.json());
app.use(express.static("dist")); // serve your Vite build

// Virginia
const location = process.env.VERTEX_LOCATION || "us-east4";
const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash-002";

const vertex = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT, // Cloud Run injects this
  location,
});
const model = vertex.getGenerativeModel({ model: modelName });

app.post("/api/generate", async (req, res) => {
  try {
    const prompt = req.body?.prompt ?? "Hello from APAS / Orakles";
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const text =
      result.response?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || "")
        .join("") || "";
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err?.message || err) });
  }
});

app.get("/healthz", (_req, res) => res.send("ok"));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on :${port}`));
