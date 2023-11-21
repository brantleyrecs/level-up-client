import React, { useEffect, useState } from 'react';
import EventCard from '../../components/events/EventCard';
import { getEvents } from '../../utils/data/eventData';

function EventHome() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
    console.warn(events);
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard game={event.game.title} description={event.description} date={event.date} time={event.time} organizer={event.organizer.bio} />
        </section>
      ))}
    </article>
  );
}

export default EventHome;