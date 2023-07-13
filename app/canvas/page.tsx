"use client"

import React, {useRef, useState, useEffect} from 'react';

const defaultTemp = {lineSpace: 20, width: 400, height:200}
let scale       = 1;
let scaleFactor = 0.2;
let scrollX     = 0;
let scrollY     = 0;
export default function Canvas () {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [line, setLine] = useState(defaultTemp)

  // useEffect(() => {
  //   resetCanvas();
  // },[temp.lineSpace]);

    useEffect(() => {
      if(!canvasRef.current || !canvasRef.current) return;
      console.log("🚀 ~ file: page.tsx:12 ~ useEffect ~ lineSpace:", line.lineSpace)
      const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
      // clearCanvasRect(ctx);
      drawLines(ctx, line);
      // for(let i = 10; i< temp.height;i+=temp.lineSpace){
      //   ctx.moveTo(0,i);
      //   ctx.lineTo(canvasRef.current.width, i);
      //   ctx.stroke();
      // }
      // for(let i = 10; i< temp.width;i+=temp.lineSpace){
      //   ctx.moveTo(i,0);
      //   ctx.lineTo(i, canvasRef.current.width/2);
      //   ctx.stroke();
      // }
    },[canvasRef]);

    useEffect(() => {
      console.log("🚀 ~ file: page.tsx:35 ~ Canvas ~ temp:", line);
      if(!canvasRef.current || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
      drawLines(ctx, line);
    },[line]);
    
    
  
    const zoomIn = () => {
      // eraseCanvas();
      decreaseLineSpace();
    }

    const zoomOut = () => {
      // eraseCanvas();
      increaseLineSpace();
    }

    const increaseLineSpace = () => {
      // setLine((prev) => {return {
      //   lineSpace: prev.lineSpace * 2,
      //   width: prev.width /2,
      //   height: prev.height,
      // }})
      if(!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
      ctx.scale(scale, scale);

    }

    const decreaseLineSpace = () => {
      // setLine((prev) => {return {
      //   lineSpace: prev.lineSpace / 2,
      //   width: prev.width *2,
      //   height: prev.height,
      // }})
    }
    
    const resetCanvas = () => {
      eraseCanvas();
      setLine(defaultTemp)
      // if(!canvasRef.current) return;
      // const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
      // clearCanvasRect(ctx);
      // drawLines(ctx, {lineSpace: 20, width: 400, height:200});
    }

    const eraseCanvas = () => {
      if(!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
      ctx.reset();
      // clearCanvasRect(ctx);
    }

    const drawLines = (ctx: CanvasRenderingContext2D, {lineSpace, width, height}:{lineSpace:number; width:number; height:number;}) => {
      for(let i = 10; i< height;i+=lineSpace){
        ctx.moveTo(0,i);
        ctx.lineTo(ctx.canvas.width, i);
        ctx.stroke();
      }
      for(let i = 10; i< width;i+=lineSpace){
        ctx.moveTo(i,0);
        ctx.lineTo(i, ctx.canvas.width/2);
        ctx.stroke();
      }
    }
    const handleZoom = (e:React.WheelEvent<HTMLCanvasElement>) => {  
      let previousScale = scale;
      let direction = e.deltaY > 0 ? 1 : -1;
      scale += scaleFactor * direction;

      // calculate the new scroll values
      scrollX += ( e.clientX / previousScale )  - (e.clientX  / scale);
      scrollY += ( e.clientY / previousScale ) - ( e.clientY / scale);
      
      // apply new scale in a non acumulative way
      if(!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(scale, scale);
    }
    return (
      <div className='App'>
        <h1>Hello React.</h1>
        <h2>Start editing to see some magic happen!</h2>
        <div className='flex gap-5'>
          <button className='w-5 h-5 text-sm bg-gray-400' onClick={zoomIn} disabled={line.lineSpace===5}>+</button>
          <button className='w-5 h-5 text-sm bg-gray-400' onClick={zoomOut} disabled={line.lineSpace===80}>-</button>
          <button className='w-10 h-5 text-sm bg-gray-400' onClick={resetCanvas}>reset</button>
          <button className='w-10 h-5 text-sm bg-gray-400' onClick={eraseCanvas}>erase</button>
        </div>
        
        <canvas ref={canvasRef} width={400} height={200} style={{background: 'white', width: '400', height:'200' }} onWheel={handleZoom}>
          hello
        </canvas>
      </div>
    );
};

const clearCanvasRect = (ctx: CanvasRenderingContext2D) => {
  try{
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
  }
  catch(e){
    console.log("🚀 ~ file: page.tsx:84 ~ clearCanvasRect ~ e:", e)
  }
}