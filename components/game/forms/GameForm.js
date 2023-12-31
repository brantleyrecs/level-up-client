import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Col,
  Row,
} from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

// eslint-disable-next-line react/prop-types
const GameForm = ({ user, obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  // useEffect(() => {
  //   // TODO: Get the game types, then set the state
  //   if (obj) setCurrentGame(obj);

  //   console.warn(currentGame);

  //   getGameTypes().then(setGameTypes);
  // }, [obj]);

  useEffect(() => {
    // When the component mounts or the "obj" or "user" changes, update the current game state
    if (obj?.id) {
      setCurrentGame({
        id: obj.id,
        maker: obj.maker,
        title: obj.title,
        numberOfPlayers: obj.number_of_players,
        skillLevel: obj.skill_level,
        gameType: obj.game_type?.id,
        userId: user.uid,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    // When the component mounts, fetch the game types and update the game types state
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
    // eslint-disable-next-line react/prop-types
    if (obj) {
      updateGame(currentGame).then(() => router.push('../../../games'));
    } else {
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
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-white mt-5">{obj ? 'Update' : 'Create'} Game</h1>
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
            <Form.Select value={currentGame.gameType} name="gameTypeId" onChange={handleChange}>
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
  obj: PropTypes.shape({
    id: PropTypes.number,
    skillLevel: PropTypes.number,
    numberOfPlayers: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    gameType: PropTypes.number,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    game_type: PropTypes.number,
  }).isRequired,
};

export default GameForm;
