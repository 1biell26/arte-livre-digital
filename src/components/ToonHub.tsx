import { useCallback, useEffect, useState } from "react";
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
        transform: `translateX(-50%) scale(${isMobile ? 1.1 : 1.35})`,
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 20,
        left: "50%",
        height: isMobile ? "42%" : "62%",
        bottom: isMobile ? "26%" : "6%",
      };
    if (i === left)
      return {
        ...base,
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? "16%" : "26%",
        height: isMobile ? "13%" : "24%",
        bottom: isMobile ? "34%" : "14%",
      };
    if (i === right)
      return {
        ...base,
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? "84%" : "74%",
        height: isMobile ? "13%" : "24%",
        bottom: isMobile ? "34%" : "14%",
      };
    return {
      ...base,
      transform: "translateX(-50%) scale(1)",
      filter: "blur(4px)",
      opacity: 1,
      zIndex: 5,
      left: "50%",
      height: isMobile ? "11%" : "19%",
      bottom: isMobile ? "34%" : "14%",
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

        {/* Giant ghost text */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2, top: "14%" }}
        >
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(90px, 26vw, 380px)",
              fontWeight: 900,
              color: "white",
              opacity: 1,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            ARTE VIVA
          </span>
        </div>

        {/* Brand */}
        <div
          className="absolute top-6 left-4 sm:left-8"
          style={{
            zIndex: 60,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "white",
            opacity: 0.9,
            letterSpacing: "0.18em",
          }}
        >
          ARTLIVRE
        </div>

        {/* Carousel */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
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

        {/* Bottom-right link */}
        <a
          href="#galeria"
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(20px, 4vw, 56px)",
            fontWeight: 400,
            color: "white",
            opacity: 0.95,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 200ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.95")}
        >
          EXPLORAR
          <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  );
}
