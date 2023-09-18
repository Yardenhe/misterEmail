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
  const [openMenu, setOpenMenu] = useState(false);
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
  console.log(filterBy);
  if (!emails) return <div>Loading..</div>
  return (
    <section className="email-index">
      {/* <section className="aside-logo">
        <Logo setOpenMenu={setOpenMenu} />
      </section> */}
      <section className="header">
        <EmailFilter
          onSetFilter={onSetFilter}
          filterBy={filterBy}
          onClickClearFilter={onClickClearFilter}
        />

      </section>

      <section className="aside">
        <Logo setOpenMenu={setOpenMenu} />
        <Compose user={loggedinUser} />
        {openMenu && <EmailSideBar onSetFilter={onSetFilter}
          filterBy={filterBy} />}
      </section>
      <section className="main">
        <EmailList emails={emails} />
      </section>
    </section>
  );
}
