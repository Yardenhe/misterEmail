import { useState } from "react";
import { Link } from "react-router-dom";
import { emailService } from "../services/email.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrashCan, faEnvelope } from '@fortawesome/free-regular-svg-icons';

export default function EmailPreview({ email }) {

  const [star, setStar] = useState(email.isStarred);
  const [isRead, setisRead] = useState(email.isRead);

  async function onClickReadEmail() {

    try {
      await emailService.update({ ...email, isRead: true });
      setisRead((isRead) => !isRead);
    } catch (error) {
      console.log(error);
    }

  }
  async function onClickStarEmail() {
    try {
      await emailService.update({ ...email, isStarred: !star });
    } catch (error) {
      console.log(error);
    }

  }
  const onClickStar = () => {

    setStar((star) => !star);
    onClickStarEmail();
  };
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
  async function onClickTrashEmail() {
    try {
      await emailService.update({ ...email, removedAt: Date.now() });
    } catch (error) {
      console.log(error);
    }

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
      <section className={"star-icon" + (star ? " clicked-star" : " ")} onClick={onClickStar}>
        <FontAwesomeIcon icon={faStar} />
      </section>
      <Link to={`/email/details/${email.id}`} className="main-mail-link" onClick={onClickReadEmail}>
        <section className="main-mail">
          <div>{email.from}</div>
          <div className="email-subject">{email.subject}</div>
          <div className="sent-at">{formatDate(new Date(email.sentAt))}</div>
        </section>
      </Link>
      <section className="icons">
        <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={onClickTrashEmail} />
        <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" onClick={onClickReadEmail} />
      </section>


    </article >

  )
}
