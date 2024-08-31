import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { geekChickUser } from "../../atoms/userAtom";
import { removeComment } from "../../api/firebase";
import { editComments } from "../../api/firebase";

import { Comment } from "../../types/mainType";

interface CommentBtnProps {
  comments: Comment; // Comment 타입으로 정의
}

interface CommentObj {
  id: string;
  commentId: string;
}

export default function CommentBtn({ comments }: CommentBtnProps) {
  const { id } = useParams<{ id?: string }>();
  const loginUser = useRecoilValue(geekChickUser);
  const queryClient = useQueryClient();

  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [editComment, setEditComment] = useState(comments.text);

  const removeCommentItem = useMutation<void, Error, CommentObj>({
    mutationFn: async ({ id, commentId }) => await removeComment(id, commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  const editCommentItem = useMutation<void, Error, Comment>({
    mutationFn: async (comments) => await editComments(id as string, comments),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  const onClickEditUsedComment = async () => {
    const editCommentData = {
      ...comments,
      text: editComment,
    };
    editCommentItem.mutate(editCommentData);
    setIsCommentEdit(false);
  };

  const onClickRemoveComment = (commentId: string) => {
    if (id && commentId) {
      removeCommentItem.mutate({ id, commentId });
    }
  };

  return (
    <>
      {isCommentEdit ? (
        <input
          type="text"
          defaultValue={comments.text}
          onChange={(e) => {
            setEditComment(e.target.value);
          }}
          className="border-b-2 border-0 h-[40px] w-[500px] m-auto text-left mt-[25px] text-lg p-0 pb-2"
        />
      ) : (
        <div className="border-b-2 border-0 w-[500px] m-auto text-left mt-[25px] text-lg">
          <p className="max-w-[400px] break-words">{comments.text}</p>
        </div>
      )}
      {loginUser.userId === comments.uid && (
        <div className="flex justify-end -mt-[55px] mr-[30px]">
          {isCommentEdit ? (
            <>
              <button
                onClick={onClickEditUsedComment}
                className="w-[40px] h-[40px] ml-2 mb-2 bg-gray-200 rounded-md"
              >
                저장
              </button>
              <button
                onClick={() => setIsCommentEdit(false)}
                className="w-[40px] h-[40px] mr-5 ml-2 mb-2 bg-gray-200 rounded-md"
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsCommentEdit(true)}
                className="w-[40px] h-[40px] ml-2 mb-2 bg-gray-200 rounded-md"
              >
                수정
              </button>
              <button
                onClick={() => onClickRemoveComment(comments.id)}
                className="w-[40px] h-[40px] mr-5 ml-2 mb-2 bg-gray-200 rounded-md"
              >
                삭제
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
