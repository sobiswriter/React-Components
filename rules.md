# 📜 RULES.md — Component Authorship & Engineering Standards

> **Purpose**: This file defines the mandatory conventions, directory structure, and design rules for authoring and adding new components to the `React Components` repository. All future components (whether authored by AI agents or human contributors) must adhere strictly to these rules.

---

## 🏛 1. Core Architecture Philosophy

1. **Self-Containment (Zero Coupling)**:
   - Each component must live inside its own standalone folder under `src/<component-name>/` (e.g. `src/galaxy/`, `src/dock/`, `src/carousel/`).
   - Components **MUST NEVER** import code, assets, or types from another component folder.
   - A component folder should be 100% copy-pasteable into any external React project without breaking.

2. **Full Code Ownership (shadcn / 21st.dev Style)**:
   - Avoid creating heavy proprietary npm packages when simple, self-contained TypeScript files provide better flexibility and transparency.
   - Everything required to run the component (types, styles, animations, sub-components, engines) must reside inside that component's folder.

---

## 📂 2. Standard Component Folder Structure

When creating a new component `src/<component-name>/`, include the following structure:

```text
src/<component-name>/
├── index.ts                # [REQUIRED] Public API / barrel export
├── <ComponentName>.tsx     # [REQUIRED] Master React component (entry point)
├── types.ts                # [REQUIRED] All TypeScript interfaces, types, and Props
├── <component-name>.css    # [OPTIONAL/RECOMMENDED] Self-contained CSS (animations, scrollbars)
├── README.md               # [REQUIRED] 3-step copy-paste integration guide for developers
└── ... (sub-components, shaders, engines, hooks, audio, config)
```

### Folder Blueprint Example:
```text
src/dock/
├── index.ts
├── Dock.tsx
├── DockItem.tsx
├── types.ts
├── dock.css
└── README.md
```

---

## 📦 3. Public API & Export Rules (`index.ts`)

Every component folder must provide a clean public API in its `index.ts`:

1. **Named and Default Export**:
   ```tsx
   export { Galaxy, default } from './Galaxy';
   ```
2. **Export Types**:
   ```tsx
   export * from './types';
   ```
3. **Export Configs / Helpers**:
   Export any default configuration objects or underlying engines so advanced users can customize them:
   ```tsx
   export { GALAXY_DESTINATIONS } from './destinations';
   export { GalaxyEngine } from './GalaxyEngine';
   ```

---

## 🎨 4. Styling & CSS Rules

1. **Tailwind First**: Use standard Tailwind CSS utility classes for layout, flexbox, grid, and colors.
2. **Self-Contained Animations**: If a component requires custom `@keyframes`, custom scrollbars, or pseudo-elements not covered by standard Tailwind utilities, declare them in a local `<component-name>.css` and import it inside `<ComponentName>.tsx`.
3. **Color Customization**: Support color customization via props (e.g. `accentColor`, `theme`, `color`) or CSS variables.
4. **Theme Resilience**: Ensure the component looks incredible against dark backgrounds (the primary theme of this portfolio suite) while supporting container-level styling via an optional `className` prop.

---

## ⚡ 5. Performance & Resource Cleanup Standards

1. **WebGL / Canvas Cleanup**:
   - Every Three.js / Canvas component must have a `destroy()` or `dispose()` method.
   - Geometries, materials, textures, and renderers must be explicitly disposed on unmount:
     ```ts
     geometry.dispose();
     material.dispose();
     renderer.dispose();
     ```
   - Always cancel animation frames:
     ```ts
     if (this.animationFrameId !== null) cancelAnimationFrame(this.animationFrameId);
     ```

2. **Event Listeners**:
   - Any `window` or `document` listeners (mouse, resize, keyboard, touch) added in `useEffect` or classes must be cleanly removed in cleanup functions:
     ```tsx
     useEffect(() => {
       window.addEventListener('keydown', handleKey);
       return () => window.removeEventListener('keydown', handleKey);
     }, []);
     ```

3. **Cap Device Pixel Ratio**:
   - Always clamp DPR to prevent GPU melting on 4K/Retina displays:
     ```ts
     const dpr = Math.min(window.devicePixelRatio || 1, 2);
     renderer.setPixelRatio(dpr);
     ```

4. **Web Audio Lifecycle**:
   - Audio contexts should be lazily initialized on user interaction to comply with modern browser autoplay policies.
   - Provide a persistent mute state option (defaulting to `isMuted: true`).

---

## 🧪 6. How `App.tsx` Should Showcase Components

`src/App.tsx` serves as the live development testbed and showcase viewer:

1. **Single Active Component or Component Switcher**:
   - Currently, `App.tsx` renders `<Galaxy />`.
   - When new components are introduced, `App.tsx` can either:
     - Render the new component during development.
     - Provide a minimal top/bottom switcher or tabs to preview all available components in the repository.

2. **Do Not Pollute `src/` Root**:
   - Keep `src/` minimal:
     - `src/assets/`
     - `src/<component-1>/`
     - `src/<component-2>/`
     - `src/App.tsx`
     - `src/index.css`
     - `src/main.tsx`

---

## 📝 7. Component Documentation Standard (`README.md`)

Each component folder **MUST** contain a concise `README.md` containing:
1. **Title & Brief Summary**: What does this component do?
2. **Installation Dependencies**: Which packages are needed (e.g. `npm i three lucide-react`).
3. **Quick Start Code**: A minimal, copy-pasteable example showing how to render it.
4. **Props & Customization Table**: Explaining all props, types, and callbacks.
