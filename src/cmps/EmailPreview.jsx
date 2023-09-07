import { Link } from "react-router-dom";

export default function EmailPreview({ email }) {
  return (
    <Link to={`/Email/details/${email.id}`}>
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
