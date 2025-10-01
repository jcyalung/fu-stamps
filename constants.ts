import { Montserrat } from "next/font/google";

// cookie names
export const COOKIE_NAME = "sb-access-token";
export const REFRESH_NAME = "sb-refresh-token";
export const MAX_AGE = 60*60*24*7; // max age set for 7 days
export const LONG_AGE = 60*60*24*30; // max age for 30 days, refresh token

// table names
export const TABLES = {
    VERIFICATION_CODES: 'verificationcodes',
    USERS: 'users',
    STAMPS: 'stamp',
    STAMPCARDS: 'stampcard',
    REWARDS: 'rewards',
};

export const STUDY_HOURS = {
    dates: [
        'Monday', 
        'Wednesday'
    ],
    times: [
        '3:00-5:00pm',
        '2:00-4:00pm',
    ],
    location: 'Sci Lib 577'
};

// utils.ts
export function getUpcomingStudySession() {
  const now = new Date();

  // Map days to numeric (0=Sunday ... 6=Saturday)
  const dayMap: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const sessions = STUDY_HOURS.dates.map((day, i) => {
    const targetDay = dayMap[day];
    let date = new Date(now);

    // Calculate how many days ahead the session is
    const diff = (targetDay - date.getDay() + 7) % 7;
    date.setDate(date.getDate() + diff);

    return {
      day,
      time: STUDY_HOURS.times[i],
      date,
    };
  });

  // Sort by soonest upcoming
  sessions.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Pick the soonest session
  const nextSession = sessions[0];

  // Check if it's today or tomorrow
  const isToday = nextSession.date.toDateString() === now.toDateString();
  const isTomorrow =
    new Date(nextSession.date).setDate(nextSession.date.getDate() - 1) ===
    now.setHours(0, 0, 0, 0);

  const label = isToday ? "TODAY" : isTomorrow ? "TOMORROW" : nextSession.day;

  // Format mm/dd
  const mmdd = nextSession.date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  });
  const time = nextSession.time;
  const location = STUDY_HOURS.location;
  return {
    name: 'FUSION STUDY HOURS',
    label,
    mmdd,
    time,
    location,
  };
}

export const montserrat_global = Montserrat({
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    style: ["normal", "italic"],
})