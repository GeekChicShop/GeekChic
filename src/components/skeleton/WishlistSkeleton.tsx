export default function WishlistSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-1 px-11 mb-[40px]">
        <div className="w-[60px] h-[20px] bg-gray-300 rounded"></div>
      </div>
      <ul className="px-11 py-2 pb-4">
        {[1, 2, 3].map((item) => (
          <li key={item} className="w-[550px] flex mb-[110px]">
            <div className="w-[150px] h-[150px] bg-gray-300 rounded-[5px]"></div>
            <div className="w-[380px] px-4">
              <div className="w-[200px] h-[25px] flex bg-gray-300 mb-[10px] items-start rounded"></div>
              <p className="w-[300px] h-[25px] mb-[55px] bg-gray-300 rounded"></p>
              <p className="w-[200px] h-[25px] bg-gray-300 ml-[150px] rounded"></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
