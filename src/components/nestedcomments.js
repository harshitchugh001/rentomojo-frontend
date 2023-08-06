import React, { useState, useEffect } from 'react';
import axios from 'axios';
import likes from '../photos/likes.png';
import disLikes from '../photos/dislikes.png';

const NestedComments = ({ commentId }) => {
  const [nestedComments, setNestedComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.userId : null;

  useEffect(() => {
    fetchNestedComments(commentId);
  }, [commentId]);

  const fetchNestedComments = async (commentId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/get-nested-comments/${commentId}`);
      setNestedComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostNestedComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/post-nested-comment`, {
        text: newCommentText,
        parentCommentId: commentId,
        userId: userId,
      });

      console.log(response);
      setNewCommentText('');
      fetchNestedComments(commentId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (parentCommentId, nestedCommentId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/nested-like`, {
        parentCommentId: parentCommentId,
        commentId: nestedCommentId,
        userId: userId,
      });
  
      if (response.data.message) {
        console.log(response.data.message);
        fetchNestedComments(parentCommentId); 
      } else {
        fetchNestedComments(parentCommentId); 
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDislike = async (parentCommentId, nestedCommentId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/nested-dislike`, {  
        parentCommentId: parentCommentId,
        commentId: nestedCommentId,
        userId: userId, });

      if (response.data.message) {
        console.log(response.data.message);
        fetchNestedComments(parentCommentId); 
      } else {
        fetchNestedComments(commentId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg border">
      {nestedComments.map((nestedComment) => (
        <div key={nestedComment._id} className="bg-white shadow-md rounded-lg p-4 mb-4 ml-4">
          <div className="flex space-x-2">
            <div className="w-8 h-8 p-auto rounded-full g-gray-300">
              <button onClick={() => handleLike(commentId, nestedComment._id)}>
                <img src={likes} alt="Like" />
              </button>
              <p>{nestedComment.like}</p>
            </div>
            <div className="flex-grow">
              <p>{nestedComment.text}</p>
              <p className="text-sm text-gray-500">By: {nestedComment.user}</p>
            </div>
            <div className="w-8 h-8 p-auto rounded-full g-gray-300">
              <button onClick={() => handleDislike(commentId, nestedComment._id)}>
                <img src={disLikes} alt="Dislike" />
              </button>
              <p>{nestedComment.dislike}</p>
            </div>
          </div>
        </div>
      ))}

      <form onSubmit={handlePostNestedComment}>
        <textarea
          placeholder="Write your nested comment here!"
          className="pb-cmnt-textarea form-control resize-none border rounded-lg p-2 ml-4"
          name="nestedComment"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        ></textarea>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg ml-4"
            type="submit"
          >
            Post Nested Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default NestedComments;
