import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import useComment from "../../hook/useComment";
import { geekChickUser } from "../../atoms/userAtom";

import { Comment } from "../../types/mainType";

interface CommentBtnProps {
  comments: Comment;
}

export default function CommentBtn({ comments }: CommentBtnProps) {
  const { id } = useParams<{ id?: string }>();
  const loginUser = useRecoilValue(geekChickUser);
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [editComment, setEditComment] = useState(comments.text);

  const { editCommentItem, removeCommentItem } = useComment(id as string);
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
        <div className="border-b-2 border-0 w-[500px] mt-[25px] m-auto text-left">
          <textarea
            defaultValue={comments.text}
            onChange={(e) => {
              setEditComment(e.target.value);
            }}
            className="w-full max-w-[400px] border-0 text-lg pb-10 resize-none"
          />
        </div>
      ) : (
        <div className="border-b-2 border-0 w-[500px] m-auto text-left mt-[25px] text-lg">
          <p className="max-w-[400px] pb-2">{comments.text}</p>
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
