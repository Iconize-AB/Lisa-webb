'use client';

import { useState, useEffect } from 'react';
import Header from "./Header";
import StackingCards from "../components/StackingCards";
import styled from 'styled-components';
import Image from 'next/image';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <LogoWrapper>
            <Image
              src="/LISA_logotype.png"
              alt="LISA STUDIOS"
              width={150}
              height={45}
              priority
            />
          </LogoWrapper>
        </LoadingContainer>
      ) : null}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <Header/>
        <main className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden max-w-screen">
          <StackingCards />
        </main>
      </div>
    </>
  );
}

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LogoWrapper = styled.div`
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`; 