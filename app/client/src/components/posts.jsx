import React from "react";
import "./components.css";

function Post(props) {
  return (
    <div className="post">
      <h2>Post</h2>
      <p>_id: {props._id}</p>
      <p>created_by: {props.created_by}</p>
      <p>content: {props.content}</p>
      <p>updated_at: {props.updated_at}</p>
      <p>created_at: {props.created_at}</p>
    </div>
  );
}

export default Post;
