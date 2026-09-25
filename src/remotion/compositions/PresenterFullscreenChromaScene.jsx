import React, { useRef, useEffect, useState } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, staticFile, Video } from 'remotion';
import { Flame, Radio, Zap, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';

/**
 * 3 High-Impact Hooks for the Presenter (1.mp4):
 * 1. Polemic / Accusatory
 * 2. Secret Audit / Mystery & Censorship
 * 3. Reality Check / Challenge
 */
export const PRESENTER_HOOKS = [
  {
    id: 'polemic',
    name: 'Polémico',
    tag: '🔥 MÁXIMA POLÉMICA',
    tagColor: '#DC2626',
    title: (channel) => `¿SE LE CAYÓ LA CARETA A ${channel ? channel.toUpperCase() : 'ESTE CREADOR'}?`,
    subtitle: (channel) => 'Lo que calla en sus vídeos... ¡arde sin piedad en los comentarios!',
  },
  {
    id: 'mystery',
    name: 'Misterio & Censura',
    tag: '🚨 AUDITORÍA SECRETA',
    tagColor: '#9333EA',
    title: (channel) => `LO QUE DESCUBRIMOS ES TAN TURBIO QUE CASI NOS CENSURAN...`,
    subtitle: (channel) => `Auditamos miles de comentarios de ${channel || 'este canal'} y saltaron todas las alarmas.`,
  },
  {
    id: 'reality',
    name: 'Reality Check',
    tag: '⚡ REALITY CHECK',
    tagColor: '#EA580C',
    title: (channel) => `DICE QUE TODOS LE APOYAN... PERO LOS DATOS NO MIENTEN`,
    subtitle: (channel) => 'SocialHate escanea el odio real: la sentencia de la audiencia es demoledora.',
  },
];

/**
 * PresenterFullscreenChromaScene
 * Renders 1.mp4 in vertical full-screen (1080x1920) with green screen removed in real time.
 * Includes edge despill, dynamic ambient glow, audio playback, and transition to stats.
 */
export const PresenterFullscreenChromaScene = ({ data = {}, config = {} }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Keying configuration
  const greenTolerance = config.greenTolerance ?? 1.25;
  const minGreen = config.minGreen ?? 80;
  const despill = config.despill ?? true;

  // Select Hook
  const channelName = data?.channel_name || '';
  const hookId = config.presenterHookId || 'random';
  let activeHook = PRESENTER_HOOKS[0];
  if (hookId === 'random') {
    // Deterministic rotation based on video id or title
    const seed = (data?.id || data?.video_id || channelName || 'sh').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    activeHook = PRESENTER_HOOKS[seed % PRESENTER_HOOKS.length];
  } else {
    activeHook = PRESENTER_HOOKS.find(h => h.id === hookId) || PRESENTER_HOOKS[0];
  }

  // Fade in / out effects
  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [155, 175], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacity = fadeIn * fadeOut;

  // Zoom punch at start
  const zoomPunch = interpolate(frame, [0, 20], [1.08, 1.0], { extrapolateRight: 'clamp' });

  // Hook text animation
  const titleScale = interpolate(frame, [10, 25], [0.92, 1.0], { extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: 'clamp' });

  // Sync canvas with HTML video on every frame
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Calculate current target time for video based on Remotion frame
    const targetTime = frame / fps;
    
    // Only update currentTime if significantly out of sync to avoid stutter
    if (Math.abs(video.currentTime - targetTime) > 0.08) {
      try {
        video.currentTime = targetTime;
      } catch (err) {
        // ignore seek errors
      }
    }

    const drawFrame = () => {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx || video.readyState < 2) return;

      const w = canvas.width;
      const h = canvas.height;

      // Draw current video frame to canvas
      ctx.drawImage(video, 0, 0, w, h);

      // Chroma key pixel processing
      try {
        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];

          // Green screen detection: G dominates both R and B
          if (g > minGreen && g > r * greenTolerance && g > b * greenTolerance) {
            d[i + 3] = 0; // Transparent
          } else if (despill && g > (r + b) / 2) {
            // Despill edge pixels to eliminate green halo/fringing
            d[i + 1] = Math.round((r + b) / 2);
          }
        }

        ctx.putImageData(imgData, 0, 0);
      } catch (e) {
        // Canvas security or rendering error fallback
      }
    };

    drawFrame();
  }, [frame, fps, greenTolerance, minGreen, despill]);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#09090B',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      opacity,
      transform: `scale(${zoomPunch})`,
    }}>
      {/* Background Cyber Ambient & Flame Glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1000px',
        height: '1000px',
        background: `radial-gradient(circle, ${activeHook.tagColor}55 0%, rgba(245, 158, 11, 0.15) 40%, transparent 70%)`,
        filter: 'blur(90px)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Grid Pattern in Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(220, 38, 38, 0.15) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.6,
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* TOP LIVE BADGE */}
      <div style={{
        position: 'absolute',
        top: '55px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        border: '2px solid rgba(220, 38, 38, 0.75)',
        padding: '12px 28px',
        borderRadius: '999px',
        boxShadow: '0 0 35px rgba(220, 38, 38, 0.5)',
        zIndex: 35,
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: '#DC2626',
          boxShadow: '0 0 15px #DC2626',
        }} />
        <span style={{
          color: '#FFFFFF',
          fontSize: '22px',
          fontWeight: 900,
          letterSpacing: '1.5px',
          fontFamily: 'Inter, sans-serif',
        }}>
          AUDITORÍA EN DIRECTO
        </span>
        <span style={{
          color: '#F87171',
          fontSize: '18px',
          fontWeight: 700,
        }}>
          • @socialhate
        </span>
      </div>

      {/* REMOTION VIDEO FOR PERFECT AUDIO TIMING AND CANVAS PROCESSING */}
      <Video
        ref={videoRef}
        src={staticFile('videos/1.mp4')}
        playsInline
        crossOrigin="anonymous"
        style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          opacity: 0.001,
          pointerEvents: 'none',
        }}
      />

      {/* FULLSCREEN TRANSPARENT CANVAS (PRESENTER ON AIR WITHOUT GREEN SCREEN) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        pointerEvents: 'none',
      }}>
        <canvas
          ref={canvasRef}
          width={464}
          height={688}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.05)',
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 35px rgba(220, 38, 38, 0.45))',
          }}
        />
      </div>

      {/* HIGH-IMPACT HOOK OVERLAY CARD (DYNAMIC ROTATING HOOK) */}
      <div style={{
        position: 'absolute',
        bottom: '65px',
        left: '50%',
        transform: `translateX(-50%) scale(${titleScale})`,
        width: '92%',
        maxWidth: '940px',
        backgroundColor: 'rgba(10, 10, 15, 0.92)',
        border: `2px solid ${activeHook.tagColor}`,
        borderRadius: '26px',
        padding: '22px 30px',
        boxShadow: `0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px ${activeHook.tagColor}40`,
        zIndex: 35,
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        opacity: titleOpacity,
      }}>
        {/* Hook Category Tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            backgroundColor: `${activeHook.tagColor}25`,
            border: `1.5px solid ${activeHook.tagColor}`,
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 900,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            {activeHook.tag}
          </div>

          <div style={{
            color: '#A1A1AA',
            fontSize: '14px',
            fontWeight: 700,
          }}>
            {channelName ? `@${channelName}` : 'SocialHate'}
          </div>
        </div>

        {/* Dynamic Big Hook Title */}
        <div style={{
          color: '#FFFFFF',
          fontSize: '30px',
          fontWeight: 900,
          lineHeight: 1.18,
          fontFamily: 'Inter, system-ui, sans-serif',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)',
        }}>
          {activeHook.title(channelName)}
        </div>

        {/* Subtitle with High Retention Trigger */}
        <div style={{
          color: '#E4E4E7',
          fontSize: '17px',
          fontWeight: 500,
          lineHeight: 1.4,
          opacity: subtitleOpacity,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span>{typeof activeHook.subtitle === 'function' ? activeHook.subtitle(channelName) : activeHook.subtitle}</span>
          <span style={{
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 800,
            padding: '6px 14px',
            borderRadius: '999px',
            whiteSpace: 'nowrap',
            marginLeft: '12px',
          }}>
            VER DATOS ➔
          </span>
        </div>
      </div>
    </div>
  );
};

