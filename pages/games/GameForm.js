import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createGame, getGameTypes } from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

const GameForm = ({ obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Get the game types, then set the state
    if (obj.id) {
      setCurrentGame({
        id: obj.id,
        maker: obj.maker,
        title: obj.title,
        numberOfPlayers: obj.numberOfPlayers,
        skillLevel: obj.skillLevel,
        gameType: obj.gameType,
        userId: user.uid,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
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
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}
        <FloatingLabel
          controlId="floatingInput1"
          label="Games"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Game Creator"
            name="maker"
            value={gameTypes.maker}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput1"
          label="Title"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Game Title"
            name="title"
            value={gameTypes.title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput1"
          label="Number of Players"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Number of Players"
            name="numberOfPlayers"
            value={gameTypes.numberOfPlayers}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput1"
          label="Number of Players"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Skill Level"
            name="skillLevel"
            value={gameTypes.skillLevel}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput1"
          label="Number of Players"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Game Type"
            name="gametype"
            value={gameTypes.gameType}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    uid: PropTypes.string.isRequired,
    maker: PropTypes.string,
    title: PropTypes.string,
    numberOfPlayers: PropTypes.string,
    skillLevel: PropTypes.string,
    gameType: PropTypes.string,
  }),
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;
