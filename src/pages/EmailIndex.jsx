import { useState, useEffect } from "react";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

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
      console.log("Had issues loading emails", err);
    }
  }

  function onSetFilter(filterToUpdate) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterToUpdate }));
  }
  console.log(filterBy);
  if (!emails) return <div>Loading..</div>;
  return (
    <section className="robot-index">
      <EmailFilter
        onSetFilter={onSetFilter}
        filterBy={filterBy}
        onClickClearFilter={onClickClearFilter}
      />
      <EmailList emails={emails} />
    </section>
  );
}
