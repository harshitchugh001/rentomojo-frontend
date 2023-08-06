import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Logout from './logout';
import axios from 'axios';
import likes from '../photos/likes.png';
import disLikes from '../photos/dislikes.png';

export default function UserPost() {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.userId : null;

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/get-comments`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/post-comments`, {
        text: commentText,
        userId: userId,
      });

      console.log(response);
      toast.success('Comment posted successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      fetchComments();
      setCommentText('');
    } catch (error) {
      console.log(error);
      toast.error('Error posting comment!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/like`, { commentId, userId });
  
      if (response.data.message) {
        toast.warning(response.data.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success('Liked the comment!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        fetchComments();
      }
    } catch (error) {
      console.log(error);
      toast.error('Error liking the comment!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  const handleDislike = async (commentId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/dislike`, { commentId, userId });
  
      if (response.data.message) {
        toast.warning(response.data.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success('Disliked the comment!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        fetchComments();
      }
    } catch (error) {
      console.log(error);
      toast.error('Error disliking the comment!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <Logout />
      <div className="container mx-auto p-4 bg-gray-100 ">
        <div className="flex justify-center">
          <div className="w-full md:w-6/12">
            <div className="bg-gray-100 shadow-md rounded-lg p-4">
              <form className="flex flex-col space-y-2" onSubmit={handlePostComment}>
                <textarea
                  placeholder="Write your comment here!"
                  className="pb-cmnt-textarea form-control resize-none border rounded-lg p-2"
                  name="comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>

                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg"
                    type="submit"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-4">
              {comments.map((comment) => (
                <div key={comment._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 p-auto rounded-full g-gray-300">
                      <button onClick={() => handleLike(comment._id)}>
                        <img src={likes} alt="Like" />
                      </button>
                      <p>{comment.like}</p>
                    </div>
                    <div className="flex-grow">
                      <p>{comment.text}</p>
                      <p className="text-sm text-gray-500">By: {comment.user}</p>
                    </div>
                    <div className="w-8 h-8 p-auto rounded-full g-gray-300">
                      <button onClick={() => handleDislike(comment._id)}>
                        <img src={disLikes} alt="Dislike" />
                      </button>
                      <p>{comment.dislike}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
