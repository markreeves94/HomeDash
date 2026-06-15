console.log("calendar.js loaded successfully");

const CALENDAR_URL = "const CALENDAR_URL = "https://eur01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Fical%2Fxxxxxxxx%2Fpublic%2Fbasic.ics&data=05%7C02%7Cmark.reeves%40dssmith.com%7C1216c0ddfa704c3ee16508decac4a57c%7C423430e8247c44d1976722723b7d4cb2%7C0%7C0%7C639171143099814255%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=gE6ztf3Q2Ggys7FNJ7iniocPQNx%2BSYFTykQl99hFgcc%3D&reserved=0"";

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
