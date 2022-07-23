/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { getSinglePlayer } from '../../api/playerData';

export default function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={playerDetails.image} alt={playerDetails.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{playerDetails.name}</Card.Title>
        <Card.Text>
          {playerDetails.position}
        </Card.Text>
      </Card.Body>
    </Card>

  );
}
