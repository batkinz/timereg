using System;
using System.Collections.Generic;
using System.Linq;

namespace timereg.Models
{
    public class InMemoryTimeSlotAccess : ITimeSlotAccess
    {
        private List<TimeSlot> slots = new List<TimeSlot>();
        private object slotsLock = new object();

        public InMemoryTimeSlotAccess(bool addFakeDate = true)
        {
            if (addFakeDate)
            {
                FillWithFakeData();
            }
        }

        private void FillWithFakeData()
        {
            string[] projectList = new string[] {
                "Creating viral cat gifs", "Space rocket OS", "Solving global warming",
            };

            Random r = new Random();
            for (int i = 0; i < 10; i++)
            {
                int rnd = r.Next(-5, 5);
                slots.Add(new TimeSlot
                {
                    Id = i,
                    Date = DateTime.UtcNow.Date.AddDays(rnd),
                    Description = $"Blah {rnd}",
                    ProjectName = projectList[i % projectList.Length],
                    LengthOfWork = r.Next(1, 6) / 2.0,
                });
            }
        }

        public void AddTimeSlot(TimeSlot newSlot)
        {
            lock (slotsLock)
            {
                int lastId = slots.Any() ? slots.Max(s => s.Id) : -1;
                newSlot.Id = lastId + 1;
                slots.Add(newSlot);
            }
        }

        public int DeleteTimeSlot(int id)
        {
            lock (slotsLock)
            {
                return slots.RemoveAll(s => s.Id == id);
            }
        }

        public IEnumerable<TimeSlot> GetTimeSlots(DateTime date)
        {
            return slots.Where(s => s.Date.Year == date.Year && s.Date.DayOfYear == date.DayOfYear);
        }

        public IEnumerable<TimeSlot> GetTimeSlots(DateTime fromDate, DateTime toDate)
        {
            var beginningDate = fromDate.Date;
            var endPlusOneDayDate = toDate.Date.AddDays(1);

            return slots.Where(s => s.Date >= beginningDate && s.Date < endPlusOneDayDate);
        }
    }
}