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
import { useAuth } from '../../../utils/context/authContext';
import { getGames } from '../../../utils/data/gameData';
import { createEvent, updateEvent } from '../../../utils/data/eventData';

const initialState = {
  gameId: 0,
  description: '',
  date: '',
  time: '',
  organizer: 0,
};

const EventForm = ({ obj }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj && obj?.id) {
      setCurrentEvent((prevState) => ({
        ...prevState,
        id: obj.id,
        game: obj.game ? obj.game.id : 0,
        description: obj.description,
        date: obj.date,
        time: obj.time,
        organizer: user.uid,
        // userId: user.uid,
      }));
    }
    // console.warn(currentEvent);
  }, [obj, user]);

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

  console.warn(currentEvent);
  console.warn(games);

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (obj) {
      const eventUpdate = {
        id: obj.id,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: currentEvent.game,
        organizer: currentEvent.organizer,
        userId: user.uid,
      };
      updateEvent(eventUpdate)
        .then(() => router.push('/events'));
    } else {
      const event = {
        game: Number(currentEvent.game),
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        organizer: user.uid,
        // userId: user.uid,
      };
      // Send POST request to your API
      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-white mt-5">{obj ? 'Update' : 'Create'} Event</h1>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Game</Form.Label>
          <Form.Select value={currentEvent.gameId} name="game" onChange={handleChange}>
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
  obj: PropTypes.shape({
    id: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    organizer: PropTypes.string,
  }).isRequired,
};

export default EventForm;
