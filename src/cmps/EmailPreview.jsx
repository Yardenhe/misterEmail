import { Link } from "react-router-dom";
import { emailService } from "../services/email.service";

export default function EmailPreview({ email }) {
  function onClickReadEmail() {
    emailService.update({ ...email, isRead: true });
  }

  return (
    <Link to={`/Email/details/${email.id}`} onClick={onClickReadEmail}>
      <article
        className={"email-preview unread" + (email.isRead ? "unread" : " ")}
      >
        <div>{email.from}</div>
        <div>{email.subject}</div>
        <div>{new Date(email.sentAt).toLocaleString()}</div>
      </article>
    </Link>
  );
}
