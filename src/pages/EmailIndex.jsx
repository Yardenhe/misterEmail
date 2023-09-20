import { useState, useEffect } from "react";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { Compose } from "../cmps/Compose";
import { EmailSideBar } from "../cmps/EmailSideBar";
import { Logo } from "../cmps/logo";
import { Outlet, useLocation, useParams } from "react-router-dom";



export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());
  const [openMenu, setOpenMenu] = useState(false);
  const params = useParams()
  const location = useLocation()


  useEffect(() => {
    loadEmail();
  }, [filterBy]);

  function onClickClearFilter() {
    setFilterBy(emailService.getDefaultFilter());
  }

  async function loadEmail() {
    try {
      const emails = await emailService.query(filterBy);
      setEmails(emails);
    } catch (err) {
      console.log('Had issues loading emails', err)
    }
  }

  function onSetFilter(filterToUpdate) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterToUpdate }));
  }
  async function onAddEmail(email) {
    try {
      console.log("Send" + email);
      const addedEmail = await emailService.save(email);
      setEmails((prevEmails) => [addedEmail, ...prevEmails])
      navigate("/email");
    } catch (err) {
      console.log("Had issues send email", err);
    }
  }
  async function onUpdateEmail(email) {
    try {
      const updatedEmail = await emailService.save(email);
      setEmails(prevEmails => prevEmails.map(email => email.id === updatedEmail.id ? updatedEmail : email))
    } catch (error) {
      console.log(error);
    }

  }

  if (!emails) return <div>Loading..</div>
  return (
    <section className="email-index">
      <section className="header">
        <EmailFilter
          onSetFilter={onSetFilter}
          filterBy={filterBy}
          onClickClearFilter={onClickClearFilter}
        />
      </section>
      <section className="aside">
        <Logo setOpenMenu={setOpenMenu} />
        <Compose user={emailService.getUser()} />
        {openMenu && <EmailSideBar onSetFilter={onSetFilter}
          filterBy={filterBy} />}
      </section>

      {(!params.emailId || location.pathname.includes('compose')) &&
        <section className="main">
          <EmailList emails={emails} onUpdateEmail={onUpdateEmail} />
        </section>}
      {(location.pathname.includes('compose') || params.emailId) && <Outlet context={{ onAddEmail }} />}

    </section>
  );
}
