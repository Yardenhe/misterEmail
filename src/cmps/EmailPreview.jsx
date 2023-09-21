import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { emailService } from "../services/email.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrashCan, faEnvelope } from '@fortawesome/free-regular-svg-icons';

export default function EmailPreview({ email, onUpdateEmail, SetunreadCount }) {

  const [star, setStar] = useState(email.isStarred);
  const [isRead, setisRead] = useState(email.isRead);


  function onToggleIsRead(isIcon) {
    setisRead((isRead) => !isRead);
    isRead && isIcon && SetunreadCount((prev) => prev + 1);
    !isRead && isIcon && SetunreadCount((prev) => prev - 1);
    !isRead && !isIcon && SetunreadCount((prev) => prev - 1);

    const updatedEmail = {
      ...email,
      isRead: !email.isRead
    }
    onUpdateEmail(updatedEmail);

  }
  function onToggleStar() {
    setStar((star) => !star);
    const updatedEmail = {
      ...email,
      isStarred: !email.isStarred
    }
    onUpdateEmail(updatedEmail);

  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      // If the date is today, format it as a clock (e.g., "3 pm")
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${period}`;
    } else if (date > now) {
      // If the date is in the future, format it as a clock (e.g., "3 pm")
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${period}`;
    } else {
      // If the date is in the past, format it as a date (e.g., "5 September")
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
  }
  async function onToggleTrash() {
    const updatedEmail = {
      ...email,
      removedAt: Date.now()
    }
    onUpdateEmail(updatedEmail);

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
          <div>{email.from}</div>
          <div className="email-subject">{email.subject}</div>
          <div className="sent-at">{formatDate(new Date(email.sentAt))}</div>
        </section>
      </Link>
      <section className="icons">
        <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => onToggleTrash()} />
        <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" onClick={() => onToggleIsRead(true)} />
      </section>


    </article >

  )
}
