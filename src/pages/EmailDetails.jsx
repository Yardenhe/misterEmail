import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";
import { Link } from "react-router-dom";

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const parms = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadEmail();
  }, []);

  async function loadEmail() {
    try {
      const emails = await emailService.getById(parms.emailId);
      setEmail(emails);
    } catch (err) {
      navigate("/email");

    }
  }
  async function onRemoveEmail(emailId) {
    try {
      console.log("remove" + emailId);
      await emailService.remove(emailId);
      navigate("/email");
    } catch (err) {
      console.log("Had issues loading emails", err);
    }
  }
  if (!email) return <div>Loading...</div>;
  return (
    <section className="email-details">
      <div>{email.from}</div>
      <div>{email.subject}</div>
      <div>{email.body}</div>
      <div>{new Date(email.sentAt).toLocaleString()}</div>
      <button
        onClick={() => {
          onRemoveEmail(email.id);
        }}
      >
        X
      </button>
      <Link to="/email">GoBack</Link>
    </section>
  );
}
