import './MainView.css';
import DotGrid from '../react_bits/DotGrid/DotGrid';

// Renders DotGrid as a background layer and any children as the foreground overlay.
export default function MainView({ children }) {
  return (
    <main className="main-content">
      <div className="dotgrid-bg" aria-hidden>
        <DotGrid
          dotSize={2}
          gap={44}
          baseColor="#c84340ff"
          activeColor="#c84340ff"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div className="main-overlay">
        {children}
      </div>
    </main>
  );
}
