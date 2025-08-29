import React, { useState, useEffect } from 'react';
import { getCurrentUser, updateUser } from '../auth';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
        setName(data.name || '');
        setEmail(data.email || '');
      })
      .catch((error) => console.error('Failed to fetch user:', error));
  }, []);

  const handleSave = async () => {
    if (!password) {
      alert('Please enter your password to update your profile.');
      return;
    }

    try {
      await updateUser({ username: user.username, email, name, password });
      alert('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          disabled={!isEditing}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          disabled={!isEditing}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {isEditing && (
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      {isEditing && (
        <button onClick={handleSave}>Save</button>
      )}
    </div>
  );
};

export default ProfilePage;
