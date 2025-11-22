// server.js
import express from 'express';
import fetch from 'node-fetch'; // npm install node-fetch
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Your Google AI API key (keep this secret!)
const API_KEY = "AIzaSyAB2ybNFXZbMccHrd23rjLgPi5n0RwBwek";

app.post('/ai', async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: "Prompt is required." });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: { text: prompt },
          temperature: 0.7,
          maxOutputTokens: 500
        })
      }
    );

    const data = await response.json();
    res.json(data); // send full API response to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch from Google AI API.' });
  }
});

// Serve your HTML and static files (optional)
app.use(express.static('./'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
