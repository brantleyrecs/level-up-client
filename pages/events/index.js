import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/events/EventCard';
import { getEvents } from '../../utils/data/eventData';

function EventHome() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  const showEvents = () => {
    getEvents().then(setEvents);
  };

  useEffect(() => {
    // getEvents().then(setEvents);
    // console.warn(events);
    showEvents();
  }, []);
  console.warn(events);

  return (
    <article className="events">
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard game={event.game.title} description={event.description} date={event.date} time={event.time} organizer={event.organizer.bio} id={event.id} onUpdate={showEvents} />
        </section>
      ))}
    </article>
  );
}

export default EventHome;
