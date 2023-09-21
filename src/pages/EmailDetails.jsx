import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";
import { Link } from "react-router-dom";
import { eventBusService } from "../services/event-bus.service";

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const parms = useParams();
  const navigate = useNavigate();
  const { onRemoveEmail } = useOutletContext();

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
  function onDeleteEmail() {
    onRemoveEmail(email.id)
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
          onDeleteEmail(email.id);
        }}
      >
        X
      </button>
      <Link to="/email">GoBack</Link>
    </section>
  );
}
