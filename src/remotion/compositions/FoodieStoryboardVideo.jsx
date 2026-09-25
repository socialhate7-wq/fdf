import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
  Video,
  Audio,
  staticFile
} from 'remotion';
import {
  Utensils,
  Star,
  AlertTriangle,
  Flame,
  Volume2,
  VolumeX,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  ShieldAlert,
  Layers,
  Zap,
  TrendingDown
} from 'lucide-react';
import { GoogleReviewCard, GoogleLogo } from './GoogleReviewCard';

export const DEFAULT_FOODIE_REVIEWS = [
  {
    id: 1,
    author: "Juan Carlos Arias",
    badge: "Local Guide",
    rating: "5/5",
    stars: 5,
    timeAgo: "Hace 2 meses",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
    text: "Tardaron 10 minutos desde que llegamos hasta que nos sentamos por qué no había camareros suficientes para atender o dicho de otra manera había muchos camareros ... Más",
    highlightText: "Tardaron 10 minutos desde que llegamos hasta que nos sentamos",
    highlightBg: "#FEF08A",
    sentiment: "mixed"
  },
  {
    id: 2,
    author: "Marta Gómez",
    badge: "Local Guide · 32 reseñas",
    rating: "1/5",
    stars: 1,
    timeAgo: "Hace 3 semanas",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
    text: "Fuimos por recomendación del influencer y qué decepción. Cobran 4,50€ por pan no pedido y la carne venía fría por dentro.",
    highlightText: "Cobran 4,50€ por pan no pedido y la carne venía fría",
    highlightBg: "#FECACA",
    sentiment: "negative"
  },
  {
    id: 3,
    author: "David Morales",
    badge: "14 reseñas",
    rating: "1/5",
    stars: 1,
    timeAgo: "Hace 1 mes",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
    text: "Puro postureo de TikTok. En el vídeo las raciones parecían enormes, en mesa son ridículas. 45€ por cabeza tirados a la basura.",
    highlightText: "Puro postureo de TikTok... 45€ tirados a la basura",
    highlightBg: "#FECACA",
    sentiment: "negative"
  },
  {
    id: 4,
    author: "Laura Benítez",
    badge: "Local Guide · 84 reseñas",
    rating: "2/5",
    stars: 2,
    timeAgo: "Hace 4 días",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop",
    text: "Hicimos cola de 45 minutos. Te atienden deprisa y corriendo para doblar mesa. El postre venía congelado.",
    highlightText: "Te atienden deprisa para doblar mesa. Postre congelado",
    highlightBg: "#FEF08A",
    sentiment: "negative"
  }
];

