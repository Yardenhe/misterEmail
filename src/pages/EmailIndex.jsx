import { useState, useEffect } from "react";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { Compose } from "../cmps/Compose";
import { EmailSideBar } from "../cmps/EmailSideBar";
import { Logo } from "../cmps/logo";



export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());
  const loggedinUser = {
    //*********************************** */
    email: "user@appsus.com",
    fullname: "Mahatma Appsus",
  };

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

  if (!emails) return <div>Loading..</div>
  return (
    <section className="email-index">
      <section className="aside-logo">
        <Logo />
      </section>
      <section className="header">
        <EmailFilter
          onSetFilter={onSetFilter}
          filterBy={filterBy}
          onClickClearFilter={onClickClearFilter}
        />

      </section>
      <section className="aside">
        <Compose user={loggedinUser} />
        <EmailSideBar />
      </section>
      <section className="main">
        <EmailList emails={emails} />
      </section>
    </section>
  );
}
