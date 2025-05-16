// 재사용 UI 컴포넌트, 신호등처럼 색상바뀌는 UI.
// props로 제목, 수치, 설명을 받아 동적으로 표시하기 위함.

export default function SignalCard({ title, level, description }) {
    const colorMap = {
      good: "bg-green-300", // tailwind 색상 클래스
      warning: "bg-yellow-300",
      danger: "bg-red-400",
    };
  
    return (
      // 템플릿 리터럴 문법
      <div className={`p-4 rounded-xl shadow-md text-gray-600 ${colorMap[level]}`}>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    );
  }