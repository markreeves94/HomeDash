console.log("calendar.js loaded successfully");

const CALENDAR_URL = "const CALENDAR_URL = "https://calendar.google.com/calendar/ical/ampureeves%40gmail.com/public/basic.ics";

async function loadCalendar() {
    console.log("Loading calendar...");

    try {
        const response = await fetch(CALENDAR_URL);
        const text = await response.text();

        console.log("Calendar downloaded");
        console.log(text.substring(0, 500));
    }
    catch (error) {
        console.error("Calendar error:", error);
    }
}

loadCalendar();
