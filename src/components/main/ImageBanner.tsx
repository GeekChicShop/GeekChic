export default function ImageBanner({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="w-full h-[300px] mt-[30px]">
      <img
        className="object-cover object-center w-[100%] h-[100%]"
        src={src}
        alt={alt}
      />
    </div>
  );
}
