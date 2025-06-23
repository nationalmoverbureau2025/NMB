import { InlineSpinner } from '../components/InlineSpinner';

export const displayValueOrLoader = (
  value: string | number | null | undefined,
  isReportPending: boolean
) =>
  value !== null && value !== undefined ? (
    value
  ) : isReportPending ? (
    <InlineSpinner />
  ) : (
    'N/A'
  );
