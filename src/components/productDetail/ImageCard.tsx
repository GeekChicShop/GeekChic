import Chevron_left from "../../assets/icons/chevron_left.svg";

interface ImageProps {
  image: string[];
  selectedImage: string;
  description: string;
  setselectedImage: (img: string) => void; // 정확한 타입을 지정
  handleBack: () => void;
}

export default function ImageCard({
  image,
  selectedImage,
  setselectedImage,
  description,
  handleBack,
}: ImageProps) {
  return (
    <>
      <img
        src={Chevron_left}
        alt="이전 페이지로"
        className="w-10 h-10 cursor-pointer "
        onClick={handleBack}
      />
      <img
        className="w-[598px] h-[550px]"
        src={selectedImage}
        alt={description}
      />
      <div className="flex m-[30px] gap-[20px]">
        {image ? (
          image.map((img) => (
            <img
              onClick={() => setselectedImage(img)}
              className="w-[100px] h-[100px] cursor-pointer"
              src={img}
              alt={description}
            />
          ))
        ) : (
          <>
            <div className="w-[100px] h-[100px] bg-lightgray"></div>
            <div className="w-[100px] h-[100px] bg-lightgray"></div>
          </>
        )}
      </div>
    </>
  );
}
