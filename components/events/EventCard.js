/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';

const EventCard = ({
  obj,
  // game,
  // description,
  // date,
  // time,
  // organizer,
  // id,
  onUpdate,
  // joined,
}) => {
  const { user } = useAuth();

  const handleJoin = () => {
    joinEvent(obj.id, user.uid).then(onUpdate);
  };

  const handleLeave = () => {
    leaveEvent(obj.id, user.uid).then(onUpdate);
  };

  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${obj.game} event?`)) {
      deleteEvent(obj.id).then(() => onUpdate());
    }
  };

  const router = useRouter();
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{obj.game.title} Event</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Organized By: {obj.organizer.bio}</Card.Subtitle>
          <Card.Text>
            {obj.description}
          </Card.Text>
          <Card.Footer>On {obj.date} at {obj.time}</Card.Footer>
        </Card.Body>
        <Button
          onClick={() => {
            router.push(`/events/edit/${obj.id}`);
          }}
        >
          Edit Event
        </Button>
        <Button onClick={deleteThisEvent}>
          Delete
        </Button>
        {obj.joined ? (<Button variant="warning" onClick={handleLeave}>Leave Event</Button>) : (<Button variant="success" onClick={handleJoin}>Join Event</Button>)}
      </Card>
    </>
  );
};

EventCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    organizer: PropTypes.string,
    onUpdate: PropTypes.func,
    joined: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
};

export default EventCard;
