import React from 'react'
import Avatar from 'react-avatar';

const Client = ({ username }) => {
  if (!username) return null; // 🔥 prevents crash

  return (
    <div className="client">
      <div className="avatar">
        {username.charAt(0).toUpperCase()}
      </div>
      <span className="username">{username}</span>
    </div>
  );
};

export default Client;

