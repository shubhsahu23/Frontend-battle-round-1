# Prism — AI-Powered Analytics Platform

Prism is a premium, high-performance SaaS landing page built for modern data teams. It features award-winning 3D visual experiences, rich data visualizations, and sophisticated micro-interactions, combining a Stripe-level premium aesthetic with accessible, semantic code.

![Prism Banner](https://via.placeholder.com/1200x600/172B36/FFC801?text=Prism+Analytics)

## 🚀 Features

- **Premium 3D Experiences**: Powered by Three.js and React Three Fiber, featuring an interactive rotating globe with particles, and 3D bento grid hover effects.
- **Enterprise Dashboards**: Real-time mock data visualizations built with Recharts, including area charts, bar charts, and donut charts.
- **Dynamic Scroll Animations**: Smooth staggered reveals, scroll-triggered SVG drawing, and parallax effects using the Intersection Observer API.
- **Micro-Interactions**: Custom Web Animations API ripple effects, CSS shine sweeps, magnetic hover glows, and 3D tilt cards.
- **Accessible & Performance First**: Fully respects `prefers-reduced-motion` settings, lazy-loaded heavy chunks (Three.js and Recharts), and fully responsive on all screen sizes.
- **Modern Tech Stack**: React 18, Vite, and Tailwind CSS.

## 🛠 Tech Stack

- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Vanilla CSS for complex keyframes
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: SVG wrappers

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd "frontend battle"
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173` to view the application.

## 🏗 Build for Production

To create an optimized production build, run:
```bash
npm run build
```
This will compile and split the chunks (Three.js and Recharts are chunked independently for fast initial load times).

## 📂 Project Structure

```
src/
├── components/
│   ├── 3d/           # Three.js scenes (Globe, Bento mini-scenes)
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, Features, Statistics, AnalyticsDashboard, Pricing
│   └── ui/           # Reusable components (Button, Badge, Cards)
├── constants/        # Static data, chart mocks, pricing configurations
├── hooks/            # Custom hooks (useScrollReveal, useReducedMotion)
├── styles/           # Global styles and complex CSS animations
├── utils/            # Helper functions (e.g., price calculation)
├── App.jsx           # Main application structure
└── main.jsx          # Entry point
```

## 🎨 Design Philosophy

Prism follows a "dark mode native" aesthetic with vibrant neon accents (Mint, Yellow, Teal). The UI prioritizes depth, clarity, and spatial relationships, ensuring that 3D elements remain decorative and never block the user's primary journey or text readability.

---
*Built for the Frontend Hackathon.*
