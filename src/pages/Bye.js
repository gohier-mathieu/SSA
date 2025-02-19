import { useState, useEffect } from "react";
import "./../styles/Bye.css";

export default function Bye() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <img src="/img/img/1000001189.jpg" alt="Background" className="background-image" />
      <div className="text-container">
        <p className={`blink-text ${visible ? 'visible' : 'hidden'}`}>BYE-BYE</p>
      </div>
    </div>
  );
}
