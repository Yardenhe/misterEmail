import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";
import { Link } from "react-router-dom";

export function EmailCompose() {
  const [email, setEmail] = useState(null);
  const Parms = useParams();
  const navigate = useNavigate();

  function handleChange({ target }) {
    var { value, name: field } = target;
    switch (target.type) {
      case "range":
      case "number":
        value = +target.value || 0;
        break;
      case "checkbox":
        value = target.checked;
        break;
    }
    setEmail((prevEmail) => ({ ...prevEmail, [field]: value }));
    console.log(email);
  }

  async function onSendEmail(ev) {
    ev.preventDefault();
    try {
      console.log("Send" + email);
      await emailService.save(email);
      navigate("/email");
    } catch (err) {
      console.log("Had issues send email", err);
    }
  }
  return (
    <form className="email-Compose-form">
      <h1>New Message</h1>
      <div className="form-compose">
        <label htmlFor="from">From:</label>
        <input
          type="email"
          id="from"
          name="from"
          //value={Parms.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-compose">
        <label htmlFor="to">To:</label>
        <input
          type="email"
          id="to"
          name="to"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-compose">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-compose">
        <label htmlFor="body">Body:</label>
        <textarea id="body" name="body" onChange={handleChange} required />
      </div>
      <button onClick={onSendEmail}>Send</button>
      <Link to="/email">GoBack</Link>
    </form>
  );
}
