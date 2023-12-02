import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteEvent } from '../../utils/data/eventData';

const EventCard = ({
  game,
  description,
  date,
  time,
  organizer,
  id,
  onUpdate,
}) => {
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${game} event?`)) {
      deleteEvent(id).then(() => onUpdate());
    }
  };

  const router = useRouter();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{game} Event</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Organized By: {organizer}</Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Footer>On {date} at {time}</Card.Footer>
      </Card.Body>
      <Button
        onClick={() => {
          router.push(`/events/edit/${id}`);
        }}
      >
        Edit Event
      </Button>
      <Button onClick={deleteThisEvent}>
        Delete
      </Button>
    </Card>
  );
};

EventCard.propTypes = {
  // eslint-disable-next-line react/require-default-props
  id: PropTypes.number,
  game: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
