import React, { useEffect, useState } from 'react';
import Logout from './logout';
import axios from 'axios';

export default function UserPost() {
 

  return (
    <div>
      <Logout />
      <div className="container mx-auto p-4 bg-gray-100 ">
        <div className="flex justify-center">
          <div className="w-full md:w-6/12">
            <div className="bg-gray-100 shadow-md rounded-lg p-4">
              <form className="flex flex-col space-y-2" >
                <textarea
                  placeholder="Write your comment here!"
                  className="pb-cmnt-textarea form-control resize-none border rounded-lg p-2"
                  name="comment"
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
            {/* <div className="mt-4">
              {comments.map((comment) => (
                <div key={comment._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="flex-grow">
                      <p>{comment.text}</p>
                      <p className="text-sm text-gray-500">By: {comment.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
