import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const IMAGES = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    bg: "#1B2A5E",
    panel: "#2E4A9E",
    title: "A Noite Estrelada",
    artist: "Vincent van Gogh · 1889",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/1280px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
    bg: "#8A6414",
    panel: "#B8862E",
    title: "O Beijo",
    artist: "Gustav Klimt · 1908",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg",
    bg: "#27506E",
    panel: "#3F6D8E",
    title: "A Grande Onda de Kanagawa",
    artist: "Katsushika Hokusai · 1831",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/1280px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
    bg: "#3E6649",
    panel: "#4E7A5A",
    title: "Nenúfares",
    artist: "Claude Monet · 1906",
  },
];

const EASE = "cubic-bezier(0.4,0,0.2,1)";
const DURATION = 650;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function ToonHub() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false,
  );

  useEffect(() => {
    IMAGES.forEach((img) => {
      const i = new Image();
      i.src = img.src;
    });
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        dir === "next" ? (prev + 1) % 4 : (prev + 3) % 4,
      );
      window.setTimeout(() => setIsAnimating(false), DURATION);
    },
    [isAnimating],
  );

  // ---- Drag / swipe ----
  const dragStart = useRef<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const endDrag = useCallback(
    (endX: number) => {
      if (dragStart.current === null) return;
      const delta = endX - dragStart.current;
      dragStart.current = null;
      setDragging(false);
      setDragX(0);
      if (Math.abs(delta) > 50) navigate(delta < 0 ? "next" : "prev");
    },
    [navigate],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    setDragX(e.clientX - dragStart.current);
  };
  const onPointerUp = (e: React.PointerEvent) => endDrag(e.clientX);

  const center = activeIndex;
  const left = (activeIndex + 3) % 4;
  const right = (activeIndex + 1) % 4;
  const back = (activeIndex + 2) % 4;

  const roleStyle = (i: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      aspectRatio: "1.25 / 1",
      transition: `transform ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, left ${DURATION}ms ${EASE}`,
      willChange: "transform, filter, opacity",
    };
    if (i === center)
      return {
        ...base,
        transform: `translateX(-50%) scale(${isMobile ? 1.05 : 1.12})`,
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 20,
        left: "50%",
        height: isMobile ? "36%" : "46%",
        bottom: isMobile ? "30%" : "10%",
      };
    if (i === left)
      return {
        ...base,
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? "14%" : "24%",
        height: isMobile ? "12%" : "22%",
        bottom: isMobile ? "36%" : "16%",
      };
    if (i === right)
      return {
        ...base,
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? "86%" : "76%",
        height: isMobile ? "12%" : "22%",
        bottom: isMobile ? "36%" : "16%",
      };
    return {
      ...base,
      transform: "translateX(-50%) scale(1)",
      filter: "blur(4px)",
      opacity: 1,
      zIndex: 5,
      left: "50%",
      height: isMobile ? "10%" : "17%",
      bottom: isMobile ? "36%" : "16%",
    };
  };

  const active = IMAGES[activeIndex]!;

  return (
    <div
      style={{
        backgroundColor: active.bg,
        transition: `background-color ${DURATION}ms ${EASE}`,
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        {/* Grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: GRAIN,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Brand */}
        <div
          className="absolute top-6 left-4 sm:left-8 flex items-end gap-1"
          style={{ zIndex: 60 }}
        >
          <svg
            viewBox="0 0 46 46"
            role="img"
            aria-hidden="true"
            style={{ height: "2.1em", width: "auto", display: "block", overflow: "visible" }}
          >
            <defs>
              <linearGradient id="lgA" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#F97316" />
                <stop offset="0.5" stopColor="#A855F7" />
                <stop offset="1" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id="lgBristle" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3B82F6" />
                <stop offset="1" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <text
              x="1"
              y="41"
              fontFamily="'Playfair Display', Georgia, serif"
              fontSize="46"
              fontWeight="800"
              fill="url(#lgA)"
            >
              A
            </text>
            <g transform="rotate(38 24 12)">
              <rect x="14" y="4" width="4.2" height="17" rx="2.1" fill="#E7C48A" />
              <rect x="13.6" y="20" width="5" height="4.4" rx="1" fill="#C9CDD6" />
              <path
                d="M14.2 24.4 L18.6 24.4 L17.2 33 Q16.4 35.4 15.8 33 Z"
                fill="url(#lgBristle)"
              />
            </g>
            <circle cx="31" cy="29" r="2.2" fill="#F97316" />
            <circle cx="35.5" cy="24" r="1.5" fill="#A855F7" />
            <circle cx="38.5" cy="30.5" r="1.1" fill="#3B82F6" />
            <path
              d="M29 33 q3 2.4 7 1.6"
              stroke="#A855F7"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              paddingBottom: "0.06em",
              background: "linear-gradient(92deg,#F97316 0%,#A855F7 45%,#3B82F6 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontSize: "1.6rem",
            }}
          >
            rtLivre
          </span>
        </div>

        {/* Carousel (arrastável) */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
          onDragStart={(e) => e.preventDefault()}
          onClickCapture={(e) => {
            if (Math.abs(dragX) > 5) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            touchAction: "pan-y",
            cursor: dragging ? "grabbing" : "grab",
            userSelect: "none",
            transform: `translateX(${dragX * 0.25}px)`,
            transition: dragging ? "none" : `transform ${DURATION}ms ${EASE}`,
          }}
        >
          {IMAGES.map((img, i) => (
            <div
              key={img.src}
              style={{
                ...roleStyle(i),
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
                backgroundColor: img.panel,
              }}
            >
              <img
                src={img.src}
                alt={`Pintura ${img.title}, de ${img.artist}`}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom-left text + nav buttons */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 340 }}
        >
          <p
            className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px]"
            style={{ color: "white", opacity: 0.95, letterSpacing: "0.02em" }}
          >
            OBRAS EM DESTAQUE
          </p>
          <p
            key={activeIndex}
            className="text-xs sm:text-sm mb-4 sm:mb-5 animate-fade-in"
            style={{ color: "white", opacity: 0.85, lineHeight: 1.6 }}
          >
            <strong style={{ display: "block", fontSize: "1.05em" }}>{active.title}</strong>
            {active.artist} — Publique suas pinturas, siga artistas e monte a
            sua galeria pessoal no ArtLivre.
          </p>
          <div className="flex gap-3 sm:gap-4">
            <button
              aria-label="Obra anterior"
              onClick={() => navigate("prev")}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white"
              style={{
                backgroundColor: "transparent",
                border: "2px solid white",
                cursor: "pointer",
                transition: "transform 150ms, background-color 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              aria-label="Próxima obra"
              onClick={() => navigate("next")}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white"
              style={{
                backgroundColor: "transparent",
                border: "2px solid white",
                cursor: "pointer",
                transition: "transform 150ms, background-color 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Soft fade into the next section (matches the site's night blue) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "22vh",
            zIndex: 40,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(10,17,40,0) 0%, #0A1128 100%)",
          }}
        />
      </div>
    </div>
  );
}
