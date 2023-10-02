import { useState, useEffect, useRef } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { emailService } from "../services/email.service"
import { useSearchParams } from 'react-router-dom'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, } from "@fortawesome/free-solid-svg-icons"
import imgUrl from "../assets/imgs/arrow-diagonal-svgrepo-com.png"
import underline from "../assets/imgs/underline-1437-svgrepo-com.png"
import imgUrlarrowin from "../assets/imgs/arrow-diagonal-double-in-svgrepo-com.png"
import { utilService } from "../services/util.service"

export function EmailCompose() {
  const { onAddEmail, onDraftEmail, onDeleteDraftEmail } = useOutletContext()
  const [email, setEmail] = useState({ id: utilService.makeId() });
  const [type, setType] = useState("normal");
  const [count, setCount] = useState(0)
  const intervalIdRef = useRef()



  useEffect(() => {
    console.log('Counter Mounted' + count)
    intervalIdRef.current = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, 1000)
    return () => {
      console.log('Counter going down')
      clearInterval(intervalIdRef.current)
    }
  }, [])
  useEffect(() => {
    count !== 0 && count % 5 === 0 && (email.subject || email.body || email.to) ? onDraftEmail(email) : null;
  }, [count])

  function handleChange({ target }) {
    var { value, name: field } = target
    switch (target.type) {
      case "range":
      case "number":
        value = +target.value || 0
        break
      case "checkbox":
        value = target.checked
        break
    }
    setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))

  }

  async function onSendEmail(ev) {
    ev.preventDefault()
    if (email.hasOwnProperty('id')) {
      delete email.id;
    }
    onDeleteDraftEmail(email);
    try {
      onAddEmail(email)
    } catch (err) {
      console.log("Had issues send email", err)
    }
  }
  async function onSaveDraft() {
    if (email.hasOwnProperty('id')) {
      delete email.id;
    }
    onDeleteDraftEmail(email);
    if (email.subject || email.body || email.to) {
      try {
        onAddEmail(email, true)
      } catch (err) {
        console.log("Had issues send email", err)
      }
    }
  }
  function DynamicStyle() {
    switch (type) {
      case 'normal':
        return ""
      case 'fullscreen':
        return " email-big "
      case 'minimized':
        return " email-minimized "
      default:
        return 'normal'
    }
  }


  return (
    <form className={`email-Compose-form  ${DynamicStyle()}`}>
      <section className="header-compose">
        <h3>New Message</h3>
        <section className="header-compose-icons">
          <img onClick={() => setType('minimized')} className="arrow-header-underline" src={underline} alt="" />
          {type === 'normal' && <img onClick={() => setType("fullscreen")} className="arrow-header-open" src={imgUrl} alt="" />}
          {type === 'minimized' && <img onClick={() => setType("normal")} className="arrow-header-open" src={imgUrl} alt="" />}
          {type === 'fullscreen' && <img onClick={() => setType("normal")} className="arrow-header-open" src={imgUrlarrowin} alt="" />}

          <Link to="/email" onClick={() => onSaveDraft()}>
            <FontAwesomeIcon icon={faX} className="msg-icon" />
          </Link>
        </section>
      </section>
      <div className="form-compose">
        <label htmlFor="to">To</label>
        <input
          type="email"
          id="to"
          name="to"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-compose">
        <label htmlFor="from">From</label>
        <input
          type="email"
          id="from"
          name="from"
          //value={Parms.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-compose">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-compose">

        <textarea id="body" name="body" onChange={handleChange} required />
      </div>
      <button onClick={onSendEmail}>Send</button>
    </form>
  )
}
