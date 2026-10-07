import { useState } from "react";
import "./Contact.css";
import { submitContactForm } from "../services/contactService";

const contactDetails = [
  {
    title: "Email us",
    text: "hello@goodkind.market",
    subtext: "For support, selling questions, and partnership ideas.",
  },
  {
    title: "Visit the studio",
    text: "18 Orchard Row, Brooklyn, NY",
    subtext: "Come by for local pickups and community events.",
  },
  {
    title: "Hours",
    text: "Mon–Fri · 9am–6pm",
    subtext: "We usually reply within one to two business days.",
  },
];

const initialFormData = {
  name: "",
  email: "",
  reason: "General question",
  message: "",
  attachment: null,
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [notice, setNotice] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleFileChange(event) {
    setFormData((prev) => ({
      ...prev,
      attachment: event.target.files?.[0] ?? null,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.attachment && formData.attachment.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("subject", formData.reason);
    payload.append("message", formData.message);

    if (formData.attachment) {
      payload.append("attachment", formData.attachment); // Raw File instance
    }

    await submitContactForm(payload);

    setFormData(initialFormData);

    setNotice("Thanks for reaching out — we’ll be in touch soon.");

    event.target.reset();
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-copy">
          <span className="eyebrow contact-eyebrow">
            <span className="eyebrow-sparkle">✳</span> SAY HELLO
          </span>
          <h1>We’d love to hear from you.</h1>
          <p>
            Whether you’re looking to sell a favorite piece, ask a question, or
            just say hello, we’re happy to help.
          </p>
        </div>
        <div className="contact-cta">
          <span className="contact-cta-label">Quick reply</span>
          <a href="mailto:hello@goodkind.market">hello@goodkind.market</a>
          <span className="contact-cta-meta">
            Usually within 1–2 business days
          </span>
        </div>
      </section>

      <section className="contact-layout">
        <div className="contact-details" aria-label="Contact information">
          {contactDetails.map((item) => (
            <article className="contact-detail" key={item.title}>
              <span className="contact-detail-title">{item.title}</span>
              <strong>{item.text}</strong>
              <p>{item.subtext}</p>
            </article>
          ))}
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="field">
              <span>Name</span>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="field">
            <span>Reason</span>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            >
              <option>General question</option>
              <option>Sell an item</option>
              <option>Partnership</option>
              <option>Community event</option>
            </select>
          </label>

          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              placeholder="Tell us a little more..."
              required
              rows="6"
              value={formData.message}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span>
              Attachment <span className="contact-optional">Optional</span>
            </span>
            <input
              className="contact-file-input"
              name="attachment"
              type="file"
              onChange={handleFileChange}
            />
            <span className="contact-file-hint">
              {formData.attachment?.name ||
                "Choose a file to include with your message"}
            </span>
          </label>

          <button className="contact-submit" type="submit">
            Send message <span aria-hidden="true">↗</span>
          </button>

          {notice && (
            <p className="contact-notice" role="status">
              <span aria-hidden="true">✳</span> {notice}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
