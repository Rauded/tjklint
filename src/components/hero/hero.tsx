import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Main container for the hero section
const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 100px;
  background-color: #09090b;
  color: #fff;
  overflow: hidden;
  font-family: 'RobotoMono', sans-serif;
  position: relative;

  @media (max-width: 768px) {
    padding-top: 90px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at 20% 60%, rgba(99, 102, 241, 0.07) 0%, transparent 55%);
    pointer-events: none;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  text-align: left;
  margin-top: -10%;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 24px;
    margin-top: 0;
  }

  @media (min-width: 768px) {
    flex: 0 0 40%;
    padding: 60px 40px;
  }
`;

const Headline = styled.h1`
  font-size: 1.25em;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5em;
  letter-spacing: 0.05em;
  line-height: 1.6;
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: 1.5em;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 40vh;

  @media (min-width: 768px) {
    flex: 0 0 60%;
    min-height: auto;
  }
`;

// Terminal window — realistic macOS-style
const TerminalWindow = styled.div`
  width: 90%;
  max-width: 700px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: #1a1a2e;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const TerminalBar = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(180deg, #2d2d3f 0%, #252537 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  position: relative;
`;

const TrafficLights = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

const TrafficDot = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  box-shadow: inset 0 -1px 2px rgba(0, 0, 0, 0.2);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 3px;
    width: 5px;
    height: 3px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const TerminalTabBar = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0;
`;

const TerminalTab = styled.div`
  font-family: 'RobotoMono', sans-serif;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.04em;
  padding: 4px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const TerminalBody = styled.div`
  padding: 0;
  background: #0d0d1a;
  position: relative;
  overflow: hidden;
`;

// TARS patrol animation inside the terminal
const patrolAnimation = keyframes`
  0% { transform: translateX(0%) scaleX(-1); }
  2.5% { transform: translateX(0%) scaleX(-1); }
  22.5% { transform: translateX(-12%) scaleX(-1); }
  27.5% { transform: translateX(-12%) scaleX(-1); }
  27.6% { transform: translateX(-12%) scaleX(1); }
  32.5% { transform: translateX(-12%) scaleX(1); }
  72.5% { transform: translateX(12%) scaleX(1); }
  77.5% { transform: translateX(12%) scaleX(1); }
  77.6% { transform: translateX(12%) scaleX(-1); }
  82.5% { transform: translateX(12%) scaleX(-1); }
  97.5% { transform: translateX(0%) scaleX(-1); }
  100% { transform: translateX(0%) scaleX(-1); }
`;

const TarsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  animation: ${patrolAnimation} 24s linear infinite;
  will-change: transform;
`;

const TarsImage = styled.img`
  width: 100%;
  display: block;
  filter: grayscale(20%) contrast(1.1);
`;

const TerminalStatusBar = styled.div`
  padding: 4px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, #1e1e30 0%, #1a1a2e 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.04);
`;

const StatusText = styled.span`
  font-family: 'RobotoMono', sans-serif;
  font-size: 0.55rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #4ade80;
  margin-right: 6px;
  box-shadow: 0 0 4px rgba(74, 222, 128, 0.4);
`;

const GradientText = styled.h2`
  color: #f8fafc;
  font-size: clamp(2.5em, 8vw, 5em);
  font-weight: 700;
  margin: 0.3em 0;
  letter-spacing: -0.03em;
  line-height: 1.05;

  @media (min-width: 768px) {
    font-size: clamp(3.5em, 6vw, 5.5em);
  }
`;

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const TypewriterText = styled.div`
  color: #a5b4fc;
  font-size: clamp(1.1em, 3vw, 1.75em);
  margin-top: 1em;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 400;
  letter-spacing: 0.01em;

  &::after {
    content: '_';
    animation: ${blink} 1s infinite;
    color: #6366f1;
    font-weight: 300;
  }
`;

const topLines = [
  "Ahoj! Vitaj na mojom portfóliu.",
  "Hey! Thanks for dropping by.",
];

const typewriterTexts = [
  "AI Developer @ OneBond",
  "AI Developer @ CZS / Masaryk University",
  "AI Developer @ iGalileo",
  "Think Tank @ EDUC Alliance",
  "CS Student @ Masaryk University",
  "Python & LangChain Developer",
  "Building AI agents & RAG pipelines",
  "Hackathon Fanatic",
  "AI Enthusiast"
];

const Hero: React.FC = () => {
  const [topLine, setTopLine] = useState('');
  const [currentText, setCurrentText] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setTopLine(topLines[Math.floor(Math.random() * topLines.length)]);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    let i = 0;
    let textPos = 0;
    let currentString = typewriterTexts[i];
    const speed = 100;
    const deleteSpeed = 50;
    const waitTime = 2000;

    function type() {
      if (!isMounted) return;
      setCurrentText(currentString.substring(0, textPos));
      if (textPos++ === currentString.length) {
        timeoutId = setTimeout(() => deleteText(), waitTime);
      } else {
        timeoutId = setTimeout(type, speed);
      }
    }

    function deleteText() {
      if (!isMounted) return;
      setCurrentText(currentString.substring(0, textPos));
      if (textPos-- === 0) {
        i = (i + 1) % typewriterTexts.length;
        currentString = typewriterTexts[i];
        timeoutId = setTimeout(type, speed);
      } else {
        timeoutId = setTimeout(deleteText, deleteSpeed);
      }
    }

    type();
    return () => { isMounted = false; clearTimeout(timeoutId); };
  }, []);

  return (
    <HeroContainer>
      <LeftContainer>
        <Headline>{topLine}</Headline>
        <GradientText>I'm Eduard Hvižďák.</GradientText>
        <TypewriterText>&gt; {currentText}</TypewriterText>
      </LeftContainer>
      <RightContainer>
        <TerminalWindow>
          <TerminalBar>
            <TrafficLights>
              <TrafficDot color="#ff5f57" />
              <TrafficDot color="#febc2e" />
              <TrafficDot color="#28c840" />
            </TrafficLights>
            <TerminalTabBar>
              <TerminalTab>TARS — patrol module</TerminalTab>
            </TerminalTabBar>
          </TerminalBar>
          <TerminalBody>
            <TarsContainer>
              <TarsImage
                src={`${process.env.PUBLIC_URL}/ascii_monochrome.gif`}
                alt="TARS walking ASCII art"
              />
            </TarsContainer>
          </TerminalBody>
          <TerminalStatusBar>
            <StatusText><StatusDot />active</StatusText>
            <StatusText>patrol module v2.0</StatusText>
          </TerminalStatusBar>
        </TerminalWindow>
      </RightContainer>
    </HeroContainer>
  );
};

export default Hero;
