import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { emailService } from "../services/email.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrashCan, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { utilService } from "../services/util.service"


export default function EmailPreview({ email, onUpdateEmail, setUnreadCount }) {


  const [star, setStar] = useState(email.isStarred)
  const [isRead, setisRead] = useState(email.isRead)


  function onToggleIsRead(isIcon) {
    setisRead((isRead) => !isRead)
    isRead && isIcon && setUnreadCount((prev) => prev + 1)
    !isRead && isIcon && setUnreadCount((prev) => prev - 1)
    !isRead && !isIcon && setUnreadCount((prev) => prev - 1)

    const updatedEmail = {
      ...email,
      isRead: !email.isRead
    }
    onUpdateEmail(updatedEmail)
  }
  function onToggleStar() {
    setStar((star) => !star)
    const updatedEmail = {
      ...email,
      isStarred: !email.isStarred
    }
    onUpdateEmail(updatedEmail)

  }




  async function onToggleTrash() {
    const updatedEmail = {
      ...email,
      removedAt: Date.now()
    }
    onUpdateEmail(updatedEmail)

  }
  return (
    <article
      className={"email-preview unread" + (isRead ? "unread" : " ")}
    >

      <input
        type="checkbox"
        name="selectEmail"
        placeholder="selectEmail"
      // onChange={handleChange}
      />
      <section className={"star-icon" + (star ? " clicked-star" : " ")} onClick={() => onToggleStar()}>
        <FontAwesomeIcon icon={faStar} />
      </section>
      <Link to={`/email/details/${email.id}`} className="main-mail-link" onClick={() => onToggleIsRead(false)}>
        <section className="main-mail">
          <div>{utilService.formatSenderName(email.from)}</div>
          <div className="email-subject">{email.subject}</div>
          {!email.sentAt && <div className="draft">draft</div>}
          {email.sentAt && <div className="sent-at">{utilService.formatDate(new Date(email.sentAt))}</div>}
        </section>
      </Link>
      <section className="icons">
        <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => onToggleTrash()} />
        <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" onClick={() => onToggleIsRead(true)} />
      </section>


    </article >

  )
}
