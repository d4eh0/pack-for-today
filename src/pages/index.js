import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SignalCard from '../components/SignalCard';

export default function Home() {
  const [weather, setWeather] = useState(null); // 초기 날씨데이터는 null
    const router = useRouter(); // ✅ 라우터 초기화


    // 컴포넌트 처음 로드될 때의 위치 + API호출
  useEffect(()=> {
    // 브라우저 내장 API
    // 사용자 위치를 비동기적으로 가져옴.
    // 사용자 허용 필요(브라우저 팝업 뜸)
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords; 
        // coords는 getCurrentPostion() 호출결과로 나오는 위치정보 객체안의 속성
        // 이외에도 accuracy, altitude, speed, heading등이 있음.
        // 즉, coords는 위치 정보들이 담긴 객체.
        
        const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
        // fetch는 브라우저 내장함수, 네트워크 요청을보냄 (기본은 GET요청인데, 여기선 /api/weather 라우트에 요청)
        // fetch는 비동기 -> promise반환. await를 붙이면 응답올때까지 기다림.
        // res는 api 응답의 전체. (Response 객체), 아직 데이터는 아닌 그냥 응답 그 자체. 그 다음 .json()같은 걸로 실제 데이터 꺼냄.

        const data = await res.json();
        // .json()은 응답받은 것을 JSON으로 파싱하여 JS객체로 바꿔줌.
        // await를 붙여 파싱이 끝날때까지 기다림.
        setWeather(data);
      });
  }, []); // [] : 컴포넌트가 마운트 될때 딱 한번만 실행
  // 마운트란. 컴포넌트가 화면에 처음 나타날때.

  if (!weather) return <div className="p-8">⏳ 날씨 정보를 불러오는 중...</div>

  return (
    <main className="p-8 space-y-4">
      <h1
          className="text-2xl font-bold mb-4"
          onClick={() => router.push('./Main')}>오늘 뭐챙겨?</h1>

      <SignalCard
        title="미세먼지"
        level={weather.dust > 75 ? 'danger' : weather.dust > 35 ? 'warning' : 'good'}
        description={`현재 미세먼지 농도: ${weather.dust}`}
      />

      <SignalCard
        title="자외선"
        level={weather.uv > 7 ? 'danger' : weather.uv > 4 ? 'warning' : 'good'}
        description={`현재 자외선 지수: ${weather.uv}`}
      />

      <SignalCard
        title="강수확률"
        level={weather.rain > 60 ? 'danger' : weather.rain > 30 ? 'warning' : 'good'}
        description={`오늘 강수확률: ${weather.rain}%`}
      />

      <SignalCard
        title="일교차"
        level={weather.tempDiff > 10 ? 'warning' : 'good'}
        description={`오늘 일교차: ${weather.tempDiff}°C`}
      />
    </main>
  );
}
