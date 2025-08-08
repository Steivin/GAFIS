export function Progress({ value = 0, className = "" }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full ${className}`}>
      <div
        className="bg-green-500 h-full rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
