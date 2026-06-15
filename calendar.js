const CALENDAR_API_URL = "https://script.google.com/macros/s/AKfycbwHEY0UNqvGxTNkEB56-TG1QZa_miDZ7lhKWmkHmE3u7Cetzty1WgvaKP6Z4gK0z5or/exec";

async function loadCalendar() {
 const response = await fetch(CALENDAR_API_URL, {redirect:"follow"});
 const events = await response.json();
 renderTwoWeekCalendar(events);
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
       const time = new Date(event.start).toLocaleTimeString("en-GB", {
         hour: "2-digit",
         minute: "2-digit"
       });

       p.textContent = `${time} ${event.title}`;
       dayBox.appendChild(p);
     });
   }

   grid.appendChild(dayBox);
 }
}

loadCalendar();
setInterval(loadCalendar, 10 * 60 * 1000);

