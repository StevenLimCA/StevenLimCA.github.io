import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Hero.scss";
import TypeAnimation from "react-type-animation";

const wrapPosition = (value) => {
  if (value < -8) {
    return 108;
  }

  if (value > 108) {
    return -8;
  }

  return value;
};

const getDistance = (first, second) =>
  Math.hypot(first.x - second.x, first.y - second.y);

const createAsteroid = (level, size = 5.8) => {
  const fromHorizontalEdge = Math.random() > 0.5;
  const edgePosition = Math.random() > 0.5 ? -6 : 106;
  const speed = 4 + level * 0.9 + Math.random() * 3;

  return {
    id: `${Date.now()}-${Math.random()}`,
    x: fromHorizontalEdge ? edgePosition : Math.random() * 100,
    y: fromHorizontalEdge ? Math.random() * 100 : edgePosition,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    size,
    spin: Math.random() * 360,
    spinSpeed: 18 + Math.random() * 54,
  };
};

export default function Hero({ sceneMode }) {
  const [gameOpen, setGameOpen] = useState(false);
  const [gameStatus, setGameStatus] = useState("idle");
  const [ship, setShip] = useState({ x: 50, y: 72, angle: -90 });
  const [asteroids, setAsteroids] = useState([]);
  const [shots, setShots] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(() => {
    const storedScore = Number(window.localStorage.getItem("asteroidsHighScore"));
    return Number.isFinite(storedScore) ? Math.floor(storedScore) : 0;
  });
  const animationFrameRef = useRef(null);
  const lastFrameRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const shotTimerRef = useRef(0);
  const keysRef = useRef({ left: false, right: false, thrust: false, fire: false });
  const pointerRef = useRef({ active: false, x: 50, y: 72 });
  const shipRef = useRef({ x: 50, y: 72, vx: 0, vy: 0, angle: -90 });
  const asteroidsRef = useRef([]);
  const shotsRef = useRef([]);
  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const gameStatusRef = useRef(gameStatus);

  const startGame = useCallback(() => {
    setGameOpen(true);
    setGameStatus("playing");
    gameStatusRef.current = "playing";
    const startingShip = { x: 50, y: 72, vx: 0, vy: 0, angle: -90 };
    const startingAsteroids = [createAsteroid(1), createAsteroid(1), createAsteroid(1, 4.6)];
    shipRef.current = startingShip;
    asteroidsRef.current = startingAsteroids;
    shotsRef.current = [];
    setShip({ x: startingShip.x, y: startingShip.y, angle: startingShip.angle });
    setAsteroids(startingAsteroids);
    setShots([]);
    setScore(0);
    setLevel(1);
    scoreRef.current = 0;
    levelRef.current = 1;
    spawnTimerRef.current = 0;
    shotTimerRef.current = 0;
    lastFrameRef.current = 0;
  }, []);

  const endGame = useCallback((finalScore) => {
    const roundedFinalScore = Math.floor(finalScore);
    setGameStatus("gameover");
    gameStatusRef.current = "gameover";
    setHighScore((currentHighScore) => {
      const nextHighScore = Math.max(currentHighScore, roundedFinalScore);
      window.localStorage.setItem("asteroidsHighScore", String(nextHighScore));
      return nextHighScore;
    });
  }, []);

  const closeGame = useCallback(() => {
    setGameOpen(false);
    setGameStatus("idle");
    gameStatusRef.current = "idle";
    asteroidsRef.current = [];
    shotsRef.current = [];
    setAsteroids([]);
    setShots([]);
    setScore(0);
    setLevel(1);
    scoreRef.current = 0;
    levelRef.current = 1;
    keysRef.current = { left: false, right: false, thrust: false, fire: false };
    pointerRef.current.active = false;
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

  const fireShot = useCallback(() => {
    const currentShip = shipRef.current;
    const angleRadians = (currentShip.angle * Math.PI) / 180;
    const nextShots = [
      ...shotsRef.current.slice(-7),
      {
        id: `${Date.now()}-${Math.random()}`,
        x: currentShip.x + Math.cos(angleRadians) * 3.2,
        y: currentShip.y + Math.sin(angleRadians) * 3.2,
        vx: currentShip.vx + Math.cos(angleRadians) * 42,
        vy: currentShip.vy + Math.sin(angleRadians) * 42,
        age: 0,
      },
    ];
    shotsRef.current = nextShots;
    setShots(nextShots);
  }, []);

  const updatePointer = (event, shouldFire = false) => {
    const nextPointer = {
      active: true,
      x: Math.max(3, Math.min(97, (event.clientX / window.innerWidth) * 100)),
      y: Math.max(8, Math.min(92, (event.clientY / window.innerHeight) * 100)),
    };

    pointerRef.current = nextPointer;

    if (shouldFire) {
      fireShot();
    }
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
      const key = event.key.toLowerCase();

      if (event.key === "ArrowLeft" || key === "a") {
        keysRef.current.left = true;
      }

      if (event.key === "ArrowRight" || key === "d") {
        keysRef.current.right = true;
      }

      if (event.key === "ArrowUp" || key === "w") {
        keysRef.current.thrust = true;
      }

      if (event.key === " " || key === "spacebar") {
        event.preventDefault();
        keysRef.current.fire = true;
      }

      if (event.key === "Escape") {
        closeGame();
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();

      if (event.key === "ArrowLeft" || key === "a") {
        keysRef.current.left = false;
      }

      if (event.key === "ArrowRight" || key === "d") {
        keysRef.current.right = false;
      }

      if (event.key === "ArrowUp" || key === "w") {
        keysRef.current.thrust = false;
      }

      if (event.key === " " || key === "spacebar") {
        keysRef.current.fire = false;
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
      shotTimerRef.current += delta;

      const nextLevel = Math.floor(scoreRef.current / 320) + 1;
      if (nextLevel !== levelRef.current) {
        levelRef.current = nextLevel;
        setLevel(nextLevel);
      }

      const currentShip = { ...shipRef.current };
      const turning = Number(keysRef.current.right) - Number(keysRef.current.left);
      currentShip.angle += turning * 210 * delta;

      if (pointerRef.current.active) {
        const targetAngle =
          (Math.atan2(pointerRef.current.y - currentShip.y, pointerRef.current.x - currentShip.x) *
            180) /
          Math.PI;
        const angleDifference = ((((targetAngle - currentShip.angle) % 360) + 540) % 360) - 180;
        currentShip.angle += angleDifference * Math.min(1, delta * 8);
        currentShip.vx += (pointerRef.current.x - currentShip.x) * delta * 0.85;
        currentShip.vy += (pointerRef.current.y - currentShip.y) * delta * 0.85;
      }

      if (keysRef.current.thrust) {
        const angleRadians = (currentShip.angle * Math.PI) / 180;
        currentShip.vx += Math.cos(angleRadians) * 28 * delta;
        currentShip.vy += Math.sin(angleRadians) * 28 * delta;
      }

      currentShip.vx *= 0.992;
      currentShip.vy *= 0.992;
      currentShip.x = wrapPosition(currentShip.x + currentShip.vx * delta);
      currentShip.y = wrapPosition(currentShip.y + currentShip.vy * delta);
      shipRef.current = currentShip;
      setShip({ x: currentShip.x, y: currentShip.y, angle: currentShip.angle });

      if (keysRef.current.fire && shotTimerRef.current > 0.18) {
        shotTimerRef.current = 0;
        fireShot();
      }

      let nextShots = shotsRef.current
        .map((shot) => ({
          ...shot,
          x: wrapPosition(shot.x + shot.vx * delta),
          y: wrapPosition(shot.y + shot.vy * delta),
          age: shot.age + delta,
        }))
        .filter((shot) => shot.age < 1.55);

      const nextScore = scoreRef.current + delta * (5 + levelRef.current);
      scoreRef.current = nextScore;
      setScore(Math.floor(nextScore));

      let nextAsteroids = asteroidsRef.current.map((asteroid) => ({
        ...asteroid,
        x: wrapPosition(asteroid.x + asteroid.vx * delta),
        y: wrapPosition(asteroid.y + asteroid.vy * delta),
        spin: asteroid.spin + asteroid.spinSpeed * delta,
      }));

      if (
        spawnTimerRef.current > Math.max(0.7, 2.3 - levelRef.current * 0.12) &&
        nextAsteroids.length < Math.min(5 + levelRef.current, 13)
      ) {
        spawnTimerRef.current = 0;
        nextAsteroids = [...nextAsteroids, createAsteroid(levelRef.current)];
      }

      const survivingShots = [];
      const brokenAsteroids = [];
      const destroyedAsteroidIds = new Set();

      nextShots.forEach((shot) => {
        const target = nextAsteroids.find(
          (asteroid) =>
            !destroyedAsteroidIds.has(asteroid.id) &&
            getDistance(shot, asteroid) < asteroid.size * 0.65 + 1
        );

        if (!target) {
          survivingShots.push(shot);
          return;
        }

        destroyedAsteroidIds.add(target.id);
        scoreRef.current += Math.round(34 + target.size * 8);
        setScore(Math.floor(scoreRef.current));

        if (target.size > 3.4) {
          brokenAsteroids.push(
            {
              ...createAsteroid(levelRef.current, target.size * 0.58),
              x: target.x,
              y: target.y,
              vx: target.vx + 5 + Math.random() * 4,
              vy: target.vy - 5 - Math.random() * 4,
            },
            {
              ...createAsteroid(levelRef.current, target.size * 0.58),
              x: target.x,
              y: target.y,
              vx: target.vx - 5 - Math.random() * 4,
              vy: target.vy + 5 + Math.random() * 4,
            }
          );
        }
      });

      nextShots = survivingShots;
      nextAsteroids = [
        ...nextAsteroids.filter((asteroid) => !destroyedAsteroidIds.has(asteroid.id)),
        ...brokenAsteroids,
      ];

      const shipWasHit = nextAsteroids.some(
        (asteroid) => getDistance(currentShip, asteroid) < asteroid.size * 0.58 + 2.2
      );

      if (shipWasHit) {
        endGame(scoreRef.current);
      }

      shotsRef.current = nextShots;
      asteroidsRef.current = nextAsteroids;
      setShots(nextShots);
      setAsteroids(nextAsteroids);

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
      aria-label="Open a hidden Asteroids-style game"
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
          aria-label="Asteroids mini game"
          onClick={(event) => event.stopPropagation()}
          onPointerMove={(event) => updatePointer(event)}
          onPointerDown={(event) => updatePointer(event, true)}
          onPointerLeave={() => {
            pointerRef.current.active = false;
          }}
        >
          <div className="meteor-game__hud">
            <div>
              <p className="meteor-game__label">Score</p>
              <p className="meteor-game__value">{score}</p>
            </div>
            <div>
              <p className="meteor-game__label">Level</p>
              <p className="meteor-game__value">{level}</p>
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
          {shots.map((shot) => (
            <span
              className="meteor-game__shot"
              key={shot.id}
              style={{
                left: `${shot.x}%`,
                top: `${shot.y}%`,
              }}
              aria-hidden="true"
            />
          ))}
          {asteroids.map((asteroid) => (
            <span
              className="meteor-game__asteroid"
              key={asteroid.id}
              style={{
                left: `${asteroid.x}%`,
                top: `${asteroid.y}%`,
                width: `${asteroid.size}rem`,
                height: `${asteroid.size}rem`,
                transform: `translate(-50%, -50%) rotate(${asteroid.spin}deg)`,
              }}
              aria-hidden="true"
            />
          ))}
          <div
            className="meteor-game__ship"
            style={{
              left: `${ship.x}%`,
              top: `${ship.y}%`,
              transform: `translate(-50%, -50%) rotate(${ship.angle + 90}deg)`,
            }}
            aria-hidden="true"
          >
            <span className="meteor-game__ship-window"></span>
          </div>
          <div className="meteor-game__instructions">
            Rotate, thrust, and shoot. Clear rocks as the field gets faster.
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
