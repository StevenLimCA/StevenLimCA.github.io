import React, { useState } from "react";
import "./ContactUs.scss";
import { send as sendForm } from "emailjs-com";

export default function ContactUs() {
  const [toSend, setToSend] = useState({
    from_name: "",
    to_name: "",
    message: "",
    reply_to: "",
  });
  const { REACT_APP_EMAILJS_KEY } = process.env;
  const onSubmit = (e) => {
    e.preventDefault();

    sendForm(
      "service_8ngunva",
      "template_vk7cnyb",
      toSend,
      REACT_APP_EMAILJS_KEY
    )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-us" id="Contact">
      <h1 className="contact-us__title">Contact Me</h1>
      <p className="contact-us__text">
        Thank you visiting my website! I am so excited to know more about you,
        your business and your upcoming projects! Kindly contact me by filling
        out the form below:
      </p>

      <form className="contact-us__form" onSubmit={onSubmit}>
        <div className="contact-us__divide">
          <input
            className="contact-us__input contact-us__field"
            type="text"
            name="from_name"
            placeholder="Please Enter Your Name"
            value={toSend.from_name}
            onChange={handleChange}
          />
          <input
            className="contact-us__input contact-us__field"
            type="text"
            name="reply_to"
            placeholder="Your email"
            value={toSend.reply_to}
            onChange={handleChange}
          />
        </div>

        <textarea
          className="contact-us__message"
          type="textarea"
          name="message"
          placeholder="Your message "
          value={toSend.message}
          onChange={handleChange}
        ></textarea>

        <button className="contact-us__button button grow" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
