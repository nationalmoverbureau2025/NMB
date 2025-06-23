import { ReactNode } from 'react';

export const displayLabelsOrLoader = (
  value: boolean | null | undefined,
  isReportPending: boolean,
  onTrueValue: ReactNode,
  onFalseValue: ReactNode,
  onLoading: ReactNode
) => {
  if (value === null || value === undefined) {
    if (isReportPending) {
      return onLoading;
    }
    return onTrueValue;
  }
  if (!!value) {
    return onTrueValue;
  }
  return onFalseValue;
};
