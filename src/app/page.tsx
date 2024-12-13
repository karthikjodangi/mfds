"use client";

import Head from "next/head";
import dynamic from "next/dynamic";

// Use dynamic loading to fix document undefined error
const FaceLandmarkCanvas = dynamic(
  () => {
    return import("../components/FaceLandmarkCanvas");
  },
  { ssr: false }
);

export default function Home() {
  return (
    <div className="flex flex-col items-center px-2 pt-10 bg-gradient-to-r from-green-400 to-teal-700 min-h-screen text-white">
      <Head>
        <title>Mediapie FaceLandmarker Demo</title>
        <meta
          name="description"
          content="A demo application showcasing Mediapie FaceLandmarker's real-time facial landmark and blendshape score estimation."
        />
        <meta
          name="keywords"
          content="Mediapie, FaceLandmarker, AR Filter, ReadyPlayerMe, Facial landmarks, tensorflow-js"
        />
      </Head>
      <h1 className="text-xl md:text-4xl font-bold mb-2 text-shadow text-center">
        Generalizable Expression Transfer From Human to Rigged 3D Avatars
      </h1>
      <p className="mt-4 mb-4 text-center px-4 md:text-lg text-sm">
        An input image undergoes Mediapipe keypoints detection, control point conversion, 
        and inverse kinematics, generating rig parameters to produce a deformed 3D mesh.
      </p>
      <div className="flex justify-center w-full">
        <FaceLandmarkCanvas />
      </div>
    </div>
  );
}
