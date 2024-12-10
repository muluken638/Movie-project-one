import React, { useEffect, useState } from "react";
import AddnewFilm from "../../../Buttons/AddnewFilm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/api/users"); // Adjust the URL as needed
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFullname(user.fullname);
    setUsername(user.username);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
    });
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSave = async () => {
    const updatedUser = {
      ...editingUser,
      fullname: fullname,
      username: username,
    };
    await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    setUsers(
      users.map((user) => (user.id === editingUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  return (
    <div className="w-full mx-auto mt-10">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <div>
          <AddnewFilm/>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.fullname}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2 flex flex-row gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 w-full"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded w-full"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Edit User</h2>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="border p-2 mb-2 w-full"
            placeholder="Full name "
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 mb-2 w-full"
            placeholder="Username"
          />
          
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
