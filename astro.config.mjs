// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  redirects: {
    '/blog/2026-06-02-sokrates-diogenes-artikel': '/blog/2026-06-02-belajar-berkata-tidak'
  },
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'security-headers',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            // Block access to sensitive files
            if (req.url?.match(/\/(package\.json|package-lock\.json|.*config\.(mjs|js|ts)|tsconfig\.json)/)) {
              res.statusCode = 403;
              res.end('Forbidden');
              return;
            }
            
            // Security headers
            res.setHeader('X-Frame-Options', 'SAMEORIGIN');
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
            res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
            res.setHeader('Content-Security-Policy', 
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://giscus.app; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-src https://giscus.app;"
            );
            next();
          });
        }
      }
    ],
    server: {
      fs: {
        deny: [
          '**/.env',
          '**/package.json',
          '**/package-lock.json',
          '**/*config.*',
          '**/tsconfig.json'
        ]
      }
    }
  },
  site: 'https://riskipriyadii.github.io',
  base: '/sinibaca/',
  output: 'static',
});
