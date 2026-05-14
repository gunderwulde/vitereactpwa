# Vite React PWA

Aplicacion React + Vite publicada en GitHub Pages con soporte PWA.

## Requisitos

- Node.js 20+
- npm

## Scripts

- npm run dev: inicia entorno local
- npm run build: compila app y genera service worker
- npm run preview: sirve la build local
- npm run deploy: publica dist en la rama gh-pages

## Publicacion en GitHub Pages

1. Verifica que el repositorio se llame vitereactpwa (o ajusta base y homepage si cambia).
2. Ejecuta deploy:

   npm run deploy

3. En GitHub, ve a Settings > Pages.
4. En Build and deployment selecciona:
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: /(root)
5. Espera 1-3 minutos y abre:

   https://gunderwulde.github.io/vitereactpwa/

## Checklist de PWA en produccion

1. Abre la web publicada en Chrome.
2. DevTools > Application > Manifest:
   - name y short_name visibles
   - iconos 192x192 y 512x512 cargados
3. DevTools > Application > Service Workers:
   - estado activated and is running
4. DevTools > Application > Cache Storage:
   - existe cache de workbox
5. Prueba instalacion:
   - aparece boton Install app en navegador
6. Prueba offline:
   - con la app abierta, activa modo Offline en Network
   - recarga y verifica que siga cargando

## Notas de configuracion

- Base para GitHub Pages: /vitereactpwa/
- Manifest scope/start_url: /vitereactpwa/
- Registro SW: virtual:pwa-register
- Tipos TS para PWA: src/vite-env.d.ts
