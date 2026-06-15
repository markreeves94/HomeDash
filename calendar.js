const ICAL_URL = "https://calendar.google.com/calendar/ical/ampureeves%40gmail.com/public/basic.ics";

const PROXY_URL =
  "https://api.allorigins.win/raw?url=" + encodeURIComponent(ICAL_URL);

async function loadCalendar() {
  const response = await fetch(PROXY_URL);
  const icsText = await response.text();

  const events = parseICS(icsText);
  renderTwoWeekCalendar(events);
}

function parseICS(text) {
  const events = [];
  const blocks = text.split("BEGIN:VEVENT");

  blocks.forEach(block => {
    const title = getLine(block, "SUMMARY");
    const startRaw = getLine(block, "DTSTART");

    if (!title || !startRaw) return;

    const date = parseICSDate(startRaw);

    events.push({
      title,
      date
    });
  });

  return events;
}

function getLine(block, key) {
  const line = block
    .split("\n")
    .find(l => l.startsWith(key));

  if (!line) return null;

  return line.split(":").slice(1).join(":").trim();
}

function parseICSDate(value) {
  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const day = value.slice(6, 8);
  const hour = value.slice(9, 11) || "00";
  const minute = value.slice(11, 13) || "00";

  return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
}

function renderTwoWeekCalendar(events) {
  const grid = document.querySelector(".calendar-grid");
  grid.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayEvents = events.filter(event =>
      event.date.toDateString() === date.toDateString()
    );

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
        const time = event.date.toLocaleTimeString("en-GB", {
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
