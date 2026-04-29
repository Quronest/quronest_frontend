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
