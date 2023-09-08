import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const emailService = {
  query,
  save,
  remove,
  update,
  getById,
  createEmail,
  getDefaultFilter,
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY);

  if (filterBy) {
    console.log("true");
    var { status, txt, isRead } = filterBy;
    emails = emails.filter((email) => {
      if (
        txt &&
        !(
          email.body.toLowerCase().includes(txt) ||
          email.subject.toLowerCase().includes(txt)
        )
      ) {
        return false;
      }
      if (isRead !== null && email.isRead !== isRead) {
        return false;
      }
      return true;
    });
  }
  return emails;
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave);
  } else {
    emailToSave.isOn = false;
    return storageService.post(STORAGE_KEY, emailToSave);
  }
}
async function update(email) {
  await storageService.put(STORAGE_KEY, email);
}
function getDefaultFilter() {
  return {
    status: "",
    txt: "",
    isRead: null,
  };
}

function createEmail() {
  return {
    id,
    subject,
    body,
    isRead,
    isStarred,
    sentAt,
    removedAt,
    from,
    to,
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = [
      {
        id: "e101",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "momo@momo.com",
        to: "user@appsus.com",
        timestamp: new Date(),
      },
      {
        id: "e102",
        subject: "Dont Miss you!",
        body: "Wouldnt love to catch up sometimes",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "momo@momo.com",
        to: "user@appsus.com",
        timestamp: new Date() - 100000,
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
