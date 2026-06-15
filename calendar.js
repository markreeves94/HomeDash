console.log("calendar.js loaded successfully");

const CALENDAR_URL = "PASTE_YOUR_ICAL_LINK_HERE";

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
