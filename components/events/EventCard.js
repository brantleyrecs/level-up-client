import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  game,
  description,
  date,
  time,
  organizer,
}) => (
  <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{game} Event</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Organized By: {organizer}</Card.Subtitle>
      <Card.Text>
        {description}
      </Card.Text>
      <Card.Footer>On {date} at {time}</Card.Footer>
    </Card.Body>
  </Card>
);

EventCard.propTypes = {
  game: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
};

export default EventCard;
