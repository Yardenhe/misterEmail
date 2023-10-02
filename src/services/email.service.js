import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import PropTypes from 'prop-types'

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
  emailCounter,
  getEmailShape,
  
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
      if(status==="Star"&&!email.isStarred)
      {
        return false
      }
      if(status==="Trash"&&!email.removedAt)
      {
        return false
      }
      if(status==="Drafts"&&email.sentAt)
      {
        return false
      }
      if(status==="Sent"&&email.from!==getUser().email)
      {
        return false
      }
      if(status==="Inbox"&&email.removedAt)
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
function getEmailShape() {
  return PropTypes.shape({
      id: PropTypes.string,
      subject: PropTypes.string,
      body: PropTypes.string,
      isRead: PropTypes.bool,
      isStarred: PropTypes.bool,
      sentAt: PropTypes.number,
      removedAt: PropTypes.number,
      from: PropTypes.string,
      to: PropTypes.string
  })
}
function _createEmails() {
  let emails = [];
   emails = utilService.loadFromStorage(STORAGE_KEY)
  if (!emails || !emails.length) {
    const categories = ["Inbox", "Sent", "Drafts"];
    const senderNames = [
      "JohnDoe",
      "JaneSmith",
      "AliceJohnson",
      "BobWilliams",
      "EmilyBrown",
      "DavidDavis",
      "SarahLee",
      "MichaelWilson",
      "OliviaMartinez",
      "JamesTaylor",
    ];
    
    const emailSubjects = [
      "Important Project Update",
      "Meeting Rescheduling",
      "Weekly Newsletter",
      "Product Launch Announcement",
      "Payment Confirmation",
      "Invitation to the Conference",
      "Holiday Greetings",
      "New Job Opportunity",
      "Feedback Request",
      "Travel Itinerary",
    ];
    
    const emailBodies = [
      "Dear team, I wanted to inform you about an important update regarding our project timelines...",
      "Hello, Due to unforeseen circumstances, we need to reschedule the upcoming meeting...",
      "Greetings, Here's your weekly newsletter with the latest updates and news...",
      "Hello everyone, We're excited to announce the launch of our new product...",
      "Hi there, We're writing to confirm the successful payment of your recent order...",
      "Dear colleague, You are cordially invited to our annual conference...",
      "Warmest wishes, As the holiday season approaches, we wanted to send our greetings...",
      "Hi, We have a new job opportunity that might be of interest to you...",
      "Hello, We value your feedback and would appreciate it if you could take a few minutes...",
      "Dear traveler, Here's your travel itinerary for your upcoming trip...",
    ];
    
    emails = [];
    for (let i = 1; i <= 50; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomYear = Math.random() < 0.5 ? 2022 : 2023;
      const randomMonth = Math.floor(Math.random() * 12) + 1; // 1-12
      const randomDay = Math.floor(Math.random() * 30) + 1; // 1-30
      const randomHour = Math.floor(Math.random() * 24); // 0-23
      const randomMinute = Math.floor(Math.random() * 60); // 0-59
      const randomSenderName = senderNames[Math.floor(Math.random() * senderNames.length)];
      const randomSubject = emailSubjects[Math.floor(Math.random() * emailSubjects.length)];
      const randomBody = emailBodies[Math.floor(Math.random() * emailBodies.length)];
    
      const email = {
        id: `e${i}`,
        subject: randomSubject,
        body: randomBody,
        isRead: Math.random() < 0.5,
        isStarred: Math.random() < 0.3,
        sentAt: new Date(randomYear, randomMonth - 1, randomDay, randomHour, randomMinute).getTime(),
        removedAt: null,
        from: `${randomSenderName}@example.com>`,
        to: "user@appsus.com",
        category: randomCategory,
      };
    
      emails.push(email);
    }
    
    utilService.saveToStorage(STORAGE_KEY, emails)
  }
}
