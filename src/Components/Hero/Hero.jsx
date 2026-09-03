import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Hero.scss";
import TypeAnimation from "react-type-animation";

export default function Hero({ sceneMode }) {
  const [gameOpen, setGameOpen] = useState(false);
  const [gameStatus, setGameStatus] = useState("idle");
  const [playerX, setPlayerX] = useState(50);
  const [meteors, setMeteors] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const storedScore = Number(window.localStorage.getItem("meteorHighScore"));
    return Number.isFinite(storedScore) ? storedScore : 0;
  });
  const animationFrameRef = useRef(null);
  const lastFrameRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const keysRef = useRef({ left: false, right: false });
  const playerXRef = useRef(50);
  const scoreRef = useRef(0);
  const gameStatusRef = useRef(gameStatus);

  const startGame = useCallback(() => {
    setGameOpen(true);
    setGameStatus("playing");
    gameStatusRef.current = "playing";
    setPlayerX(50);
    playerXRef.current = 50;
    setMeteors([
      {
        id: `opening-${Date.now()}`,
        x: 28 + Math.random() * 44,
        y: -10,
        size: 3.2,
        spin: 0,
        spinSpeed: 130,
      },
    ]);
    setScore(0);
    scoreRef.current = 0;
    spawnTimerRef.current = 0;
    lastFrameRef.current = 0;
  }, []);

  const endGame = useCallback((finalScore) => {
    setGameStatus("gameover");
    gameStatusRef.current = "gameover";
    setHighScore((currentHighScore) => {
      const nextHighScore = Math.max(currentHighScore, finalScore);
      window.localStorage.setItem("meteorHighScore", String(nextHighScore));
      return nextHighScore;
    });
  }, []);

  const closeGame = useCallback(() => {
    setGameOpen(false);
    setGameStatus("idle");
    gameStatusRef.current = "idle";
    setMeteors([]);
    setScore(0);
    scoreRef.current = 0;
    keysRef.current = { left: false, right: false };
  }, []);

  const handleHeroClick = (event) => {
    if (event.target.closest("a, button")) {
      return;
    }

    startGame();
  };

  const handleHeroKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startGame();
    }
  };

  const movePlayerToPointer = (clientX) => {
    const nextX = Math.max(8, Math.min(92, (clientX / window.innerWidth) * 100));
    playerXRef.current = nextX;
    setPlayerX(nextX);
  };

  useEffect(() => {
    gameStatusRef.current = gameStatus;
  }, [gameStatus]);

  useEffect(() => {
    document.body.classList.toggle("meteor-game-active", gameOpen);

    return () => {
      document.body.classList.remove("meteor-game-active");
    };
  }, [gameOpen]);

  useEffect(() => {
    if (!gameOpen || gameStatus !== "playing") {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        keysRef.current.left = true;
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        keysRef.current.right = true;
      }

      if (event.key === "Escape") {
        closeGame();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        keysRef.current.left = false;
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        keysRef.current.right = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [closeGame, gameOpen, gameStatus]);

  useEffect(() => {
    if (!gameOpen || gameStatus !== "playing") {
      return undefined;
    }

    const runFrame = (timestamp) => {
      if (gameStatusRef.current !== "playing") {
        return;
      }

      const delta = Math.min((timestamp - (lastFrameRef.current || timestamp)) / 1000, 0.04);
      lastFrameRef.current = timestamp;
      spawnTimerRef.current += delta;

      if (keysRef.current.left || keysRef.current.right) {
        const direction = Number(keysRef.current.right) - Number(keysRef.current.left);
        const nextX = Math.max(8, Math.min(92, playerXRef.current + direction * delta * 42));
        playerXRef.current = nextX;
        setPlayerX(nextX);
      }

      const scoreIncrement = Math.max(1, Math.round(delta * 60));
      const nextScore = scoreRef.current + scoreIncrement;
      scoreRef.current = nextScore;
      setScore(nextScore);

      setMeteors((currentMeteors) => {
        const speed = 24 + Math.min(32, nextScore / 120);
        let nextMeteors = currentMeteors
          .map((meteor) => ({
            ...meteor,
            y: meteor.y + speed * delta,
            spin: meteor.spin + meteor.spinSpeed * delta,
          }))
          .filter((meteor) => meteor.y < 112);

        if (spawnTimerRef.current > Math.max(0.32, 0.85 - nextScore / 25000)) {
          spawnTimerRef.current = 0;
          nextMeteors = [
            ...nextMeteors,
            {
              id: `${timestamp}-${Math.random()}`,
              x: 8 + Math.random() * 84,
              y: -12,
              size: 2.4 + Math.random() * 2.4,
              spin: 0,
              spinSpeed: 90 + Math.random() * 160,
            },
          ];
        }

        const playerY = 86;
        const hitMeteor = nextMeteors.some((meteor) => {
          const xDistance = Math.abs(meteor.x - playerXRef.current);
          const yDistance = Math.abs(meteor.y - playerY);
          return xDistance < meteor.size * 0.85 + 3.2 && yDistance < meteor.size * 0.85 + 4.5;
        });

        if (hitMeteor) {
          endGame(scoreRef.current);
        }

        return nextMeteors;
      });

      animationFrameRef.current = window.requestAnimationFrame(runFrame);
    };

    animationFrameRef.current = window.requestAnimationFrame(runFrame);

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, [endGame, gameOpen, gameStatus]);

  return (
    <div
      className={`hero hero--${sceneMode}${gameOpen ? " hero--game-open" : ""}`}
      id="home"
      onClick={handleHeroClick}
      onKeyDown={handleHeroKeyDown}
      role="button"
      tabIndex="0"
      aria-label="Open a hidden meteor dodging game"
    >
      <div className="hero__stars" aria-hidden="true"></div>
      <div className="sun" aria-hidden="true"></div>
      <div className="cloud"></div>
      <h1 className="hero__title">
        {" "}
        <TypeAnimation
          cursor={true}
          sequence={[
            "Hi! I am Steven.",
            1000,
            "I build web systems for local businesses.",
          ]}
        />
      </h1>{" "}
      <p className="hero__subtitle">
        I help clinics and service teams turn websites, forms, bookings, and
        back-office workflows into tools that feel clear and dependable.
      </p>
      <div className="hero__emoji slide-up">🙋🏻‍♂️</div>
      {gameOpen && (
        <div
          className="meteor-game"
          role="dialog"
          aria-modal="true"
          aria-label="Dodge the meteors"
          onClick={(event) => event.stopPropagation()}
          onPointerMove={(event) => movePlayerToPointer(event.clientX)}
          onPointerDown={(event) => movePlayerToPointer(event.clientX)}
        >
          <div className="meteor-game__hud">
            <div>
              <p className="meteor-game__label">Score</p>
              <p className="meteor-game__value">{score}</p>
            </div>
            <div>
              <p className="meteor-game__label">Best</p>
              <p className="meteor-game__value">{highScore}</p>
            </div>
            <button className="meteor-game__close" type="button" onClick={closeGame}>
              Exit
            </button>
          </div>
          <div className="meteor-game__stars" aria-hidden="true"></div>
          {meteors.map((meteor) => (
            <span
              className="meteor-game__meteor"
              key={meteor.id}
              style={{
                left: `${meteor.x}%`,
                top: `${meteor.y}%`,
                width: `${meteor.size}rem`,
                height: `${meteor.size}rem`,
                transform: `translate(-50%, -50%) rotate(${meteor.spin}deg)`,
              }}
              aria-hidden="true"
            />
          ))}
          <div
            className="meteor-game__player"
            style={{ left: `${playerX}%` }}
            aria-hidden="true"
          >
            🙋🏻‍♂️
          </div>
          <div className="meteor-game__instructions">
            Move left and right. Dodge the meteors.
          </div>
          {gameStatus === "gameover" && (
            <div className="meteor-game__panel">
              <h2 className="meteor-game__title">Nice run</h2>
              <p className="meteor-game__summary">Score {score}</p>
              <button className="meteor-game__restart" type="button" onClick={startGame}>
                Play again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
