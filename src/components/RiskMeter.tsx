import { InlineSpinner } from './InlineSpinner';

export const RiskMeter = ({
  score,
  isReportPending,
}: {
  isReportPending: boolean;
  score?: number;
}) => {
  const percentage = score || 0;
  const getColor = () => {
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };
  const getBgColor = () => {
    if (percentage >= 70) return 'bg-green-100';
    if (percentage >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Risk Level</span>
        <span className={`text-sm font-bold ${getColor()}`}>
          {score ? (
            `${score}/100`
          ) : isReportPending ? (
            <InlineSpinner />
          ) : (
            '0/100'
          )}
        </span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getBgColor()} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>High Risk</span>
        <span>Moderate</span>
        <span>Safe</span>
      </div>
    </div>
  );
};
