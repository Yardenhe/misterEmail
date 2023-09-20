import EmailPreview from "./EmailPreview";

export function EmailList({ emails, onUpdateEmail }) {
  return (
    <ul className="email-list">
      {emails.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt)).map((email) => (
        <li key={email.id}>
          <EmailPreview email={email} onUpdateEmail={onUpdateEmail} />
        </li>
      ))}
    </ul>
  );
}
