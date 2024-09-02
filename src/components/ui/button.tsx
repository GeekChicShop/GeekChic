interface ButtonProps {
  text: string;
  onClick?: () => void; // 클릭 핸들러는 선택적
  padding?: string; // Optional padding prop
  isLoading?: boolean;
  disabled?: boolean;
  className?: string; // 추가적인 클래스 이름을 받아 스타일링을 유연하게
  type?: "button" | "submit" | "reset"; // 버튼 타입 지정 (기본값은 'button')
}

export default function Button({
  text,
  onClick,
  isLoading = false,
  disabled = false,
  padding = "py-3",
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${padding} ${className} rounded-md duration-200`}
    >
      {isLoading ? "uploading..." : text}
    </button>
  );
}
