import restart from "vite-plugin-restart";

/** @type {import("vite").UserConfig} */
const config = {
  server: {
    host: true, // Open to local network and display URL
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    sourcemap: true, // Add sourcemap
  },
  plugins: [
    restart({ restart: ["./public/**"] }), // Restart server on static file change
  ],
};

export default config;
