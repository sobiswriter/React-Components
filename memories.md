# 🧠 MEMORIES.md — Workspace Context & Technical Memory

> **Note for AI Agents & Developers**: This document captures the complete architectural journey, technical breakthroughs, mathematical formulas, and design decisions behind the codebase. Read this file to instantly understand how the workspace is structured without scouring the entire project.

---

## 🌌 1. Workspace Identity & Mission

* **Repository**: `React Components`
* **Philosophy**: A curated collection of modular, production-grade, high-craft interactive React components built with modern TypeScript, WebGL, and Tailwind CSS.
* **Architecture Pattern**: Self-contained component folders (shadcn / 21st.dev style). Every component lives in its own dedicated subfolder under `src/` (e.g., `src/galaxy/`) with zero external coupling, making it trivially easy to copy-paste into any external project.

---

## 🚀 2. Active Components

### `Galaxy` (`src/galaxy/`)
A GPU-accelerated, interactive 3D particle "home galaxy" designed as a spatial navigation system for portfolio websites.

* **Functional Inspiration**: The spatial navigation concept of GPT-6 Astra / Folio Verse ("a living cosmic environment acts as spatial navigation").
* **Aesthetic Identity**: Grounded in astronomical reality (Hubble & James Webb starlight cross diffraction spikes, warm amber and icy blue stellar populations, Lin-Shu density wave arms, dense barred galactic bulge, and sparse ambient background stars).

---

## 🔬 3. Key Technical Challenges & Breakthroughs

### A. The "Winding Problem" (Keplerian Shear vs. Lin-Shu Density Waves)
* **The Failure**: Early galaxy simulations used Keplerian orbital mechanics ($\omega(r) \propto 1/\sqrt{r}$). Because inner stars revolve much faster than outer stars, spiral arms sheared and coiled into an unrecognizable, tangled knot within ~30 seconds.
* **The Solution**: **Lin-Shu Density Wave Theory**.
  - Spiral arms rotate as a rigid pattern speed:
    $$\Omega_{\text{pattern}} = 0.038\text{ rad/s}$$
  - Stars are treated as a fluid streaming *inward* along the arms towards the galactic core at accretion velocity $v_{\text{inward}}$, dissolving at the inner nucleus ($t < 0.08$) and seamlessly recycling back to the outer arm tip ($t = 1.0 \to 0.0$).
  - Result: The spiral arms maintain their structural form forever without collapsing or deforming.

---

### B. Mathematical Arm Locking for Landmark Stations
* **The Failure**: Initially, portfolio destinations (`WORK`, `EXPERIMENTS`, `LAB`, `ABOUT`, `PLAYGROUND`, `CONTACT`) were assigned hardcoded Euclidean coordinates $[X, Y, Z]$. Because hand-picked coordinates did not perfectly match the spiral logarithmic curve, landmark pins floated awkwardly in the dark void outside the galaxy.
* **The Solution**: Landmark positions are computed directly from the spiral arm equation:
  $$r(t) = 0.55 + 9.6 \cdot t^{1.12}$$
  $$\theta(t) = \theta_{\text{arm}} + 6.8 \cdot t^{0.76} + \Theta_{\text{pattern}}$$
  - **Arm A (Arm 0)**:
    - `WORK`: Inner Filament ($t = 0.20$, $r = 2.13$, $\theta = 115^\circ$)
    - `EXPERIMENTS`: Mid Arch ($t = 0.48$, $r = 4.77$, $\theta = 223^\circ$)
    - `LAB`: Outer Sweep ($t = 0.76$, $r = 7.61$, $\theta = 316^\circ$)
  - **Arm B (Arm 1, offset by $\pi$)**:
    - `ABOUT`: Inner Filament ($t = 0.20$, $r = 2.13$, $\theta = 295^\circ$)
    - `PLAYGROUND`: Mid Arch ($t = 0.48$, $r = 4.77$, $\theta = 43^\circ$)
    - `CONTACT`: Outer Sweep ($t = 0.76$, $r = 7.61$, $\theta = 136^\circ$)
  - Landmark stars and 2D HUD pins are locked to these coordinates every frame. They never drift or go out of place.

---

