import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${Event.id}`} className="Event">
          <EventCard description={event.description} date={event.date} time={event.time} />
        </section>
      ))}
    </article>
  );
}

export default Home;
