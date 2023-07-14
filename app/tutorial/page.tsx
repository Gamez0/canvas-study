'use client';

import React, { useEffect, useRef } from 'react';

export default function Tutorial() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getCanvas2DContext = () => {
    return canvasRef.current?.getContext('2d');
  };
  const drawLine = (c: CanvasRenderingContext2D | undefined | null) => {
    if (!c) return;
    c.beginPath();
    c.moveTo(50, 300);
    c.lineTo(300, 100);
    c.lineTo(400, 300);
    c.strokeStyle = '#fa34a3';
    c.stroke();
  };
  useEffect(() => {
    console.log(canvasRef.current?.width, canvasRef.current?.height);
    const c = getCanvas2DContext();
    if (!c) return;
    c.fillStyle = 'rgba(255,0,0,0.5)';
    c?.fillRect(100, 100, 100, 100);
    c?.fillRect(400, 100, 100, 100);
    c?.fillRect(300, 300, 100, 100);
    drawLine(c);
  }, [canvasRef.current]);

  return (
    <div className="flex w-full h-screen text-black bg-white">
      <canvas
        ref={canvasRef}
        className="border border-black"
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </div>
  );
}
