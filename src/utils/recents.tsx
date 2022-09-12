interface ArtistsRecents {
  name: string;
  image: {
    url: string;
    alt: string;
  };
  band: string;
}

export const RecentsArtistsItems: ArtistsRecents[] = [
  {
    name: "American Idiot",
    band: "Green Day",
    image: {
      alt: "imagem da banda",
      url: "https://i.scdn.co/image/ab67616d00001e0208a1b1e0674086d3f1995e1b",
    },
  },
  {
    name: "Sgt. Pepper's Lonely Hearts Club Band",
    band: "The Beatles",
    image: {
      alt: "imagem da banda",
      url: "https://i.scdn.co/image/ab67616d0000b27334ef8f7d06cf2fc2146f420a",
    },
  },
  {
    name: "Supermassive Black Holes",
    band: "Muse",
    image: {
      alt: "imagem da banda",
      url: "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400",
    },
  },
  {
    name: "Nevermind",
    band: "Nirvana",
    image: {
      alt: "imagem da banda",
      url: "https://i.scdn.co/image/ab67616d00001e02fdf71af87c2a4f3cbed53d65",
    },
  },
  {
    name: "Sheer Heart Attack",
    band: "Queen",
    image: {
      alt: "imagem da banda",
      url: "https://i.scdn.co/image/ab67616d0000b2737dafc1684ef3c22283811454",
    },
  },
  {
    name: "The Dark Side of the Moon",
    band: "Pink Floyd",
    image: {
      alt: "imagem da banda",
      url: "https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe",
    },
  },
];
