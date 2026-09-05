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

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 18;
const EMPTY_BOARD = Array.from({ length: BOARD_HEIGHT }, () =>
  Array(BOARD_WIDTH).fill(null)
);
const ASTEROIDS_HIGH_SCORE_KEY = "asteroidsHighScore";
const BLOCKS_HIGH_SCORE_KEY = "blocksHighScore";
const INVADERS_HIGH_SCORE_KEY = "invadersHighScore";

const PIECES = [
  { name: "i", cells: [[0, 1], [1, 1], [2, 1], [3, 1]] },
  { name: "o", cells: [[1, 0], [2, 0], [1, 1], [2, 1]] },
  { name: "t", cells: [[1, 0], [0, 1], [1, 1], [2, 1]] },
  { name: "l", cells: [[2, 0], [0, 1], [1, 1], [2, 1]] },
  { name: "s", cells: [[1, 0], [2, 0], [0, 1], [1, 1]] },
];

const getStoredScore = (key) => {
  const storedScore = Number(window.localStorage.getItem(key));
  return Number.isFinite(storedScore) ? Math.floor(storedScore) : 0;
};

const createPiece = () => ({
  ...PIECES[Math.floor(Math.random() * PIECES.length)],
  x: 3,
  y: -1,
});

const rotateCells = (cells) => cells.map(([x, y]) => [3 - y, x]);

const getPieceCells = (piece) =>
  piece.cells.map(([cellX, cellY]) => ({
    x: piece.x + cellX,
    y: piece.y + cellY,
    name: piece.name,
  }));

const isPieceValid = (board, piece) =>
  getPieceCells(piece).every(
    ({ x, y }) =>
      x >= 0 &&
      x < BOARD_WIDTH &&
      y < BOARD_HEIGHT &&
      (y < 0 || !board[y][x])
  );

const lockPiece = (board, piece) => {
  const nextBoard = board.map((row) => [...row]);

  getPieceCells(piece).forEach(({ x, y, name }) => {
    if (y >= 0 && y < BOARD_HEIGHT) {
      nextBoard[y][x] = name;
    }
  });

  const openRows = nextBoard.filter((row) => row.some((cell) => !cell));
  const clearedRows = BOARD_HEIGHT - openRows.length;
  const emptyRows = Array.from({ length: clearedRows }, () =>
    Array(BOARD_WIDTH).fill(null)
  );

  return {
    board: [...emptyRows, ...openRows],
    clearedRows,
  };
};

const mergeBoardAndPiece = (board, piece) => {
  const mergedBoard = board.map((row) => [...row]);

  getPieceCells(piece).forEach(({ x, y, name }) => {
    if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
      mergedBoard[y][x] = name;
    }
  });

  return mergedBoard;
};

const createInvaders = (level) =>
  Array.from({ length: Math.min(5, 3 + Math.floor(level / 2)) }, (_, rowIndex) =>
    Array.from({ length: 7 }, (_, columnIndex) => ({
      id: `${level}-${rowIndex}-${columnIndex}-${Date.now()}`,
      x: 16 + columnIndex * 11,
      y: 18 + rowIndex * 7,
      row: rowIndex,
    }))
  ).flat();

