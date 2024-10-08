import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";

import useComment from "../../hook/useComment";
import { userState } from "../../atoms/userAtom";
import type { Comment, ProductComments } from "../../types/mainType";

import EmptyStar from "../../assets/icons/EmptyStar.svg";
import FilledStar from "../../assets/icons/FilledStar.svg";

export default function Comment({ product }: { product: ProductComments }) {
  const user = useRecoilValue(userState);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const id = product.id;
  const commentArray = product.comments ? Object.values(product.comments) : [];
  const averageRank = commentArray.length
    ? commentArray.reduce((acc, comment) => acc + (comment.rank ?? 0), 0) /
      commentArray.length
    : 0;

  const [text, setText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [comment, setComment] = useState<Omit<Comment, "id" | "createdAt">>({
    text: "",
    rank: 0,
    uid: "",
    userPhoto: "",
    displayName: "",
  });

  useEffect(() => {
    if (textareaRef.current) {
      // textarea의 높이를 초기화한 다음, 내용에 맞게 높이를 조정
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const { addComment } = useComment(id);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    const comments = {
      text: comment.text ?? "",
      rank: comment.rank ?? 0,
      uid: user.uid,
      userPhoto: user.photoURL || "",
      displayName: user.displayName || "",
    };
    setIsUploading(true);

    await addComment.mutate({
      id: id,
      comments: comments,
    });

    setSuccess("리뷰 추가 완료!");
    setComment({
      text: "",
      rank: 0,
      uid: "",
      userPhoto: "",
      displayName: "",
    });

    setTimeout(() => {
      setSuccess(null);
    }, 4000);
    setIsUploading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setText(value);
    setComment((comment) => ({ ...comment, [name]: value }));
  };

  const handleStarClick = (rank: number) => {
    setComment((comment) => ({ ...comment, rank }));
  };

  return (
    <>
      {success && <p className="my-2">✅ {success}</p>}
      <div className="flex ml-[25px] mt-[50px] text-3xl font-bold text-left gap-1">
        <h1>상품 후기</h1>
        <p className="text-lightgray">({commentArray.length})</p>
      </div>
      <div className="text-2xl text-right mr-[50px]">
        <p>{`리뷰 평점: ${averageRank}`}</p>
      </div>
      <form
        className="flex flex-col px-12 gap-1 mt-[25px]"
        onSubmit={handleSubmit}
      >
        <div className="flex w-[30px] ml-[350px] mb-[20px] h-[30px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <img
              key={index}
              src={index < comment.rank ? FilledStar : EmptyStar}
              alt={index < comment.rank ? "Filled Star" : "Empty Star"}
              className="w-[30px] h-[30px] cursor-pointer"
              onClick={() => handleStarClick(index + 1)}
            />
          ))}
        </div>
        <button
          className="w-[70px] h-[40px] ml-[430px] -mb-[30px] z-0 bg-black text-white border border-black rounded-full hover:bg-white hover:text-black duration-200"
          disabled={isUploading}
        >
          {isUploading ? "업로드중..." : "등록"}
        </button>
        <div className="border-b-2 border-0 w-[500px] text-left">
          <textarea
            ref={textareaRef}
            className="w-full max-w-[430px] pl-2 outline-none resize-none"
            placeholder="리뷰를 작성해주세요."
            name="text"
            value={comment.text ?? ""}
            required
            onChange={handleChange}
            rows={1}
          />
        </div>
      </form>
    </>
  );
}
