"use client";

import { Comment } from "@/types/Comment";

interface Props {

  comment: Comment;
}

export default function CommentCard({
  comment,
}: Props) {

  return (

    <div className="bg-white p-5 rounded-xl shadow">

      <div className="flex justify-between items-center mb-3">

        <div>

          <h2 className="font-semibold text-black">
            {comment.username}
          </h2>

          <p className="text-sm text-gray-500">
            {comment.senderType}
          </p>

        </div>

        <p className="text-sm text-gray-500">
          {comment.createdAt}
        </p>

      </div>

      <p className="text-black">
        {comment.message}
      </p>

    </div>
  );
}