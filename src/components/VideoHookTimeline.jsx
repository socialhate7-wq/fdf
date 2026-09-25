import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Scissors, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Ghost, 
  Film,
  Flame,
  CheckCircle2,
  SlidersHorizontal,
  Shuffle,
  AlertTriangle,
  Lock,
  Swords,
  MessageSquare,
  Volume2,
  VolumeX
} from "lucide-react";
import { PRESENTER_HOOKS } from "../remotion/compositions/PresenterFullscreenChromaScene";

export const VideoHookTimeline = ({ videoData, hookConfig, onChange }) => {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const previewTimerRef = useRef(null);

  const startTime = hookConfig?.startTime || 0;
  const isEnabled = hookConfig?.enabled || false;
  const attribution = hookConfig?.attribution ?? (videoData?.channel_name || "Creador Original");
  const presenterVideoEnabled = hookConfig?.presenterVideoEnabled !== false;
  const presenterHookId = hookConfig?.presenterHookId || "random";
  const durationMode = hookConfig?.durationMode || "30s";
  const transitionStyle = hookConfig?.transitionStyle ?? "glitch";

  // Chroma settings for 1.mp4
  const chromaConfig = hookConfig?.chromaConfig || {
    greenTolerance: 1.25,
    minGreen: 80,
    despill: true,
  };

  // State for testing 1.mp4 chroma removal in UI
  const [isPlaying1mp4, setIsPlaying1mp4] = useState(false);
  const test1mp4VideoRef = useRef(null);
  const test1mp4CanvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Chroma processing for 1.mp4 test player in UI
  useEffect(() => {
    const video = test1mp4VideoRef.current;
    const canvas = test1mp4CanvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const processChromaFrame = () => {
      if (video.paused || video.ended) {
        setIsPlaying1mp4(false);
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        const tol = chromaConfig.greenTolerance;
        const minG = chromaConfig.minGreen;

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];

          if (g > minG && g > r * tol && g > b * tol) {
            d[i + 3] = 0; // Transparent
          } else if (chromaConfig.despill && g > (r + b) / 2) {
            d[i + 1] = Math.round((r + b) / 2);
          }
        }
        ctx.putImageData(imgData, 0, 0);
      } catch (e) {
        // ignore
      }

      animFrameRef.current = requestAnimationFrame(processChromaFrame);
    };

    if (isPlaying1mp4) {
      video.play().catch(() => {});
      animFrameRef.current = requestAnimationFrame(processChromaFrame);
    } else {
      video.pause();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying1mp4, chromaConfig]);

  // Maximum timeline duration (15 minutes default = 900 seconds)
  const maxDuration = 900;

  const updateConfig = (updates) => {
    onChange({
      ...hookConfig,
      ...updates,
    });
  };

  const handleStartTimeChange = (newTime) => {
    const clamped = Math.max(0, Math.min(maxDuration - 3, Math.round(newTime * 2) / 2));
    updateConfig({ startTime: clamped });
    stopPreview();
  };

  // Play a 3-second preview in the iframe
  const playThreeSecondPreview = () => {
    stopPreview();
    setPreviewKey(prev => prev + 1);
    setIsPlayingPreview(true);

    previewTimerRef.current = setTimeout(() => {
      setIsPlayingPreview(false);
    }, 3100);
  };

  const stopPreview = () => {
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    setIsPlayingPreview(false);
  };

  useEffect(() => {
    return () => {
      if (previewTimerRef.current) {
        clearTimeout(previewTimerRef.current);
      }
    };
  }, []);

  const formatMMSS = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const dec = (sec % 1).toFixed(1).substring(1);
    return `${m}:${s < 10 ? '0' : ''}${s}${dec !== '.0' ? dec : ''}`;
  };

  const presets = [
    { label: "00:00 (Intro)", time: 0, icon: "⚡" },
    { label: "00:15 (Gancho)", time: 15, icon: "🔥" },
    { label: "00:45 (Fricción)", time: 45, icon: "💥" },
    { label: "01:30 (Clímax)", time: 90, icon: "🎯" },
    { label: "02:30 (Polémica)", time: 150, icon: "💣" },
  ];

  return (
    <Card className="p-5 bg-gradient-to-r from-red-950/20 via-zinc-900/90 to-amber-950/20 border-red-900/40 shadow-xl mb-6">
      {/* HEADER / TOGGLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shadow-lg shadow-red-950/50">
            <Scissors className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-heading font-bold text-lg">
                Hook de 3 Segundos del Video Original
              </h3>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                Scroll-Stopper Viral
              </Badge>
            </div>
            <p className="text-zinc-400 text-xs mt-0.5">
              Inicia el video con los 3 primeros segundos del contenido original antes del corte y análisis.
            </p>
          </div>
        </div>

        {/* Toggle switch */}
        <Button
          onClick={() => updateConfig({ enabled: !isEnabled })}
          variant={isEnabled ? "default" : "outline"}
          className={`h-9 px-4 font-semibold text-xs transition-all ${
            isEnabled 
              ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/40" 
              : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          }`}
          data-testid="toggle-hook-btn"
        >
          {isEnabled ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-white" />
              Hook Activado (3s)
            </>
          ) : (
            <>
              <Film className="w-4 h-4 mr-1.5 text-zinc-400" />
              Activar Hook de 3s
            </>
          )}
        </Button>
      </div>

      {/* EXPANDED TIMELINE CONTROLS */}
      {isEnabled && (
        <div className="pt-5 space-y-6">
          {/* TIMELINE TIME BAR DISPLAY */}
          <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span className="text-zinc-300 text-sm font-semibold">
                  Ventana de corte seleccionada (3.0 segundos exactos):
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-zinc-800 text-zinc-200 border-zinc-700 font-mono text-sm px-2.5 py-1">
                  Inicio: <span className="text-red-400 font-bold ml-1">{formatMMSS(startTime)}</span>
                </Badge>
                <span className="text-zinc-500 text-xs">➔</span>
                <Badge className="bg-zinc-800 text-zinc-200 border-zinc-700 font-mono text-sm px-2.5 py-1">
                  Fin: <span className="text-amber-400 font-bold ml-1">{formatMMSS(startTime + 3)}</span>
                </Badge>
              </div>
            </div>

            {/* Slider track */}
            <div className="relative py-3">
              <input
                type="range"
                min="0"
                max={Math.min(maxDuration, 600)}
                step="0.5"
                value={startTime}
                onChange={(e) => handleStartTimeChange(parseFloat(e.target.value))}
                className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                data-testid="hook-timeline-slider"
              />

              {/* Time Ruler Markers */}
              <div className="flex justify-between text-[11px] text-zinc-500 mt-2 font-mono">
                <span>00:00</span>
                <span>01:00</span>
                <span>02:30</span>
                <span>05:00</span>
                <span>07:30</span>
                <span>10:00</span>
              </div>
            </div>

            {/* Presets and Fine adjustment buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-850">
              {/* Presets */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-zinc-400 mr-1 font-medium">Momentos clave:</span>
                {presets.map((preset) => (
                  <Button
                    key={preset.time}
                    variant="outline"
                    size="sm"
                    onClick={() => handleStartTimeChange(preset.time)}
                    className={`h-7 px-2.5 text-xs border-zinc-800 transition-colors ${
                      startTime === preset.time 
                        ? "bg-red-600/30 border-red-500/60 text-red-300 font-bold" 
                        : "bg-zinc-900/60 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="mr-1">{preset.icon}</span>
                    {preset.label}
                  </Button>
                ))}
              </div>

              {/* Fine tuning buttons */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-zinc-500 mr-1">Ajuste fino:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStartTimeChange(startTime - 1)}
                  className="h-7 px-2 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white"
                >
                  -1s
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStartTimeChange(startTime - 0.5)}
                  className="h-7 px-2 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white"
                >
                  -0.5s
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStartTimeChange(startTime + 0.5)}
                  className="h-7 px-2 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white"
                >
                  +0.5s
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStartTimeChange(startTime + 1)}
                  className="h-7 px-2 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white"
                >
                  +1s
                </Button>
              </div>
            </div>
          </div>

          {/* PREVIEW OF THE 3S HOOK + ATTRIBUTION */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Live 3-Second Mini Player */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-red-500" />
                    Vista Previa del Clip (3s)
                  </span>
                  <Badge className="bg-zinc-800 text-zinc-400 text-[10px]">
                    Desde {formatMMSS(startTime)}
                  </Badge>
                </div>

                {/* Video player box */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-zinc-800 shadow-inner">
                  {videoData?.video_id ? (
                    <iframe
                      key={`${videoData.video_id}-${startTime}-${previewKey}`}
                      src={`https://www.youtube-nocookie.com/embed/${videoData.video_id}?start=${Math.floor(startTime)}&end=${Math.floor(startTime) + 4}&autoplay=${isPlayingPreview ? 1 : 0}&mute=${hookConfig?.muteCreator ? 1 : 0}&controls=0&modestbranding=1&rel=0`}
                      title="Hook Preview"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      className="w-full h-full border-none pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
                      Sin video disponible
                    </div>
                  )}

                  {/* Overlays on preview */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/80 px-2 py-0.5 rounded text-[11px] text-white font-mono border border-red-500/30">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    HOOK 3S
                  </div>
                </div>
              </div>

              {/* Test Button */}
              <div className="mt-3 flex items-center justify-between">
                <Button
                  size="sm"
                  onClick={playThreeSecondPreview}
                  disabled={isPlayingPreview}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs h-8 px-3 shadow-md shadow-red-950"
                  data-testid="play-hook-preview-btn"
                >
                  {isPlayingPreview ? (
                    <>
                      <Pause className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
                      Reproduciendo (3s)...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 mr-1.5" />
                      ▶ Probar Clip de 3 Segundos
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateConfig({ muteCreator: !hookConfig?.muteCreator })}
                    className={`text-xs h-8 px-2.5 border ${
                      !hookConfig?.muteCreator 
                        ? 'border-emerald-600/50 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40' 
                        : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                    }`}
                    title={!hookConfig?.muteCreator ? 'Audio del creador activado' : 'Audio silenciado'}
                  >
                    {!hookConfig?.muteCreator ? (
                      <>
                        <Volume2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                        Audio: ON
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-3.5 h-3.5 mr-1 text-zinc-500" />
                        Audio: OFF
                      </>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStartTimeChange(0)}
                    className="text-zinc-500 hover:text-zinc-300 text-xs h-8 px-2"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    0:00
                  </Button>
                </div>
              </div>
            </div>

            {/* Attribution & Legal Notice */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col justify-between space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-1.5">
                  Atribución en Pantalla (Derecho de Cita):
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 text-sm font-semibold">Vía: @</span>
                  <input
                    type="text"
                    value={attribution}
                    onChange={(e) => updateConfig({ attribution: e.target.value })}
                    placeholder="Nombre del canal"
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                    data-testid="attribution-input"
                  />
                </div>
                <div className="flex items-start gap-1.5 mt-2 text-[11px] text-zinc-400 bg-zinc-900/60 p-2 rounded border border-zinc-800/80">
                  <ShieldCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>
                    El uso de fragmentos de 3s con análisis posterior se ampara en el <strong>Derecho de Cita (Art. 32 LPI)</strong> y <strong>Fair Use</strong> como obra crítica y transformativa.
                  </span>
                </div>
              </div>

              {/* Transition Style Selector */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-1.5">
                  Efecto de transición al terminar los 3s:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'glitch', label: 'Glitch + Flash' },
                    { id: 'zoom', label: 'Zoom Explosivo' },
                    { id: 'cut', label: 'Corte Seco' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => updateConfig({ transitionStyle: style.id })}
                      className={`text-xs py-1.5 px-2 rounded border text-center transition-all ${
                        transitionStyle === style.id
                          ? "bg-red-600/30 border-red-500 text-white font-bold"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PASO 2: VIDEO 1.MP4 A PANTALLA COMPLETA SIN CHROMA */}
          <div className="bg-zinc-950/80 p-4 rounded-xl border border-red-900/50 shadow-lg shadow-black/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-100 text-sm font-bold">
                      Paso 2: Video del Presentador (1.mp4) sin Chroma
                    </span>
                    <Badge className="bg-emerald-950/60 text-emerald-400 border-emerald-700/50 text-[10px]">
                      Chroma Key Activo
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Tras los 3s del hook, 1.mp4 sale en pantalla completa con el fondo verde eliminado y audio.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => updateConfig({ presenterVideoEnabled: !presenterVideoEnabled })}
                className={`h-8 px-3 text-xs font-semibold ${
                  presenterVideoEnabled 
                    ? "bg-red-600 hover:bg-red-700 text-white border-red-600" 
                    : "border-zinc-800 text-zinc-500 hover:text-white"
                }`}
                data-testid="toggle-presenter-video-btn"
              >
                {presenterVideoEnabled ? "Activado (6s a Pantalla Completa)" : "Omitir 1.mp4"}
              </Button>
            </div>

            {presenterVideoEnabled && (
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                {/* Mini Player with Chroma Removal Test */}
                <div className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Prueba en Vivo de Chroma (1.mp4):
                    </span>
                    <Badge className="bg-zinc-800 text-zinc-400 text-[10px]">
                      6.0s • 464x688
                    </Badge>
                  </div>

                  {/* Chroma Canvas Test Container */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-[#09090B] border border-zinc-800 flex items-center justify-center">
                    {/* Background glow behind transparent character */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.35)_0%,_transparent_70%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(220,38,38,0.2)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                    {/* Hidden source video */}
                    <video
                      ref={test1mp4VideoRef}
                      src="/videos/1.mp4"
                      playsInline
                      muted={false}
                      className="hidden"
                    />

                    {/* Canvas displaying keyed character */}
                    <canvas
                      ref={test1mp4CanvasRef}
                      width={464}
                      height={688}
                      className="max-h-full max-w-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    />

                    {/* State badge */}
                    <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-black/80 px-2 py-0.5 rounded text-[10px] text-zinc-300 border border-zinc-700">
                      <span className={`w-1.5 h-1.5 rounded-full ${isPlaying1mp4 ? "bg-emerald-500 animate-pulse" : "bg-zinc-500"}`} />
                      {isPlaying1mp4 ? "Reproduciendo sin fondo" : "Pausado"}
                    </div>
                  </div>

                  {/* Play / Test Button */}
                  <div className="mt-3 flex items-center justify-between">
                    <Button
                      size="sm"
                      onClick={() => setIsPlaying1mp4(!isPlaying1mp4)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs h-8 px-3 font-semibold shadow"
                      data-testid="test-chroma-btn"
                    >
                      {isPlaying1mp4 ? (
                        <>
                          <Pause className="w-3.5 h-3.5 mr-1.5" />
                          Pausar Prueba
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 mr-1.5" />
                          ▶ Probar 1.mp4 sin Chroma
                        </>
                      )}
                    </Button>
                    <span className="text-[11px] text-zinc-400">
                      Verde eliminado con suavizado y audio
                    </span>
                  </div>
                </div>

                {/* Chroma Tuning Parameters */}
                <div className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-800 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-zinc-300 block mb-2">
                      Ajustes de Eliminación de Chroma:
                    </span>
                    
                    {/* Tolerance Slider */}
                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Tolerancia de verde:</span>
                        <span className="text-red-400 font-mono font-bold">
                          {chromaConfig.greenTolerance}x
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1.05"
                        max="1.50"
                        step="0.05"
                        value={chromaConfig.greenTolerance}
                        onChange={(e) => updateConfig({
                          chromaConfig: {
                            ...chromaConfig,
                            greenTolerance: parseFloat(e.target.value),
                          }
                        })}
                        className="w-full h-2 bg-zinc-800 rounded appearance-none cursor-pointer accent-red-600"
                      />
                    </div>

                    {/* Despill checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800">
                      <input
                        type="checkbox"
                        checked={chromaConfig.despill}
                        onChange={(e) => updateConfig({
                          chromaConfig: {
                            ...chromaConfig,
                            despill: e.target.checked,
                          }
                        })}
                        className="rounded border-zinc-700 text-red-600 focus:ring-red-500 accent-red-600"
                      />
                      <div>
                        <span className="font-semibold block">Despill (Antialias de contorno verde)</span>
                        <span className="text-[10px] text-zinc-400">
                          Elimina halos verdosos en los bordes del personaje.
                        </span>
                      </div>
                    </label>
                  </div>

                  <div className="text-[11px] text-zinc-500 border-t border-zinc-800 pt-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>
                      Sincronizado: Hook 3s ➔ 1.mp4 (5.5s) ➔ Template Viral de Análisis
                    </span>
                  </div>
                </div>

                {/* SELECTOR DE HOOK DEL DEMONIO (1.mp4) */}
                <div className="md:col-span-2 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                        Hook Inicial del Demonio (1.mp4):
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400">
                      Selecciona un hook o déjalo en rotación automática
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {/* Opción Rotación Aleatoria */}
                    <button
                      type="button"
                      onClick={() => updateConfig({ presenterHookId: 'random' })}
                      className={`text-left p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
                        presenterHookId === 'random'
                          ? 'bg-red-950/40 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                          : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold flex items-center gap-1 text-red-400">
                            <Shuffle className="w-3.5 h-3.5" />
                            Rotación Aleatoria
                          </span>
                          <Badge className="bg-red-500/20 text-red-300 border-none text-[9px]">
                            A/B Test
                          </Badge>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-tight">
                          Alterna automáticamente entre los 3 hooks en cada vídeo para maximizar retención y variedad.
                        </p>
                      </div>
                    </button>

                    {/* Los 3 hooks estructurados */}
                    {PRESENTER_HOOKS.map((hook) => {
                      const isSelected = presenterHookId === hook.id;
                      const channelName = videoData?.channel_name || 'este creador';
                      return (
                        <button
                          key={hook.id}
                          type="button"
                          onClick={() => updateConfig({ presenterHookId: hook.id })}
                          className={`text-left p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-zinc-900 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                              : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                                {hook.tag}
                              </span>
                              {isSelected && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                              )}
                            </div>
                            <div className="text-xs font-bold text-zinc-100 line-clamp-2 leading-tight mb-1">
                              {hook.title(channelName)}
                            </div>
                            <p className="text-[10px] text-zinc-400 line-clamp-2">
                              {typeof hook.subtitle === 'function' ? hook.subtitle(channelName) : hook.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* PASO 3: ESTRUCTURA DEL VÍDEO (30S VIRAL VS 60S CLÁSICO) */}
                <div className="md:col-span-2 bg-gradient-to-r from-red-950/30 via-zinc-900/80 to-zinc-950 p-4 rounded-xl border border-red-900/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-2 border-b border-zinc-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          Estructura de Retención del Vídeo:
                        </span>
                        <Badge className="bg-red-600 text-white text-[10px] font-bold">
                          🔥 Recomendado 30 Segundos
                        </Badge>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Los vídeos de 30s tienen una tasa de finalización +60% superior en TikTok, Shorts y Reels.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateConfig({ durationMode: '30s' })}
                        className={`h-8 text-xs font-bold ${
                          durationMode === '30s'
                            ? 'bg-red-600 hover:bg-red-700 text-white border-red-600'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        🔥 30s Viral (Shorts)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateConfig({ durationMode: '60s' })}
                        className={`h-8 text-xs font-bold ${
                          durationMode === '60s'
                            ? 'bg-red-600 hover:bg-red-700 text-white border-red-600'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        ⏱️ 60s Clásico
                      </Button>
                    </div>
                  </div>

                  {/* VISUALIZADOR DE LA SECUENCIA DE 30 SEGUNDOS */}
                  {durationMode === '30s' ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                        <span>Secuencia Viral Segundo a Segundo (30.0s total):</span>
                        <span className="text-red-400 font-bold">Censura al inicio ➔ Revelación al final</span>
                      </div>

                      {/* Timeline Bars Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        {/* 1: Clip Creador */}
                        <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-2 flex flex-col justify-between">
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mb-1">
                            <span>0s - 3s</span>
                            <Scissors className="w-3 h-3 text-red-400" />
                          </div>
                          <span className="text-xs font-bold text-zinc-100 block">
                            Hook Creador
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            Corte inicial (3s)
                          </span>
                        </div>

                        {/* 2: Demonio 1.mp4 */}
                        <div className="bg-zinc-900/90 border border-red-900/60 rounded-lg p-2 flex flex-col justify-between shadow-[0_0_10px_rgba(220,38,38,0.15)]">
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mb-1">
                            <span>3s - 8.5s</span>
                            <Flame className="w-3 h-3 text-red-500" />
                          </div>
                          <span className="text-xs font-bold text-red-300 block">
                            Demonio 1.mp4
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            Hook de impacto
                          </span>
                        </div>

                        {/* 3: Hate Meter + Censura */}
                        <div className="bg-red-950/40 border border-red-700/60 rounded-lg p-2 flex flex-col justify-between">
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mb-1">
                            <span>8.5s - 13.5s</span>
                            <Lock className="w-3 h-3 text-amber-400" />
                          </div>
                          <span className="text-xs font-bold text-amber-300 block">
                            ¡CENSURADO!
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            Sube % + Explosión
                          </span>
                        </div>

                        {/* 4: Creador vs Contenido */}
                        <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-2 flex flex-col justify-between">
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mb-1">
                            <span>13.5s - 19.5s</span>
                            <Swords className="w-3 h-3 text-blue-400" />
                          </div>
                          <span className="text-xs font-bold text-blue-300 block">
                            ¿A quién odian?
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            Persona vs Vídeo
                          </span>
                        </div>

                        {/* 5: Comentario Salvaje */}
                        <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-2 flex flex-col justify-between">
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mb-1">
                            <span>19.5s - 25s</span>
                            <MessageSquare className="w-3 h-3 text-red-400" />
                          </div>
                          <span className="text-xs font-bold text-zinc-100 block">
                            Top Comentario
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            Crítica más salvaje
                          </span>
                        </div>

                        {/* 6: Revelación Final */}
                        <div className="bg-emerald-950/40 border border-emerald-600/60 rounded-lg p-2 flex flex-col justify-between">
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mb-1">
                            <span>25s - 30s</span>
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                          </div>
                          <span className="text-xs font-bold text-emerald-300 block">
                            Revelación Final
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            % Real + Veredicto
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-zinc-400 py-1">
                      Modo 60 segundos activo: Muestra los 6 paneles analíticos completos (Gráfico circular, Emociones, Nube de palabras, Temas e Insights).
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
