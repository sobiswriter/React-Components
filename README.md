# ⚛️ React Components

> A curated collection of high-craft, production-ready, interactive React & WebGL components designed for modern portfolios, spatial interfaces, and creative web experiences.

Built with the **copy-paste philosophy** (inspired by [shadcn/ui](https://ui.shadcn.com) and [21st.dev](https://21st.dev)): no heavy third-party npm lock-in, no opaque abstractions—just pure, self-contained, typed TypeScript components you can drop directly into your project.

---

## 🌟 Available Components

| Component | Path | Description | Tech Stack | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Galaxy** | [`src/galaxy/`](./src/galaxy) | Interactive 3D particle "home galaxy" spatial navigation system with Lin-Shu density waves, starlight diffraction spikes, and cinematic section travel. | Three.js, WebGL, GLSL, Web Audio API, Tailwind CSS | **Production Ready** |

*(More components coming soon: Kinetic Docks, Fluid Simulators, Bento Grids, and Audio Reactive Canvases).*

---

## 🌌 Featured Component: Galaxy Navigation

A permanent interactive cosmic environment that acts as the primary spatial navigation system for portfolio websites.

### Key Features
* **GPU Particle Physics**: Renders thousands of distinct stars with smooth 60fps performance and clamped device pixel ratio (`dpr <= 2`).
* **Lin-Shu Density Wave Simulation**: Solves the classic astronomical "winding problem" by keeping spiral arms stable over time while stars continuously stream inward through accretion channels.
* **Optical Diffraction Spikes**: Custom GLSL shaders simulating James Webb Space Telescope 4-point cross diffraction spikes with analytical razor-sharp starlight nuclei.
* **Exact Mathematical Arm Alignment**: Landmarks are locked directly to spiral arm logarithmic equations so destination pins remain anchored along starlight filaments without drifting into empty space.
* **Calm Orbital Cursor Traction**: A localized tangential vortex swirl that gently circulates stars in fluid, slow orbits under the pointer without blowing them off into the dark void.
* **Zero-Dependency Web Audio Synthesis**: Built-in harmonic sub-bass drones, hover chimes, and warp whooshes generated via the native Web Audio API (with sound toggle).
* **Cinematic Travel & Return**: Smooth camera warp transitions into destination inspection views with instant `ESC` or button return to the home galaxy.
* **Dynamic Slow-Motion Drift**: The galaxy gently slows down to a majestic drift (`0.0075 rad/s`) during section visits, smoothly orbiting with the active station.

---

## 🚀 How to Use Any Component in Your Project

Every component in this repository is completely **self-contained** in its own folder under `src/`.

### 1. Copy the Component Folder
Copy the desired component folder (e.g. [`src/galaxy`](./src/galaxy)) directly into your project:

```text
your-project/
├── src/
│   ├── components/
│   │   └── galaxy/       <--- Paste here
```

### 2. Install Peer Dependencies
Install the required packages for that component (see the component's `README.md`):

```bash
# For Galaxy:
npm install three lucide-react
npm install -D @types/three
```

### 3. Import & Render
```tsx
import { Galaxy } from './components/galaxy';

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Galaxy />
    </main>
  );
}
```

---

## 🛠 Customizing Galaxy Destinations

You can provide your own portfolio sections and callbacks:

```tsx
import { Galaxy, DestinationConfig } from './components/galaxy';

const mySections: DestinationConfig[] = [
  {
    id: 'work',
    name: 'WORK',
    subtitle: 'Production Applications & Systems',
    sectorCode: '01 / WORK',
    route: '/work',
    armIndex: 0,
    progress: 0.20,
    position: [-0.89, 0.05, 1.94],
    color: '#bae6fd',
    accentColor: '#0284c7',
    clusterRadius: 0.7,
    clusterParticleCount: 30,
    description: 'High-scale web platforms, distributed systems, and WebGL experiences.',
    stats: [{ label: 'Projects', value: '12' }],
    tags: ['React', 'Three.js', 'TypeScript'],
  },
  // Add additional sections...
];

export default function Portfolio() {
  return (
    <Galaxy
      destinations={mySections}
      onDestinationSelect={(dest) => console.log('Warped to:', dest.name)}
      onReturnHome={() => console.log('Returned to galaxy')}
      initialMuted={false}
    />
  );
}
```

---

## 💻 Local Development & Preview

Clone the repository to explore, preview, and build components locally:

```bash
# Clone the repository
git clone https://github.com/your-username/react-components.git

# Enter the project directory
cd react-components

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build
```

---

## 📚 Documentation for Developers & AI Agents

* **[`memories.md`](./memories.md)**: Deep technical context, architectural decisions, and physics breakdowns (for AI agents and contributors).
* **[`rules.md`](./rules.md)**: Standards, file conventions, and rules for authoring new components in this repository.
* **[`src/galaxy/README.md`](./src/galaxy/README.md)**: Standalone component documentation for the Galaxy navigation system.

---

## 📄 License

MIT License. Free to use, modify, and distribute for personal and commercial projects.
