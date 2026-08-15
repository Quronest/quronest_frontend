type DateFormatResult = {
  isoString: string;
  shortDate: string;
  longDate: string;
  monthDay: string;
  dateTime: string;
  time: string;
  weekday: string;
  weekdayShort: string;
  day: string;
  month: string;
  monthShort: string;
  monthNumber: string;
  year: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const DATE_LOCALE = "en-US";

const getFormattedValue = (
  date: Date,
  options: Intl.DateTimeFormatOptions,
): string => {
  return new Intl.DateTimeFormat(DATE_LOCALE, options).format(date);
};

export function formatDate(isoString: string): DateFormatResult {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ISO date string: ${isoString}`);
  }

  return {
    isoString,
    shortDate: getFormattedValue(date, {
      month: "short",
      day: "numeric",
    }),
    longDate: getFormattedValue(date, {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    monthDay: getFormattedValue(date, {
      month: "short",
      day: "numeric",
    }),
    dateTime: getFormattedValue(date, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }),
    time: getFormattedValue(date, {
      hour: "numeric",
      minute: "2-digit",
    }),
    weekday: getFormattedValue(date, {
      weekday: "long",
    }),
    weekdayShort: getFormattedValue(date, {
      weekday: "short",
    }),
    day: getFormattedValue(date, {
      day: "2-digit",
    }),
    month: getFormattedValue(date, {
      month: "long",
    }),
    monthShort: getFormattedValue(date, {
      month: "short",
    }),
    monthNumber: getFormattedValue(date, {
      month: "2-digit",
    }),
    year: getFormattedValue(date, {
      year: "numeric",
    }),
    hours: getFormattedValue(date, {
      hour: "2-digit",
      hour12: false,
    }),
    minutes: getFormattedValue(date, {
      minute: "2-digit",
    }),
    seconds: getFormattedValue(date, {
      second: "2-digit",
    }),
  };
}

export type { DateFormatResult };

export const getCenteredRange = (date: Date) => {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(date);
    d.setDate(date.getDate() - 3 + i);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const weekStart = dates[0];
  const weekEnd = new Date(dates[6]);
  weekEnd.setHours(23, 59, 59, 999);

  return { weekStart, weekEnd, weekDates: dates };
};

export const formatToLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const parseLocalDate = (dateStr: string | undefined): Date | null => {
  if (!dateStr) return null;
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);
    return new Date(year, month, day, 0, 0, 0, 0);
  }
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return null;
  parsed.setHours(0, 0, 0, 0);
  return parsed;
};

