import React from 'react';

export default function LocationModal({ isOpen, onClose, onSelect }) {
    const locations = ["서울특별시", "경산시", "대구시"];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 w-[90%] max-w-md">
                <h2 className="text-xl font-bold text-gray-700">지역 선택</h2>
                <ul className="space-y-2">
                    {locations.map(loc => (
                        <li
                            key={loc}
                            className="p-3 rounded-md hover:bg-gray-100 cursor-pointer text-gray-800"
                            onClick={() => {
                                onSelect(loc);
                                onClose();
                            }}
                        >
                            {loc}
                        </li>
                    ))}
                </ul>
                <button
                    className="w-full py-2 mt-4 bg-gray-200 hover:bg-gray-300 rounded-md"
                    onClick={onClose}
                >
                    닫기
                </button>
            </div>
        </div>
    );
}