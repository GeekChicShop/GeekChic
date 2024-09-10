export default function ProductSkeleton() {
  return (
    <div className="container w-[600px] animate-pulse">
      <div className="flex gap-[35px] ml-[45px] mt-[45px] justify-center w-[500px]">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="w-[80px] h-[40px] bg-[#EEE] rounded"></div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[50px]">
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
