using timereg.Models;
using System;
using Xunit;
using System.Linq;

namespace Test
{
    public class InMemoryTimeSlotAccessTests
    {
        [Fact]
        public void InMemoryTSA_GetTimeSlots_SingleDay()
        {
            var tsa = new InMemoryTimeSlotAccess(false);

            DateTime date = DateTime.Now.Date;
            tsa.AddTimeSlot(new TimeSlot
            {
                Date = date,
            });

            tsa.AddTimeSlot(new TimeSlot
            {
                Date = date,
            });

            tsa.AddTimeSlot(new TimeSlot
            {
                Date = date.AddDays(-1),
            });

            tsa.AddTimeSlot(new TimeSlot
            {
                Date = date.AddDays(1),
            });

            Assert.Equal(2, tsa.GetTimeSlots(date).Count());
        }

        [Fact]
        public void InMemoryTSA_GetTimeSlots_MultiDay()
        {
            var tsa = new InMemoryTimeSlotAccess(false);

            var startDate = DateTime.Now.Date;
            var currentDate = startDate;
            var maxDate = startDate.AddDays(5);
            int cnt = 0;
            do {
                cnt++;
                tsa.AddTimeSlot(new TimeSlot
                {
                    Date = currentDate,
                });
                currentDate = currentDate.AddDays(1);
            } while(currentDate <= maxDate);

            Assert.Equal(cnt, tsa.GetTimeSlots(startDate, maxDate).Count());
        }

        [Fact]
        public void InMemoryTSA_DeleteTimeSlots_NoMatch()
        {
            var tsa = new InMemoryTimeSlotAccess(false);
            int deleteCnt = tsa.DeleteTimeSlot(1);
            Assert.Equal(0, deleteCnt);
        }

        [Fact]
        public void InMemoryTSA_DeleteTimeSlots_Single()
        {
            var tsa = new InMemoryTimeSlotAccess(false);

            DateTime date = DateTime.Now.Date;
            tsa.AddTimeSlot(new TimeSlot
            {
                Date = date,
            });

            var slot = tsa.GetTimeSlots(date).Single();

            int deleteCnt = tsa.DeleteTimeSlot(slot.Id);
            Assert.Equal(1, deleteCnt);
        }
    }
}
