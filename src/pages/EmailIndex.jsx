import { useState, useEffect } from "react"
import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { Logo } from "../cmps/logo"
import { Outlet, useNavigate, useParams, useSearchParams, Link } from "react-router-dom"
import { eventBusService } from "../services/event-bus.service"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { utilService } from "../services/util.service"

export function EmailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [emails, setEmails] = useState(null)
  const [openMenu, setOpenMenu] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const navigate = useNavigate()
  const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
  const [selectedAll, setSelectedAll] = useState(null);

  useEffect(() => {
    if (!searchParams.get("to"))
      setSearchParams(filterBy)
    loadEmail()
    setCounter()
  }, [filterBy])

  function onClickClearFilter() {
    setFilterBy(emailService.getDefaultFilter())
  }
  async function loadEmail() {
    try {
      const emails = await emailService.query(filterBy)
      setEmails(emails)
    } catch (err) {
      console.log('Had issues loading emails', err)
    }
  }
  function onSetFilter(filterToUpdate) {
    console.log(filterToUpdate)
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterToUpdate }))
  }
  async function onAddEmail(email, isDraft = true) {
    try {
      let addedEmail = await emailService.save(email)
      isDraft ? addedEmail = await emailService.update({ ...addedEmail, sentAt: null })
        : await emailService.update({ ...addedEmail, sentAt: Date.now() });
      console.log("🚀 ~ file: EmailIndex.jsx:74 ~ onSaveDraftEmail ~ addedEmail:", addedEmail)

      emails.some((item) => {
        return item.id === addedEmail.id
      }) ?
        setEmails(prevEmails => prevEmails.map(newEmail => newEmail.id === addedEmail.id ? addedEmail : newEmail)) :
        setEmails((prevEmails) => [addedEmail, ...prevEmails])
      await loadEmail();
      isDraft ? navigate(`/email/compose/${addedEmail.id}`) : navigate("/email")
    } catch (err) {
      console.log("Had issues send email", err)
    }
  }
  async function onUpdateEmail(email) {
    try {
      const updatedEmail = await emailService.save(email)
      setEmails(prevEmails => prevEmails.map(email => email.id === updatedEmail.id ? updatedEmail : email))
      if (email.removedAt) {
        await loadEmail()
        eventBusService.emit('show-user-msg', { type: 'success', txt: 'Conversation moved to trash!' })
      }
    } catch (error) {
      console.log(error)
    }

  }
  async function onRemoveEmail(emailId) {
    try {
      console.log("remove" + emailId)
      await emailService.remove(emailId)
      setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailId))
      eventBusService.emit('show-user-msg', { type: 'success', txt: 'Conversation removed permanently!' })
      navigate("/email")

    } catch (err) {
      console.log("Had issues loading emails", err)
    }
  }
  async function setCounter() {
    try {
      setUnreadCount(await emailService.emailCounter())
    }
    catch (error) {
      console.log('Had issues loading emails', err)
    }
  }
  function handleChangeSelect(emailId) {
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, checked: !email.checked } : email
    );
    setEmails(updatedEmails);
    setSelectedAll(updatedEmails.every((email) => email.checked));
  }
  const toggleSelectAll = () => {
    setSelectedAll(!selectedAll);
    const updatedEmails = emails.map((email) => ({
      ...email,
      checked: !selectedAll,
    }));
    setEmails(updatedEmails);
  };
  if (!emails) return <div>Loading..</div>
  const { status, txt, isRead } = filterBy
  return (
    <section className={"email-index" + (openMenu ? " " : " aside-close ")}>
      <section className="header">
        <section>
          <EmailFilter
            onSetFilter={onSetFilter}
            filterBy={{ txt, isRead }}
            onClickClearFilter={onClickClearFilter}
            toggleSelectAll={toggleSelectAll}
          />
        </section>
      </section>
      <section className="aside">
        <Logo setOpenMenu={setOpenMenu} />
        <Link to={`/email/compose`} >
          <section className={"email-compose" + (openMenu ? " " : " compose-close")}>
            <FontAwesomeIcon icon={faPencilAlt} className="pencil-icon" />
            {openMenu && <h1>Compose</h1>}
          </section>
        </Link>
        <EmailFolderList onSetFilter={onSetFilter} openMenu={openMenu}
          filterBy={{ status }} unreadCount={unreadCount} />
      </section>

      {/* {(!params.emailId) && */}
      <section className="main">
        <EmailList emails={emails} onUpdateEmail={onUpdateEmail} setUnreadCount={setUnreadCount} handleChangeSelect={handleChangeSelect} />
      </section>

      {/* //} */}
      <Outlet context={{ onAddEmail, onRemoveEmail, onUpdateEmail }} />
    </section>
  )
}
