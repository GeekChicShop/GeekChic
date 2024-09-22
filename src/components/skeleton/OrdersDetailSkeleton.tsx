export default function OrdersDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-[40px] ">
        {[1, 2].map((item) => (
          <div key={item} className="flex w-[550px] mb-4 ml-[40px]">
            <div className="w-[150px] h-[150px] bg-gray-300 rounded-[5px]"></div>
            <div className="w-[380px] px-4">
              <div className="w-[100px] h-[20px] bg-gray-300 rounded mb-[15px]"></div>
              <div className="w-[150px] h-[20px] bg-gray-300 rounded mb-[15px]"></div>
              <div className="w-[70px] h-[20px] bg-gray-300 rounded mb-[5px]"></div>
              <div className="w-[100px] h-[20px] bg-gray-300 rounded mt-[40px] ml-[250px]"></div>
            </div>
          </div>
        ))}
        <p className="border border-[#D9D9D9] w-[520px] m-auto mt-[40px]"></p>
      </div>

      <div className="flex justify-end mr-[40px] gap-2">
        <div className="w-[70px] h-[20px] bg-gray-300 rounded mb-[5px]"></div>
        <div className="w-[70px] h-[20px] bg-gray-300 rounded mb-[5px]"></div>
      </div>
      <div className="flex justify-end mr-[40px] gap-2">
        <div className="w-[70px] h-[20px] bg-gray-300 rounded mb-[5px]"></div>
        <div className="w-[70px] h-[20px] bg-gray-300 rounded"></div>
      </div>
      <div className="flex justify-end mr-[40px] mt-[10px]">
        <div className="w-[70px] h-[20px] bg-gray-300 rounded"></div>
      </div>
      <p className="border border-[#D9D9D9] w-[520px] m-auto mt-[40px]"></p>

      <div className="ml-[40px] mt-[40px]">
        <div className="w-[100px] h-[25px] bg-gray-300 rounded"></div>
      </div>
      <div className="mt-[30px]">
        {[1, 2, 3].map((item) => (
          <div key={item}>
            <div className="w-[50px] h-[20px] bg-gray-300 rounded ml-[50px] mb-[10px] mt-[10px]"></div>
            <div className="w-[150px] h-[20px] bg-gray-300 rounded ml-[50px] mb-[10px]"></div>
            <p className="border border-[#D9D9D9] w-[520px] m-auto"></p>
          </div>
        ))}
      </div>

      <div className="ml-[50px] mt-[40px] ">
        <div className="w-[100px] h-[25px] bg-gray-300 rounded mb-[5px]"></div>
      </div>
      <div className="mt-[20px]">
        <div className="w-[150px] h-[20px] bg-gray-300 rounded ml-[50px] mb-[10px]"></div>
        <p className="border border-[#D9D9D9] w-[520px] m-auto mb-[50px]"></p>
      </div>
      <div className="w-[520px] h-[40px] bg-gray-300 rounded m-auto"></div>
    </div>
  );
}
