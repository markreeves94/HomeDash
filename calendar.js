console.log("calendar.js started");
const CALENDAR_API_URL = "https://script.google.com/macros/s/AKfycbwHEY0UNqvGxTNkEB56-TG1QZa_miDZ7lhKWmkHmE3u7Cetzty1WgvaKP6Z4gK0z5or/exec";

function getGoogleColor(colorId) {
  const colors = {
    "1": "#7986CB",
    "2": "#33B679",
    "3": "#8E24AA",
    "4": "#E67C73",
    "5": "#F6BF26",
    "6": "#F4511E",
    "7": "#039BE5",
    "8": "#616161",
    "9": "#3F51B5",
    "10": "#0B8043",
    "11": "#D50000"
  };

  return colors[colorId] || "#666";
}


async function loadCalendar() {
  try {
    console.log("Loading calendar...");
    const response = await fetch(CALENDAR_API_URL, { redirect: "follow" });
    console.log("Response:", response.status);
    const events = await response.json();
    console.log("Events:", events);
    renderTwoWeekCalendar(events);
  } catch (error) {
    console.error("Calendar error:", error);
  }
}
}

function renderTwoWeekCalendar(events) {
 const grid = document.querySelector(".calendar-grid");
 grid.innerHTML = "";

 const today = new Date();
 today.setHours(0, 0, 0, 0);

 for (let i = 0; i < 14; i++) {
   const date = new Date(today);
   date.setDate(today.getDate() + i);

   const dayEvents = events.filter(event => {
     const eventDate = new Date(event.start);
     return eventDate.toDateString() === date.toDateString();
   });

   const dayBox = document.createElement("div");
   dayBox.className = "day";

   const heading = document.createElement("strong");
   heading.textContent = date.toLocaleDateString("en-GB", {
     weekday: "short",
     day: "numeric"
   });

   dayBox.appendChild(heading);

   if (dayEvents.length === 0) {
     const empty = document.createElement("p");
     empty.textContent = "No events";
     dayBox.appendChild(empty);
   } else {
    dayEvents.forEach(event => {
    const p = document.createElement("p");
    p.style.borderLeft = `4px solid ${getGoogleColor(event.color)}`;
p.style.paddingLeft = "6px";
      

    if (event.allDay) {
        p.textContent = event.title;
    } else {
        const time = new Date(event.start).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        });

        p.textContent = `${time} ${event.title}`;
    }

    dayBox.appendChild(p);
});

   }

   grid.appendChild(dayBox);
 }
}Fday

loadCalendar();
setInterval(loadCalendar, 10 * 60 * 1000);

