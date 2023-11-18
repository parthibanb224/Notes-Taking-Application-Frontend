const eventsForCalendar = events.map((event) => {
    if (event.eventDate && event.eventTime) {
      const [year, month, day] = event.eventDate.split('-').map(Number);
      const [hour, minute] = event.eventTime.split(':').map(Number);
  
      const start = new Date(year, month - 1, day, hour, minute);
      const end = new Date(year, month - 1, day, hour, minute);
  
      return {
        id: event.id,
        title: event.title,
        start,
        end,
      };
    } else {
      console.error(`Missing date or time for event with ID ${event.id}`);
      return null;
    }
  }).filter(Boolean);