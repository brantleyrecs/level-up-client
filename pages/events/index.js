import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/events/EventCard';
import { useAuth } from '../../utils/context/authContext';
import { getEvents } from '../../utils/data/eventData';

function EventHome() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const showEvents = () => {
    getEvents(user.uid).then((data) => setEvents(data));
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
          <EventCard onUpdate={showEvents} obj={event} join={event.join} />
        </section>
      ))}
    </article>
  );
}

export default EventHome;
