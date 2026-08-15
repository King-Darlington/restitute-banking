import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  base: "/", 
  plugins: [
    // Configure the TanStack Start plugin to emit a Nitro build targeted for Vercel
    // Cast to `any` because the plugin's TypeScript types don't expose the `nitro` option.
    tanstackStart({ nitro: { preset: "vercel" } } as any),
    react(),
    tailwindcss(),
  ],
  resolve: { 
    tsconfigPaths: true,
  },
});
