import { useState, useEffect } from "react"
import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { Compose } from "../cmps/Compose"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { Logo } from "../cmps/logo"
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service"



export function EmailIndex() {
  const [SearchParams, setSearchParams] = useSearchParams()
  const [emails, setEmails] = useState(null)
  const [openMenu, setOpenMenu] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const params = useParams()
  const navigate = useNavigate()

  const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(SearchParams))

  useEffect(() => {
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
  async function setCounter() {
    try {
      setUnreadCount(await emailService.emailCounter())
    }
    catch (error) {
      console.log('Had issues loading emails', err)
    }
  }
  function onSetFilter(filterToUpdate) {

    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterToUpdate }))
  }
  async function onAddEmail(email) {
    try {
      console.log("Send" + email)
      const addedEmail = await emailService.save(email)
      setEmails((prevEmails) => [addedEmail, ...prevEmails])

      showSuccessMsg('Successfully send!')
      navigate("/email")
    } catch (err) {
      console.log("Had issues send email", err)
    }
  }
  async function onUpdateEmail(email) {
    try {
      const updatedEmail = await emailService.save(email)
      setEmails(prevEmails => prevEmails.map(email => email.id === updatedEmail.id ? updatedEmail : email))

      if (email.removedAt) {
        setEmails(prevEmails => prevEmails.filter(email => email.id !== updatedEmail.id))
        showErrorMsg('Conversation moved to trash!')
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
      showSuccessMsg('Conversation removed permanently!')
      navigate("/email")

    } catch (err) {
      console.log("Had issues loading emails", err)
    }
  }

  if (!emails) return <div>Loading..</div>
  const { status, txt, isRead } = filterBy
  return (
    <section className="email-index">
      <section className="header">
        <EmailFilter
          onSetFilter={onSetFilter}
          filterBy={{ txt, isRead }}
          onClickClearFilter={onClickClearFilter}
        />
      </section>
      <section className="aside">
        <Logo setOpenMenu={setOpenMenu} />
        <Compose user={emailService.getUser()} />
        <EmailFolderList onSetFilter={onSetFilter} openMenu={openMenu}
          filterBy={{ status }} unreadCount={unreadCount} />
      </section>

      {(!params.emailId) &&
        <section className="main">
          <EmailList emails={emails} onUpdateEmail={onUpdateEmail} setUnreadCount={setUnreadCount} />
        </section>}
      <Outlet context={{ onAddEmail, onRemoveEmail }} />

    </section>
  )
}
