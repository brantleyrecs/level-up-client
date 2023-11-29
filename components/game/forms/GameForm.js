import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Col,
  Row,
} from 'react-bootstrap';
import { createGame, getGameTypes } from '../../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

// eslint-disable-next-line react/prop-types
const GameForm = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    // Send POST request to your API
    createGame(game).then(() => router.push('/games'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={currentGame.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}
        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control type="text" name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>
        <Row>
          <Col>
            <Form.Label>Number of Players</Form.Label>
            <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
          </Col>

          <Col>
            <Form.Label>Skill Level</Form.Label>
            <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
          </Col>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Game Type</Form.Label>
            <Form.Select defaultValue="Choose..." name="gameTypeId" onChange={handleChange}>
              <option value="">Choose...</option>
              {
                gameTypes.map((type) => (
                  <>
                    <option
                      key={type.id}
                      value={type.id}
                    >
                      {type.label}
                    </option>
                  </>
                ))
              }

            </Form.Select>
          </Form.Group>
        </Row>

        <br />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameForm;
