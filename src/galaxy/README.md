# Cosmic Galaxy Navigation Component

An interactive, GPU-accelerated 3D starlight particle galaxy for spatial portfolio navigation built with Three.js, React, and WebGL.

---

## 🚀 How to Add This Component to Any Project

### Step 1: Copy this folder
Simply copy this entire `galaxy/` folder into your React / Next.js / Vite project (e.g. inside `src/components/galaxy/` or `src/galaxy/`).

### Step 2: Install Dependencies
This component requires `three` and `lucide-react`:

```bash
npm install three lucide-react
npm install -D @types/three
```

*(If using Tailwind CSS, ensure Tailwind v3 or v4 is configured in your project for layout classes).*

### Step 3: Use the Component
Import and render `<Galaxy />` anywhere in your application:

```tsx
import { Galaxy } from './galaxy';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Galaxy />
    </div>
  );
}
```

---

## 🛠 Customizing Destinations

You can customize the destinations or handle selection callbacks:

```tsx
import { Galaxy, DestinationConfig } from './galaxy';

const myDestinations: DestinationConfig[] = [
  {
    id: 'projects',
    name: 'PROJECTS',
    subtitle: 'Production Applications & Systems',
    sectorCode: '01 / PRJ',
    route: '/projects',
    armIndex: 0,
    progress: 0.20,
    position: [-0.89, 0.05, 1.94],
    color: '#bae6fd',
    accentColor: '#0284c7',
    clusterRadius: 0.7,
    clusterParticleCount: 30,
    description: 'Scalable web systems, webGL interfaces, and full-stack architecture.',
    stats: [{ label: 'Completed', value: '12' }],
    tags: ['React', 'WebGL', 'TypeScript'],
  },
  // Add more destinations...
];

export default function Home() {
  return (
    <Galaxy
      destinations={myDestinations}
      onDestinationSelect={(dest) => console.log('Visited sector:', dest.name)}
      onReturnHome={() => console.log('Returned to home galaxy')}
      initialMuted={false}
    />
  );
}
```

---

## 📦 Exported API

From `./galaxy`:
- `Galaxy` (Default export & named export): Master component
- `GalaxyEngine`: Direct access to the Three.js particle simulation class
- `GALAXY_DESTINATIONS`: Default 6-sector configuration
- `cosmicAudio`: Synthesizer instance for ambient drone & chimes
- `types`: All TypeScript interfaces (`DestinationConfig`, `GalaxyProps`, etc.)
