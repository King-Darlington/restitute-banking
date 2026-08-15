import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  base: "/", 
  plugins: [
    // Configure the TanStack Start plugin to emit a Nitro build targeted for Vercel
    tanstackStart({ nitro: { preset: "vercel" } }),
    react(),
    tailwindcss(),
  ],
  resolve: { 
    tsconfigPaths: true,
  },
});
