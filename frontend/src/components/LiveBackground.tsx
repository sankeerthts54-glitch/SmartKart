"use client";

/**
 * LiveBackground — 100% inline styles, no class dependencies.
 * Uses fixed positioning above body background but below all content.
 * Orbs use heavy opacity so they're clearly visible on dark background.
 */
export function LiveBackground() {
  const baseStyle: React.CSSProperties = {
    position: "fixed",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 0,
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* BLUE orb — top left */}
      <div
        style={{
          ...baseStyle,
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle at center, rgba(59,130,246,0.55) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)",
          filter: "blur(60px)",
          top: "-200px",
          left: "-200px",
          animation: "orbFloat1 10s ease-in-out infinite",
        }}
      />

      {/* PURPLE orb — right */}
      <div
        style={{
          ...baseStyle,
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle at center, rgba(168,85,247,0.50) 0%, rgba(168,85,247,0.15) 40%, transparent 70%)",
          filter: "blur(60px)",
          top: "20%",
          right: "-200px",
          animation: "orbFloat2 12s ease-in-out infinite",
        }}
      />

      {/* GREEN orb — bottom left */}
      <div
        style={{
          ...baseStyle,
          width: "750px",
          height: "750px",
          background: "radial-gradient(circle at center, rgba(16,185,129,0.45) 0%, rgba(16,185,129,0.15) 40%, transparent 70%)",
          filter: "blur(60px)",
          bottom: "-200px",
          left: "10%",
          animation: "orbFloat3 9s ease-in-out infinite",
        }}
      />

      {/* AMBER orb — center-right */}
      <div
        style={{
          ...baseStyle,
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle at center, rgba(245,158,11,0.40) 0%, rgba(245,158,11,0.12) 40%, transparent 70%)",
          filter: "blur(70px)",
          top: "50%",
          left: "50%",
          animation: "orbFloat4 15s ease-in-out infinite",
        }}
      />

      {/* PINK orb — center-left */}
      <div
        style={{
          ...baseStyle,
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle at center, rgba(236,72,153,0.40) 0%, rgba(236,72,153,0.12) 40%, transparent 70%)",
          filter: "blur(70px)",
          top: "35%",
          left: "25%",
          animation: "orbFloat2 11s ease-in-out 1.5s infinite",
        }}
      />

      {/* Grid mesh */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Keyframe injection */}
      <style>{`
        @keyframes orbFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          25% { transform: translate(80px,-60px) scale(1.08); }
          50% { transform: translate(-40px,80px) scale(0.95); }
          75% { transform: translate(60px,40px) scale(1.05); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(-80px,50px) scale(1.1); }
          66% { transform: translate(60px,-90px) scale(0.92); }
        }
        @keyframes orbFloat3 {
          0%,100% { transform: translate(0,0) scale(1.05); }
          50% { transform: translate(70px,-60px) scale(0.9); }
        }
        @keyframes orbFloat4 {
          0%,100% { transform: translate(0,0); }
          25% { transform: translate(-60px,-80px); }
          50% { transform: translate(80px,60px); }
          75% { transform: translate(-30px,90px); }
        }
      `}</style>
    </div>
  );
}
