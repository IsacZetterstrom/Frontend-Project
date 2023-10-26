import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
<<<<<<< HEAD
      '/api': {
        target: 'http://localhost:3050',
        changeOrigin: true,
        secure: false
      }
    }

  }
});
=======
      "/api": {
        target: "http://localhost:3050/",
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: `http://localhost:3050`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
>>>>>>> 2734279e2c7e68452986b4b90b04fdba679525e1
