import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const FireworkConfetti = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const fireworkConfetti = () => {
      const duration = 3 * 1000; // 3초
      const end = Date.now() + duration;

      const launchConfetti = () => {
        const now = Date.now();
        if (now >= end) return;

        confetti({
          particleCount: 10,
          angle: 180,
          spread: 500,
          origin: { x: 0.5, y: 1.1 },
          startVelocity: 150,
          scalar: 1,
          gravity: 1,
          disableForReducedMotion: true,
          useWorker: true,
          zIndex: 999,
        });

        requestAnimationFrame(launchConfetti);
      };

      launchConfetti();
    };

    fireworkConfetti();

    return () => {
      // Clean up confetti
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "screen",
          height: "screen",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          textAlign: "center",
          marginTop: "20px",
          color: "#fff",
        }}
      />
    </div>
  );
};

export default FireworkConfetti;
