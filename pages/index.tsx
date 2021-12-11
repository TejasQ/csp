import { GetServerSideProps } from "next";
import { FC, useEffect, useState } from "react";
import { Gif } from "./api/gifs";

const Index: FC = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);

  useEffect(() => {
    fetch("/api/gifs")
      .then((r) => r.json())
      .then(setGifs);
  }, []);

  return (
    <>
      <h1>Feel ma GIF POWAH!!!</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {gifs.map((g) => (
          <div key={g.id}>
            <img alt={g.title} src={g.images.original.url} />
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-eval' localhost:3000; img-src giphy.com; report-uri https://webhook.site/d7f184fa-7ff6-43b4-a24f-32549694d238"
  );
  return { props: {} };
};

export default Index;
