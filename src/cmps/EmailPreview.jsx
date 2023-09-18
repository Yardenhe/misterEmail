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
      <Link to={`/email/details/${email.id}`} onClick={onClickReadEmail}>
        <section className="main-mail">
          <div>{email.from}</div>
          <div>{email.subject}</div>
          <div className="sent-at">{new Date(email.sentAt).toLocaleString()}</div>
        </section>
      </Link>
      <section className="icons">
        <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={onClickTrashEmail} />
        <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" onClick={onClickReadEmail} />
      </section>


    </article >

  )
}
