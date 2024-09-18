export default function ProductCountHeader({
  keyword,
  count,
}: {
  keyword: string;
  count: number;
}) {
  return (
    <p className="text-lg font-bold text-left ml-[30px] mt-[30px] mb-[15px] flex">
      {keyword}
      <span className="ml-[5px] text-[#BEBEBE]">{count}</span>
    </p>
  );
}
