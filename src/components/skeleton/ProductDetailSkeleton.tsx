export default function ProductDetailSkeleton() {
  return (
    <div className='className="container w-[600px] mb-[10px] mt-[40px] animate-pulse'>
      <div className="w-[598px] h-[550px] bg-gray-300 rounded"></div>
      <div className="flex m-[30px] gap-[20px]">
        <div className="w-[100px] h-[100px] bg-gray-300 rounded"></div>
        <div className="w-[100px] h-[100px] bg-gray-300 rounded"></div>
      </div>
      <div className="w-[50px] h-[20px] bg-gray-300 ml-[30px] mb-[10px] rounded"></div>
      <div className="w-[130px] h-[30px] bg-gray-300 ml-[30px] rounded"></div>
      <div className="w-[400px] h-[30px] bg-gray-300 ml-[30px] mt-[20px] rounded"></div>
      <div className="w-[540px] h-[40px] bg-gray-300 mt-[35px] mb-[30px] m-auto rounded"></div>
      <p className="border border-[#D9D9D9] w-[550px] m-auto rounded"></p>
      <div className="flex justify-center gap-[50px] mt-[30px] rounded">
        <div className="w-[250px] h-[50px] bg-gray-300 rounded"></div>
        <div className="w-[250px] h-[50px] bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
