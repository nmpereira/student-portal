import React from "react";
import "./components.css";

function Comment(props) {
  return (
    <div className="comment">
      <p>_id: {props._id}</p>
      <p>created_by: {props.created_by}</p>
      <p>post_id: {props.post_id}</p>
      <p>content: {props.content}</p>
      <p>updated_at: {props.updated_at}</p>
      <p>created_at: {props.created_at}</p>
    </div>
  );
}

export default Comment;
