"use client";

import { useEffect, useRef, useState } from "react";
import DrawLandmarkCanvas from "./DrawLandmarkCanvas";
import AvatarCanvas from "./AvatarCanvas";
import FaceLandmarkManager from "@/class/FaceLandmarkManager";
import ReadyPlayerCreator from "./ReadyPlayerCreator";

const FaceLandmarkCanvas = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef(0);
  const [avatarView, setAvatarView] = useState(true);
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);
  const [modelUrl, setModelUrl] = useState(
    "https://models.readyplayer.me/6460691aa35b2e5b7106734d.glb?morphTargets=ARKit"
  );

  const toggleAvatarView = () => setAvatarView((prev) => !prev);

  const handleAvatarCreationComplete = (url: string) => {
    setModelUrl(url);
  };

  const animate = () => {
    if (
      videoRef.current &&
      videoRef.current.currentTime !== lastVideoTimeRef.current
    ) {
      lastVideoTimeRef.current = videoRef.current.currentTime;
      try {
        const faceLandmarkManager = FaceLandmarkManager.getInstance();
        faceLandmarkManager.detectLandmarks(videoRef.current, Date.now());
      } catch (e) {
        console.log(e);
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const getUserCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current!.play();
            requestRef.current = requestAnimationFrame(animate);
          };
        }
      } catch (e) {
        console.log(e);
        alert("Failed to load webcam!");
      }
    };
    getUserCamera();

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <video
        className="absolute w-full h-full object-cover"
        ref={videoRef}
        loop={true}
        muted={true}
        autoPlay={true}
        playsInline={true}
      ></video>
      <div className="flex justify-center items-center w-screen h-screen overflow-hidden">
        {avatarView ? (
          <AvatarCanvas
            width={window.innerWidth * 1.4} // Adjust size multiplier as needed
            height={window.innerHeight * 1.4}
            url={modelUrl}
          />
        ) : (
          <DrawLandmarkCanvas
            width={window.innerWidth}
            height={window.innerHeight}
          />
        )}
      </div>


    </div>
  );
};

export default FaceLandmarkCanvas;