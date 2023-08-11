import React, {useRef, useState} from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_v96zn8d",
        "template_id5vh43",
        form.current,
        "5axqcr4ui3rRzy9dh"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message send");
          setMessage('Email Send!');
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Your Name</label>
      <input type="text" name="user_name" />
      <label>Your Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <button
        type="submit"
        className="border border-green-600 bg-blue-600 hover:bg-blue-500 w-full my-2 text-white" style={{ backgroundColor: 'rgba(57,75,86,255)' }}>
        Send
      </button>
        {message && <p style={{ color: 'orange' }}>{message}</p>}
    </form>
  );
};
