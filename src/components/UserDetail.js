import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserDetail.css";
import axios from "axios";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user details", error));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-detail">
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company?.name}</p>
      <p>
        Address: {user.address?.street}, {user.address?.city}
      </p>
    </div>
  );
};

export default UserDetail;
