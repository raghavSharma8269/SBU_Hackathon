import { useState } from "react";
import "./App.css";
import SplitText from "./SplitText";

function App() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  const [count, setCount] = useState(0);

  return (
    <>
      <SplitText
        text="Hello, GSAP!"
        className="text-2xl font-semibold text-center text-white"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />
    </>
  );
}

export default App;
