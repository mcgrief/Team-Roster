import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';

const initialState = {
  name: '',
  sport: '',
  image: '',
  public: false,
};

function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateTeam(formInput)
        .then(() => router.push(`/team/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(() => {
        router.push('/teams');
      });
    }
  };

  return (
    <>
      <Head>
        <title>Add a Team!</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} New Team</h2>
        <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter your team name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput3" label="Team Sport" className="mb-3">
          <Form.Control type="text" placeholder="What sport is your team?" name="sport" value={formInput.sport} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Team Image" className="mb-3">
          <Form.Control type="url" placeholder="Enter your team logo" name="image" value={formInput.image} onChange={handleChange} required />
        </FloatingLabel>

        {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="public"
          name="public"
          label="Public Team"
          checked={formInput.public}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            public: e.target.checked,
          }))}
        />
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
      </Form>
    </>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    sport: PropTypes.string,
    image: PropTypes.string,
    public: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
