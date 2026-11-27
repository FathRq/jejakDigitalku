/**
 * server.js — Mini local server untuk menyimpan hasil sesi ke file JSON.
 *
 * Jalankan: node server.js
 * Endpoint: POST http://localhost:3001/submit
 *
 * Data tiap peserta disimpan ke: data/results.json
 * (array JSON, satu objek per baris peserta)
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = process.env.PORT ?? 3001;
const __dir = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dir, "data");
const RESULTS_FILE = path.join(DATA_DIR, "results.json");

// Pastikan folder data/ ada
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

// Pastikan file results.json ada dan berisi array kosong
if (!fs.existsSync(RESULTS_FILE)) fs.writeFileSync(RESULTS_FILE, "[]", "utf8");

function readResults() {
  try {
    return JSON.parse(fs.readFileSync(RESULTS_FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveResults(arr) {
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(arr, null, 2), "utf8");
}

const server = http.createServer((req, res) => {
  // CORS — izinkan request dari localhost Vite (port berapa pun)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/submit") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const payload = JSON.parse(body);
        const results = readResults();
        results.push(payload);
        saveResults(results);

        const code = payload?.participantCode ?? "unknown";
        console.log(`[${new Date().toLocaleTimeString()}] ✅ Tersimpan: ${code} (total: ${results.length})`);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, total: results.length }));
      } catch (err) {
        console.error("❌ Gagal parse payload:", err.message);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  // Route tidak dikenal
  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`\n🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📁 Data disimpan ke: ${RESULTS_FILE}`);
  console.log(`\nTekan Ctrl+C untuk berhenti.\n`);
});
