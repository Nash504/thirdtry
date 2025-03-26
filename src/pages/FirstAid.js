import React, { useState } from "react";
import axios from "axios";
import { Mic, Loader2, AlertCircle } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { motion } from "framer-motion";
import "./FirstAid.css";

function FirstAid() {
  const [symptoms, setSymptoms] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleGetAdvice = async () => {
    if (!symptoms.trim()) {
      setSuggestion("⚠️ Please enter your symptoms.");
      return;
    }

    setLoading(true);
    setSuggestion("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: `Provide first-aid advice for: ${symptoms}` }] }],
        }
      );

      const advice = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No advice available.";
      setSuggestion(advice.replace(/\n/g, "\n\n✅ "));
    } catch (error) {
      console.error("API Error:", error);
      setSuggestion("❌ Error fetching advice. Please try again.");
    }

    setLoading(false);
  };

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => setSymptoms(event.results[0][0].transcript);
  };

  return (
    <motion.div 
      className="p-6 max-w-md mx-auto rounded-lg shadow-lg bg-white mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-semibold text-center mb-4">First Aid Assistance</h1>
      <p className="text-center text-gray-600 mb-4">Enter or speak your symptoms to get AI-powered first-aid advice.</p>
      
      <div className="relative flex">
        <Input 
          type="text" 
          placeholder="Describe your symptoms..." 
          value={symptoms} 
          onChange={(e) => setSymptoms(e.target.value)} 
          className="pr-12"
        />
        <button 
          onClick={handleVoiceInput} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
        >
          {isListening ? <Loader2 className="animate-spin" /> : <Mic />}
        </button>
      </div>

      <Button 
        onClick={handleGetAdvice} 
        className="w-full mt-4"
        disabled={loading}
      >
        {loading ? "Fetching advice..." : "Get First-Aid Advice"}
      </Button>

      {suggestion && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-semibold">AI First-Aid Advice:</h2>
          <p className="whitespace-pre-line text-gray-700">{suggestion}</p>
        </div>
      )}
    </motion.div>
  );
}

export default FirstAid;
