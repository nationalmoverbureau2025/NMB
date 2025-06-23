export const ReviewTimelineChart = ({
  timeline,
}: {
  timeline: { date: string; count: number }[];
}) => {
  if (!timeline || timeline.length === 0) return null;

  const maxCount = Math.max(...timeline.map((item) => item.count));

  return (
    <div className="flex items-end gap-3 h-64">
      {timeline.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <div className="text-sm font-medium text-gray-900">{item.count}</div>
          <div className="w-4 bg-gray-200 rounded-full flex-1 overflow-hidden flex flex-col-reverse">
            <div
              className="w-4 bg-blue-500 transition-all duration-500"
              style={{ height: `${(item.count / maxCount) * 200}px` }}
            />
          </div>
          <div className="w-20 text-sm text-gray-600 text-center">
            {item.date}
          </div>
        </div>
      ))}
    </div>
  );
};
