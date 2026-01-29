export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-primary">
      
      {/* 1. EL SPINNER TECH (Doble Anillo) */}
      <div className="relative flex items-center justify-center w-24 h-24 mb-8">
        
        {/* Anillo Exterior (Cyan - Lento) */}
        <div className="absolute inset-0 border-4 border-t-neon-cyan border-r-transparent border-b-neon-cyan/30 border-l-transparent rounded-full animate-spin [animation-duration:3s]"></div>
        
        {/* Anillo Interior (Green - Rápido y al revés) */}
        <div className="absolute inset-2 border-4 border-t-transparent border-r-neon-green border-b-transparent border-l-neon-green/50 rounded-full animate-spin [animation-duration:1.5s] direction-reverse"></div>
        
        {/* Núcleo Central (Pulsando) */}
        <div className="h-4 w-4 bg-white rounded-full animate-ping"></div>
      </div>

      {/* 2. TEXTO GLITCH */}
      <div className="relative font-mono text-sm tracking-[0.2em] font-bold uppercase">
        
        {/* Texto Base */}
        <span className="relative z-10 text-white animate-pulse">
          System_Initializing...
        </span>

        {/* Efecto Sombra Glitch (Rojo) */}
        <span className="absolute top-0 left-0 -ml-0.5 translate-x-[1px] text-neon-red opacity-70 animate-pulse [animation-duration:0.1s]">
          System_Initializing...
        </span>

        {/* Efecto Sombra Glitch (Cyan) */}
        <span className="absolute top-0 left-0 ml-0.5 -translate-x-[1px] text-neon-cyan opacity-70 animate-pulse [animation-duration:0.2s]">
          System_Initializing...
        </span>
      </div>

      {/* 3. BARRA DE CARGA DECORATIVA */}
      <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-neon-cyan animate-[shimmer_2s_infinite] w-full origin-left -translate-x-full"></div>
      </div>

      {/* Estilos inline para animaciones custom rápidas sin ensuciar tailwind config */}
      <style>{`
        .direction-reverse { animation-direction: reverse; }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}