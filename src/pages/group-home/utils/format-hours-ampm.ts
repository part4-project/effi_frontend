export const formatHoursAmPm = (dateString: string) => {
  // ISO 형식의 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 시각과 분을 가져오기
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // AM/PM 포맷 결정
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // 12시간 형식으로 변환
  const formattedHours = hours % 12 || 12; // 0시를 12시로 표현
  const formattedMinutes = minutes.toString().padStart(2, '0'); // 분이 한 자리 숫자일 경우 앞에 0 추가

  // 최종 포맷 설정
  const formattedTime = `${ampm} ${formattedHours}:${formattedMinutes}`;

  return formattedTime;
};
