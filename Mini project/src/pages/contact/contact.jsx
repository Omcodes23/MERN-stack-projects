// pages/contact/Contact.js (or "contact.jsx")
import React from "react";
import "./Contact.css"; // Import the CSS file

const Contact = () => {
  return (
    <div className="contact-container"> {/* Apply CSS class to the container */}
      <h2>Contact Us</h2>
      <p>
        For any inquiries or feedback, please feel free to contact us. We value
        your thoughts and suggestions.
      </p>
      <div>
        <h4>Author: Om Vatliya</h4>
        <p>Email: om.vatliya@example.com</p>
        <p>Phone: +1 123-456-7890</p>
        <p>Address: 123 Main Street, City, Country</p>
      </div>
    </div>
  );
};

export default Contact;
