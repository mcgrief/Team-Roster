import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';
import Search from '../components/Search';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();

  const getAllThePlayers = () => {
    getPlayers(user.uid).then((playerArray) => {
      setPlayers(playerArray);
      setFilteredPlayers(playerArray);
    });
  };
  useEffect(() => {
    getAllThePlayers();
  }, [user.uid]);

  return (
    <div className="text-center my-4">
      <Search players={players} setFilteredPlayers={setFilteredPlayers} />
      <Link href="/player/new" passHref>
        <Button>Recruit a new teammate!</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllThePlayers} />
        ))}
      </div>

    </div>
  );
}
