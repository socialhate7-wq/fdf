import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Audio } from 'remotion';
import { Flame, Clock, ShieldCheck, AlertTriangle, Sparkles, Volume2, VolumeX } from 'lucide-react';

/**
 * HookClipScene: Renders the 3-second original video snippet (90 frames at 30fps)
 * with countdown, legal attribution tag, and transition fx.
 */
export const HookClipScene = ({ data = {}, hookConfig = {} }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startTime = Number(hookConfig.startTime || 0);
  const attribution = hookConfig.attribution || data.channel_name || 'Creador Original';
  const transitionStyle = hookConfig.transitionStyle || 'glitch';

  // Countdown timer from 3.0s down to 0.0s
  const elapsedSec = frame / fps;
  const remainingSec = Math.max(0, 3.0 - elapsedSec).toFixed(1);

  // Transition Glitch / Flash at the end (frames 75 to 90)
  const isEnding = frame >= 75;
  const endingProgress = interpolate(frame, [75, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Random glitch offsets in last 15 frames
  const glitchX = isEnding ? (Math.sin(frame * 1.5) * 18 * endingProgress) : 0;
  const glitchY = isEnding ? (Math.cos(frame * 2.1) * 8 * endingProgress) : 0;
  const flashOpacity = isEnding ? interpolate(frame, [82, 89, 90], [0, 0.95, 1], { extrapolateRight: 'clamp' }) : 0;

  // Zoom scale for "zoom" transition style
  const zoomScale = transitionStyle === 'zoom' && isEnding
    ? interpolate(frame, [75, 90], [1, 1.25], { extrapolateRight: 'clamp' })
    : 1;

  // Pulsing dot for REC
  const recOpacity = Math.sin(frame * 0.25) > 0 ? 1 : 0.25;

  const videoId = data.video_id;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#09090B',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '50px 40px 60px 40px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      transform: `translate(${glitchX}px, ${glitchY}px) scale(${zoomScale})`,
    }}>
      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(220, 38, 38, 0.35) 0%, rgba(245, 158, 11, 0.15) 45%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
      }} />

      {/* TOP HEADER / HUD */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
      }}>
        {/* Recording Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          padding: '10px 20px',
          borderRadius: '999px',
          border: '1.5px solid rgba(220, 38, 38, 0.6)',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: '#DC2626',
            boxShadow: '0 0 12px #DC2626',
            opacity: recOpacity,
          }} />
          <span style={{
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '1px',
            fontFamily: 'Inter, sans-serif',
          }}>
            CLIP ORIGINAL
          </span>
          <span style={{
            color: '#A1A1AA',
            fontSize: '15px',
            fontWeight: 600,
            fontFamily: 'monospace',
          }}>
            [HOOK 3S]
          </span>
        </div>

        {/* Right side: Audio Indicator + Countdown Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            padding: '8px 16px',
            borderRadius: '999px',
            border: `1.5px solid ${hookConfig?.muteCreator ? 'rgba(113, 113, 122, 0.6)' : 'rgba(34, 197, 94, 0.6)'}`,
            backdropFilter: 'blur(8px)',
          }}>
            {hookConfig?.muteCreator ? (
              <>
                <VolumeX size={16} color="#A1A1AA" />
                <span style={{ color: '#A1A1AA', fontSize: '13px', fontWeight: 700 }}>MUTED</span>
              </>
            ) : (
              <>
                <Volume2 size={16} color="#22C55E" />
                <span style={{ color: '#4ADE80', fontSize: '13px', fontWeight: 800 }}>AUDIO ON</span>
              </>
            )}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(220, 38, 38, 0.25)',
            border: '1.5px solid #DC2626',
            padding: '10px 22px',
            borderRadius: '999px',
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)',
          }}>
            <Clock size={20} color="#F87171" />
            <span style={{
              color: '#FFFFFF',
              fontSize: '22px',
              fontWeight: 900,
              fontFamily: 'monospace',
            }}>
              {remainingSec}s
            </span>
          </div>
        </div>
      </div>

      {/* CENTER VIDEO FRAME */}
      <div style={{
        width: '100%',
        maxWidth: '960px',
        aspectRatio: '16/9',
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '3px solid rgba(220, 38, 38, 0.8)',
        boxShadow: '0 25px 70px rgba(220, 38, 38, 0.45)',
        backgroundColor: '#000000',
        zIndex: 5,
      }}>
        {/* Native Audio for Creator Clip if audio file provided */}
        {(data?.creatorAudioUrl || hookConfig?.creatorAudioUrl) && !hookConfig?.muteCreator && (
          <Audio src={data?.creatorAudioUrl || hookConfig?.creatorAudioUrl} volume={1} />
        )}

        {/* If videoId exists, load embedded clip */}
        {videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?start=${Math.floor(startTime)}&end=${Math.floor(startTime) + 4}&autoplay=1&mute=${hookConfig?.muteCreator ? 1 : 0}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`}
            title="Video Hook"
            allow="autoplay; encrypted-media; picture-in-picture"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              pointerEvents: 'none',
            }}
          />
        ) : data.thumbnail_url ? (
          <img
            src={data.thumbnail_url}
            alt="Hook"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#71717A',
            fontSize: '24px',
          }}>
            Reproduciendo Fragmento Original (3s)
          </div>
        )}

        {/* Live Timestamp Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '18px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '6px 14px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
          <span style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace', fontWeight: 600 }}>
            {formatTime(startTime + elapsedSec)} / {formatTime(startTime + 3)}
          </span>
        </div>
      </div>

      {/* BOTTOM LEGAL ATTRIBUTION & CONTEXT */}
      <div style={{
        width: '100%',
        maxWidth: '960px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        zIndex: 10,
      }}>
        {/* Title */}
        <div style={{
          backgroundColor: 'rgba(24, 24, 27, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '16px 22px',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{
            color: '#A1A1AA',
            fontSize: '14px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '6px',
          }}>
            Video Analizado
          </div>
          <div style={{
            color: '#FFFFFF',
            fontSize: '22px',
            fontWeight: 800,
            lineHeight: 1.25,
            fontFamily: 'Inter, sans-serif',
          }}>
            {data.video_title ? (data.video_title.length > 70 ? `${data.video_title.substring(0, 70)}...` : data.video_title) : 'Video Original'}
          </div>
        </div>

        {/* Legal Fair Use Attribution Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '12px 20px',
          borderRadius: '14px',
          border: '1px solid rgba(220, 38, 38, 0.35)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>📌</span>
            <span style={{
              color: '#F43F5E',
              fontSize: '17px',
              fontWeight: 800,
              fontFamily: 'Inter, sans-serif',
            }}>
              Vía: @{attribution}
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#A1A1AA',
            fontSize: '13px',
            fontWeight: 600,
          }}>
            <ShieldCheck size={16} color="#22C55E" />
            <span>Derecho de Cita / Fair Use</span>
          </div>
        </div>
      </div>

      {/* GLITCH / SCANLINES OVERLAY DURING TRANSITION */}
      {isEnding && (
        <>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5) 2px, transparent 2px, transparent 4px)',
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 90,
          }} />
          {/* White / Red Impact Flash */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: frame >= 86 ? '#FFFFFF' : '#DC2626',
            opacity: flashOpacity,
            pointerEvents: 'none',
            zIndex: 100,
          }} />
        </>
      )}
    </div>
  );
};

/**
 * AvatarInterludeScene: Appears immediately after the 3-second hook (frames 90 to 180)
 * Mascot interrupts: "¿Pero qué opina la gente de verdad? ¡Vamos a auditarlo!"
 */
export const AvatarInterludeScene = ({ data = {}, hookConfig = {} }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const avatarQuote = hookConfig.avatarQuote || '¿Qué opina la gente en comentarios? ¡Vamos a auditarlo!';
  
  // Spring enter animation
  const mascotSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 100 },
  });

  const bubbleScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Devil Mascot bounce
  const bounce = Math.sin(frame * 0.2) * 12;

  // Flash at start and zoom punch at end
  const initialFlash = interpolate(frame, [0, 8], [1, 0], { extrapolateRight: 'clamp' });
  const isEnding = frame >= 75;
  const exitProgress = interpolate(frame, [75, 90], [0, 1], { extrapolateRight: 'clamp' });

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
      padding: '40px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px',
        height: '900px',
        background: 'radial-gradient(circle, rgba(220, 38, 38, 0.45) 0%, rgba(185, 28, 28, 0.2) 40%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      {/* Speech Bubble */}
      <div style={{
        maxWidth: '850px',
        backgroundColor: '#18181B',
        border: '3px solid #DC2626',
        borderRadius: '30px',
        padding: '30px 40px',
        boxShadow: '0 20px 60px rgba(220, 38, 38, 0.5)',
        marginBottom: '40px',
        transform: `scale(${Math.max(0, bubbleScale)})`,
        position: 'relative',
        zIndex: 20,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#F87171',
          fontSize: '18px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '10px',
        }}>
          <Sparkles size={22} color="#DC2626" />
          <span>REALIDAD VS EXPECTATIVAS</span>
        </div>

        <p style={{
          color: '#FFFFFF',
          fontSize: '36px',
          fontWeight: 900,
          lineHeight: 1.25,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
        }}>
          "{avatarQuote}"
        </p>

        {/* Speech Bubble Arrow */}
        <div style={{
          position: 'absolute',
          bottom: '-22px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '22px solid transparent',
          borderRight: '22px solid transparent',
          borderTop: '22px solid #DC2626',
        }} />
      </div>

      {/* Devil Mascot */}
      <div style={{
        transform: `translateY(${interpolate(mascotSpring, [0, 1], [300, 0]) + bounce}px)`,
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <img
          src={staticFile('images/devil-mascot.png')}
          alt="Avatar Presenter"
          style={{
            width: '420px',
            height: '420px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 25px 50px rgba(220, 38, 38, 0.6))',
          }}
          onError={(e) => {
            // Fallback if image fails
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Audit Ticker Pill */}
        <div style={{
          marginTop: '25px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(220, 38, 38, 0.2)',
          border: '2px solid #DC2626',
          padding: '12px 28px',
          borderRadius: '999px',
        }}>
          <Flame size={24} color="#DC2626" />
          <span style={{
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '1px',
            fontFamily: 'Inter, sans-serif',
          }}>
            DESGLOSE DE DATOS Y AUDITORÍA
          </span>
        </div>
      </div>

      {/* Flash overlay */}
      {initialFlash > 0 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#FFFFFF',
          opacity: initialFlash,
          pointerEvents: 'none',
          zIndex: 100,
        }} />
      )}

      {/* Exit transition */}
      {isEnding && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#09090B',
          opacity: exitProgress,
          pointerEvents: 'none',
          zIndex: 100,
        }} />
      )}
    </div>
  );
};

// Helper: Formats seconds to MM:SS
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}
