import nodeLogo from "./assets/node.svg";
import { useState, useRef, useEffect } from "react";
import Update from "@/components/update";
import { ipcRenderer } from "electron";
import "./output.css";

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

function App() {
  const previousContent = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const addText = (text: string) => {
    if (!previousContent.current) return;
    const p = document.createElement("p");
    p.innerText = "HBase> " + text;
    previousContent.current.appendChild(p);
  };

  function handleEnter() {
    if (!input.current || !previousContent.current) return;
    const value = input.current.value;
    ipcRenderer.send("command", value);
    input.current.value = "";
    // console.log(input.current.value);
  }

  function addEnterEventListener() {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        handleEnter();
      }
    });
  }

  useEffect(() => {
    addEnterEventListener();

    const removePrintMessageListener = ipcRenderer.on("commandResponse",(event,message)=>{
      if(message === "clear"){
        previousContent.current!.innerHTML = "";
        return;
      }
      addText(message)
    })
      


    return () => {
      document.removeEventListener("keydown", handleEnter);
      // remove the printMessage listener
      // removePrintMessageListener();
    };
  }, [addText]);

  return (
    <div className="App relative h-full w-full bg-black flex flex-col justify-center items-center">
      <div className="center absolute left-1/2 " />
      <div className="h-full w-full  rounded-lg overflow-y-scroll overflow-x-hidden ">
        <div className="PreviousOutput text-white" ref={previousContent}></div>
        <div className="Current flex flex-row">
          <span className="text-white">HBase {">"} </span>
          <input
            className="text-white bg-transparent
              outline-none
              border-none
              w-3/4  
              "
            type="text"
            ref={input}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
