"use client";

import { useState } from "react";
import Button from "../core/button";
import Input from "../core/input";
import TextArea from "../core/textarea";

interface ContactFormProps {
  source?: string;
}

export default function ContactForm({ source = "direct" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/webhooks/forward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <p className="text-accent text-body font-semibold mb-2">Message Sent</p>
        <p className="text-secondary">I&apos;ll get back to you within 24-48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <Input
          name="name"
          placeholder="Your Name *"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <Input
          name="email"
          type="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <Input
          name="company"
          placeholder="Company (optional)"
          value={formData.company}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <TextArea
          name="message"
          placeholder="Tell me about your project or challenge..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
        />
      </div>
      <div className="form-group">
        <Button
          variant="primary"
          type="submit"
          disabled={status === "loading"}
          className="w-full"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>
      </div>
      {status === "error" && (
        <p className="text-error text-small">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}