import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  description,
  time,
  date,
}) => (
  <Card className="text-center">
    <Card.Body>
      <Card.Text>{description}</Card.Text>
      <Card.Text>{time}</Card.Text>
      <Card.Text>{date}</Card.Text>
    </Card.Body>
  </Card>
);

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default EventCard;
