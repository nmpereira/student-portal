import React from "react";
import "./components.css";

function User(props) {
  return (
    <div className="user">
      <p>_id: {props._id}</p>
      <p>username: {props.username}</p>
      <p>name: {props.name}</p>
      <p>email: {props.email}</p>
      <p>status: {props.status}</p>
      <p>created_at: {props.created_at}</p>
      <p>updated_at: {props.updated_at}</p>
    </div>
  );
}

export default User;
