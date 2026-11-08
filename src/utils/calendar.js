// Generates Google Calendar Web Link
export function getGoogleCalendarUrl(event) {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const text = encodeURIComponent(event.calendarTitle);
  const details = encodeURIComponent(`${event.calendarDesc}\n\nVenue: ${event.venueEn}\nAddress: ${event.addressEn}`);
  const location = encodeURIComponent(`${event.venueEn}, ${event.addressEn}`);
  const dates = `${event.startIso}/${event.endIso}`;

  return `${base}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

// Generates and downloads standard .ics file for Apple Calendar / Outlook / Mobile
export function downloadIcsFile(event) {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hindu Wedding E-Nimontron//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}-${Date.now()}@weeding-e-nimontron`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${event.startIso}`,
    `DTEND:${event.endIso}`,
    `SUMMARY:${event.calendarTitle}`,
    `DESCRIPTION:${event.calendarDesc}\\nVenue: ${event.venueEn}`,
    `LOCATION:${event.venueEn}\\, ${event.addressEn}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.id}-wedding-invitation.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