export default function Hero({ sceneMode }) {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameStatus, setGameStatus] = useState("idle");
  const [ship, setShip] = useState({ x: 50, y: 72, angle: -90 });
  const [asteroids, setAsteroids] = useState([]);
  const [shots, setShots] = useState([]);
  const [asteroidsScore, setAsteroidsScore] = useState(0);
  const [asteroidsLevel, setAsteroidsLevel] = useState(1);
  const [asteroidsHighScore, setAsteroidsHighScore] = useState(() =>
    getStoredScore(ASTEROIDS_HIGH_SCORE_KEY)
  );
  const [blocksBoard, setBlocksBoard] = useState(EMPTY_BOARD);
  const [blocksPiece, setBlocksPiece] = useState(createPiece);
  const [blocksScore, setBlocksScore] = useState(0);
  const [blocksLevel, setBlocksLevel] = useState(1);
  const [blocksHighScore, setBlocksHighScore] = useState(() =>
    getStoredScore(BLOCKS_HIGH_SCORE_KEY)
  );
  const [invaderPlayerX, setInvaderPlayerX] = useState(50);
  const [invaders, setInvaders] = useState([]);
  const [defenderShots, setDefenderShots] = useState([]);
  const [invaderShots, setInvaderShots] = useState([]);
  const [invadersScore, setInvadersScore] = useState(0);
  const [invadersLevel, setInvadersLevel] = useState(1);
  const [invadersHighScore, setInvadersHighScore] = useState(() =>
    getStoredScore(INVADERS_HIGH_SCORE_KEY)
  );
  const animationFrameRef = useRef(null);
  const invadersAnimationFrameRef = useRef(null);
  const lastFrameRef = useRef(0);
  const invadersLastFrameRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const shotTimerRef = useRef(0);
  const invaderFireTimerRef = useRef(0);
  const defenderFireTimerRef = useRef(0);
  const keysRef = useRef({ left: false, right: false, thrust: false, fire: false });
  const pointerRef = useRef({ active: false, x: 50, y: 72 });
  const shipRef = useRef({ x: 50, y: 72, vx: 0, vy: 0, angle: -90 });
  const asteroidsRef = useRef([]);
  const shotsRef = useRef([]);
  const asteroidsScoreRef = useRef(0);
  const asteroidsLevelRef = useRef(1);
  const blocksBoardRef = useRef(EMPTY_BOARD);
  const blocksPieceRef = useRef(createPiece());
  const blocksScoreRef = useRef(0);
  const blocksLevelRef = useRef(1);
  const invaderPlayerXRef = useRef(50);
  const invadersRef = useRef([]);
  const defenderShotsRef = useRef([]);
  const invaderShotsRef = useRef([]);
  const invadersDirectionRef = useRef(1);
  const invadersScoreRef = useRef(0);
  const invadersLevelRef = useRef(1);
  const gameStatusRef = useRef(gameStatus);

  const saveHighScore = (key, score, setter) => {
    const roundedScore = Math.floor(score);
    setter((currentHighScore) => {
      const nextHighScore = Math.max(currentHighScore, roundedScore);
      window.localStorage.setItem(key, String(nextHighScore));
      return nextHighScore;
    });
  };

  const startAsteroids = useCallback(() => {
    const startingShip = { x: 50, y: 72, vx: 0, vy: 0, angle: -90 };
    const startingAsteroids = [createAsteroid(1), createAsteroid(1), createAsteroid(1, 4.6)];

    setSelectorOpen(false);
    setSelectedGame("asteroids");
    setGameStatus("playing");
    gameStatusRef.current = "playing";
    shipRef.current = startingShip;
    asteroidsRef.current = startingAsteroids;
    shotsRef.current = [];
    asteroidsScoreRef.current = 0;
    asteroidsLevelRef.current = 1;
    setShip({ x: startingShip.x, y: startingShip.y, angle: startingShip.angle });
    setAsteroids(startingAsteroids);
    setShots([]);
    setAsteroidsScore(0);
    setAsteroidsLevel(1);
    spawnTimerRef.current = 0;
    shotTimerRef.current = 0;
    lastFrameRef.current = 0;
  }, []);

  const startBlocks = useCallback(() => {
    const nextBoard = EMPTY_BOARD.map((row) => [...row]);
    const nextPiece = createPiece();

    setSelectorOpen(false);
    setSelectedGame("blocks");
    setGameStatus("playing");
    gameStatusRef.current = "playing";
    blocksBoardRef.current = nextBoard;
    blocksPieceRef.current = nextPiece;
    blocksScoreRef.current = 0;
    blocksLevelRef.current = 1;
    setBlocksBoard(nextBoard);
    setBlocksPiece(nextPiece);
    setBlocksScore(0);
    setBlocksLevel(1);
  }, []);

  const startInvaders = useCallback(() => {
    const startingInvaders = createInvaders(1);

    setSelectorOpen(false);
    setSelectedGame("invaders");
    setGameStatus("playing");
    gameStatusRef.current = "playing";
    invaderPlayerXRef.current = 50;
    invadersRef.current = startingInvaders;
    defenderShotsRef.current = [];
    invaderShotsRef.current = [];
    invadersDirectionRef.current = 1;
    invadersScoreRef.current = 0;
    invadersLevelRef.current = 1;
    invaderFireTimerRef.current = 0;
    defenderFireTimerRef.current = 0;
    invadersLastFrameRef.current = 0;
    setInvaderPlayerX(50);
    setInvaders(startingInvaders);
    setDefenderShots([]);
    setInvaderShots([]);
    setInvadersScore(0);
    setInvadersLevel(1);
  }, []);

  const endAsteroids = useCallback((finalScore) => {
    setGameStatus("gameover");
    gameStatusRef.current = "gameover";
    saveHighScore(ASTEROIDS_HIGH_SCORE_KEY, finalScore, setAsteroidsHighScore);
  }, []);

  const endBlocks = useCallback((finalScore) => {
    setGameStatus("gameover");
    gameStatusRef.current = "gameover";
    saveHighScore(BLOCKS_HIGH_SCORE_KEY, finalScore, setBlocksHighScore);
  }, []);

  const endInvaders = useCallback((finalScore) => {
    setGameStatus("gameover");
    gameStatusRef.current = "gameover";
    saveHighScore(INVADERS_HIGH_SCORE_KEY, finalScore, setInvadersHighScore);
  }, []);

  const closeGame = useCallback(() => {
    setSelectorOpen(false);
    setSelectedGame(null);
    setGameStatus("idle");
    gameStatusRef.current = "idle";
    asteroidsRef.current = [];
    shotsRef.current = [];
    setAsteroids([]);
    setShots([]);
    invadersRef.current = [];
    defenderShotsRef.current = [];
    invaderShotsRef.current = [];
    setInvaders([]);
    setDefenderShots([]);
    setInvaderShots([]);
    keysRef.current = { left: false, right: false, thrust: false, fire: false };
    pointerRef.current.active = false;
  }, []);

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
    pointerRef.current = {
      active: true,
      x: Math.max(3, Math.min(97, (event.clientX / window.innerWidth) * 100)),
      y: Math.max(8, Math.min(92, (event.clientY / window.innerHeight) * 100)),
    };

    if (shouldFire) {
      fireShot();
    }
  };

  const moveBlocksPiece = useCallback((xOffset, yOffset) => {
    if (gameStatusRef.current !== "playing") {
      return false;
    }

    const movedPiece = {
      ...blocksPieceRef.current,
      x: blocksPieceRef.current.x + xOffset,
      y: blocksPieceRef.current.y + yOffset,
    };

    if (isPieceValid(blocksBoardRef.current, movedPiece)) {
      blocksPieceRef.current = movedPiece;
      setBlocksPiece(movedPiece);
      return true;
    }

    return false;
  }, []);

  const rotateBlocksPiece = useCallback(() => {
    const rotatedPiece = {
      ...blocksPieceRef.current,
      cells: rotateCells(blocksPieceRef.current.cells),
    };

    if (isPieceValid(blocksBoardRef.current, rotatedPiece)) {
      blocksPieceRef.current = rotatedPiece;
      setBlocksPiece(rotatedPiece);
    }
  }, []);

  const dropBlocksPiece = useCallback(() => {
    if (moveBlocksPiece(0, 1)) {
      return;
    }

    const lockedState = lockPiece(blocksBoardRef.current, blocksPieceRef.current);
    const nextScore =
      blocksScoreRef.current + 12 + lockedState.clearedRows * lockedState.clearedRows * 120;
    const nextLevel = Math.floor(nextScore / 700) + 1;
    const nextPiece = createPiece();

    blocksBoardRef.current = lockedState.board;
    blocksScoreRef.current = nextScore;
    blocksLevelRef.current = nextLevel;
    setBlocksBoard(lockedState.board);
    setBlocksScore(nextScore);
    setBlocksLevel(nextLevel);

    if (!isPieceValid(lockedState.board, nextPiece)) {
      endBlocks(nextScore);
      return;
    }

    blocksPieceRef.current = nextPiece;
    setBlocksPiece(nextPiece);
  }, [endBlocks, moveBlocksPiece]);

  const fireDefenderShot = useCallback((forceShot = false) => {
    if (!forceShot && defenderFireTimerRef.current < 0.22) {
      return;
    }

    defenderFireTimerRef.current = 0;
    const nextShots = [
      ...defenderShotsRef.current.slice(-2),
      {
        id: `${Date.now()}-${Math.random()}`,
        x: invaderPlayerXRef.current,
        y: 84,
      },
    ];

    defenderShotsRef.current = nextShots;
    setDefenderShots(nextShots);
  }, []);

  const moveInvaderDefenderToPointer = (clientX) => {
    invaderPlayerXRef.current = Math.max(
      6,
      Math.min(94, (clientX / window.innerWidth) * 100)
    );
    setInvaderPlayerX(invaderPlayerXRef.current);
  };

  const handleInvadersPointerDown = (event) => {
    if (event.target.closest("button")) {
      return;
    }

    moveInvaderDefenderToPointer(event.clientX);
    fireDefenderShot(true);
  };

  useEffect(() => {
    gameStatusRef.current = gameStatus;
  }, [gameStatus]);

  useEffect(() => {
    document.body.classList.toggle("meteor-game-active", Boolean(selectedGame || selectorOpen));

    return () => {
      document.body.classList.remove("meteor-game-active");
    };
  }, [selectedGame, selectorOpen]);

  useEffect(() => {
    if (selectedGame !== "asteroids" || gameStatus !== "playing") {
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
  }, [closeGame, gameStatus, selectedGame]);

  useEffect(() => {
    if (selectedGame !== "asteroids" || gameStatus !== "playing") {
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

      const nextAsteroidsLevel = Math.floor(asteroidsScoreRef.current / 320) + 1;
      if (nextAsteroidsLevel !== asteroidsLevelRef.current) {
        asteroidsLevelRef.current = nextAsteroidsLevel;
        setAsteroidsLevel(nextAsteroidsLevel);
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

      const nextScore = asteroidsScoreRef.current + delta * (5 + asteroidsLevelRef.current);
      asteroidsScoreRef.current = nextScore;
      setAsteroidsScore(Math.floor(nextScore));

      let nextAsteroids = asteroidsRef.current.map((asteroid) => ({
        ...asteroid,
        x: wrapPosition(asteroid.x + asteroid.vx * delta),
        y: wrapPosition(asteroid.y + asteroid.vy * delta),
        spin: asteroid.spin + asteroid.spinSpeed * delta,
      }));

      if (
        spawnTimerRef.current > Math.max(0.7, 2.3 - asteroidsLevelRef.current * 0.12) &&
        nextAsteroids.length < Math.min(5 + asteroidsLevelRef.current, 13)
      ) {
        spawnTimerRef.current = 0;
        nextAsteroids = [...nextAsteroids, createAsteroid(asteroidsLevelRef.current)];
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
        asteroidsScoreRef.current += Math.round(34 + target.size * 8);
        setAsteroidsScore(Math.floor(asteroidsScoreRef.current));

        if (target.size > 3.4) {
          brokenAsteroids.push(
            {
              ...createAsteroid(asteroidsLevelRef.current, target.size * 0.58),
              x: target.x,
              y: target.y,
              vx: target.vx + 5 + Math.random() * 4,
              vy: target.vy - 5 - Math.random() * 4,
            },
            {
              ...createAsteroid(asteroidsLevelRef.current, target.size * 0.58),
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

      if (
        nextAsteroids.some(
          (asteroid) => getDistance(currentShip, asteroid) < asteroid.size * 0.58 + 2.2
        )
      ) {
        endAsteroids(asteroidsScoreRef.current);
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
  }, [endAsteroids, fireShot, gameStatus, selectedGame]);

  useEffect(() => {
    if (selectedGame !== "blocks" || gameStatus !== "playing") {
      return undefined;
    }

    const tickSpeed = Math.max(160, 780 - blocksLevel * 70);
    const intervalId = window.setInterval(dropBlocksPiece, tickSpeed);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [blocksLevel, dropBlocksPiece, gameStatus, selectedGame]);

  useEffect(() => {
    if (selectedGame !== "blocks") {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeGame();
      }

      if (gameStatusRef.current !== "playing") {
        return;
      }

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        moveBlocksPiece(-1, 0);
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        moveBlocksPiece(1, 0);
      }

      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        dropBlocksPiece();
      }

      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w" || event.key === " ") {
        event.preventDefault();
        rotateBlocksPiece();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeGame, dropBlocksPiece, moveBlocksPiece, rotateBlocksPiece, selectedGame]);

  useEffect(() => {
    if (selectedGame !== "invaders") {
      return undefined;
    }

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (event.key === "Escape") {
        closeGame();
      }

      if (gameStatusRef.current !== "playing") {
        return;
      }

      if (event.key === "ArrowLeft" || key === "a") {
        keysRef.current.left = true;
      }

      if (event.key === "ArrowRight" || key === "d") {
        keysRef.current.right = true;
      }

      if (event.key === " " || event.key === "ArrowUp" || key === "w") {
        event.preventDefault();
        keysRef.current.fire = true;
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

      if (event.key === " " || event.key === "ArrowUp" || key === "w") {
        keysRef.current.fire = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [closeGame, selectedGame]);

  useEffect(() => {
    if (selectedGame !== "invaders" || gameStatus !== "playing") {
      return undefined;
    }

    const runFrame = (timestamp) => {
      if (gameStatusRef.current !== "playing") {
        return;
      }

      const delta = Math.min((timestamp - (invadersLastFrameRef.current || timestamp)) / 1000, 0.04);
      invadersLastFrameRef.current = timestamp;
      invaderFireTimerRef.current += delta;
      defenderFireTimerRef.current += delta;

      const horizontalMove = Number(keysRef.current.right) - Number(keysRef.current.left);
      if (horizontalMove) {
        const nextPlayerX = Math.max(
          6,
          Math.min(94, invaderPlayerXRef.current + horizontalMove * delta * 48)
        );
        invaderPlayerXRef.current = nextPlayerX;
        setInvaderPlayerX(nextPlayerX);
      }

      if (keysRef.current.fire) {
        fireDefenderShot();
      }

      let nextDefenderShots = defenderShotsRef.current
        .map((shot) => ({ ...shot, y: shot.y - delta * 58 }))
        .filter((shot) => shot.y > -4);
      let nextInvaderShots = invaderShotsRef.current
        .map((shot) => ({ ...shot, y: shot.y + delta * (31 + invadersLevelRef.current * 2.2) }))
        .filter((shot) => shot.y < 106);
      let nextInvaders = invadersRef.current.map((invader) => ({
        ...invader,
        x: invader.x + invadersDirectionRef.current * delta * (9 + invadersLevelRef.current * 2.4),
      }));

      const reachedEdge = nextInvaders.some((invader) => invader.x < 7 || invader.x > 93);
      if (reachedEdge) {
        invadersDirectionRef.current *= -1;
        nextInvaders = nextInvaders.map((invader) => ({
          ...invader,
          x: Math.max(7, Math.min(93, invader.x)),
          y: invader.y + 4 + invadersLevelRef.current * 0.45,
        }));
      }

      const hitInvaderIds = new Set();
      const survivingDefenderShots = [];

      nextDefenderShots.forEach((shot) => {
        const target = nextInvaders.find(
          (invader) => !hitInvaderIds.has(invader.id) && getDistance(shot, invader) < 4.4
        );

        if (!target) {
          survivingDefenderShots.push(shot);
          return;
        }

        hitInvaderIds.add(target.id);
        invadersScoreRef.current += 40 + invadersLevelRef.current * 8;
      });

      nextDefenderShots = survivingDefenderShots;
      nextInvaders = nextInvaders.filter((invader) => !hitInvaderIds.has(invader.id));

      if (
        invaderFireTimerRef.current >
          Math.max(0.32, 1.15 - invadersLevelRef.current * 0.07) &&
        nextInvaders.length
      ) {
        invaderFireTimerRef.current = 0;
        const shooter = nextInvaders[Math.floor(Math.random() * nextInvaders.length)];
        nextInvaderShots = [
          ...nextInvaderShots,
          {
            id: `${Date.now()}-${Math.random()}`,
            x: shooter.x,
            y: shooter.y + 3,
          },
        ];
      }

      const defenderWasHit = nextInvaderShots.some(
        (shot) => Math.abs(shot.x - invaderPlayerXRef.current) < 4 && shot.y > 82
      );
      const invadersLanded = nextInvaders.some((invader) => invader.y > 82);

      if (defenderWasHit || invadersLanded) {
        endInvaders(invadersScoreRef.current);
      }

      if (!nextInvaders.length && gameStatusRef.current === "playing") {
        const nextLevel = invadersLevelRef.current + 1;
        invadersLevelRef.current = nextLevel;
        invadersScoreRef.current += 150 + nextLevel * 30;
        nextInvaders = createInvaders(nextLevel);
        nextDefenderShots = [];
        nextInvaderShots = [];
        invadersDirectionRef.current = nextLevel % 2 === 0 ? -1 : 1;
        setInvadersLevel(nextLevel);
      }

      invadersRef.current = nextInvaders;
      defenderShotsRef.current = nextDefenderShots;
      invaderShotsRef.current = nextInvaderShots;
      setInvaders(nextInvaders);
      setDefenderShots(nextDefenderShots);
      setInvaderShots(nextInvaderShots);
      setInvadersScore(Math.floor(invadersScoreRef.current));

      invadersAnimationFrameRef.current = window.requestAnimationFrame(runFrame);
    };

    invadersAnimationFrameRef.current = window.requestAnimationFrame(runFrame);

    return () => {
      window.cancelAnimationFrame(invadersAnimationFrameRef.current);
    };
  }, [endInvaders, fireDefenderShot, gameStatus, selectedGame]);

  const visibleBlocksBoard = mergeBoardAndPiece(blocksBoard, blocksPiece);
  const gameOverlayOpen = Boolean(selectedGame);

  return (
    <div
      className={`hero hero--${sceneMode}${gameOverlayOpen ? " hero--game-open" : ""}`}
      id="home"
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
      <button
        className="hero__emoji slide-up"
        type="button"
        onClick={() => setSelectorOpen(true)}
        aria-label="Open hidden game selector"
      >
        🙋🏻‍♂️
      </button>
      {selectorOpen && (
        <div
          className="game-selector"
          role="dialog"
          aria-modal="true"
          aria-label="Choose a hidden game"
          onClick={() => setSelectorOpen(false)}
        >
          <div className="game-selector__panel" onClick={(event) => event.stopPropagation()}>
            <p className="game-selector__eyebrow">Hidden arcade</p>
            <h2 className="game-selector__title">Choose a quick game</h2>
            <div className="game-selector__choices">
              <button
                className="game-selector__choice"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  startAsteroids();
                }}
                aria-label="Play Asteroids"
              >
                <span className="game-selector__icon">△</span>
                <span>
                  <strong>Asteroids</strong>
                  Shoot rocks, survive longer, and climb levels.
                </span>
              </button>
              <button
                className="game-selector__choice"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  startBlocks();
                }}
                aria-label="Play Falling Blocks"
              >
                <span className="game-selector__icon game-selector__icon--blocks">▦</span>
                <span>
                  <strong>Falling Blocks</strong>
                  Stack shapes, clear rows, and speed up as you score.
                </span>
              </button>
              <button
                className="game-selector__choice"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  startInvaders();
                }}
                aria-label="Play Space Invaders"
              >
                <span className="game-selector__icon game-selector__icon--invaders">▥</span>
                <span>
                  <strong>Space Invaders</strong>
                  Defend the base, clear waves, and dodge return fire.
                </span>
              </button>
            </div>
            <button
              className="game-selector__close"
              type="button"
              onClick={() => setSelectorOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {selectedGame === "asteroids" && (
        <div
          className="meteor-game"
          role="dialog"
          aria-modal="true"
          aria-label="Asteroids mini game"
          onPointerMove={(event) => updatePointer(event)}
          onPointerDown={(event) => updatePointer(event, true)}
          onPointerLeave={() => {
            pointerRef.current.active = false;
          }}
        >
          <div className="meteor-game__hud">
            <div>
              <p className="meteor-game__label">Score</p>
              <p className="meteor-game__value">{asteroidsScore}</p>
            </div>
            <div>
              <p className="meteor-game__label">Level</p>
              <p className="meteor-game__value">{asteroidsLevel}</p>
            </div>
            <div>
              <p className="meteor-game__label">Best</p>
              <p className="meteor-game__value">{asteroidsHighScore}</p>
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
              <p className="meteor-game__summary">Score {asteroidsScore}</p>
              <button className="meteor-game__restart" type="button" onClick={startAsteroids}>
                Play again
              </button>
            </div>
          )}
        </div>
      )}
      {selectedGame === "blocks" && (
        <div className="blocks-game" role="dialog" aria-modal="true" aria-label="Falling blocks game">
          <div className="blocks-game__hud">
            <div>
              <p className="blocks-game__label">Score</p>
              <p className="blocks-game__value">{blocksScore}</p>
            </div>
            <div>
              <p className="blocks-game__label">Level</p>
              <p className="blocks-game__value">{blocksLevel}</p>
            </div>
            <div>
              <p className="blocks-game__label">Best</p>
              <p className="blocks-game__value">{blocksHighScore}</p>
            </div>
            <button className="blocks-game__close" type="button" onClick={closeGame}>
              Exit
            </button>
          </div>
          <div className="blocks-game__board" aria-hidden="true">
            {visibleBlocksBoard.flatMap((row, rowIndex) =>
              row.map((cell, columnIndex) => (
                <span
                  className={`blocks-game__cell${cell ? ` blocks-game__cell--${cell}` : ""}`}
                  key={`${rowIndex}-${columnIndex}`}
                />
              ))
            )}
          </div>
          <div className="blocks-game__controls" aria-label="Falling blocks controls">
            <button type="button" onClick={() => moveBlocksPiece(-1, 0)}>Left</button>
            <button type="button" onClick={rotateBlocksPiece}>Rotate</button>
            <button type="button" onClick={() => moveBlocksPiece(1, 0)}>Right</button>
            <button type="button" onClick={dropBlocksPiece}>Drop</button>
          </div>
          <p className="blocks-game__instructions">
            Move, rotate, and clear rows. The board speeds up every level.
          </p>
          {gameStatus === "gameover" && (
            <div className="blocks-game__panel">
              <h2 className="blocks-game__title">Stack finished</h2>
              <p className="blocks-game__summary">Score {blocksScore}</p>
              <button className="blocks-game__restart" type="button" onClick={startBlocks}>
                Play again
              </button>
            </div>
          )}
        </div>
      )}
      {selectedGame === "invaders" && (
        <div
          className="invaders-game"
          role="dialog"
          aria-modal="true"
          aria-label="Space Invaders game"
          onPointerMove={(event) => {
            moveInvaderDefenderToPointer(event.clientX);
          }}
          onPointerDown={handleInvadersPointerDown}
        >
          <div className="invaders-game__hud">
            <div>
              <p className="invaders-game__label">Score</p>
              <p className="invaders-game__value">{invadersScore}</p>
            </div>
            <div>
              <p className="invaders-game__label">Wave</p>
              <p className="invaders-game__value">{invadersLevel}</p>
            </div>
            <div>
              <p className="invaders-game__label">Best</p>
              <p className="invaders-game__value">{invadersHighScore}</p>
            </div>
            <button className="invaders-game__close" type="button" onClick={closeGame}>
              Exit
            </button>
          </div>
          <div className="invaders-game__stars" aria-hidden="true"></div>
          {invaders.map((invader) => (
            <span
              className={`invaders-game__enemy invaders-game__enemy--${invader.row % 3}`}
              key={invader.id}
              style={{ left: `${invader.x}%`, top: `${invader.y}%` }}
              aria-hidden="true"
            />
          ))}
          {defenderShots.map((shot) => (
            <span
              className="invaders-game__defender-shot"
              key={shot.id}
              style={{ left: `${shot.x}%`, top: `${shot.y}%` }}
              aria-hidden="true"
            />
          ))}
          {invaderShots.map((shot) => (
            <span
              className="invaders-game__enemy-shot"
              key={shot.id}
              style={{ left: `${shot.x}%`, top: `${shot.y}%` }}
              aria-hidden="true"
            />
          ))}
          <div
            className="invaders-game__defender"
            style={{ left: `${invaderPlayerX}%` }}
            aria-hidden="true"
          >
            <span className="invaders-game__defender-window"></span>
          </div>
          <div className="invaders-game__controls" aria-label="Space Invaders controls">
            <button
              type="button"
              onPointerDown={() => {
                keysRef.current.left = true;
              }}
              onPointerUp={() => {
                keysRef.current.left = false;
              }}
              onPointerLeave={() => {
                keysRef.current.left = false;
              }}
            >
              Left
            </button>
            <button type="button" onClick={() => fireDefenderShot(true)}>
              Fire
            </button>
            <button
              type="button"
              onPointerDown={() => {
                keysRef.current.right = true;
              }}
              onPointerUp={() => {
                keysRef.current.right = false;
              }}
              onPointerLeave={() => {
                keysRef.current.right = false;
              }}
            >
              Right
            </button>
          </div>
          <p className="invaders-game__instructions">
            Move and fire. Clear each wave before it reaches you.
          </p>
          {gameStatus === "gameover" && (
            <div className="invaders-game__panel">
              <h2 className="invaders-game__title">Base overrun</h2>
              <p className="invaders-game__summary">Score {invadersScore}</p>
              <button className="invaders-game__restart" type="button" onClick={startInvaders}>
                Play again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
