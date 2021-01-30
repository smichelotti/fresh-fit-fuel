using System;

namespace FreshFitFuel.Api.Services
{
    public static class OrderNumberGenerator
    {
        /// <summary>
        /// This is a generic and cheesey time-based (*gasp*) order number generator.
        /// Obviously in a high volume system, this would not work and we'd use 
        /// more of a Twitter Snowflake algorithm to generate. But this "quick and dirty"
        /// is fine for the scale of the current system.
        /// </summary>
        /// <returns></returns>
        public static string Generate()
        {
            var now = DateTime.UtcNow;
            var midnight = new DateTime(now.Year, now.Month, now.Day);
            TimeSpan elapsedToday = now - midnight;
            TimeSpan elapsedThisYear = now - new DateTime(2021, 1, 1);
            var totalDaysThisYear = Math.Round(elapsedThisYear.TotalDays);

            var weekNum = (totalDaysThisYear - (totalDaysThisYear % 7)) / 7;
            int dayNum = (int)now.DayOfWeek;
            var msToday = Math.Round(elapsedToday.TotalMilliseconds);
            return $"{weekNum}-{dayNum}-{msToday}";
        }
    }
}
