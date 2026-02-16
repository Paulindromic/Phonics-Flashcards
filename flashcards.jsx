import { useState, useCallback, useMemo, useEffect } from "react";

import appleImg from "./Images/a-apple.svg";
import antImg from "./Images/a-ant.svg";
import alligatorImg from "./Images/a-alligator.svg";
import arrowImg from "./Images/a-arrow.svg";

const wordImages = {
  apple: appleImg,
  ant: antImg,
  alligator: alligatorImg,
  arrow: arrowImg,
};

const wordData = {
  a: ["apple", "ant", "alligator", "arrow"],
  b: ["ball", "bear", "banana", "butterfly", "bird", "boat", "bee", "book"],
  c: ["cat", "car", "cake", "carrot", "cow", "candle", "castle", "cup"],
  d: ["dog", "duck", "dinosaur", "door", "drum", "dolphin", "daisy"],
  e: ["egg", "elephant", "elbow", "envelope"],
  f: ["fish", "frog", "flower", "fire", "fox", "feather", "fan", "fork"],
  g: ["goat", "grapes", "guitar", "gorilla", "gift", "grass"],
  h: ["hat", "horse", "house", "heart", "hammer", "hippo", "hand"],
  i: ["igloo", "insect", "iguana"],
  j: ["jar", "jellyfish", "jam", "juice"],
  k: ["kite", "key", "king", "koala", "kangaroo", "kitten", "kettle"],
  l: ["lion", "leaf", "lemon", "ladder", "lamp", "ladybird"],
  m: ["moon", "mouse", "monkey", "mountain", "milk", "mushroom", "muffin", "map"],
  n: ["nest", "nut", "nose", "noodles", "nurse", "needle"],
  o: ["octopus", "otter", "olive"],
  p: ["pig", "pizza", "penguin", "pear", "panda", "pencil", "pumpkin", "parrot"],
  q: ["queen", "quilt"],
  r: ["rabbit", "rainbow", "rocket", "robot", "rose", "ring", "rain"],
  s: ["sun", "star", "snake", "strawberry", "sock", "snail", "spider", "sandwich"],
  t: ["tree", "tiger", "turtle", "train", "tomato", "toothbrush", "tent"],
  u: ["umbrella"],
  v: ["violin", "vase", "van", "vest", "volcano", "vegetables"],
  w: ["whale", "watermelon", "window", "worm", "watch", "wagon", "wolf"],
  x: ["x-ray"],
  y: ["yak", "yarn", "yogurt", "yawn"],
  z: ["zebra", "zipper", "zoo", "zero", "zigzag"],
};

const pastelColors = [
  { bg: "#FFE0E6", accent: "#FF6B8A", text: "#C2185B" },
  { bg: "#E0F0FF", accent: "#64B5F6", text: "#1565C0" },
  { bg: "#E8F5E9", accent: "#81C784", text: "#2E7D32" },
  { bg: "#FFF8E1", accent: "#FFD54F", text: "#F57F17" },
  { bg: "#F3E5F5", accent: "#CE93D8", text: "#7B1FA2" },
  { bg: "#E0F7FA", accent: "#4DD0E1", text: "#00838F" },
  { bg: "#FFF3E0", accent: "#FFB74D", text: "#E65100" },
  { bg: "#E8EAF6", accent: "#9FA8DA", text: "#283593" },
  { bg: "#FCE4EC", accent: "#F48FB1", text: "#AD1457" },
  { bg: "#E0F2F1", accent: "#80CBC4", text: "#00695C" },
];

function getColorForLetter(letter) {
  const idx = letter.charCodeAt(0) - 97;
  return pastelColors[idx % pastelColors.length];
}

