import Chevron_left from "../../assets/icons/chevron_left.svg";

export default function ImageCard({
  image,
  description,
  handleBack,
}: {
  image: string;
  description: string;
  handleBack: () => void;
}) {
  return (
    <>
      <img
        src={Chevron_left}
        alt="이전 페이지로"
        className="w-10 h-10 cursor-pointer "
        onClick={handleBack}
      />
      <img className="w-[598px] h-[550px]" src={image} alt={description} />
      <div className="flex m-[30px] gap-[20px]">
        {/* {image ? (
          image.map((img) => (
            <img className="w-[100px] h-[100px]" src={img} alt={description} />
          ))
        ) : (
          <>
            <div className="w-[100px] h-[100px] bg-lightgray"></div>
            <div className="w-[100px] h-[100px] bg-lightgray"></div>
          </>
        )} */}
        <div className="w-[100px] h-[100px] bg-lightgray"></div>
        <div className="w-[100px] h-[100px] bg-lightgray"></div>
      </div>
    </>
  );
}
