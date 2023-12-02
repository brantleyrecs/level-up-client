import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import EventForm from '../../../components/game/forms/EventForm';
import { getSingleEvent } from '../../../utils/data/eventData';

export default function EditSingleEvent() {
  const [editEvent, setEditEvent] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleEvent(id).then(setEditEvent);
    // console.warn(editEvent);
  }, [id]);

  return (
    <EventForm key={id} user={user} obj={editEvent} />
  );
}
