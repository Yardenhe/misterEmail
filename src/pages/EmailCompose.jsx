import { useState, useEffect, useRef } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { emailService } from "../services/email.service"
import { useSearchParams } from 'react-router-dom'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faLocationPin } from "@fortawesome/free-solid-svg-icons"
import imgUrl from "../assets/imgs/arrow-diagonal-svgrepo-com.png"
import underline from "../assets/imgs/underline-1437-svgrepo-com.png"
import imgUrlarrowin from "../assets/imgs/arrow-diagonal-double-in-svgrepo-com.png"
import { utilService } from "../services/util.service"
import { GoogleMap } from "../cmps/GoogleMap"
import { useToggle } from "../customHooks/useToggle"


export function EmailCompose() {
  const { onAddEmail } = useOutletContext()
  const [email, setEmail] = useState(emailService.getEmptyEmail());
  const parms = useParams();
  const [type, setType] = useState("normal");
  const [isOpenMap, setIsOpenMap] = useState()
  const [count, setCount] = useState(0)
  const intervalIdRef = useRef()
  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    const toParam = searchParams.get('to');
    const subjectParam = searchParams.get('subject');
    if (toParam) {
      setEmail((prev) => ({ ...prev, to: toParam }));
    }
    if (subjectParam) {
      setEmail((prev) => ({ ...prev, subject: subjectParam }));
    }

  }, [searchParams]);

  useEffect(() => {
    if (parms.emailId)
      loadEmail()

  }, [])

  async function loadEmail() {
    try {
      const email = await emailService.getById(parms.emailId)
      setEmail(email)
    } catch (err) {
      navigate("/email")

    }
  }

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
    count !== 0 && count % 5 === 0 && (email.subject || email.body || email.to) ?
      onSaveDraft(true) : null;
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
  async function onSaveDraft(isDraft) {
    let save;
    if (parms.emailId)
      save = { ...email, id: parms.emailId }
    !parms.emailId ? await onAddEmail(email, isDraft) : await onAddEmail(save, isDraft)
  }
  async function onSendEmail(ev) {
    ev.preventDefault()
    try {
      await onSaveDraft(false)
    } catch (err) {
      console.log("Had issues send email", err)
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
  const { to, from, subject, body } = email

  if (!email) return <section> Loading... </section>
  return (

    <form className={`email-Compose-form  ${DynamicStyle()}`}>

      <section className="header-compose">

        <h3>New Message</h3>
        <section className="header-compose-icons">
          <img onClick={() => setType('minimized')} className="arrow-header-underline" src={underline} alt="" />
          {type === 'normal' && <img onClick={() => setType("fullscreen")} className="arrow-header-open" src={imgUrl} alt="" />}
          {type === 'minimized' && <img onClick={() => setType("normal")} className="arrow-header-open" src={imgUrl} alt="" />}
          {type === 'fullscreen' && <img onClick={() => setType("normal")} className="arrow-header-open" src={imgUrlarrowin} alt="" />}


          <Link to="/email">
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
          value={to || ''}
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
          value={from || ''}
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
          value={subject || ''}
          onChange={handleChange}
          required
        />
      </div>
      {isOpenMap && <GoogleMap />}
      <div className="form-compose">

        <textarea id="body" name="body" value={body || ''} onChange={handleChange} required />
      </div>
      <section className="flex align-center">
        <button onClick={(ev) => onSendEmail(ev)}>Send</button>
        <section onClick={() => setIsOpenMap(!isOpenMap)}> <FontAwesomeIcon icon={faLocationPin} className="msg-icon" /></section>
      </section>

    </form>
  )
}