### C. Needle-Sharp Optical Diffraction Spike Shaders
* **The Failure**: Standard Gaussian blur sprites resulted in blurry 50px white blobs when the camera zoomed in or approached sections.
* **The Solution**: Custom GLSL fragment shader simulating James Webb Space Telescope optical diffraction spikes:
  - **Analytical Razor Core**: `float core = pow(clamp(1.0 - d * 2.2, 0.0, 1.0), 3.5);`
  - **4-Point Cross Spikes**:
    $$\text{intensity}_{\text{spike}} = e^{-|y| \cdot 75.0} \cdot e^{-|x| \cdot 3.0} + e^{-|x| \cdot 75.0} \cdot e^{-|y| \cdot 3.0}$$
  - **Point Size Invariance**: `baseSize = aSize;` capped between `1.5px` and `22.0px`. Stars never blow up or blur; they remain crisp, sparkling starlight jewels.

---

### D. Calm, Localized Cursor Swirl Vortex
* **The Failure**: Initial cursor repulsion blasted stars violently away across a massive radius ($R = 2.85$, force $2.8$), causing violent chaotic whipping.
* **The Solution**:
  - Small, intimate interaction radius: $R = 1.15$
  - Tangential orbital torque ($\vec{T} = (-dz, 0, dx) / \|\vec{D}\|$):
    $$\vec{V} += \vec{T} \cdot (1.0 - d/R)^{1.5} \cdot 0.117$$
  - Centripetal stabilization keeps particles orbiting in a gentle, slow eddy.
  - Viscous fluid damping ($0.90$) and spring restitution ($0.08$) ensure fluid, relaxing dynamics.

---

### E. Dynamic Slow-Motion Section Visits
* Rather than freezing the galaxy when a user enters a destination, the galaxy pattern speed smoothly decelerates from `0.038 rad/s` down to `0.0075 rad/s` (a slow, majestic drift).
* The camera smoothly interpolates and tracks the destination's slow orbital movement, keeping the station centered while the cosmic background evolves.
* Returning to Home smoothly accelerates rotation back to normal speed.

---

### F. Modular Component Architecture Refactoring
* Consolidated all scattered code into a single self-contained directory: `src/galaxy/`.
* Created clean public API in `src/galaxy/index.ts`.
* Wrapped all navigation state, WebGL canvas, HUD, audio synthesizer, and section views inside `<Galaxy />`.
* Cleaned up redundant loose root folders (`src/components`, `src/audio`, `src/config`, `src/types`).
* `src/App.tsx` now simply renders `<Galaxy />`.

---

## 📁 4. Directory Map of `src/galaxy/`

| File | Purpose |
| :--- | :--- |
| `index.ts` | Public API & barrel export (`Galaxy`, `GalaxyEngine`, types, config) |
| `Galaxy.tsx` | Master React wrapper with state, audio triggers, and hash routing |
| `GalaxyCanvas.tsx` | Canvas element, WebGL engine lifecycle, and landmark projection layer |
| `GalaxyEngine.ts` | Core Three.js simulation, Lin-Shu density wave math, and particle physics |
| `shaders.ts` | Custom GLSL vertex and fragment shaders (diffraction spikes & accretion fade) |
| `SpatialLandmark.tsx` | Interactive 2D HTML/DOM starlight pins and hover preview cards |
| `CosmicHud.tsx` | Minimal HUD header, direct section navigation, and audio controls |
| `DestinationView.tsx` | Glassmorphic section inspection view, ESC listener, and return trigger |
| `destinations.ts` | 6 portfolio destinations mathematically anchored to spiral arm filaments |
| `audio.ts` | Zero-dependency Web Audio API synthesizer (ambient drone, chimes, warp whoosh) |
| `galaxy.css` | Self-contained animations (`fadeIn`) and custom scrollbar styling |
| `types.ts` | Full TypeScript definitions for galaxy hierarchy, destinations, and props |
| `README.md` | Standalone copy-paste integration guide for external developers |

---

## 🛠 5. Tech Stack & Dependencies

* **Language**: TypeScript 5.9
* **Framework**: React 19 (`react`, `react-dom`)
* **3D Graphics**: Three.js (`three`, `@types/three`)
* **Icons**: Lucide React (`lucide-react`)
* **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
* **Build Tool**: Vite 8.3
