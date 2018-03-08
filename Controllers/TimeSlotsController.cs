using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using timereg.Models;

namespace timereg.Controllers
{
    [Route("api/[controller]")]
    public class TimeSlotsController : Controller
    {
        private ITimeSlotAccess slotAccess;

        public TimeSlotsController()
        {
            slotAccess = new InMemoryTimeSlotAccess();
        }

        [HttpGet("[action]/{date}")]
        public IEnumerable<TimeSlot> GetSlots(string date)
        {
            return slotAccess.GetTimeSlots(DateTime.Parse(date));
        }

        [HttpPost("[action]/{newSlot}")]
        public ActionResult AddSlot(TimeSlot newSlot)
        {
            slotAccess.AddTimeSlot(newSlot);
            return Ok();
        }

        [HttpDelete("[action]/{slotId}")]
        public ActionResult DeleteSlot(int slotId)
        {
            slotAccess.DeleteTimeSlot(slotId);
            return Ok();
        }
    }
}