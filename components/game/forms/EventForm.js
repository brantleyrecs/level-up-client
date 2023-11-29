import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Col,
  Row,
  FloatingLabel,
} from 'react-bootstrap';
import { getGames } from '../../../utils/data/gameData';
import { createEvent } from '../../../utils/data/eventData';

const initialState = {
  game: 0,
  description: '',
  date: '',
  time: '',
};

const EventForm = ({ user }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const event = {
      game: Number(currentEvent.gameId),
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      userId: user.uid,
    };

    // Send POST request to your API
    createEvent(event).then(() => router.push('/events'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Game</Form.Label>
          <Form.Select defaultValue="Choose..." name="gameId" onChange={handleChange}>
            <option value="">Choose...</option>
            {
                games.map((game) => (
                  <>
                    <option
                      key={game.id}
                      value={game.id}
                    >
                      {game.title}
                    </option>
                  </>
                ))
              }

          </Form.Select>
        </Form.Group>

        <br />

        <Form.Group className="mb-3">
          <FloatingLabel>Description</FloatingLabel>
          <Form.Control
            name="description"
            as="textarea"
            style={{ height: '100px' }}
            value={currentEvent.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Label>Date</Form.Label>
            <Form.Control placeholder="ex yyyy-mm-dd" name="date" required value={currentEvent.date} onChange={handleChange} />
          </Col>

          <Col>
            <Form.Label>Time</Form.Label>
            <Form.Control placeholder="ex 09:00:00" name="time" required value={currentEvent.time} onChange={handleChange} />
          </Col>

        </Row>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;