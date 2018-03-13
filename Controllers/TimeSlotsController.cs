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

        public TimeSlotsController(ITimeSlotAccess timeSlotAccess)
        {
            slotAccess = timeSlotAccess;
        }

        [HttpGet("[action]/{date}")]
        public IEnumerable<TimeSlot> GetSlots(string date)
        {
            return slotAccess.GetTimeSlots(DateTime.Parse(date));
        }

        [HttpPost("[action]")]
        public IActionResult AddSlot([FromBody]TimeSlot newSlot)
        {
            slotAccess.AddTimeSlot(newSlot);
            return Ok();
        }

        [HttpDelete("[action]/{slotId}")]
        public IActionResult DeleteSlot(int slotId)
        {
            slotAccess.DeleteTimeSlot(slotId);
            return Ok();
        }
    }
}