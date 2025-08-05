import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  isToday,
} from 'date-fns';

export default function Calendar({ selectedDate, highlights = {}, onDayClick, onDayDoubleClick }) {
  const currentDate = selectedDate || new Date();
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const getHighlightIcon = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    if (highlights[dateKey] && highlights[dateKey] !== '') {
      if (
        highlights[dateKey] === '🌞' ||
        highlights[dateKey] === '🌙' ||
        highlights[dateKey] === '🌞🌙'
      ) {
        return highlights[dateKey];
      } else {
        return '🔔';
      }
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center text-green-600">
        {format(currentDate, 'MMMM yyyy').toUpperCase()}
      </h2>
      <div className="grid grid-cols-7 text-sm font-semibold text-gray-500 mb-2 text-center">
        <div>Dom</div>
        <div>Lun</div>
        <div>Mar</div>
        <div>Mié</div>
        <div>Jue</div>
        <div>Vie</div>
        <div>Sáb</div>
      </div>
      <div className="grid grid-cols-7 text-center text-sm gap-y-2">
        {Array(start.getDay())
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`}></div>
          ))}
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentDay = isToday(day);
          const highlight = getHighlightIcon(day);
          const dateKey = format(day, 'yyyy-MM-dd');

          return (
            <button
              key={day.toISOString()}
              onClick={() => onDayClick(dateKey)}
              onDoubleClick={() => onDayDoubleClick?.(dateKey)}
              className={`rounded-lg py-2 px-1 border hover:bg-green-100 transition-all ${
                isSelected
                  ? 'bg-green-600 text-white font-bold'
                  : isCurrentDay
                  ? 'border-green-400'
                  : 'border-transparent'
              }`}
            >
              <div>{format(day, 'd')}</div>
              {highlight && <div className="text-sm">{highlight}</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
