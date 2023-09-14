import { useState } from "react";
import { Link } from "react-router-dom";
import { emailService } from "../services/email.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

export default function EmailPreview({ email }) {

  const [star, setStar] = useState(false);
  function onClickReadEmail() {
    emailService.update({ ...email, isRead: true });
  }
  const onClickStar = () => {
    setStar((star) => !star);
  };
  return (

    <article
      className={"email-preview unread" + (email.isRead ? "unread" : " ")}
    >

      <input
        type="checkbox"
        name="selectEmail"
        placeholder="selectEmail"
      // onChange={handleChange}
      />
      <section className={`star-icon ${star ? 'active' : ''}`} onClick={onClickStar}>
        <FontAwesomeIcon icon={faStar} />
      </section>
      <Link to={`/email/details/${email.id}`} onClick={onClickReadEmail}>
        <section className="main-mail">
          <div>{email.from}</div>
          <div>{email.subject}</div>
          <div className="sent-at">{new Date(email.sentAt).toLocaleString()}</div>
        </section>
      </Link>
    </article >

  )
}
