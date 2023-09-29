import PropTypes from 'prop-types'
import EmailPreview from "./EmailPreview"
import { emailService } from "../services/email.service"



export function EmailList({ emails, onUpdateEmail, setUnreadCount }) {

  return (
    <ul className="email-list">
      {emails.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt)).map((email) => (
        <li key={email.id}>
          <EmailPreview email={email} onUpdateEmail={onUpdateEmail} setUnreadCount={setUnreadCount} />
        </li>
      ))}
    </ul>
  )
}
EmailList.propTypes = {
  emails: PropTypes.arrayOf(emailService.getEmailShape())
}