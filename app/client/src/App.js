import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Post from "./components/posts";
import Comment from "./components/comments";
import User from "./components/users";
import Event from "./components/events";

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getData();
    async function getData() {
      const postResponse = await fetch("/api/posts");
      const postData = await postResponse.json();
      const commentResponse = await fetch("/api/comments");
      const commentData = await commentResponse.json();
      const userResponse = await fetch("/api/users");
      const userData = await userResponse.json();
      const eventResponse = await fetch("/api/events");
      const eventData = await eventResponse.json();

      setUsers(userData);
      setPosts(postData);
      setComments(commentData);
      setEvents(eventData);
      console.log(postData);
      console.log(commentData);
      console.log(userData);
      console.log(eventData);
    }
  }, []);
  return (
    <div>
      {users.map((user) => (
        <User
          _id={user._id}
          username={user.username}
          name={user.name}
          email={user.email}
          status={user.status}
          updated_at={user.updated_at}
          created_at={user.created_at}
        />
      ))}
      {posts.map((post) => (
        <Post
          _id={post._id}
          created_by={post.created_by}
          content={post.content}
          updated_at={post.updated_at}
          created_at={post.created_at}
        />
      ))}

      {comments.map((comment) => (
        <Comment
          _id={comment._id}
          created_by={comment.created_by}
          post_id={comment.post_id}
          content={comment.content}
          updated_at={comment.updated_at}
          created_at={comment.created_at}
        />
      ))}

      {events.map((event) => (
        <Event
          _id={event._id}
          created_by={event.created_by}
          event_name={event.event_name}
          event_description={event.event_description}
          event_date={event.event_date}
          content={event.content}
          updated_at={event.updated_at}
          created_at={event.created_at}
        />
      ))}
    </div>
  );
}

export default App;
