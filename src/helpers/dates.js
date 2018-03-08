import { formatDistanceStrict } from 'date-fns';

export function timestampDistance(timestamp) {
  const msTimestamp = timestamp * 1000;
  const date = new Date(msTimestamp);
  const now = new Date();

  return formatDistanceStrict(date, now, { addSuffix: true });
}