function pickRandomWord(letter) {
  const words = wordData[letter];
  return words[Math.floor(Math.random() * words.length)];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Flashcard({ letter, isFlipped, onFlip, word, image }) {
  const color = getColorForLetter(letter);

  return (
    <div
      onClick={onFlip}
      style={{
        perspective: "1000px",
        width: "min(85vw, 420px)",
        height: "min(65vh, 520px)",
        cursor: "pointer",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.55s cubic-bezier(0.4, 0.0, 0.2, 1)",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front - just the letter */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "28px",
            background: `linear-gradient(145deg, ${color.bg}, #fff)`,
            border: `5px solid ${color.accent}`,
            boxShadow: `0 8px 32px ${color.accent}44, 0 2px 8px rgba(0,0,0,0.06)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Decorative dots */}
          <div style={{
            position: "absolute", top: 16, left: 16,
            width: 20, height: 20, borderRadius: "50%",
            background: color.accent, opacity: 0.25,
          }} />
          <div style={{
            position: "absolute", top: 16, right: 16,
            width: 14, height: 14, borderRadius: "50%",
            background: color.accent, opacity: 0.18,
          }} />
          <div style={{
            position: "absolute", bottom: 20, left: 24,
            width: 12, height: 12, borderRadius: "50%",
            background: color.accent, opacity: 0.15,
          }} />
          <div style={{
            position: "absolute", bottom: 16, right: 20,
            width: 18, height: 18, borderRadius: "50%",
            background: color.accent, opacity: 0.2,
          }} />

          <span
            style={{
              fontFamily: "'Fredoka', 'Nunito', 'Quicksand', sans-serif",
              fontSize: "min(40vw, 220px)",
              fontWeight: 700,
              color: color.text,
              lineHeight: 1,
              textShadow: `3px 3px 0 ${color.accent}44`,
            }}
          >
            {letter}
          </span>

          <span
            style={{
              fontFamily: "'Fredoka', 'Nunito', 'Quicksand', sans-serif",
              fontSize: "min(5vw, 22px)",
              color: color.accent,
              marginTop: 12,
              opacity: 0.7,
              letterSpacing: "0.05em",
            }}
          >
            tap to flip!
          </span>
        </div>

        {/* Back - letter + word */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "28px",
            background: `linear-gradient(145deg, #fff, ${color.bg})`,
            border: `5px solid ${color.accent}`,
            boxShadow: `0 8px 32px ${color.accent}44, 0 2px 8px rgba(0,0,0,0.06)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px 24px",
            overflow: "hidden",
          }}
        >
          {/* Decorative corner shapes */}
          <div style={{
            position: "absolute", top: -20, right: -20,
            width: 80, height: 80, borderRadius: "50%",
            background: color.accent, opacity: 0.1,
          }} />
          <div style={{
            position: "absolute", bottom: -15, left: -15,
            width: 60, height: 60, borderRadius: "50%",
            background: color.accent, opacity: 0.1,
          }} />

          {/* The word with the first letter bolded */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: image ? "10px" : "16px",
          }}>
            <span
              style={{
                fontFamily: "'Fredoka', 'Nunito', 'Quicksand', sans-serif",
                fontSize: image ? "min(18vw, 80px)" : "min(28vw, 150px)",
                fontWeight: 700,
                color: color.text,
                lineHeight: 1,
                textShadow: `2px 2px 0 ${color.accent}44`,
              }}
            >
              {letter.toUpperCase()}{letter}
            </span>

            <div
              style={{
                width: "60%",
                height: 4,
                borderRadius: 2,
                background: `linear-gradient(90deg, transparent, ${color.accent}, transparent)`,
                opacity: 0.4,
              }}
            />

            {image && (
              <img
                src={image}
                alt={word}
                style={{
                  width: "min(50vw, 180px)",
                  height: "min(50vw, 180px)",
                  objectFit: "contain",
                }}
              />
            )}

            <span
              style={{
                fontFamily: "'Fredoka', 'Nunito', 'Quicksand', sans-serif",
                fontSize: `min(${word.length > 8 ? "7vw" : "9vw"}, ${word.length > 8 ? "44px" : "56px"})`,
                fontWeight: 600,
                color: color.text,
                lineHeight: 1.2,
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              <span style={{ fontWeight: 800, fontSize: "1.15em" }}>
                {word.charAt(0).toUpperCase()}
              </span>
              {word.slice(1)}
            </span>
          </div>

          <span
            style={{
              fontFamily: "'Fredoka', 'Nunito', 'Quicksand', sans-serif",
              fontSize: "min(4vw, 18px)",
              color: color.accent,
              marginTop: 20,
              opacity: 0.6,
              letterSpacing: "0.05em",
            }}
          >
            tap to flip back
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PhonicsFlashcards() {
  const [screen, setScreen] = useState("setup");
  const [letterInput, setLetterInput] = useState("");
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [cardOrder, setCardOrder] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentWords, setCurrentWords] = useState({});
  const [mode, setMode] = useState("ordered");
  const [flipCount, setFlipCount] = useState(0);

  // Pick random words for each letter
  const generateWords = useCallback((letters) => {
    const words = {};
    letters.forEach((l) => {
      words[l] = pickRandomWord(l);
    });
    return words;
  }, []);

  const startGame = useCallback(() => {
    const input = letterInput.trim().toLowerCase();
    let letters;
    if (input === "" || input === "all") {
      letters = Object.keys(wordData);
    } else {
      letters = [...new Set(
        input.replace(/[^a-z]/g, "").split("").filter((l) => wordData[l])
      )];
    }
    if (letters.length === 0) return;

    const order = mode === "random" ? shuffle(letters) : letters.sort();
    setSelectedLetters(letters);
    setCardOrder(order);
    setCurrentWords(generateWords(letters));
    setCurrentIndex(0);
    setIsFlipped(false);
    setFlipCount(0);
    setScreen("play");
  }, [letterInput, mode, generateWords]);

  const handleFlip = useCallback(() => {
    if (!isFlipped) {
      // When flipping to back, pick a new random word
      const letter = cardOrder[currentIndex];
      setCurrentWords((prev) => ({
        ...prev,
        [letter]: pickRandomWord(letter),
      }));
      setFlipCount((c) => c + 1);
    }
    setIsFlipped((f) => !f);
  }, [isFlipped, cardOrder, currentIndex]);

  const goNext = useCallback(() => {
    if (currentIndex < cardOrder.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((i) => i + 1), 100);
    }
  }, [currentIndex, cardOrder]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((i) => i - 1), 100);
    }
  }, [currentIndex]);

  const reshuffleAndRestart = useCallback(() => {
    const order = mode === "random" ? shuffle(selectedLetters) : [...selectedLetters].sort();
    setCardOrder(order);
    setCurrentWords(generateWords(selectedLetters));
    setCurrentIndex(0);
    setIsFlipped(false);
    setFlipCount(0);
  }, [mode, selectedLetters, generateWords]);

  const currentLetter = cardOrder[currentIndex];

  // Load Google Font
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  if (screen === "setup") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #FFF9C4 0%, #F8BBD0 35%, #B3E5FC 65%, #C8E6C9 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "'Fredoka', 'Nunito', 'Quicksand', sans-serif",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            borderRadius: "32px",
            padding: "40px 32px",
            maxWidth: 440,
            width: "100%",
            boxShadow: "0 12px 48px rgba(0,0,0,0.08)",
            border: "3px solid rgba(255,255,255,0.6)",
          }}
        >
          <h1
            style={{
              fontSize: 36,
              fontWeight: 700,
              textAlign: "center",
              background: "linear-gradient(135deg, #E91E63, #FF9800, #4CAF50, #2196F3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 8,
            }}
          >
            Letter Sounds
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "#78909C",
              fontSize: 16,
              marginBottom: 32,
              fontWeight: 500,
            }}
          >
            Phonics flashcard game
          </p>

          <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#546E7A", fontSize: 15 }}>
            Which letters? <span style={{ fontWeight: 400, color: "#90A4AE" }}>(leave blank for all)</span>
          </label>
          <input
            type="text"
            value={letterInput}
            onChange={(e) => setLetterInput(e.target.value)}
            placeholder="e.g. a, b, c, m  or  all"
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: 16,
              border: "2px solid #E0E0E0",
              fontSize: 18,
              fontFamily: "'Fredoka', sans-serif",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
              background: "#FAFAFA",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#90CAF9")}
            onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
            onKeyDown={(e) => e.key === "Enter" && startGame()}
          />

          <div style={{ marginTop: 24, marginBottom: 28 }}>
            <label style={{ display: "block", marginBottom: 10, fontWeight: 600, color: "#546E7A", fontSize: 15 }}>
              Card order
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              {["ordered", "random"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    flex: 1,
                    padding: "12px 0",
                    borderRadius: 14,
                    border: mode === m ? "2px solid #64B5F6" : "2px solid #E0E0E0",
                    background: mode === m ? "#E3F2FD" : "#FAFAFA",
                    color: mode === m ? "#1565C0" : "#90A4AE",
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: "pointer",
                    fontFamily: "'Fredoka', sans-serif",
                    transition: "all 0.2s",
                  }}
                >
                  {m === "ordered" ? "A → Z" : "Random"}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            style={{
              width: "100%",
              padding: "16px 0",
              borderRadius: 18,
              border: "none",
              background: "linear-gradient(135deg, #FF6B8A, #FF9800)",
              color: "#fff",
              fontSize: 22,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Fredoka', sans-serif",
              boxShadow: "0 6px 24px rgba(255,107,138,0.35)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.97)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Let's Go!
          </button>
        </div>

        {/* Quick-select letter grid */}
        <div style={{
          marginTop: 24,
          background: "rgba(255,255,255,0.6)",
          borderRadius: 20,
          padding: "16px 20px",
          maxWidth: 440,
          width: "100%",
        }}>
          <p style={{ textAlign: "center", fontSize: 13, color: "#90A4AE", marginBottom: 10, fontWeight: 500 }}>
            or tap letters to select
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
            {"abcdefghijklmnopqrstuvwxyz".split("").map((l) => {
              const isSelected = letterInput.toLowerCase().includes(l);
              return (
                <button
                  key={l}
                  onClick={() => {
                    if (isSelected) {
                      setLetterInput((prev) =>
                        prev.replace(new RegExp(`\\s*${l}[,\\s]*|[,\\s]*${l}\\s*`, "gi"), "").trim()
                      );
                    } else {
                      setLetterInput((prev) => (prev.trim() ? prev.trim() + ", " + l : l));
                    }
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    border: isSelected ? "2px solid #FF6B8A" : "2px solid #E0E0E0",
                    background: isSelected ? "#FFE0E6" : "#fff",
                    color: isSelected ? "#C2185B" : "#78909C",
                    fontSize: 18,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "'Fredoka', sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Play screen
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFF9C4 0%, #F8BBD0 35%, #B3E5FC 65%, #C8E6C9 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        fontFamily: "'Fredoka', 'Nunito', 'Quicksand', sans-serif",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 440,
          marginBottom: 12,
        }}
      >
        <button
          onClick={() => setScreen("setup")}
          style={{
            padding: "8px 16px",
            borderRadius: 12,
            border: "2px solid rgba(255,255,255,0.6)",
            background: "rgba(255,255,255,0.7)",
            color: "#78909C",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "'Fredoka', sans-serif",
          }}
        >
          ← Back
        </button>

        <span
          style={{
            background: "rgba(255,255,255,0.7)",
            padding: "8px 16px",
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 600,
            color: "#546E7A",
          }}
        >
          {currentIndex + 1} / {cardOrder.length}
        </span>

        <button
          onClick={reshuffleAndRestart}
          style={{
            padding: "8px 16px",
            borderRadius: 12,
            border: "2px solid rgba(255,255,255,0.6)",
            background: "rgba(255,255,255,0.7)",
            color: "#78909C",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "'Fredoka', sans-serif",
          }}
        >
          Restart
        </button>
      </div>

      {/* Card area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {currentLetter && (
          <Flashcard
            letter={currentLetter}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            word={currentWords[currentLetter] || ""}
            image={wordImages[currentWords[currentLetter]] || null}
          />
        )}
      </div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 16,
          marginBottom: 16,
          width: "100%",
          maxWidth: 440,
          justifyContent: "center",
        }}
      >
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          style={{
            flex: 1,
            maxWidth: 140,
            padding: "14px 0",
            borderRadius: 16,
            border: "none",
            background: currentIndex === 0 ? "#E0E0E0" : "rgba(255,255,255,0.85)",
            color: currentIndex === 0 ? "#BDBDBD" : "#546E7A",
            fontSize: 18,
            fontWeight: 700,
            cursor: currentIndex === 0 ? "default" : "pointer",
            fontFamily: "'Fredoka', sans-serif",
            boxShadow: currentIndex === 0 ? "none" : "0 4px 16px rgba(0,0,0,0.08)",
            transition: "all 0.15s",
          }}
        >
          ← Prev
        </button>

        <button
          onClick={goNext}
          disabled={currentIndex === cardOrder.length - 1}
          style={{
            flex: 1,
            maxWidth: 140,
            padding: "14px 0",
            borderRadius: 16,
            border: "none",
            background:
              currentIndex === cardOrder.length - 1
                ? "#E0E0E0"
                : "linear-gradient(135deg, #FF6B8A, #FF9800)",
            color: currentIndex === cardOrder.length - 1 ? "#BDBDBD" : "#fff",
            fontSize: 18,
            fontWeight: 700,
            cursor: currentIndex === cardOrder.length - 1 ? "default" : "pointer",
            fontFamily: "'Fredoka', sans-serif",
            boxShadow:
              currentIndex === cardOrder.length - 1
                ? "none"
                : "0 4px 16px rgba(255,107,138,0.3)",
            transition: "all 0.15s",
          }}
        >
          Next →
        </button>
      </div>

      {/* End of deck message */}
      {currentIndex === cardOrder.length - 1 && isFlipped && (
        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: 16,
            padding: "16px 24px",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 18, fontWeight: 600, color: "#546E7A", margin: 0 }}>
            All done! 🎉
          </p>
          <button
            onClick={reshuffleAndRestart}
            style={{
              marginTop: 10,
              padding: "10px 24px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #4CAF50, #81C784)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Fredoka', sans-serif",
            }}
          >
            Go Again
          </button>
        </div>
      )}
    </div>
  );
}
