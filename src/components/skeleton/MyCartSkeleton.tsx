export default function MyCartSkeleton() {
  return (
    <div className="container w-[600px] animate-pulse">
      <div>
        <div className="flex gap-1 px-11 mb-[10px]">
          <p className="w-[40px] h-[20px] bg-gray-300 rounded mr-[5px]"></p>
          <p className="w-[30px] h-[20px] bg-gray-300 rounded"></p>
        </div>
        <p className="border border-[#D9D9D9] w-[520px] m-auto mt-[20px] mb-[30px]"></p>

        <ul className="px-11 py-2 pb-4">
          {[1, 2].map((item) => (
            <li key={item} className="flex mb-10 w-[550px]">
              <div className="w-[130px] h-[130px] bg-gray-300 rounded-[5px]"></div>
              <div className="flex px-1 w-[380px]">
                <div className="px-4 w-[380px]">
                  <div className="w-[90px] h-[25px] bg-gray-300 rounded mb-[5px]"></div>
                  <div className="w-[180px] h-[25px] bg-gray-300 rounded mb-[5px]"></div>
                  <div className="w-[70px] h-[25px] bg-gray-300 rounded mb-[15px]"></div>
                  <div className="w-[90px] h-[25px] bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-[15px] h-[15px] bg-gray-300 rounded mr-[5px]"></div>
                  <div className="w-[15px] h-[15px] bg-gray-300 rounded mr-[5px]"></div>
                  <div className="w-[15px] h-[15px] bg-gray-300 rounded mr-[5px]"></div>
                  <div className="w-[15px] h-[15px] bg-gray-300 rounded"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="border border-[#D9D9D9] w-[520px] m-auto mt-[30px] mb-[45px]"></p>

        <div className="flex justify-between items-center mb-10 px-2 md:px-8">
          <div className="w-[100px] h-[100px] bg-gray-300 rounded mx-2"></div>
          <div className="w-[100px] h-[100px] bg-gray-300 rounded mx-2"></div>
          <div className="w-[100px] h-[100px] bg-gray-300 rounded mx-2"></div>
        </div>
        <div className="w-[520px] h-[50px] bg-gray-300 rounded m-auto"></div>
      </div>
    </div>
  );
}
