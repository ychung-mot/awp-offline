using System;

namespace AWP.Common
{
    public static class DateUtils
    {
        public static string CovertToString(DateTime date)
        {
            return date.ToString("yyyy-MM-dd");
        }

        /// <summary>
        /// Returns Pacific time if VancouverTimeZone or PacificTimeZone is defined in the system
        /// Otherwise return UTC time.
        /// </summary>
        /// <param name="utcDate"></param>
        /// <returns></returns>
        public static DateTime? ConvertUtcToPacificTime(DateTime? utcDate)
        {
            if (utcDate == null)
                return null;

            var date = ConvertTimeFromUtc((DateTime)utcDate, TimeZones.PacificTimeZone);

            if (date != null)
                return (DateTime)date;

            date = ConvertTimeFromUtc((DateTime)utcDate, TimeZones.VancouverTimeZone);

            if (date != null)
                return (DateTime)date;

            return utcDate;
        }

        private static DateTime? ConvertTimeFromUtc(DateTime date, string timeZoneId)
        {
            try
            {
                var timezone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
                return TimeZoneInfo.ConvertTimeFromUtc(date, timezone);
            }
            catch (TimeZoneNotFoundException)
            {
                return date;
            }
        }

        public static DateTime? ConvertPacificToUtcTime(DateTime? pstDate)
        {
            if (pstDate == null)
                return null;

            var date = ConvertTimeToUtc((DateTime)pstDate, TimeZones.PacificTimeZone);

            if (date != null)
                return (DateTime)date;

            date = ConvertTimeToUtc((DateTime)pstDate, TimeZones.VancouverTimeZone);

            if (date != null)
                return (DateTime)date;

            return pstDate;
        }

        private static DateTime? ConvertTimeToUtc(DateTime date, string timeZoneId)
        {
            try
            {
                var timezone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
                return TimeZoneInfo.ConvertTimeToUtc(date, timezone);
            }
            catch (TimeZoneNotFoundException)
            {
                return null;
            }
        }

        public static string ConvertUtcToPacificTime24HourString(DateTime? utcDate)
        {
            var pstDate = ConvertUtcToPacificTime(utcDate);

            if (pstDate == null || pstDate == DateTime.MinValue)
                return "";

            return To24HourString((DateTime)pstDate);
        }

        public static string To24HourString(this DateTime date)
        {
            return date.ToString("yyyy-MM-dd HH:mm");
        }

        public static string[] ValidDateTimeFormats()
        {
            return new[]
                    {
                    "yyyy-MM-ddTHH:mm:ssK", // Zulu time, no milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FK", // Zulu time, with milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FFK", // Zulu time, with milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FFFK", // Zulu time, with milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FFFFK", // Zulu time, with milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FFFFFK", // Zulu time, with milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FFFFFFK", // Zulu time, with milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FFFFFFFK", // Zulu time, with milliseconds, CR10X loggers provide milliseconds up to 7 digits
                    "yyyy-MM-ddTHH:mm:ss zzzzzz", // time offset, no milliseconds
                    "yyyy-MM-ddTHH:mm:ss.F zzzzzz", // time offset, with milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FF zzzzzz", // time offset, with milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FFF zzzzzz", // time offset, with milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FFFF zzzzzz", // time offset, with milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FFFFF zzzzzz", // time offset, with milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FFFFFF zzzzzz", // time offset, with milliseconds
                    "yyyy-MM-ddTHH:mm:ss.FFFFFFF zzzzzz", // time offset, with milliseconds, CR10X loggers provide milliseconds up to 7 digits
                };
        }
    }
}
