
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    animateCSS,
    formatDate
}

function makeId(length = 5) {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value)
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue
    return JSON.parse(value)
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isFuture = date > now;
    const formatOptions = {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    };

    if (isToday || isFuture) {
      return new Intl.DateTimeFormat("en-US", formatOptions).format(date);
    } else {
      const options = { month: "short", day: "numeric" };
      if (date.getFullYear() !== now.getFullYear()) {
        options.year = "numeric";
      }
      return date.toLocaleDateString("en-US", options);
    }
  }
function animateCSS(el, animation, isRemoveClass = true) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {

        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)

        function handleAnimationEnd(event) {
            event.stopPropagation()
            if (isRemoveClass) {
                el.classList.remove(`${prefix}animated`, animationName)
            }
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}