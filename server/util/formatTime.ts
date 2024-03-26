export default function formatTime(time: number): string {
  const date = new Date(time * 1000);
  const formattedTime = date.toLocaleTimeString('en-US', {
    timeZone: 'America/New_York',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return formattedTime;
}
