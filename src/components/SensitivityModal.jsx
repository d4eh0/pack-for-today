import { useState } from "react";

export default function SensitivityModal({ isOpen, onClose, onSave, initialValues }) {
    const [values, setValues] = useState({
        uv: initialValues?.uv ?? [2, 5, 8, 11],
        tempGap: initialValues?.tempGap ?? [6, 10, 15, 20],
    });

    if (!isOpen) return null;

    const handleChange = (type, i, delta) => {
        const updated = [...values[type]];
        updated[i] = Math.min(Math.max(0, updated[i] + delta), type === "uv" ? 11 : 30);
        setValues((prev) => ({ ...prev, [type]: updated }));
    };

    const labelColors = ["text-green-600", "text-yellow-500", "text-orange-500", "text-red-500"];

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 w-[90%] max-w-md">
                <h2 className="text-xl font-bold text-gray-700 text-center">민감도 단계 기준 설정</h2>

                {/* 🌞 자외선 */}
                <div>
                    <label className="text-gray-700 font-medium">자외선 단계 기준 (0 ~ 11)</label>
                    <div className="grid grid-cols-4 gap-2 mt-2 text-center">
                        {["좋음", "보통", "나쁨", "매우나쁨"].map((label, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span className={`text-sm mb-1 ${labelColors[i]}`}>{label}</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleChange("uv", i, -1)}
                                        className="px-2 py-1 rounded hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span>{values.uv[i]}</span>
                                    <button
                                        onClick={() => handleChange("uv", i, 1)}
                                        className="px-2 py-1 rounded hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🌡️ 일교차 */}
                <div>
                    <label className="text-gray-700 font-medium">일교차 단계 기준 (0 ~ 30)</label>
                    <div className="grid grid-cols-4 gap-2 mt-2 text-center">
                        {["낮음", "보통", "높음", "매우높음"].map((label, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span className={`text-sm mb-1 ${labelColors[i]}`}>{label}</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleChange("tempGap", i, -1)}
                                        className="px-2 py-1 rounded hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span>{values.tempGap[i]}</span>
                                    <button
                                        onClick={() => handleChange("tempGap", i, 1)}
                                        className="px-2 py-1 rounded hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 버튼 */}
                <div className="flex justify-between pt-4">
                    <button
                        className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button
                        className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                        onClick={() => {
                            const isAscending = (arr) =>
                                arr.every((val, i, array) => i === 0 || array[i - 1] <= val);

                            if (!isAscending(values.uv)) {
                                alert("자외선 단계 값은 '좋음 → 매우나쁨' 순으로 오름차순이어야 합니다.");
                                return;
                            }

                            if (!isAscending(values.tempGap)) {
                                alert("일교차 단계 값은 '낮음 → 매우높음' 순으로 오름차순이어야 합니다.");
                                return;
                            }

                            onSave(values);
                            onClose();
                        }}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}