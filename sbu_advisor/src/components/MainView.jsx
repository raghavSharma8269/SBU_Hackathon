import './MainView.css';
import DotGrid from '../react_bits/DotGrid/DotGrid';

export default function MainView() {
  return (
    <main className="main-content">
      <DotGrid
        dotSize={2}
        gap={44}
        baseColor="#5227FF"
        activeColor="#5227FF"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
    </main>
  );
}
