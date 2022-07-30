/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import PlayerCard from '../../components/PlayerCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, []);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="title, meta, nextjs" />
        <meta name="author" content="Adam Steel" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Team Details</title>
      </Head>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={teamDetails.image} alt={teamDetails.name} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{teamDetails.name}</Card.Title>
          <Card.Text>
            {teamDetails.sport}
          </Card.Text>
        </Card.Body>
      </Card>
      <div>
        {teamDetails.players?.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={() => (null)} />
        ))}
      </div>
    </>
  );
}
