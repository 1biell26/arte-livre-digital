import { createFileRoute } from "@tanstack/react-router";

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
  return (
    <iframe
      src="/artlivre.html"
      title="ArtLivre"
      style={{ border: "none", width: "100%", height: "100vh", display: "block" }}
    />
  );
}
