interface Filter {
  text: string;
  name: string;
}

interface FilterBarProps {
  filters: Filter[]; // 필터 리스트
  selectedFilter: Filter; // 현재 선택된 필터
  onFilterSelect: (filter: Filter) => void; // 필터 선택 시 호출되는 함수
}

export default function FilterBar({
  filters,
  selectedFilter,
  onFilterSelect,
}: FilterBarProps) {
  return (
    <div className="flex justify-center">
      <ul className="flex justify-center gap-[45px] mt-[20px] mb-[40px] text-[23px] border-b-2 border-[#D9D9D9] w-[515px]">
        {filters.map((filter, index) => (
          <li key={index} className="relative">
            <button
              className={`${
                filter.text === selectedFilter.text ? "font-bold" : ""
              } pb-[14px]`}
              onClick={() => onFilterSelect(filter)}
            >
              {filter.text}
            </button>
            {filter.text === selectedFilter.text && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[177%] border-b-2 border-black -mb-[2px]"></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
