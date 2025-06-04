import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSupportForm({ onClose, type = "support", reportedUser = "" }) {
  const [supportName, setSupportName] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportSent, setSupportSent] = useState(false);
  const [error, setError] = useState("");

  const isReport = type === "report";

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedTime = now.toLocaleString();

    const finalMessage = isReport
      ? `🚩 Reported Player: ${reportedUser}\n📝 Report Details:\n${supportMessage}`
      : supportMessage;

    emailjs
      .send(
        "service_r4o74bq",
        "template_883lbh8",
        {
          name: isReport ? "(Report Submission)" : supportName,
          message: finalMessage,
          time: formattedTime,
        },
        "SAVtnr90_VmEX-7XA"
      )
      .then(() => {
        setSupportSent(true);
        setSupportName("");
        setSupportMessage("");
      })
      .catch((err) => {
        console.error("❌ EmailJS error:", err);
        setError("Failed to send message.");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-sm text-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-lg"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-yellow-300">
          {isReport ? "🚩 Report Player" : "📧 Contact Support"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isReport && (
            <input
              type="text"
              placeholder="Your name"
              value={supportName}
              onChange={(e) => setSupportName(e.target.value)}
              className="w-full p-2 rounded bg-black border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
              required
            />
          )}
          <textarea
            placeholder={
              isReport ? "Describe what this player did..." : "Your message"
            }
            value={supportMessage}
            onChange={(e) => setSupportMessage(e.target.value)}
            className="w-full p-2 rounded bg-black border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
            rows={4}
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition"
          >
            📨 Send Message
          </button>
          {supportSent && (
            <p className="text-green-400 text-center mt-2 font-semibold">Message sent!</p>
          )}
          {error && (
            <p className="text-red-400 text-center mt-2 font-semibold">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
