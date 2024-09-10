export default function ProductSkeleton() {
  return (
    <div className="container w-[600px] animate-pulse">
      <header className="w-[600px] flex text-xl ml-[25px] mb-[60px]">
        <div className="w-9/12 p-6 outline-none bg-[#EEE] rounded-[8px] pl-4 mt-[220px]"></div>
      </header>
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
