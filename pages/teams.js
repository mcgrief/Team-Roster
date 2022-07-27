import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getAllTheTeams = () => {
    getTeams(user.uid).then((teamArray) => {
      setTeams(teamArray);
    });
  };
  useEffect(() => {
    getAllTheTeams();
  }, [user.uid]);

  return (
    <div className="text-center my-4">
      <Link href="/team/newTeam" passHref>
        <Button>Add a team!</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />
        ))}
      </div>

    </div>
  );
}
