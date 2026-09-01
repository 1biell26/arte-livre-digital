import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ToonHub from "@/components/ToonHub";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ArtLivre — Rede social de artistas e pinturas" },
      {
        name: "description",
        content:
          "ArtLivre: publique suas pinturas, siga artistas e monte sua galeria pessoal de obras.",
      },
      { property: "og:title", content: "ArtLivre — Rede social de artistas" },
      {
        property: "og:description",
        content:
          "Publique pinturas, siga artistas e construa seu perfil de obras no ArtLivre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ro: ResizeObserver | undefined;
    const sync = () => {
      const doc = el.contentDocument;
      if (!doc?.body) return;
      setHeight(doc.documentElement.scrollHeight);
      if (!ro) {
        ro = new ResizeObserver(() =>
          setHeight(doc.documentElement.scrollHeight),
        );
        ro.observe(doc.body);
      }
    };
    el.addEventListener("load", sync);
    sync();
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("load", sync);
      window.removeEventListener("resize", sync);
      ro?.disconnect();
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#0A1128" }}>
      <ToonHub />
      {/* Faixa de transição entre o carrossel e o restante do site */}
      <div
        style={{
          background:
            "linear-gradient(to bottom, #0A1128 0%, #0A1128 60%, rgba(10,17,40,0.9) 100%)",
          textAlign: "center",
          padding: "2.5rem 1.5rem 3.5rem",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <p
          style={{
            color: "#E8C547",
            letterSpacing: "0.3em",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Arraste para explorar as obras
        </p>
        <div
          style={{
            width: 1,
            height: 56,
            margin: "0 auto",
            background:
              "linear-gradient(to bottom, rgba(232,197,71,0.7), rgba(232,197,71,0))",
          }}
        />
      </div>
      <iframe
        ref={ref}
        src="/artlivre.html"
        title="ArtLivre"
        scrolling="no"
        style={{
          border: "none",
          width: "100%",
          height: height ? `${height}px` : "100vh",
          display: "block",
          backgroundColor: "#0A1128",
        }}
      />
    </div>
  );
}
