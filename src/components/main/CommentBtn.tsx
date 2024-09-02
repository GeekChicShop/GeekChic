import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import useComment from "../../hook/useComment";
import { geekChickUser } from "../../atoms/userAtom";
import Button from "../ui/button";

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
              <Button
                text="저장"
                onClick={onClickEditUsedComment}
                className="w-[40px] h-[40px] ml-2 mb-2 bg-gray-200"
              />
              <Button
                text="취소"
                onClick={() => setIsCommentEdit(false)}
                className="w-[40px] h-[40px] ml-2 mb-2 bg-gray-200 mr-[20px]"
              />
            </>
          ) : (
            <>
              <Button
                text="수정"
                onClick={() => setIsCommentEdit(true)}
                className="w-[40px] h-[40px] ml-2 mb-2 bg-gray-200"
              />
              <Button
                text="삭제"
                onClick={() => onClickRemoveComment(comments.id)}
                className="w-[40px] h-[40px] ml-2 mb-2 bg-gray-200"
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
