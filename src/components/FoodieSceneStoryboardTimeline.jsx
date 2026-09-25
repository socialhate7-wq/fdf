import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Pause,
  Clock,
  Flame,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  User,
  Utensils,
  MapPin,
  Sparkles,
  ChevronRight,
  AlertTriangle,
  Layers,
  Video,
  Edit3,
  Star,
  Scissors,
  Film,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { GoogleReviewCard, GoogleLogo } from '@/remotion/compositions/GoogleReviewCard';

export const FoodieSceneStoryboardTimeline = ({
  storyboardData,
  onChange,
  onSeekPreview,
}) => {
  const [activeTab, setActiveTab] = useState('scene1');

  // Preview timer states for Scene 1
  const [isPlayingHookPreview, setIsPlayingHookPreview] = useState(false);
  const [hookPreviewKey, setHookPreviewKey] = useState(0);
  const hookTimerRef = useRef(null);

  // Preview timer states for Scene 3 clips
  const [playingClipIdx, setPlayingClipIdx] = useState(null);
  const [clipPreviewKey, setClipPreviewKey] = useState(0);
  const clipTimerRef = useRef(null);

  const {
    channelName = "Cenando con Pablo",
    restaurantName = "Gran Buffet Fusión",
    restaurantLocation = "Madrid",
    videoId = "dQw4w9WgXcQ",
    avatarSrc = "/videos/ff3.mp4",
    hook = { startTime: 0, duration: 3, label: "CLIP ORIGINAL FOODIE", volume: 1, mute: false },
    scene2 = { text: "Hoy {nombre} ha ido a comer a {restaurante} y vamos a ver cómo le ha ido.", duration: 4.5 },
    polemicClips = [
      { id: 1, startTime: 15.0, duration: 3, title: "🚨 'EL MEJOR DE ESPAÑA'", subtitle: "Promesa en miniatura y vídeo" },
      { id: 2, startTime: 45.0, duration: 3, title: "🔥 38€ POR RACIÓN", subtitle: "Momento cobro y ticket" }
    ],
    scene4 = { text: "Ahora vamos a ver qué dice la gente que ha comido allí.", duration: 3.5 },
    reviews = [],
    videoFormat = "vertical",
    transitionStyle = "glitch",
  } = storyboardData || {};

  // Clean timers
  useEffect(() => {
    return () => {
      if (hookTimerRef.current) clearTimeout(hookTimerRef.current);
      if (clipTimerRef.current) clearTimeout(clipTimerRef.current);
    };
  }, []);

  // Time format helper (MM:SS)
  const formatMMSS = (sec) => {
    const s = Math.max(0, sec || 0);
    const m = Math.floor(s / 60);
    const rem = Math.floor(s % 60);
    const dec = (s % 1).toFixed(1).substring(1);
    return `${m}:${rem < 10 ? '0' : ''}${rem}${dec !== '.0' ? dec : ''}`;
  };

  // Handlers for Hook (Scene 1)
  const handleUpdateHook = (updates) => {
    stopHookPreview();
    onChange({
      ...storyboardData,
      hook: { ...hook, ...updates }
    });
  };

  const handleStartTimeChange = (newTime) => {
    const clamped = Math.max(0, Math.min(600, Math.round(newTime * 2) / 2));
    handleUpdateHook({ startTime: clamped });
  };

  const playThreeSecondHookPreview = () => {
    stopHookPreview();
    setHookPreviewKey((prev) => prev + 1);
    setIsPlayingHookPreview(true);

    hookTimerRef.current = setTimeout(() => {
      setIsPlayingHookPreview(false);
    }, (hook.duration || 3) * 1000 + 400);
  };

  const stopHookPreview = () => {
    if (hookTimerRef.current) {
      clearTimeout(hookTimerRef.current);
      hookTimerRef.current = null;
    }
    setIsPlayingHookPreview(false);
  };

  // Handlers for Scene 2
  const handleUpdateScene2 = (updates) => {
    onChange({
      ...storyboardData,
      scene2: { ...scene2, ...updates }
    });
  };

  // Handlers for Scene 3 (Polemic Clips)
  const handleUpdateClip = (index, updates) => {
    stopClipPreview();
    const updated = [...polemicClips];
    updated[index] = { ...updated[index], ...updates };
    onChange({
      ...storyboardData,
      polemicClips: updated
    });
  };

  const handleClipStartTimeChange = (index, newTime) => {
    const clamped = Math.max(0, Math.min(600, Math.round(newTime * 2) / 2));
    handleUpdateClip(index, { startTime: clamped });
  };

  const playClipPreview = (index) => {
    if (playingClipIdx === index) {
      stopClipPreview();
      return;
    }
    stopClipPreview();
    setPlayingClipIdx(index);
    setClipPreviewKey((prev) => prev + 1);
  };

  const stopClipPreview = () => {
    if (clipTimerRef.current) {
      clearTimeout(clipTimerRef.current);
      clipTimerRef.current = null;
    }
    setPlayingClipIdx(null);
  };

  const handleAddClip = () => {
    const newId = Date.now();
    const lastClip = polemicClips[polemicClips.length - 1];
    const newStart = lastClip ? lastClip.startTime + 30 : 60;
    const newClips = [
      ...polemicClips,
      {
        id: newId,
        startTime: Math.round(newStart),
        duration: 3,
        title: `🚨 MOMENTO POLÉMICO #${polemicClips.length + 1}`,
        subtitle: "Detalle polémico detectado en mesa"
      }
    ];
    onChange({
      ...storyboardData,
      polemicClips: newClips
    });
  };

  const handleRemoveClip = (index) => {
    if (polemicClips.length <= 1) return;
    stopClipPreview();
    const updated = polemicClips.filter((_, i) => i !== index);
    onChange({
      ...storyboardData,
      polemicClips: updated
    });
  };

  // Handlers for Scene 4
  const handleUpdateScene4 = (updates) => {
    onChange({
      ...storyboardData,
      scene4: { ...scene4, ...updates }
    });
  };

  // Handlers for Scene 5 (Reviews)
  const handleUpdateReview = (index, updates) => {
    const updated = [...reviews];
    updated[index] = { ...updated[index], ...updates };
    onChange({
      ...storyboardData,
      reviews: updated
    });
  };

  const handleAddReview = () => {
    const newReview = {
      id: Date.now(),
      author: "Nuevo Comensal",
      badge: "Local Guide",
      rating: "1/5",
      stars: 1,
      timeAgo: "Hace 2 semanas",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop",
      text: "La comida no tenía nada que ver con lo mostrado en el vídeo del influencer. Muy decepcionante.",
      highlightText: "La comida no tenía nada que ver con lo mostrado en el vídeo",
      highlightBg: "#FECACA",
      sentiment: "negative"
    };
    onChange({
      ...storyboardData,
      reviews: [...reviews, newReview]
    });
  };

  const handleRemoveReview = (index) => {
    if (reviews.length <= 1) return;
    const updated = reviews.filter((_, i) => i !== index);
    onChange({
      ...storyboardData,
      reviews: updated
    });
  };

  // Total duration calculation
  const totalClipsDuration = polemicClips.reduce((acc, c) => acc + (c.duration || 3), 0);
  const reviewsDuration = storyboardData.reviewsSceneDuration || 7.0;
  const totalDuration = (hook.duration || 3) + (scene2.duration || 4.5) + totalClipsDuration + (scene4.duration || 3.5) + reviewsDuration;

  const hookPresets = [
    { label: "00:00 (Intro)", time: 0, icon: "⚡" },
    { label: "00:15 (Gancho)", time: 15, icon: "🔥" },
    { label: "00:45 (Fricción)", time: 45, icon: "💥" },
    { label: "01:30 (Clímax)", time: 90, icon: "🎯" },
    { label: "02:30 (Polémica)", time: 150, icon: "💣" },
  ];

  const polemicPresets = [
    { label: "00:20 (Plato estrella)", time: 20, icon: "🍔" },
    { label: "00:50 (Cobro / Cuenta)", time: 50, icon: "💶" },
    { label: "01:45 (Carne fría)", time: 105, icon: "❄️" },
    { label: "02:30 (Queja local)", time: 150, icon: "🚨" },
    { label: "03:15 (Ticket final)", time: 195, icon: "🧾" },
  ];

  return (
    <div className="space-y-6">
      {/* Visual Storyboard Timeline Tracker */}
      <Card className="bg-zinc-900/90 border-zinc-800 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-500" />
              <h3 className="font-heading text-base font-bold text-white uppercase tracking-wider">
                Storyboard de 5 Escenas Foodie Fake
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Vídeo de YouTube real en Escena 1 y Escena 3 con selector interactivo y avatar <code className="text-emerald-400">ff3.mp4</code>.
            </p>
          </div>

          <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-mono text-xs px-3 py-1">
            DURACIÓN TOTAL: ~{Math.round(totalDuration)}s
          </Badge>
        </div>

        {/* 5 Scene Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
          {/* Scene 1 */}
          <button
            type="button"
            onClick={() => setActiveTab('scene1')}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeTab === 'scene1'
                ? 'bg-red-500/15 border-red-500 text-white shadow-lg shadow-red-500/20'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase text-red-400">Escena 1</span>
              <span className="text-[10px] font-mono text-zinc-500">{hook.duration}s</span>
            </div>
            <div className="text-xs font-bold truncate text-white">🎬 Hook YouTube</div>
            <div className="text-[10px] text-zinc-400 truncate">Clip influencer real</div>
          </button>

          {/* Scene 2 */}
          <button
            type="button"
            onClick={() => setActiveTab('scene2')}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeTab === 'scene2'
                ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase text-emerald-400">Escena 2</span>
              <span className="text-[10px] font-mono text-zinc-500">{scene2.duration}s</span>
            </div>
            <div className="text-xs font-bold truncate text-white">🤖 Avatar ff3.mp4</div>
            <div className="text-[10px] text-zinc-400 truncate">"Hoy ha ido a..."</div>
          </button>

          {/* Scene 3 */}
          <button
            type="button"
            onClick={() => setActiveTab('scene3')}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeTab === 'scene3'
                ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/20'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase text-amber-400">Escena 3</span>
              <span className="text-[10px] font-mono text-zinc-500">{totalClipsDuration}s</span>
            </div>
            <div className="text-xs font-bold truncate text-white">🔥 Momentos Top</div>
            <div className="text-[10px] text-zinc-400 truncate">{polemicClips.length} clips con selector</div>
          </button>

          {/* Scene 4 */}
          <button
            type="button"
            onClick={() => setActiveTab('scene4')}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeTab === 'scene4'
                ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase text-cyan-400">Escena 4</span>
              <span className="text-[10px] font-mono text-zinc-500">{scene4.duration}s</span>
            </div>
            <div className="text-xs font-bold truncate text-white">🤖 Avatar ff3.mp4</div>
            <div className="text-[10px] text-zinc-400 truncate">"Ahora veamos qué..."</div>
          </button>

          {/* Scene 5 */}
          <button
            type="button"
            onClick={() => setActiveTab('scene5')}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeTab === 'scene5'
                ? 'bg-yellow-500/15 border-yellow-500 text-white shadow-lg shadow-yellow-500/20'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase text-yellow-400">Escena 5</span>
              <span className="text-[10px] font-mono text-zinc-500">{reviewsDuration}s</span>
            </div>
            <div className="text-xs font-bold truncate text-white">⭐ Google Places</div>
            <div className="text-[10px] text-zinc-400 truncate">{reviews.length} reseñas rápidas</div>
          </button>
        </div>
      </Card>

      {/* ========================================================
          TAB 1: ESCENA 1 - HOOK ORIGINAL DE YOUTUBE (0-3s)
      ======================================================== */}
      {activeTab === 'scene1' && (
        <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-500/20 text-red-500 rounded-xl border border-red-500/30">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  Escena 1: Hook del Video de YouTube (0 - 3s)
                  <Badge className="bg-red-600 text-white font-mono text-[10px]">VIDEO DE YOUTUBE</Badge>
                </h4>
                <p className="text-xs text-zinc-400">
                  Usa el vídeo de YouTube real de SocialHate (o de cualquier foodie) con sonido original para enganchar al usuario.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-zinc-800 text-zinc-200 border-zinc-700 font-mono text-xs px-3 py-1">
                Inicio: <strong className="text-red-400 ml-1">{formatMMSS(hook.startTime)}</strong> ➔ Fin: <strong className="text-amber-400 ml-1">{formatMMSS(hook.startTime + (hook.duration || 3))}</strong>
              </Badge>
            </div>
          </div>

          {/* YouTube Video Selector Input */}
          <div className="p-4 bg-zinc-950/80 rounded-2xl border border-zinc-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                <Video className="w-4 h-4 text-red-500" />
                ID de YouTube / Vídeo de Ejemplo (SocialHate)
              </label>
              <span className="text-[11px] text-zinc-500 font-mono">
                YouTube ID: <strong className="text-white">{videoId}</strong>
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={videoId}
                onChange={(e) => {
                  let val = e.target.value.trim();
                  // Extract videoId if full URL was pasted
                  if (val.includes("youtube.com/watch?v=")) {
                    val = val.split("v=")[1]?.split("&")[0] || val;
                  } else if (val.includes("youtu.be/")) {
                    val = val.split("youtu.be/")[1]?.split("?")[0] || val;
                  }
                  onChange({ ...storyboardData, videoId: val });
                }}
                placeholder="dQw4w9WgXcQ o URL de YouTube"
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onChange({ ...storyboardData, videoId: "dQw4w9WgXcQ" })}
                className="border-zinc-800 text-xs text-zinc-300 hover:text-white"
              >
                Reset SocialHate Video
              </Button>
            </div>

            {/* Video Format Selector: 9:16 Vertical vs 16:9 Horizontal */}
            <div className="pt-2 border-t border-zinc-850">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                Formato del Vídeo de YouTube en Pantalla
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onChange({ ...storyboardData, videoFormat: "vertical" })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    videoFormat === "vertical"
                      ? "bg-red-500/20 border-red-500 text-white shadow-md shadow-red-950"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-white">
                      📱 Vertical 9:16 (Shorts / TikTok)
                    </span>
                    {videoFormat === "vertical" && <CheckCircle2 className="w-4 h-4 text-red-400" />}
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Mantiene el formato vertical 9:16 a pantalla completa sin barras negras.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => onChange({ ...storyboardData, videoFormat: "horizontal" })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    videoFormat === "horizontal"
                      ? "bg-red-500/20 border-red-500 text-white shadow-md shadow-red-950"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-white">
                      🖥️ Horizontal 16:9 (Enmarcado)
                    </span>
                    {videoFormat === "horizontal" && <CheckCircle2 className="w-4 h-4 text-red-400" />}
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Caja cinemática 16:9 con fondo ambiental desenfocado y resplandor.
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Timeline Slider (Like SocialHate VideoHookTimeline) */}
          <div className="bg-zinc-950/90 p-5 rounded-2xl border border-zinc-800/90 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500" />
                Línea de Tiempo del Hook (Selector Fácil)
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Punto actual: <strong className="text-red-400">{formatMMSS(hook.startTime)}</strong>
              </span>
            </div>

            {/* Range Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max="300"
                step="0.5"
                value={hook.startTime}
                onChange={(e) => handleStartTimeChange(parseFloat(e.target.value))}
                className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 font-mono pt-1">
                <span>00:00</span>
                <span>01:00</span>
                <span>02:00</span>
                <span>03:00</span>
                <span>04:00</span>
                <span>05:00</span>
              </div>
            </div>

            {/* Key moment presets & fine adjustment */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-850">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-zinc-400 mr-1 font-semibold">Momentos clave:</span>
                {hookPresets.map((preset) => (
                  <Button
                    key={preset.time}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleStartTimeChange(preset.time)}
                    className={`h-7 px-2.5 text-xs border-zinc-800 transition-colors ${
                      hook.startTime === preset.time
                        ? "bg-red-600/30 border-red-500/60 text-red-300 font-bold"
                        : "bg-zinc-900/60 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="mr-1">{preset.icon}</span>
                    {preset.label}
                  </Button>
                ))}
              </div>

              {/* Fine Tuning Buttons */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-zinc-500 mr-1 font-semibold">Ajuste fino:</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleStartTimeChange(hook.startTime - 1)}
                  className="h-7 px-2 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white"
                >
                  -1s
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleStartTimeChange(hook.startTime - 0.5)}
                  className="h-7 px-2 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white"
                >
                  -0.5s
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleStartTimeChange(hook.startTime + 0.5)}
                  className="h-7 px-2 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white"
                >
                  +0.5s
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleStartTimeChange(hook.startTime + 1)}
                  className="h-7 px-2 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white"
                >
                  +1s
                </Button>
              </div>
            </div>
          </div>

          {/* Live Preview Player of the 3s Hook */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Embedded YouTube 3s Player */}
            <div className="space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-xl">
                {videoId ? (
                  <iframe
                    key={`hook-yt-${videoId}-${hook.startTime}-${hookPreviewKey}`}
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?start=${Math.floor(hook.startTime)}&autoplay=${isPlayingHookPreview ? 1 : 0}&controls=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&iv_load_policy=3&cc_load_policy=0&cc_lang_pref=off&hl=es&disablekb=1&fs=0`}
                    title="Hook Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    onLoad={(e) => {
                      try {
                        const win = e?.target?.contentWindow;
                        if (win) {
                          win.postMessage('{"event":"command","func":"unloadModule","args":["captions"]}', '*');
                          win.postMessage('{"event":"command","func":"setOption","args":["captions","track",{}]}', '*');
                          win.postMessage('{"event":"command","func":"setOption","args":["captions","fontSize",-3]}', '*');
                          win.postMessage('{"event":"command","func":"setOption","args":["captions","displaySettings",{"color":"transparent","backgroundOpacity":0,"textOpacity":0}]}', '*');
                          win.postMessage('{"event":"command","func":"setOption","args":["cc","track",{}]}', '*');
                        }
                      } catch (_) {}
                    }}
                    className="w-full h-full border-none"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
                    Sin vídeo seleccionado
                  </div>
                )}

                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {hook.label}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="sm"
                  onClick={playThreeSecondHookPreview}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                >
                  {isPlayingHookPreview ? (
                    <>
                      <Pause className="w-4 h-4 mr-1.5" />
                      Reproduciendo Hook (3s)...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-1.5" />
                      Probar Clip de 3s con Sonido
                    </>
                  )}
                </Button>

                <span className="text-xs text-zinc-400">
                  Ventana: <strong className="text-white">{hook.duration}s</strong>
                </span>
              </div>
            </div>

            {/* Right: Settings & Label */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Texto de la Etiqueta Superior
                </label>
                <input
                  type="text"
                  value={hook.label}
                  onChange={(e) => handleUpdateHook({ label: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Duración del Hook
                </label>
                <div className="flex gap-2">
                  {[2.5, 3.0, 3.5, 4.0].map((dur) => (
                    <Button
                      key={dur}
                      type="button"
                      size="sm"
                      variant={hook.duration === dur ? "default" : "outline"}
                      onClick={() => handleUpdateHook({ duration: dur })}
                      className={hook.duration === dur ? "bg-red-600 hover:bg-red-700 text-white" : "border-zinc-800 text-zinc-400"}
                    >
                      {dur}s
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-1">
                <div className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Listo para Enganchar en Redes
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Al arrancar con el clip real de YouTube, TikTok y Shorts no detectan vídeo estático y retienen a la audiencia los 3 primeros segundos críticos.
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ========================================================
          TAB 2: ESCENA 2 - AVATAR FF3.MP4 (PRESENTACIÓN)
      ======================================================== */}
      {activeTab === 'scene2' && (
        <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Escena 2: Avatar ff3.mp4 Habla (Presentación)
                </h4>
                <p className="text-xs text-zinc-400">
                  El avatar ff3.mp4 entra en escena diciendo el texto clave con subtítulos cinemáticos.
                </p>
              </div>
            </div>
            <Badge className="bg-emerald-600 text-white font-bold">{scene2.duration}s</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* Left: Avatar Video Preview */}
            <div className="relative aspect-[9/16] max-h-[340px] w-full rounded-2xl overflow-hidden bg-black border border-zinc-800">
              <video
                src={avatarSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full uppercase">
                ff3.mp4 Avatar
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/85 border border-emerald-500/60 rounded-xl p-3 text-center">
                <div className="text-[10px] text-emerald-400 font-bold uppercase mb-1">Subtítulos TikTok</div>
                <div className="text-xs text-white font-bold leading-tight">
                  Hoy <span className="text-amber-400">{channelName}</span> ha ido a comer a <span className="text-emerald-400">{restaurantName}</span> y vamos a ver cómo le ha ido.
                </div>
              </div>
            </div>

            {/* Right: Text & Duration Editor */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Guion que dice el Avatar (Variables disponibles: {`{nombre}`}, {`{restaurante}`})
                </label>
                <textarea
                  rows={4}
                  value={scene2.text}
                  onChange={(e) => handleUpdateScene2({ text: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-medium leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Duración de la Escena (Segundos)
                </label>
                <div className="flex gap-2">
                  {[3.5, 4.0, 4.5, 5.0, 5.5, 6.0].map((dur) => (
                    <Button
                      key={dur}
                      type="button"
                      size="sm"
                      variant={scene2.duration === dur ? "default" : "outline"}
                      onClick={() => handleUpdateScene2({ duration: dur })}
                      className={scene2.duration === dur ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "border-zinc-800 text-zinc-400"}
                    >
                      {dur}s
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/80 space-y-2">
                <div className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Previsualización del Texto Final
                </div>
                <p className="text-sm text-emerald-300 font-medium">
                  "{scene2.text.replace(/{nombre}/gi, channelName).replace(/{restaurante}/gi, restaurantName)}"
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ========================================================
          TAB 3: ESCENA 3 - SELECTOR FÁCIL DE MOMENTOS POLÉMICOS
          (Idéntico al selector fácil de Escena 1 con timeline y vista previa)
      ======================================================== */}
      {activeTab === 'scene3' && (
        <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-500 rounded-xl border border-amber-500/30">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  Escena 3: Selector de Momentos Polémicos o Importantes
                  <Badge className="bg-amber-500 text-black font-bold text-xs">{polemicClips.length} CLIPS</Badge>
                </h4>
                <p className="text-xs text-zinc-400">
                  Selector idéntico a la Escena 1: desliza la línea de tiempo, escucha el fragmento de 3 segundos y define el titular.
                </p>
              </div>
            </div>

            <Button
              type="button"
              size="sm"
              onClick={handleAddClip}
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Añadir Momento Polémico (3s)
            </Button>
          </div>

          {/* TRANSITION STYLE SELECTOR BETWEEN POLEMIC CLIPS (SOCIALHATE FX) */}
          <div className="bg-zinc-950/80 p-4 rounded-2xl border border-amber-500/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Transición Fluida entre Clips Polémicos (Estilo SocialHate)
              </label>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40 text-[10px] font-mono">
                CERO CORTES NEGROS
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                {
                  id: 'glitch',
                  label: 'Glitch + Flash',
                  icon: '⚡',
                  desc: 'Scanlines CRT, jitter analógico y destello de impacto blanco/rojo',
                },
                {
                  id: 'zoom',
                  label: 'Zoom Explosivo',
                  icon: '💥',
                  desc: 'Punch de escala 1.35x en el corte y snap-in de resorte al siguiente clip',
                },
                {
                  id: 'cut',
                  label: 'Corte Seco',
                  icon: '✂️',
                  desc: 'Corte directo y quirúrgico con micropunch rítmico',
                },
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => onChange({ ...storyboardData, transitionStyle: style.id })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    transitionStyle === style.id
                      ? "bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-950 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{style.icon}</span>
                      {style.label}
                    </span>
                    {transitionStyle === style.id && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-tight font-normal">
                    {style.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* List of Polemic Clips each with the FULL EASY SELECTOR */}
          <div className="space-y-6 pt-2">
            {polemicClips.map((clip, idx) => (
              <div
                key={clip.id || idx}
                className="bg-zinc-950 rounded-2xl border border-zinc-800 p-5 space-y-5 hover:border-amber-500/50 transition-all shadow-lg"
              >
                {/* Header bar of clip */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-sm border border-amber-500/40">
                      #{idx + 1}
                    </span>
                    <div>
                      <span className="text-sm font-bold text-white">{clip.title}</span>
                      <div className="text-[11px] text-zinc-400">{clip.subtitle || "Momento a auditar"}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className="bg-zinc-800 text-zinc-200 border-zinc-700 font-mono text-xs px-2.5 py-1">
                      Inicio: <strong className="text-amber-400 ml-1">{formatMMSS(clip.startTime)}</strong> ➔ Fin: <strong className="text-red-400 ml-1">{formatMMSS(clip.startTime + (clip.duration || 3))}</strong>
                    </Badge>
                    {polemicClips.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveClip(idx)}
                        className="text-zinc-500 hover:text-red-400 h-8 w-8"
                        title="Eliminar este momento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* THE EASY TIMELINE SLIDER (EXACTLY LIKE SCENE 1) */}
                <div className="bg-zinc-900/70 p-4 rounded-xl border border-zinc-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      Seleccionar segundo en el vídeo:
                    </span>
                    <span className="font-mono text-amber-400 font-bold">
                      {formatMMSS(clip.startTime)} ({clip.startTime}s)
                    </span>
                  </div>

                  {/* Range input slider */}
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="0.5"
                    value={clip.startTime}
                    onChange={(e) => handleClipStartTimeChange(idx, parseFloat(e.target.value))}
                    className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
                  />

                  {/* Time ruler markers */}
                  <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
                    <span>00:00</span>
                    <span>01:00</span>
                    <span>02:00</span>
                    <span>03:00</span>
                    <span>04:00</span>
                    <span>05:00</span>
                  </div>

                  {/* Presets and Fine adjustment buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs text-zinc-400 mr-1 font-semibold">Momentos típicos:</span>
                      {polemicPresets.map((preset) => (
                        <Button
                          key={preset.time}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleClipStartTimeChange(idx, preset.time)}
                          className={`h-6 px-2 text-xs border-zinc-800 ${
                            clip.startTime === preset.time
                              ? "bg-amber-500/30 border-amber-500/60 text-amber-300 font-bold"
                              : "bg-zinc-950/60 text-zinc-400 hover:text-white"
                          }`}
                        >
                          <span className="mr-1">{preset.icon}</span>
                          {preset.label}
                        </Button>
                      ))}
                    </div>

                    {/* Fine Tuning Buttons */}
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-zinc-500 mr-1 font-semibold">Ajuste fino:</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleClipStartTimeChange(idx, clip.startTime - 1)}
                        className="h-6 px-2 text-xs bg-zinc-950 border-zinc-800 text-zinc-300 hover:text-white"
                      >
                        -1s
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleClipStartTimeChange(idx, clip.startTime - 0.5)}
                        className="h-6 px-2 text-xs bg-zinc-950 border-zinc-800 text-zinc-300 hover:text-white"
                      >
                        -0.5s
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleClipStartTimeChange(idx, clip.startTime + 0.5)}
                        className="h-6 px-2 text-xs bg-zinc-950 border-zinc-800 text-zinc-300 hover:text-white"
                      >
                        +0.5s
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleClipStartTimeChange(idx, clip.startTime + 1)}
                        className="h-6 px-2 text-xs bg-zinc-950 border-zinc-800 text-zinc-300 hover:text-white"
                      >
                        +1s
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Live Preview Player of the Clip + Text Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: 3-Second Player for this clip */}
                  <div className="space-y-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-md">
                      {videoId ? (
                        <iframe
                          key={`clip-yt-${idx}-${clip.id || idx}-${clip.startTime}-${clipPreviewKey}`}
                          src={`https://www.youtube-nocookie.com/embed/${videoId}?start=${Math.floor(clip.startTime)}&autoplay=${playingClipIdx === idx ? 1 : 0}&controls=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&iv_load_policy=3&cc_load_policy=0&cc_lang_pref=off&hl=es&disablekb=1&fs=0`}
                          title={`Clip ${idx + 1} Preview`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          onLoad={(e) => {
                            try {
                              const win = e?.target?.contentWindow;
                              if (win) {
                                win.postMessage('{"event":"command","func":"unloadModule","args":["captions"]}', '*');
                                win.postMessage('{"event":"command","func":"setOption","args":["captions","track",{}]}', '*');
                                win.postMessage('{"event":"command","func":"setOption","args":["captions","fontSize",-3]}', '*');
                                win.postMessage('{"event":"command","func":"setOption","args":["captions","displaySettings",{"color":"transparent","backgroundOpacity":0,"textOpacity":0}]}', '*');
                                win.postMessage('{"event":"command","func":"setOption","args":["cc","track",{}]}', '*');
                              }
                            } catch (_) {}
                          }}
                          className="w-full h-full border-none"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
                          Sin vídeo
                        </div>
                      )}
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      onClick={() => playClipPreview(idx)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs"
                    >
                      {playingClipIdx === idx ? (
                        <>
                          <Pause className="w-3.5 h-3.5 mr-1.5" />
                          Reproduciendo 3s de este clip...
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 mr-1.5" />
                          Probar este Momento (3s) con Sonido
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Right: Titles & Labels */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                        Título en Pantalla
                      </label>
                      <input
                        type="text"
                        value={clip.title}
                        onChange={(e) => handleUpdateClip(idx, { title: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                        Subtítulo / Denuncia
                      </label>
                      <input
                        type="text"
                        value={clip.subtitle || ""}
                        onChange={(e) => handleUpdateClip(idx, { subtitle: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                      <span>Duración en el vídeo:</span>
                      <div className="flex gap-1">
                        {[2.5, 3.0, 3.5, 4.0].map((dur) => (
                          <button
                            key={dur}
                            type="button"
                            onClick={() => handleUpdateClip(idx, { duration: dur })}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              clip.duration === dur ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-300"
                            }`}
                          >
                            {dur}s
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ========================================================
          TAB 4: ESCENA 4 - AVATAR FF3.MP4 (TRANSICIÓN A RESEÑAS)
      ======================================================== */}
      {activeTab === 'scene4' && (
        <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Escena 4: Avatar ff3.mp4 Da Paso a Reseñas
                </h4>
                <p className="text-xs text-zinc-400">
                  El avatar ff3.mp4 lanza la frase que prepara al espectador para ver los comentarios reales.
                </p>
              </div>
            </div>
            <Badge className="bg-cyan-600 text-white font-bold">{scene4.duration}s</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* Left: Avatar Video Preview */}
            <div className="relative aspect-[9/16] max-h-[340px] w-full rounded-2xl overflow-hidden bg-black border border-zinc-800">
              <video
                src={avatarSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-cyan-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full uppercase">
                ff3.mp4 Avatar
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/85 border border-cyan-500/60 rounded-xl p-3 text-center">
                <div className="text-[10px] text-cyan-400 font-bold uppercase mb-1">Subtítulos TikTok</div>
                <div className="text-xs text-white font-bold leading-tight">
                  Ahora vamos a ver qué dice la <span className="text-amber-400">gente que ha comido allí</span>.
                </div>
              </div>
            </div>

            {/* Right: Text & Duration Editor */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Guion de Transición
                </label>
                <textarea
                  rows={3}
                  value={scene4.text}
                  onChange={(e) => handleUpdateScene4({ text: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Duración de la Escena (Segundos)
                </label>
                <div className="flex gap-2">
                  {[2.5, 3.0, 3.5, 4.0, 4.5].map((dur) => (
                    <Button
                      key={dur}
                      type="button"
                      size="sm"
                      variant={scene4.duration === dur ? "default" : "outline"}
                      onClick={() => handleUpdateScene4({ duration: dur })}
                      className={scene4.duration === dur ? "bg-cyan-600 hover:bg-cyan-700 text-white" : "border-zinc-800 text-zinc-400"}
                    >
                      {dur}s
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/80">
                <div className="text-xs font-bold text-zinc-300 flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Efecto en el Espectador
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Crea máxima expectación. El cerebro del usuario espera el contraste inmediato entre lo que vio y las notas reales de clientes.
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ========================================================
          TAB 5: ESCENA 5 - REMOTION RESEÑAS GOOGLE MAPS
      ======================================================== */}
      {activeTab === 'scene5' && (
        <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg">
                <Star className="w-5 h-5 fill-yellow-400" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  Escena 5: Reseñas Reales Google Places (Efecto Apilado)
                  <GoogleLogo size={20} />
                  <Badge className="bg-yellow-500 text-black text-[10px] font-bold">APILADO SIN DESAPARECER</Badge>
                </h4>
                <p className="text-xs text-zinc-400">
                  Diseño exacto de Google Maps. Las reseñas van apareciendo y se apilan por toda la pantalla sin desaparecer para aplastar con la evidencia.
                </p>
              </div>
            </div>

            <Button
              type="button"
              size="sm"
              onClick={handleAddReview}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            >
              <Plus className="w-4 h-4 mr-1" />
              Añadir Reseña
            </Button>
          </div>

          {/* TIKTOK RHYTHM EXPLANATION BANNER */}
          <div className="p-4 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-yellow-500/10 rounded-2xl border border-yellow-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-yellow-500/20 text-yellow-400 rounded-xl border border-yellow-500/40">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  Ritmo Rápido Estilo TikTok
                  <Badge className="bg-yellow-500 text-black font-extrabold text-[10px]">PUNCH & ZOOM</Badge>
                </div>
                <p className="text-xs text-zinc-300 mt-0.5">
                  Cada reseña entra con <strong>Zoom-In rápido (1.22x)</strong>, activa el <strong>subrayado animado</strong> de la frase más destacada, vuelve a <strong>Zoom-Out</strong> y se apila en pantalla para dar paso a la siguiente sin desaparecer.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Preview of Stacked Reviews (matching user request) */}
          <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 flex flex-col items-center">
            <div className="text-xs font-bold text-zinc-400 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Efecto de Reseñas Apiladas en Pantalla con Subrayado Animado
            </div>
            <div className="w-full max-w-xl space-y-3 relative py-2">
              {reviews.slice(0, 3).map((rev, idx) => (
                <div
                  key={rev.id || idx}
                  style={{
                    transform: `rotate(${idx % 2 === 0 ? -1.2 : 1.5}deg)`,
                    transition: 'transform 0.2s',
                  }}
                >
                  <GoogleReviewCard
                    author={rev.author}
                    badge={rev.badge}
                    rating={rev.rating}
                    timeAgo={rev.timeAgo}
                    avatarUrl={rev.avatarUrl}
                    text={rev.text}
                    highlightText={rev.highlightText}
                    highlightBg={rev.highlightBg || "#FEF08A"}
                    compact={true}
                    highlightProgress={1}
                    isZoomed={idx === 0}
                  />
                </div>
              ))}
            </div>
            <div className="text-[11px] text-zinc-500 mt-2 font-mono text-center">
              Ritmo TikTok activo: Zoom-In de impacto ➔ Subrayado fluorescente ➔ Zoom-Out asentándose ➔ Apilado acumulativo.
            </div>
          </div>

          {/* List of reviews editor */}
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
              Gestionar Reseñas del Vídeo ({reviews.length} en secuencia rápida)
            </h5>

            {reviews.map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 font-bold flex items-center justify-center text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-bold text-white">{rev.author}</span>
                    <Badge variant="outline" className="text-xs border-zinc-800 text-zinc-400">
                      {rev.rating} · {rev.timeAgo}
                    </Badge>
                  </div>

                  {reviews.length > 1 && (
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveReview(idx)}
                      className="text-zinc-500 hover:text-red-400 h-7 w-7"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase font-bold">Autor</label>
                    <input
                      type="text"
                      value={rev.author}
                      onChange={(e) => handleUpdateReview(idx, { author: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase font-bold">Insignia / Badge</label>
                    <input
                      type="text"
                      value={rev.badge || ""}
                      onChange={(e) => handleUpdateReview(idx, { badge: e.target.value })}
                      placeholder="Local Guide"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase font-bold">Estrellas / Puntuación</label>
                    <select
                      value={rev.rating}
                      onChange={(e) => handleUpdateReview(idx, { rating: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    >
                      <option value="1/5">1/5 (Pésimo)</option>
                      <option value="2/5">2/5 (Flojo)</option>
                      <option value="3/5">3/5 (Regular)</option>
                      <option value="4/5">4/5 (Bueno)</option>
                      <option value="5/5">5/5 (Excelente)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 uppercase font-bold">Fecha</label>
                    <input
                      type="text"
                      value={rev.timeAgo}
                      onChange={(e) => handleUpdateReview(idx, { timeAgo: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold">Texto de la Reseña</label>
                  <textarea
                    rows={2}
                    value={rev.text}
                    onChange={(e) => handleUpdateReview(idx, { text: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-amber-400 uppercase font-bold">
                    Texto Resaltado (Se lee rápido en pantalla)
                  </label>
                  <input
                    type="text"
                    value={rev.highlightText || ""}
                    onChange={(e) => handleUpdateReview(idx, { highlightText: e.target.value })}
                    placeholder="Fragmento exacto que se marcará en amarillo/rojo..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-yellow-300 font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
