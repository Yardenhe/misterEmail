import { useState, useEffect } from "react";
import { emailService } from "../services/email.service";
import EmailList from "../cmps/EmailList";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);

  useEffect(() => {
    loadEmail();
  }, []);

  async function loadEmail() {
    try {
      const emails = await emailService.query();
      setEmails(emails);
    } catch (err) {
      console.log("Had issues loading emails", err);
    }
  }
  async function onRemoveEmail(emailId) {
    try {
      console.log("remove" + emailId);
      await emailService.remove(emailId);
      setEmails((prevEmails) =>
        prevEmails.filter((email) => email.id !== emailId)
      );
    } catch (err) {
      console.log("Had issues loading emails", err);
    }
  }
  if (!emails) return <div>Loading..</div>;
  return (
    <section className="robot-index">
      <EmailList emails={emails} onRemoveEmail={onRemoveEmail} />
    </section>
  );
}
