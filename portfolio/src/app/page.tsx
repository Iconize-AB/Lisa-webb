'use client';

import NeonButton from "../components/NeonButton";
import Header from "./Header";
import ProjectScroll from "../components/ProjectScroll";

export default function Home(): JSX.Element {
  return (
    <>
      <Header/>
      <main className="min-h-screen flex flex-col items-center justify-center bg-black ">
        
        <ProjectScroll />
      </main>
    </>
  );
} 