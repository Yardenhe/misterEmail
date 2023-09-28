import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const emailService = {
  query,
  save,
  remove,
  update,
  getById,
  createEmail,
  getDefaultFilter,
  getUser,
  getFilterFromParams,
  emailCounter
}

const STORAGE_KEY = "emails"

_createEmails()

async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY)

  if (filterBy) {
   
    var { status, txt, isRead } = filterBy
    emails = emails.filter((email) => {
      if (
        txt &&
        !(
          email.body.toLowerCase().includes(txt.toLowerCase()) ||
          email.subject.toLowerCase().includes(txt.toLowerCase())
        )
      ) {
        return false
      }
      if (isRead  && email.isRead !== isRead) {
        return false
      }
      if(status=="Star"&&!email.isStarred)
      {
        return false
      }
      if(status=="Trash"&&!email.removedAt)
      {
        return false
      }
      if(status=="Inbox"&&email.removedAt)
      {
        return false
      }
      return true
    })
  }
  return emails
}


function getById(id) {
  return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave)
  } else {
    const email = createEmail(emailToSave)
    return storageService.post(STORAGE_KEY, email)
  }
}
async function update(email) {
  await storageService.put(STORAGE_KEY, email)
}
function getDefaultFilter() {
  return {
    status: "Inbox",
    txt: "",
    isRead: null,
  }
}
function getUser(){
  const loggedinUser = {
    email: "user@appsus.com",
    fullname: "Mahatma Appsus",
  }
  return loggedinUser
}
async function emailCounter() {
  let emails = await storageService.query(STORAGE_KEY)
  try {  
    return emails.filter(email => !email.isRead).length
  } catch (err) {
    console.log("Had issues counting emails", err)
  }
}

function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
      filterBy[field] = searchParams.get(field) || ''
  }

  return filterBy
}
function createEmail(emailToSave) {
  return {
    id: utilService.makeId(4),
    subject: emailToSave.subject,
    body: emailToSave.body,
    isRead: false,
    isStarred: false,
    sentAt:  Date.now(),
    removedAt: null,
    from: emailToSave.from,
    to: emailToSave.to,
  }
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY)
  if (!emails || !emails.length) {
    const emails = [
      {
        id: "e101",
        subject: "Miss you!",
        body: "Would love to catch up sometime.",
        isRead: false,
        isStarred: false,
        sentAt: 1642598400000, // Date in milliseconds (e.g., February 20, 2022)
        removedAt: null,
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e102",
        subject: "Dont Miss you!",
        body: "Wouldn't love to catch up sometime.",
        isRead: false,
        isStarred: false,
        sentAt: 1642501200000, // Date in milliseconds (e.g., February 19, 2022)
        removedAt: null,
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e103",
        subject: "Important Update",
        body: "Please review the attached document for important updates.",
        isRead: true,
        isStarred: true,
        sentAt: 1642404000000, // Date in milliseconds (e.g., February 18, 2022)
        removedAt: null,
        from: "sender@example.com",
        to: "user@appsus.com",
      },
      {
        id: "e104",
        subject: "Reminder: Meeting Tomorrow",
        body: "Just a reminder that we have a meeting scheduled for tomorrow at 10 AM.",
        isRead: true,
        isStarred: false,
        sentAt: 1642317600000, // Date in milliseconds (e.g., February 17, 2022)
        removedAt: null,
        from: "organizer@example.com",
        to: "user@appsus.com",
      },
      {
        id: "e105",
        subject: "Vacation Plans",
        body: "Let's discuss our vacation plans for the upcoming holidays.",
        isRead: true,
        isStarred: false,
        sentAt: 1642231200000, // Date in milliseconds (e.g., February 16, 2022)
        removedAt: null,
        from: "friend@example.com",
        to: "user@appsus.com",
      },
      {
        id: "e106",
        subject: "Product Announcement",
        body: "We're excited to announce our new product release. Check it out!",
        isRead: false,
        isStarred: true,
        sentAt: 1642144800000, // Date in milliseconds (e.g., February 15, 2022)
        removedAt: null,
        from: "company@example.com",
        to: "user@appsus.com",
      },
      {
        id: "e107",
        subject: "Thank You",
        body: "Thank you for your recent purchase. We appreciate your business!",
        isRead: true,
        isStarred: false,
        sentAt: 1642058400000, // Date in milliseconds (e.g., February 14, 2022)
        removedAt: null,
        from: "customer@example.com",
        to: "user@appsus.com",
      },
      {
        id: "e108",
        subject: "Invitation to Party",
        body: "You're invited to our annual office party on Friday night!",
        isRead: false,
        isStarred: false,
        sentAt: 1641972000000, // Date in milliseconds (e.g., February 13, 2022)
        removedAt: null,
        from: "colleague@example.com",
        to: "user@appsus.com",
      },
      {
        id: "e109",
        subject: "Weekly Newsletter",
        body: "Here's your weekly newsletter with the latest updates and news.",
        isRead: true,
        isStarred: true,
        sentAt: 1641885600000, // Date in milliseconds (e.g., February 12, 2022)
        removedAt: null,
        from: "newsletter@example.com",
        to: "user@appsus.com",
      },
      {
        id: "e110",
        subject: "New Project Proposal",
        body: "I've attached the proposal for our upcoming project. Please review it.",
        isRead: false,
        isStarred: false,
        sentAt: 1641799200000, // Date in milliseconds (e.g., February 11, 2022)
        removedAt: null,
        from: "projectmanager@example.com",
        to: "user@appsus.com",
      },
    ]
    
    
    
    utilService.saveToStorage(STORAGE_KEY, emails)
  }
}
