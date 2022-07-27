/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../api/teamData';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={teamDetails.image} alt={teamDetails.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{teamDetails.name}</Card.Title>
        <Card.Text>
          {teamDetails.sport}
        </Card.Text>
      </Card.Body>
    </Card>

  );
}