export const FoodieStoryboardVideo = ({
  videoId = "dQw4w9WgXcQ",
  videoSrc = null,
  avatarSrc = "/videos/ff3.mp4",
  channelName = "Cenando con Pablo",
  restaurantName = "Gran Buffet Fusión",
  restaurantLocation = "Madrid",
  thumbnailUrl = null,
  coherenceIndex = 24,
  videoFormat = "vertical", // 'vertical' (9:16 full-bleed) | 'horizontal' (16:9 card)
  transitionStyle = "glitch", // 'glitch' (Glitch + Flash) | 'zoom' (Zoom Explosivo) | 'cut' (Corte Seco)
  hook = {
    startTime: 0,
    duration: 3,
    label: "CLIP ORIGINAL FOODIE",
    volume: 1,
  },
  scene2 = {
    text: "Hoy {nombre} ha ido a comer a {restaurante} y vamos a ver cómo le ha ido.",
    duration: 4.5,
  },
  polemicClips = [
    {
      id: 1,
      startTime: 15.0,
      duration: 3,
      title: "🚨 'EL MEJOR DE ESPAÑA'",
      subtitle: "Promesa en miniatura y vídeo",
    },
    {
      id: 2,
      startTime: 45.0,
      duration: 3,
      title: "🔥 38€ POR RACIÓN",
      subtitle: "Momento cobro y ticket",
    }
  ],
  scene4 = {
    text: "Ahora vamos a ver qué dice la gente que ha comido allí.",
    duration: 3.5,
  },
  reviews = DEFAULT_FOODIE_REVIEWS,
  reviewsSceneDuration = 7.0, // snappy fast TikTok rhythm
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Resolve media sources safely
  const resolvedAvatarSrc = avatarSrc?.startsWith('/') ? staticFile(avatarSrc.replace(/^\//, '')) : avatarSrc;
  const resolvedVideoSrc = videoSrc?.startsWith('/') ? staticFile(videoSrc.replace(/^\//, '')) : videoSrc;

  // Resolved thumbnail from YouTube or fallback
  const resolvedThumbnail = thumbnailUrl || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1080&q=80");

  const isVertical = videoFormat === "vertical";

  // Frame calculation for each scene:
  // Scene 1: Hook Original (e.g. 3s = 90 frames)
  const scene1DurationFrames = Math.max(30, Math.round((hook?.duration || 3) * fps));
  const scene1Start = 0;

  // Scene 2: Avatar ff3.mp4 speaking ("Hoy [nombre] ha ido a comer...")
  const scene2DurationFrames = Math.max(30, Math.round((scene2?.duration || 4.5) * fps));
  const scene2Start = scene1Start + scene1DurationFrames;

  // Scene 3: Polemic clips (sum of each clip duration)
  const clips = Array.isArray(polemicClips) && polemicClips.length > 0 ? polemicClips : [
    { id: 1, startTime: 15, duration: 3, title: "🚨 MOMENTO POLÉMICO", subtitle: "Revisión en directo" }
  ];
  const clipFrameDurations = clips.map(c => Math.max(30, Math.round((c.duration || 3) * fps)));
  const scene3DurationFrames = clipFrameDurations.reduce((acc, d) => acc + d, 0);
  const scene3Start = scene2Start + scene2DurationFrames;

  // Scene 4: Avatar ff3.mp4 speaking ("Ahora vamos a ver qué dice la gente...")
  const scene4DurationFrames = Math.max(30, Math.round((scene4?.duration || 3.5) * fps));
  const scene4Start = scene3Start + scene3DurationFrames;

  // Scene 5: Google Places Reviews (Fast TikTok Rhythm with Zoom-In -> Underline -> Zoom-Out)
  const activeReviews = Array.isArray(reviews) && reviews.length > 0 ? reviews : DEFAULT_FOODIE_REVIEWS;
  const scene5DurationFrames = Math.max(90, Math.round((reviewsSceneDuration || 7.0) * fps));
  const scene5Start = scene4Start + scene4DurationFrames;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#09090B',
        fontFamily: "'Inter', sans-serif",
        color: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      {/* ========================================================
          SCENE 1: HOOK ORIGINAL (0 - 3s)
          Clip original del influencer con sonido real (YouTube Video)
          Soporta 9:16 Vertical Completo o 16:9 Horizontal
      ======================================================== */}
      <Sequence from={scene1Start} durationInFrames={scene1DurationFrames}>
        {(() => {
          const s1Frame = frame - scene1Start;
          const s1Progress = s1Frame / scene1DurationFrames;
          const remainingSec = Math.max(0, ((scene1DurationFrames - s1Frame) / fps)).toFixed(1);

          // Exit transition effects for Scene 1 (Glitch + Flash / Zoom / Cut)
          const isEnding = s1Frame >= scene1DurationFrames - 12;
          const endingProgress = interpolate(
            s1Frame,
            [scene1DurationFrames - 12, scene1DurationFrames],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          let glitchX = 0;
          let glitchY = 0;
          let flashOpacity = 0;
          let zoomScale = 1;

          if (transitionStyle === 'glitch' && isEnding) {
            glitchX = Math.sin(s1Frame * 1.8) * 22 * endingProgress;
            glitchY = Math.cos(s1Frame * 2.4) * 12 * endingProgress;
            flashOpacity = interpolate(s1Frame, [scene1DurationFrames - 8, scene1DurationFrames - 1], [0, 0.9], { extrapolateRight: 'clamp' });
          } else if (transitionStyle === 'zoom' && isEnding) {
            zoomScale = interpolate(s1Frame, [scene1DurationFrames - 12, scene1DurationFrames], [1, 1.3], { extrapolateRight: 'clamp' });
            flashOpacity = interpolate(s1Frame, [scene1DurationFrames - 5, scene1DurationFrames - 1], [0, 0.7], { extrapolateRight: 'clamp' });
          } else if (transitionStyle === 'cut' && isEnding) {
            flashOpacity = s1Frame >= scene1DurationFrames - 2 ? 0.4 : 0;
          }

          return (
            <AbsoluteFill
              style={{
                backgroundColor: '#000000',
                overflow: 'hidden',
                transform: `translate(${glitchX}px, ${glitchY}px) scale(${zoomScale})`,
              }}
            >
              {/* If horizontal, show ambient blurred backdrop */}
              {!isVertical && (
                <div
                  style={{
                    position: 'absolute',
                    inset: '-10%',
                    width: '120%',
                    height: '120%',
                    backgroundImage: `url(${resolvedThumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(40px) brightness(0.4)',
                    transform: 'scale(1.1)',
                  }}
                />
              )}

              {/* VIDEO CONTAINER: 9:16 Vertical Full Bleed vs 16:9 Centered Box */}
              <div
                style={
                  isVertical
                    ? {
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#000',
                        zIndex: 5,
                        overflow: 'hidden',
                      }
                    : {
                        position: 'absolute',
                        top: '180px',
                        left: '40px',
                        right: '40px',
                        height: '620px',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        border: '3px solid rgba(220, 38, 38, 0.8)',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(220, 38, 38, 0.3)',
                        backgroundColor: '#000',
                        zIndex: 10,
                      }
                }
              >
                {/* Instant fallback background prevents black flash during iframe load */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, #18181B 0%, #09090B 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: 'rgba(220, 38, 38, 0.15)',
                      border: '1px solid rgba(220, 38, 38, 0.3)',
                      padding: '10px 20px',
                      borderRadius: '999px',
                    }}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#DC2626' }} />
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#F87171', letterSpacing: '1px' }}>
                      CLIP ORIGINAL HOOK
                    </span>
                  </div>
                </div>

                {videoId && s1Frame < scene1DurationFrames ? (
                  <iframe
                    key={`hook-yt-iframe-${videoId}-${hook?.startTime}`}
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?start=${Math.floor(hook?.startTime || 0)}&autoplay=1&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&iv_load_policy=3`}
                    title="Hook Clip"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      zIndex: 2,
                      objectFit: 'cover',
                    }}
                  />
                ) : resolvedVideoSrc ? (
                  <Video
                    src={resolvedVideoSrc}
                    startFrom={Math.round((hook?.startTime || 0) * fps)}
                    endAt={Math.round(((hook?.startTime || 0) + (hook?.duration || 3)) * fps)}
                    volume={hook?.volume ?? 1}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: 2,
                    }}
                  />
                ) : null}

                {/* Subtle vignette for vertical format so text pops */}
                {isVertical && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.85) 100%)',
                      pointerEvents: 'none',
                      zIndex: 3,
                    }}
                  />
                )}
              </div>

              {/* TOP HUD: CLIP ORIGINAL FOODIE + COUNTDOWN + 9:16 BADGE */}
              <div
                style={{
                  position: 'absolute',
                  top: '60px',
                  left: '40px',
                  right: '40px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 30,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(220, 38, 38, 0.95)',
                    backdropFilter: 'blur(10px)',
                    padding: '12px 24px',
                    borderRadius: '999px',
                    boxShadow: '0 8px 30px rgba(220, 38, 38, 0.6)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 0 12px #FFFFFF',
                      animation: 'pulse 1s infinite',
                    }}
                  />
                  <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '2px' }}>
                    {hook?.label || "CLIP ORIGINAL DEL FOODIE"}
                  </span>
                  {isVertical && (
                    <span style={{ background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '6px', fontSize: '13px', fontWeight: 800 }}>
                      9:16 VERTICAL
                    </span>
                  )}
                </div>
              </div>

              {/* BOTTOM INFO BAR: Creator & Restaurant Context */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '70px',
                  left: '40px',
                  right: '40px',
                  background: 'rgba(10, 10, 12, 0.88)',
                  backdropFilter: 'blur(14px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.15)',
                  padding: '24px 30px',
                  borderRadius: '24px',
                  zIndex: 30,
                  boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: '#EF4444', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                      VÍDEO DE AUDITORÍA FOODIE FAKE
                    </div>
                    <div style={{ fontSize: '26px', fontWeight: 900, color: '#FFFFFF', marginTop: '4px' }}>
                      {restaurantName} · <span style={{ color: '#FBBF24' }}>@{channelName}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TRANSITION OVERLAY: Glitch Scanlines & Impact Flash */}
              {isEnding && (
                <>
                  {transitionStyle === 'glitch' && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6) 2px, transparent 2px, transparent 4px)',
                        opacity: 0.7,
                        pointerEvents: 'none',
                        zIndex: 90,
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: s1Frame >= scene1DurationFrames - 4 ? '#FFFFFF' : '#DC2626',
                      opacity: flashOpacity,
                      pointerEvents: 'none',
                      zIndex: 100,
                    }}
                  />
                </>
              )}
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ========================================================
          SCENE 2: AVATAR FF3.MP4 (Introducción Dinámica)
          "Hoy [nombre] ha ido a comer a [restaurante] y vamos a ver..."
      ======================================================== */}
      <Sequence from={scene2Start} durationInFrames={scene2DurationFrames}>
        {(() => {
          const sceneFrame = frame - scene2Start;
          const popSpring = spring({ frame: sceneFrame, fps, config: { damping: 14 } });

          return (
            <AbsoluteFill style={{ backgroundColor: '#09090B', overflow: 'hidden' }}>
              {/* Background ambient radial glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '900px',
                  height: '900px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
                  filter: 'blur(80px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Avatar ff3.mp4 Video: Silenciado del audio original */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Video
                  src={resolvedAvatarSrc}
                  volume={0}
                  muted
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Voz con ritmo TikTok: Álvaro Neural (gratuita de Edge TTS) */}
              <Audio
                src={`/api/tts?text=${encodeURIComponent(`Hoy ${channelName} ha ido a comer a ${restaurantName} y vamos a ver cómo le ha ido.`)}&voice=es-ES-AlvaroNeural&rate=%2B15%25`}
                volume={1}
              />

              {/* Top Watermark */}
              <div
                style={{
                  position: 'absolute',
                  top: '60px',
                  left: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(9, 9, 11, 0.85)',
                  backdropFilter: 'blur(12px)',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  zIndex: 40,
                }}
              >
                <Utensils size={24} color="#10B981" />
                <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '1px' }}>
                  FOODIE<span style={{ color: '#10B981' }}>FAKE</span>
                </span>
                <span style={{ color: '#71717A', fontSize: '16px' }}>|</span>
                <span style={{ color: '#A1A1AA', fontSize: '16px', fontWeight: 700 }}>
                  AUDITOR VERIFICADO
                </span>
              </div>

              {/* Kinetic Captions / Subtitles Container */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '90px',
                  left: '40px',
                  right: '40px',
                  zIndex: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transform: `scale(${popSpring})`,
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '2px solid rgba(16, 185, 129, 0.6)',
                    borderRadius: '28px',
                    padding: '32px 36px',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.25)',
                    maxWidth: '960px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '17px',
                      fontWeight: 900,
                      color: '#10B981',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      marginBottom: '10px',
                    }}
                  >
                    🎙️ CASO DE HOY
                  </div>
                  <div
                    style={{
                      fontSize: '34px',
                      fontWeight: 900,
                      lineHeight: '1.3',
                      color: '#FFFFFF',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    Hoy <span style={{ color: '#FBBF24', textDecoration: 'underline' }}>{channelName}</span> ha ido a comer a{' '}
                    <span style={{ color: '#34D399' }}>{restaurantName}</span> y vamos a ver cómo le ha ido.
                  </div>
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ========================================================
          SCENE 3: SELECTOR DE CLIPS DE MOMENTOS POLÉMICOS
          - Formato 9:16 Vertical Completo o 16:9 Horizontal
          - Transiciones fluidas entre clips: Glitch+Flash, Zoom Explosivo o Corte Seco
          - CERO pantallazo negro: buffer visual continuo
      ======================================================== */}
      {/* ========================================================
          SCENE 3: SELECTOR DE CLIPS DE MOMENTOS POLÉMICOS
          - Secuencia acotada estrictamente a scene3Start (CERO fuga de audio en Escena 2 ni 4)
          - Al terminar cada momento o la escena, el sonido del influencer se apaga de inmediato
      ======================================================== */}
      <Sequence from={scene3Start} durationInFrames={scene3DurationFrames}>
        {(() => {
          const s3Frame = frame - scene3Start;

          // Determinar clip activo y tiempo local de forma matemática y continua
          let accumulatedFrames = 0;
          let currentClipIndex = 0;
          for (let i = 0; i < clips.length; i++) {
            const dur = clipFrameDurations[i];
            if (s3Frame < accumulatedFrames + dur || i === clips.length - 1) {
              currentClipIndex = i;
              break;
            }
            accumulatedFrames += dur;
          }

          const activeClip = clips[currentClipIndex];
          const clipStartLocal = accumulatedFrames;
          const clipDuration = clipFrameDurations[currentClipIndex];
          const currentClipFrame = s3Frame - clipStartLocal;

          // Transición suave de entrada a Escena 3 desde Escena 2 (CERO pantalla negra)
          const isScene3Entering = s3Frame < 8;
          const scene3EnterScale = isScene3Entering
            ? interpolate(s3Frame, [0, 8], [1.04, 1.0], { extrapolateRight: 'clamp' })
            : 1.0;

          // Micro-transiciones entre clips individuales (solo entre clips intermedios)
          const isClipExiting = currentClipFrame >= clipDuration - 4 && currentClipIndex < clips.length - 1;
          const isClipEntering = currentClipFrame < 4 && currentClipIndex > 0;

          let glitchX = 0;
          let glitchY = 0;
          let clipScale = scene3EnterScale;
          let microFlashOpacity = 0;

          if (transitionStyle === 'glitch') {
            if (isClipExiting) {
              glitchX = Math.sin(currentClipFrame * 2.5) * 8;
              glitchY = Math.cos(currentClipFrame * 3.0) * 4;
            } else if (isClipEntering) {
              glitchX = Math.sin(currentClipFrame * 2.0) * 4;
            }
          } else if (transitionStyle === 'zoom') {
            if (isClipExiting) {
              clipScale = interpolate(currentClipFrame, [clipDuration - 4, clipDuration], [1, 1.05], { extrapolateRight: 'clamp' });
            } else if (isClipEntering) {
              clipScale = interpolate(currentClipFrame, [0, 4], [1.04, 1], { extrapolateRight: 'clamp' });
            }
          } else if (transitionStyle === 'cut') {
            if (isClipExiting && currentClipFrame >= clipDuration - 1) {
              microFlashOpacity = 0.15;
            }
          }

          return (
            <AbsoluteFill
              style={{
                backgroundColor: '#09090B',
                overflow: 'hidden',
              }}
            >
              {/* Fondo ambiental envolvente dinámico (sin destellos vacíos) */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-10%',
                  width: '120%',
                  height: '120%',
                  background: 'radial-gradient(ellipse at center, rgba(35, 15, 15, 0.9) 0%, rgba(9, 9, 11, 1) 75%)',
                  zIndex: 1,
                }}
              />

              {/* Halo radial de alerta roja/ámbar permanente y vivo */}
              <div
                style={{
                  position: 'absolute',
                  top: '35%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '900px',
                  height: '600px',
                  background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 70%)',
                  filter: 'blur(70px)',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />

              {/* CONTENEDOR DEL VÍDEO: 9:16 Vertical o 16:9 Tarjeta */}
              <div
                style={
                  isVertical
                    ? {
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#121114',
                        zIndex: 5,
                        overflow: 'hidden',
                      }
                    : {
                        position: 'absolute',
                        top: '200px',
                        left: '40px',
                        right: '40px',
                        height: '620px',
                        borderRadius: '26px',
                        overflow: 'hidden',
                        border: '4px solid #EF4444',
                        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(239, 68, 68, 0.45)',
                        backgroundColor: '#121114',
                        zIndex: 10,
                      }
                }
              >
                {/* Fondo de seguridad cinematográfico */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, #18181B 0%, #09090B 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      padding: '10px 20px',
                      borderRadius: '999px',
                    }}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#F87171', letterSpacing: '1px' }}>
                      AUDITORÍA EN VIVO · FOODIEFAKE
                    </span>
                  </div>
                </div>

                {/* Capa de reproducción: Solo el clip activo montado para que al terminar el Momento 1 su sonido se CORTE de inmediato */}
                {clips.map((clip, idx) => {
                  const isCurrent = idx === currentClipIndex;
                  if (!isCurrent) return null;

                  return (
                    <div
                      key={`clip-container-${clip.id || idx}-${clip.startTime}`}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 10,
                      }}
                    >
                      {videoId ? (
                        <iframe
                          key={`polemic-yt-${idx}-${clip.id || idx}-${clip.startTime}-${videoId}`}
                          src={`https://www.youtube-nocookie.com/embed/${videoId}?start=${Math.floor(clip.startTime || 0)}&autoplay=1&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&iv_load_policy=3`}
                          title={clip.title}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            objectFit: 'cover',
                          }}
                        />
                      ) : resolvedVideoSrc ? (
                        <Video
                          src={resolvedVideoSrc}
                          startFrom={Math.round((clip.startTime || 0) * fps)}
                          endAt={Math.round(((clip.startTime || 0) + (clip.duration || 3)) * fps)}
                          volume={1}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : null}
                    </div>
                  );
                })}

                {/* Sombra degradada para formato vertical */}
                {isVertical && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.92) 100%)',
                      pointerEvents: 'none',
                      zIndex: 15,
                    }}
                  />
                )}
              </div>

              {/* Banner superior: MOMENTO POLÉMICO */}
              <div
                style={{
                  position: 'absolute',
                  top: '60px',
                  left: '40px',
                  right: '40px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  zIndex: 30,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'linear-gradient(135deg, #DC2626, #991B1B)',
                    padding: '14px 28px',
                    borderRadius: '999px',
                    boxShadow: '0 8px 30px rgba(220, 38, 38, 0.6)',
                  }}
                >
                  <Flame size={24} color="#FDE047" />
                  <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '1px' }}>
                    MOMENTO POLÉMICO #{currentClipIndex + 1}
                  </span>
                </div>
              </div>

              {/* Micro-flash opcional suave entre cortes (sin cegar ni mostrar negro) */}
              {microFlashOpacity > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#FFFFFF',
                    opacity: microFlashOpacity,
                    pointerEvents: 'none',
                    zIndex: 100,
                  }}
                />
              )}
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ========================================================
          SCENE 4: AVATAR FF3.MP4 (Transición a Reseñas)
          "Ahora vamos a ver qué dice la gente que ha comido allí."
      ======================================================== */}
      <Sequence from={scene4Start} durationInFrames={scene4DurationFrames}>
        {(() => {
          const sceneFrame = frame - scene4Start;
          const popSpring = spring({ frame: sceneFrame, fps, config: { damping: 14 } });

          return (
            <AbsoluteFill style={{ backgroundColor: '#09090B', overflow: 'hidden' }}>
              {/* Background amber glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '900px',
                  height: '900px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
                  filter: 'blur(80px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Avatar ff3.mp4 Video: Silenciado del audio original */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Video
                  src={resolvedAvatarSrc}
                  volume={0}
                  muted
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Voz con ritmo TikTok: Álvaro Neural (gratuita de Edge TTS) */}
              <Audio
                src={`/api/tts?text=${encodeURIComponent('Ahora vamos a ver qué dice la gente que ha comido allí.')}&voice=es-ES-AlvaroNeural&rate=%2B15%25`}
                volume={1}
              />

              {/* Kinetic Captions / Subtitles Container */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '90px',
                  left: '40px',
                  right: '40px',
                  zIndex: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transform: `scale(${popSpring})`,
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.88)',
                    backdropFilter: 'blur(16px)',
                    border: '2px solid #F59E0B',
                    borderRadius: '28px',
                    padding: '32px 36px',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(245, 158, 11, 0.25)',
                    maxWidth: '960px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '17px',
                      fontWeight: 900,
                      color: '#F59E0B',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      marginBottom: '10px',
                    }}
                  >
                    ⚡ LA HORA DE LA VERDAD
                  </div>
                  <div
                    style={{
                      fontSize: '34px',
                      fontWeight: 900,
                      lineHeight: '1.3',
                      color: '#FFFFFF',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    Ahora vamos a ver qué dice la{' '}
                    <span style={{ color: '#FDE047', textDecoration: 'underline' }}>
                      gente que ha comido allí
                    </span>.
                  </div>
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ========================================================
          SCENE 5: RESEÑAS REALES DE GOOGLE MAPS
          RITMO TIKTOK VERTIGINOSO:
          - Salida rápida de cada tarjeta con ZOOM IN explosivo
          - Subrayado dinámico animado de la frase más importante
          - ZOOM OUT de la tarjeta asentándose en su posición apilada
          - Sale la siguiente tarjeta con ZOOM IN y repite el ritmo
          - Todas las tarjetas se apilan sin desaparecer por toda la pantalla
      ======================================================== */}
      <Sequence from={scene5Start} durationInFrames={scene5DurationFrames}>
        {(() => {
          const sceneFrame = frame - scene5Start;
          const reviewsToDisplay = activeReviews.slice(0, 4);

          // Fast TikTok Rhythm Timing:
          // Each card has a Spotlight Duration of 28 frames (~0.9s)
          // Card 0: frame 4 -> 32
          // Card 1: frame 32 -> 60
          // Card 2: frame 60 -> 88
          // Card 3: frame 88 -> 116
          // Frame 116+: Stamp impact slam down
          const CARD_BEAT_DURATION = 28;
          const enterDelays = [4, 32, 60, 88];

          // Natural stacked dock positions (so all 4 cards fit vertically on screen 1080x1920)
          const dockedPositions = [
            { top: 220, rotation: -1.2 },
            { top: 520, rotation: 1.5 },
            { top: 820, rotation: -0.8 },
            { top: 1120, rotation: 1.0 },
          ];

          return (
            <AbsoluteFill
              style={{
                backgroundColor: '#09090B',
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
                backgroundSize: '36px 36px',
                overflow: 'hidden',
              }}
            >
              {/* Dynamic ambient red & yellow glow in background */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '1000px',
                  height: '1400px',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(234, 67, 53, 0.22) 0%, rgba(251, 188, 4, 0.12) 40%, transparent 70%)',
                  filter: 'blur(90px)',
                  pointerEvents: 'none',
                }}
              />

              {/* TOP HEADER: Google Places Audit Branding */}
              <div
                style={{
                  position: 'absolute',
                  top: '55px',
                  left: '40px',
                  right: '40px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 60,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: 'rgba(24, 24, 27, 0.94)',
                    backdropFilter: 'blur(14px)',
                    padding: '14px 24px',
                    borderRadius: '20px',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <GoogleLogo size={28} />
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF' }}>
                      RESEÑAS REALES DE GOOGLE MAPS
                    </div>
                    <div style={{ fontSize: '14px', color: '#A1A1AA' }}>
                      {restaurantName} · Evidencia acumulada
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#DC2626',
                    color: '#FFFFFF',
                    padding: '12px 20px',
                    borderRadius: '16px',
                    fontWeight: 900,
                    fontSize: '17px',
                    boxShadow: '0 8px 24px rgba(220, 38, 38, 0.5)',
                  }}
                >
                  <Layers size={18} />
                  <span>
                    {reviewsToDisplay.filter((_, i) => sceneFrame >= enterDelays[i]).length} / {reviewsToDisplay.length}
                  </span>
                </div>
              </div>

              {/* STACKED REVIEWS CONTAINER with TIKTOK ZOOM-IN / UNDERLINE / ZOOM-OUT RHYTHM */}
              {reviewsToDisplay.map((rev, i) => {
                const enterFrame = enterDelays[i];
                if (sceneFrame < enterFrame) {
                  return null; // Not entered yet
                }

                const cardAge = sceneFrame - enterFrame;
                const isSpotlight = cardAge < CARD_BEAT_DURATION;

                // CHOREOGRAPHY OF EACH CARD:
                // 1) Zoom In (Frames 0 -> 6): scale 0.8 -> 1.22
                // 2) Underline phrase (Frames 6 -> 18): highlight sweeps 0 -> 100%
                // 3) Zoom Out (Frames 18 -> 26): scale 1.22 -> 1.0, settles into docked top position
                // 4) Settled (Frames 28+): remains visible and stacked on screen
                let currentScale = 1.0;
                let currentTop = dockedPositions[i].top;
                let underlineProgress = 1.0;
                let zIndex = 10 + i;

                if (isSpotlight) {
                  zIndex = 50; // Active card is in the front spotlight

                  if (cardAge < 6) {
                    // Zoom In punch
                    currentScale = interpolate(cardAge, [0, 6], [0.75, 1.22], { extrapolateRight: 'clamp' });
                    // Lift slightly toward screen center during zoom
                    currentTop = interpolate(cardAge, [0, 6], [dockedPositions[i].top + 50, 480], { extrapolateRight: 'clamp' });
                    underlineProgress = 0;
                  } else if (cardAge < 18) {
                    // Spotlight Zoom & Animated Underline Sweep
                    currentScale = 1.22;
                    currentTop = 480;
                    underlineProgress = interpolate(cardAge, [6, 17], [0, 1], { extrapolateRight: 'clamp' });
                  } else {
                    // Zoom Out & Dock to its slot
                    currentScale = interpolate(cardAge, [18, 26], [1.22, 1.0], { extrapolateRight: 'clamp' });
                    currentTop = interpolate(cardAge, [18, 26], [480, dockedPositions[i].top], { extrapolateRight: 'clamp' });
                    underlineProgress = 1.0;
                  }
                } else {
                  // Already settled into stack
                  currentScale = 1.0;
                  currentTop = dockedPositions[i].top;
                  underlineProgress = 1.0;
                  zIndex = 10 + i;
                }

                const dockRotation = isSpotlight && cardAge < 20 ? 0 : dockedPositions[i].rotation;

                return (
                  <div
                    key={rev.id || i}
                    style={{
                      position: 'absolute',
                      top: `${currentTop}px`,
                      left: '40px',
                      right: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      zIndex,
                      transform: `scale(${currentScale})`,
                      transition: isSpotlight ? 'none' : 'transform 0.15s ease-out',
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
                      rotation={dockRotation}
                      highlightProgress={underlineProgress}
                      isZoomed={isSpotlight}
                      style={{
                        border: isSpotlight ? '3px solid #EF4444' : '2px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: isSpotlight
                          ? '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(220, 38, 38, 0.5)'
                          : '0 20px 45px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0,0,0,0.1)',
                      }}
                    />
                  </div>
                );
              })}

              {/* FINAL IMPACT VERDICT STAMP (Slam down when all 4 reviews have stacked) */}
              {sceneFrame >= 116 && (() => {
                const stampSpring = spring({
                  frame: sceneFrame - 116,
                  fps,
                  config: { damping: 9, mass: 0.7, stiffness: 140 },
                });

                return (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '50px',
                      left: '40px',
                      right: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      zIndex: 70,
                      transform: `scale(${stampSpring})`,
                    }}
                  >
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #DC2626, #991B1B)',
                        border: '3px solid #FFFFFF',
                        borderRadius: '22px',
                        padding: '16px 36px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        boxShadow: '0 20px 50px rgba(220, 38, 38, 0.9), 0 0 30px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      <AlertTriangle size={32} color="#FDE047" />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 900, color: '#FDE047', letterSpacing: '2px', textTransform: 'uppercase' }}>
                          💥 SENTENCIA DE COMENSALES REALES
                        </div>
                        <div style={{ fontSize: '26px', fontWeight: 900, color: '#FFFFFF' }}>
                          ÍNDICE DE COHERENCIA: <span style={{ color: '#FDE047' }}>{coherenceIndex}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
