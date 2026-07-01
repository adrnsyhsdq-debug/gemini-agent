import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";
import { Composio } from "@composio/core";
import { OpenAIProvider } from "@composio/openai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const llm = new OpenAI({
  apiKey: process.env.ZHIPU_API_KEY,
  baseURL: "https://open.bigmodel.cn/api/paas/v4",
});

const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  provider: new OpenAIProvider(),
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const tools = await composio.tools.get("default_user", { toolkits: ["github"], limit: 10 });
    let chatResponse = await llm.chat.completions.create({
      model: "glm-4.7-flash",
      messages: [{ role: "user", content: message }],
      tools: tools,
    });
    const responseMessage = chatResponse.choices[0].message;
    if (chatResponse.choices[0].finish_reason === "tool_calls") {
      const toolCall = responseMessage.tool_calls[0];
      const result = await composio.provider.executeToolCall("default_user", toolCall);
      let finalResponse = await llm.chat.completions.create({
        model: "glm-4.7-flash",
        messages: [
          { role: "user", content: message },
          responseMessage,
          { role: "tool", tool_call_id: toolCall.id, content: JSON.stringify(result) },
        ],
      });
      return res.json({ reply: finalResponse.choices[0].message.content, status: "Tool Composio berhasil dieksekusi!" });
    }
    res.json({ reply: responseMessage.content, status: "Langsung dijawab AI" });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Terjadi kesalahan", detail: error.message });
  }
});

app.use((req, res) => res.sendFile(path.join(__dirname, "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server berjalan! Buka: http://localhost:${PORT}`));
