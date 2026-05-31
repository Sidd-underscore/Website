export default function manifest() {
  return {
    name: "Sidd",
    short_name: "Sidd",
    description: "I code, produce films, design lights, and more",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
