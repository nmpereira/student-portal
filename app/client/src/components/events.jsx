import React from "react";
import "./components.css";

function Event(props) {
  return (
    <div className="event">
      <p>_id: {props._id}</p>
      <p>created_by: {props.created_by}</p>
      <p>event_name: {props.event_name}</p>
      <p>event_description: {props.event_description}</p>
      <p>event_date: {props.event_date}</p>
      <p>content: {props.content}</p>
      <p>updated_at: {props.updated_at}</p>
      <p>created_at: {props.created_at}</p>
    </div>
  );
}

export default Event;
