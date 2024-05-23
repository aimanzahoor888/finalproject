// UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { URL } from '../../Redux/Url';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchUsers();
    }
  }, [userInfo]);

  const fetchUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${URL}/api/users`, config);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleBanUser = async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(`${URL}/api/users/ban/${userId}`, {}, config);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error banning user', error);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(`${URL}/api/users/unban/${userId}`, {}, config);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error unbanning user', error);
    }
  };

  return (
    <div className="management-section">
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <span>{user.name} - {user.email}</span>
            {user.banned ? (
              <button className="unban" onClick={() => handleUnbanUser(user._id)}>Enable</button>
            ) : (
              <button onClick={() => handleBanUser(user._id)}>Disable</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
