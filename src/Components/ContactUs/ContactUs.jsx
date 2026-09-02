import React, { useRef, useState } from "react";
import "./ContactUs.scss";
import { addInvalidClass } from "../../utlities/addInvalidClass";

const encodeForm = (formElement) =>
  new URLSearchParams(new FormData(formElement)).toString();

export default function ContactUs() {
  const form = useRef();
  const [status, setStatus] = useState("idle");

  const validSubmit = (formElement) => {
    const { from_name, reply_to, message, "bot-field": botField } =
      formElement.elements;

    addInvalidClass(from_name);
    addInvalidClass(reply_to);
    addInvalidClass(message);

    if (botField.value) {
      return false;
    }

    if (!from_name.value || !reply_to.value || !message.value) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validSubmit(e.currentTarget)) {
      setStatus("invalid");
      return;
    } else {
      setStatus("sending");

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm(form.current),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Form submission failed");
          }

          setStatus("success");
          form.current.reset();
          window.location.href = "#home";
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
        });
    }
  };

  return (
    <div className="contact-us" id="Contact">
      <h1 className="contact-us__title">Contact Me</h1>
      <p className="contact-us__text">
        Thanks for visiting my site. Tell me a little about your project, team,
        or idea, and I will get back to you as soon as I can.
      </p>

      <form
        ref={form}
        className="contact-us__form"
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        noValidate
        onSubmit={onSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="contact-us__bot-field">
          <label>
            Do not fill this out if you are human:
            <input name="bot-field" tabIndex="-1" autoComplete="off" />
          </label>
        </p>
        <div className="contact-us__divide">
          <label className="contact-us__label" htmlFor="from_name">
            Name
          </label>
          <input
            id="from_name"
            className="contact-us__input contact-us__field"
            type="text"
            name="from_name"
            required
            aria-required="true"
            placeholder="Your name"
          />
          <label className="contact-us__label" htmlFor="reply_to">
            Email
          </label>
          <input
            id="reply_to"
            className="contact-us__input contact-us__field"
            type="email"
            name="reply_to"
            required
            aria-required="true"
            placeholder="Your email"
          />
        </div>

        <label className="contact-us__label" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          className="contact-us__message"
          type="textarea"
          name="message"
          required
          aria-required="true"
          placeholder="What would you like to build?"
        />

        <button
          className="contact-us__button button shrink"
          type="submit"
          value="send"
        >
          Submit
        </button>
        {status === "invalid" && (
          <p className="contact-us__status" role="status">
            Please fill in your name, email, and message.
          </p>
        )}
        {status === "sending" && (
          <p className="contact-us__status" role="status">
            Sending your message...
          </p>
        )}
        {status === "success" && (
          <p className="contact-us__status" role="status">
            Thanks, your message has been sent.
          </p>
        )}
        {status === "error" && (
          <p className="contact-us__status contact-us__status--error" role="status">
            Something went wrong. Please try again in a moment.
          </p>
        )}
      </form>
    </div>
  );
}
