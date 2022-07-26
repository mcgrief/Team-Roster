import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPlayer, updatePlayer } from '../../api/playerData';
import { getTeams } from '../../api/teamData';

const initialState = {
  name: '',
  image: '',
  position: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput)
        .then(() => router.push(`/player/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/players');
      });
    }
  };

  return (
    <>
      <Head>
        <title>Add a Player!</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} A New Player!</h2>
        <FloatingLabel controlId="floatingInput1" label="Player Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter this Bowie's Name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput3" label="Player Position" className="mb-3">
          <Form.Control type="text" placeholder="Enter Their Position" name="position" value={formInput.position} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Player Image" className="mb-3">
          <Form.Control type="url" placeholder="Enter your player image" name="image" value={formInput.image} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Team">
          <Form.Select
            aria-label="Team"
            name="team_id"
            onChange={handleChange}
            className="mb-3"
            required
          >
            <option value="">Select a Team</option>
            {teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="favorite"
          name="favorite"
          label="Like Their Work?"
          checked={formInput.favorite}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }))}
        />
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player</Button>
      </Form>
    </>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    team_id: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
