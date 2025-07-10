import { useState, useEffect } from "react";

const Breathe = () => {
  const steps = ["Inhale", "Hold", "Exhale", "Hold"];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 4000); // 4 seconds
    return () => clearInterval(timer);
  }, []);

  const boxSize = ["Inhale", "Exhale"].includes(steps[step])
    ? (steps[step] === "Inhale" ? "w-40 h-40" : "w-24 h-24")
    : "w-32 h-32";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-auraGray text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-4">Box Breathing (4-4-4-4)</h1>

      <div className={`transition-all duration-1000 bg-blue-300 ${boxSize} rounded-sm mb-4`} />

      <p className="text-xl font-medium mb-8">{steps[step]}</p>

      <p className="max-w-xl text-center text-gray-700 text-sm">
        <strong>Box Breathing</strong> (or the <strong>4-4-4-4 technique</strong>) helps calm your nervous system.
        You breathe in for 4 seconds, hold for 4, exhale for 4, and hold again for 4.
        It's often used to reduce anxiety and regain focus.
      </p>
    </div>
  );
};

export default Breathe;
