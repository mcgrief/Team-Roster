/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { viewPlayerDetails } from '../../api/mergedData';

export default function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlayerDetails(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Player Details</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={playerDetails.image} alt={playerDetails.name} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{playerDetails.name}</Card.Title>
          <Card.Text>
            {playerDetails.position}
          </Card.Text>
        </Card.Body>
      </Card>
    </>

  );
}
