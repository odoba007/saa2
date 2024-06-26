import React, { useEffect, useState } from "react";

const CountDown: React.FC<{ seconds: number; onComplete: () => void }> = ({
  seconds,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete && onComplete();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onComplete]);

  const formatTime = (time:number):string=>{
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return(
    <div>
        <p>Resend in {formatTime(timeLeft)}</p>
    </div>
  )
};

export default CountDown;