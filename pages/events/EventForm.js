import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import createEvent, { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  game: 0,
  description: '',
  date: '',
  time: '',
  organizer: 0,
};

const EventForm = ({ obj }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
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
      setCurrentEvent({
        id: obj.id,
        game: obj.game,
        description: obj.description,
        date: obj.date,
        time: obj.time,
        organizer: obj.organizer,
        userId: user.uid,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    getEvents().then(setGames);
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
      game: Number(currentEvent.game),
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: Number(currentEvent.gameTypeId),
      userId: user.uid,
    };

    // Send POST request to your API
    createEvent(event).then(() => router.push('/events'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Control name="game" required value={currentEvent.game} onChange={handleChange} />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}
        <FloatingLabel
          controlId="floatingInput1"
          label="Games"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Description"
            name="description"
            value={games.description}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput1"
          label="Date"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Date"
            name="date"
            value={games.date}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput1"
          label="Time"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Time"
            name="time"
            value={games.time}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput1"
          label="Organizer"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="organizer"
            name="organizer"
            value={games.organizer}
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

EventForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    game: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    organizer: PropTypes.string,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;
