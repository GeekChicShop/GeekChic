export default function HomeSkeleton() {
  return (
    <div className="container w-[600px] animate-pulse">
      <div className="w-full h-[300px] mt-[30px]">
        <div className="bg-[#EEE] w-[597px] h-[100%]"></div>
        <p className="w-[120px] h-[20px] bg-[#EEE] ml-[30px] mt-[40px] mb-[15px]"></p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[100px]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="w-[120px] h-[130px] bg-[#EEE] rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
