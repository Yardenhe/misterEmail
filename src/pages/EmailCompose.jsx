import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, } from "@fortawesome/free-solid-svg-icons";
import imgUrl from "../assets/imgs/arrow-diagonal-svgrepo-com.png";
import underline from "../assets/imgs/underline-1437-svgrepo-com.png";

export function EmailCompose() {
  const [email, setEmail] = useState(null);
  const Parms = useParams();
  const navigate = useNavigate();
  const { onAddEmail } = useOutletContext();

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

  }

  async function onSendEmail(ev) {
    ev.preventDefault();
    try {
      onAddEmail(email)
    } catch (err) {
      console.log("Had issues send email", err);
    }
  }
  return (
    <form className="email-Compose-form">
      <section className="header-compose">
        <h3>New Message</h3>
        <section className="header-compose-icons">
          <img className="arrow-header-underline" src={underline} alt="" />
          <img className="arrow-header-open" src={imgUrl} alt="" />
          <Link to="/email">
            <FontAwesomeIcon icon={faX} className="msg-icon" />
          </Link>
        </section>
      </section>
      <div className="form-compose">
        <label htmlFor="to">To</label>
        <input
          type="email"
          id="to"
          name="to"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-compose">
        <label htmlFor="from">From</label>
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
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-compose">

        <textarea id="body" name="body" onChange={handleChange} required />
      </div>
      <button onClick={onSendEmail}>Send</button>
    </form>
  );
}
