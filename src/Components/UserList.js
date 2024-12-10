// src/components/UserList.js
import React, { useEffect, useState } from 'react';

const UserList = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Users</h2>
            {/* <ul>
                {users.map(user => (
                    <li key={user.id} onClick={() => onSelectUser(user)}>
                        {user.id}{user.username}
                    </li>
                ))}
            </ul> */}

            <h1 className="text-2xl font-bold mb-4">users List</h1>
      <table className="w-full bg-white border border-gray-300 overflow-auto">
        <thead>
          <tr>
            <th className="py-2 border">Title</th>
            <th className="py-2 border">Description</th>
            <th className="py-2 border">genere</th>
            {/* <th className="py-2 border">Image</th>
            <th className="py-2 border">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.fullname}</td>
              <td className="border px-4 py-2">{user.username}</td>
              {/* <td className="border px-4 py-2">
                <img src={user.image} alt={user.title} className="w-16 h-16 object-cover" />
              </td> */}
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    );
};

export default UserList;
