import React, { useRef } from "react";
import "./ContactUs.scss";
import { addInvalidClass } from "../../utlities/addInvalidClass";
import { send as sendForm } from "emailjs-com";

export default function ContactUs() {
  const form = useRef();
  const validSubmit = (e) => {
    addInvalidClass(e.target.from_name);
    addInvalidClass(e.target.reply_to);
    addInvalidClass(e.target.message);

    if (
      !e.target.from_name.value ||
      !e.target.reply_to.value ||
      !e.target.message.value
    ) {
      return false;
    } else {
      return true;
    }
  };
  const { REACT_APP_EMAILJS_KEY } = process.env;
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validSubmit(e)) {
      return;
    } else {
      const formData = new FormData();

      formData.append("from_name", e.target.from_name.value);
      formData.append("reply_to", e.target.reply_to.value);
      formData.append("message", e.target.message.value);
      sendForm(
        "service_8ngunva",
        "template_vk7cnyb",
        formData,
        REACT_APP_EMAILJS_KEY
      )
        .then((response) => {
          alert(
            "Thank you! Your message was delivered!",
            response.status,
            response.text
          );
          window.location.href = "#home";
        })
        .catch((err) => {
          alert("FAILED... Please try again later.", err);
        });
    }
  };

  return (
    <div className="contact-us" id="Contact">
      <h1 className="contact-us__title">Contact Me</h1>
      <p className="contact-us__text">
        Thank you visiting my website! I am so excited to know more about you,
        your business and your upcoming projects! Kindly contact me by filling
        out the form below:
      </p>

      <form ref={form} className="contact-us__form" onSubmit={onSubmit}>
        <div className="contact-us__divide">
          <input
            className="contact-us__input contact-us__field"
            type="text"
            name="from_name"
            placeholder="Please Enter Your Name"
          />
          <input
            className="contact-us__input contact-us__field"
            type="email"
            name="reply_to"
            placeholder="Your email"
          />
        </div>

        <textarea
          className="contact-us__message"
          type="textarea"
          name="message"
          placeholder="Your message "
        />

        <button
          className="contact-us__button button shrink"
          type="submit"
          value="send"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
