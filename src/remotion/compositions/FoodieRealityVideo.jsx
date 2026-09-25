import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';
import { Utensils, Star, AlertTriangle, CheckCircle, XCircle, TrendingDown, TrendingUp, Sparkles, MapPin, Eye, MessageSquare } from 'lucide-react';

export const FoodieRealityVideo = ({
  data = {
    restaurant_name: "Gran Buffet Fusión",
    restaurant_location: "Barcelona",
    video_title: "¡BUFFET LIBRE INFINITO POR 16€! ¿EL MEJOR DE ESPAÑA?",
    channel_name: "FoodieVip Spain",
    thumbnail_url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1080&q=80",
    coherence_index: 24,
    influencer_sentiment: {
      overall_tone: "Promocional extremo / Hype desmedido",
      key_claims: [
        "Marisco fresco ilimitado de máxima calidad",
        "Sushi elaborado al momento por chefs",
        "Experiencia 10/10 insuperable"
      ],
      suspicious_patterns: [
        "Presentación prémium para cámara",
        "Sin mostrar la cuenta ni suplementos"
      ]
    },
    community_sentiment: {
      estimated_rating: 2.8,
      common_complaints: [
        "Marisco congelado gomoso",
        "Sushi con exceso de arroz y sin pescado",
        "Bandejas vacías más de 40 minutos"
      ],
      typical_experience: "La comida del vídeo de TikTok no se corresponde con lo servido en el día a día."
    },
    gap_analysis: {
      perception_gap: "high",
      main_discrepancies: [
        "El influencer enseñó bogavante fresco; los clientes reportan marisco gomoso.",
        "El influencer alabó servicio rápido; los clientes sufren esperas de 45 min."
      ]
    },
    reviews_count: 615,
  }
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const getCoherenceColor = (index) => {
    if (index >= 70) return '#10B981'; // Emerald
    if (index >= 40) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const getVerdictLabel = (index) => {
    if (index >= 70) return { title: 'ALTA COHERENCIA', subtitle: 'RECOMENDADO Y REAL', color: '#10B981' };
    if (index >= 40) return { title: 'COHERENCIA MEDIA', subtitle: 'HYPE PARCIAL', color: '#F59E0B' };
    return { title: '¡ALERTA HYPE!', subtitle: 'BAJA COHERENCIA / PUBLICIDAD', color: '#EF4444' };
  };

  const coherenceColor = getCoherenceColor(data.coherence_index);
  const verdict = getVerdictLabel(data.coherence_index);

  // Background subtle glow pulse
  const pulse = Math.sin(frame / 12) * 0.15 + 0.85;

  return (
    <AbsoluteFill style={{
      backgroundColor: '#09090B',
      fontFamily: 'Inter, sans-serif',
      color: 'white',
      overflow: 'hidden'
    }}>
      {/* Dynamic Ambient Background Glow */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '10%',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${coherenceColor}25 0%, transparent 70%)`,
        filter: 'blur(80px)',
        transform: `scale(${pulse})`,
        pointerEvents: 'none'
      }} />

      {/* Top Header Watermark (Visible throughout video) */}
      <div style={{
        position: 'absolute',
        top: '60px',
        left: '60px',
        right: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #10B981, #059669)',
            padding: '12px 14px',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Utensils size={36} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-1px' }}>
              FOODIE <span style={{ color: '#10B981' }}>REALITY</span>
            </div>
            <div style={{ fontSize: '18px', color: '#A1A1AA', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
              AUDITORÍA DE HYPE
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(24, 24, 27, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '10px 22px',
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backdropFilter: 'blur(12px)'
        }}>
          <MapPin size={22} color="#10B981" />
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#E4E4E7' }}>
            {data.restaurant_name} • {data.restaurant_location || 'España'}
          </span>
        </div>
      </div>

      {/* ========================================================
          SCENE 1: THE DRAMATIC HOOK (0 - 90 frames / 0 - 3s)
      ======================================================== */}
      <Sequence from={0} durationInFrames={90}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '0 70px',
          textAlign: 'center'
        }}>
          {/* Animated Warning Badge */}
          <div style={{
            opacity: interpolate(frame, [0, 15], [0, 1]),
            transform: `scale(${spring({ frame, fps, config: { damping: 12 } })})`,
            background: 'rgba(239, 68, 68, 0.18)',
            border: '2px solid rgba(239, 68, 68, 0.6)',
            padding: '16px 36px',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '40px',
            boxShadow: '0 0 35px rgba(239, 68, 68, 0.35)'
          }}>
            <AlertTriangle size={36} color="#EF4444" />
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#FCA5A5', letterSpacing: '2px' }}>
              ¿HYPE VIRAL O ESTAFA REAL?
            </span>
          </div>

          {/* Main Hook Question */}
          <h1 style={{
            fontSize: '66px',
            fontWeight: 900,
            lineHeight: 1.15,
            margin: '0 0 45px 0',
            opacity: interpolate(frame, [10, 30], [0, 1]),
            transform: `translateY(${interpolate(frame, [10, 30], [40, 0])}px)`
          }}>
            ¿Coincide el <span style={{ color: '#10B981' }}>Foodie</span><br />
            con las <span style={{ color: '#F59E0B' }}>Reseñas Reales</span>?
          </h1>

          {/* Restaurant Card Preview */}
          <div style={{
            width: '100%',
            maxWidth: '920px',
            background: 'rgba(24, 24, 27, 0.9)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
            opacity: interpolate(frame, [25, 45], [0, 1]),
            transform: `scale(${interpolate(frame, [25, 45], [0.95, 1])})`
          }}>
            {data.thumbnail_url && (
              <img
                src={data.thumbnail_url}
                alt={data.restaurant_name}
                style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '36px 40px', textAlign: 'left' }}>
              <div style={{ fontSize: '40px', fontWeight: 900, color: 'white' }}>
                {data.restaurant_name}
              </div>
              <div style={{ fontSize: '26px', color: '#A1A1AA', marginTop: '8px' }}>
                Vídeo analizado: <span style={{ color: '#E4E4E7', fontWeight: 700 }}>{data.channel_name}</span>
              </div>
            </div>
          </div>
        </div>
      </Sequence>

      {/* ========================================================
          SCENE 2: WHAT THE FOODIE SAID (90 - 210 frames / 3 - 7s)
      ======================================================== */}
      <Sequence from={90} durationInFrames={120}>
        {(() => {
          const sceneFrame = frame - 90;
          return (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              padding: '140px 70px 60px 70px'
            }}>
              {/* Scene Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                padding: '12px 28px',
                borderRadius: '999px',
                alignSelf: 'flex-start',
                marginBottom: '25px',
                opacity: interpolate(sceneFrame, [0, 15], [0, 1])
              }}>
                <span style={{ fontSize: '26px' }}>📹</span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#F87171', letterSpacing: '1px' }}>
                  PARTE 1: LO QUE DIJO EL INFLUENCER
                </span>
              </div>

              <h2 style={{
                fontSize: '54px',
                fontWeight: 900,
                lineHeight: 1.15,
                margin: '0 0 35px 0',
                opacity: interpolate(sceneFrame, [10, 25], [0, 1])
              }}>
                "{data.video_title?.slice(0, 55)}..."
              </h2>

              {/* Creator Pill */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '35px',
                opacity: interpolate(sceneFrame, [15, 30], [0, 1])
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#A1A1AA',
                  background: 'rgba(255, 255, 255, 0.07)',
                  padding: '8px 20px',
                  borderRadius: '12px'
                }}>
                  Canal: <strong style={{ color: 'white' }}>{data.channel_name}</strong>
                </div>
                <div style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#F59E0B',
                  background: 'rgba(245, 158, 11, 0.15)',
                  padding: '8px 20px',
                  borderRadius: '12px'
                }}>
                  Tono: {data.influencer_sentiment?.overall_tone || 'Muy entusiasta'}
                </div>
              </div>

              {/* Claims speech bubbles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {(data.influencer_sentiment?.key_claims || [
                  "La mejor carne de la ciudad",
                  "Platos gigantescos y baratísimos",
                  "Atención de 10 estrellas"
                ]).slice(0, 3).map((claim, idx) => {
                  const cardDelay = 25 + idx * 15;
                  const cardAnim = spring({ frame: Math.max(0, sceneFrame - cardDelay), fps, config: { damping: 14 } });
                  return (
                    <div
                      key={idx}
                      style={{
                        background: 'linear-gradient(135deg, rgba(39, 39, 42, 0.95), rgba(24, 24, 27, 0.95))',
                        border: '2px solid rgba(16, 185, 129, 0.4)',
                        padding: '28px 34px',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '20px',
                        transform: `translateX(${(1 - cardAnim) * 80}px)`,
                        opacity: cardAnim,
                        boxShadow: '0 16px 40px rgba(0,0,0,0.5)'
                      }}
                    >
                      <div style={{
                        background: 'rgba(16, 185, 129, 0.2)',
                        padding: '10px 14px',
                        borderRadius: '14px',
                        fontSize: '28px',
                        color: '#10B981',
                        fontWeight: 900
                      }}>
                        ✓
                      </div>
                      <div style={{ fontSize: '32px', fontWeight: 800, color: 'white', lineHeight: 1.3 }}>
                        "{claim}"
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </Sequence>

      {/* ========================================================
          SCENE 3: REAL CUSTOMERS ON GOOGLE PLACES (210 - 330 frames / 7 - 11s)
      ======================================================== */}
      <Sequence from={210} durationInFrames={120}>
        {(() => {
          const sceneFrame = frame - 210;
          return (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              padding: '140px 70px 60px 70px'
            }}>
              {/* Scene Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                padding: '12px 28px',
                borderRadius: '999px',
                alignSelf: 'flex-start',
                marginBottom: '25px',
                opacity: interpolate(sceneFrame, [0, 15], [0, 1])
              }}>
                <span style={{ fontSize: '26px' }}>📍</span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#60A5FA', letterSpacing: '1px' }}>
                  PARTE 2: RESEÑAS REALES (GOOGLE PLACES)
                </span>
              </div>

              {/* Rating Contrast Hero Box */}
              <div style={{
                background: 'rgba(24, 24, 27, 0.95)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '28px',
                padding: '30px 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '35px',
                opacity: interpolate(sceneFrame, [10, 25], [0, 1])
              }}>
                <div>
                  <div style={{ fontSize: '22px', color: '#A1A1AA', fontWeight: 600 }}>
                    Puntuación Real en Google
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={36}
                          color="#F59E0B"
                          fill={s <= Math.round(data.community_sentiment?.estimated_rating || 3) ? '#F59E0B' : 'transparent'}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '46px', fontWeight: 900, color: '#F59E0B' }}>
                      {data.community_sentiment?.estimated_rating || 3.2}/5
                    </span>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '14px 24px',
                  borderRadius: '18px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: 'white' }}>
                    {data.reviews_count || 450}+
                  </div>
                  <div style={{ fontSize: '18px', color: '#A1A1AA' }}>
                    Reseñas auditadas
                  </div>
                </div>
              </div>

              {/* Common Complaints */}
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#EF4444', marginBottom: '20px' }}>
                🚨 Quejas recurrentes de comensales reales:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {(data.community_sentiment?.common_complaints || [
                  "Precios muy por encima de la calidad real",
                  "Esperas de más de 45 minutos para servir",
                  "La comida llega templada y raciones escasas"
                ]).slice(0, 3).map((complaint, idx) => {
                  const cardDelay = 25 + idx * 15;
                  const cardAnim = spring({ frame: Math.max(0, sceneFrame - cardDelay), fps, config: { damping: 14 } });
                  return (
                    <div
                      key={idx}
                      style={{
                        background: 'linear-gradient(135deg, rgba(39, 39, 42, 0.95), rgba(24, 24, 27, 0.95))',
                        border: '2px solid rgba(239, 68, 68, 0.4)',
                        padding: '24px 30px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '18px',
                        transform: `translateX(${(1 - cardAnim) * -80}px)`,
                        opacity: cardAnim,
                        boxShadow: '0 12px 35px rgba(239, 68, 68, 0.15)'
                      }}
                    >
                      <XCircle size={36} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ fontSize: '28px', fontWeight: 700, color: '#FCA5A5', lineHeight: 1.3 }}>
                        {complaint}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </Sequence>

      {/* ========================================================
          SCENE 4: FINAL VERDICT & COHERENCE INDEX (330 - 450 frames / 11 - 15s)
      ======================================================== */}
      <Sequence from={330} durationInFrames={120}>
        {(() => {
          const sceneFrame = frame - 330;
          const scoreAnim = spring({ frame: sceneFrame, fps, config: { damping: 14 } });
          const displayedScore = Math.round(data.coherence_index * Math.min(1, scoreAnim));

          return (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '120px 70px 60px 70px',
              textAlign: 'center'
            }}>
              {/* Verdict Header Badge */}
              <div style={{
                background: `${verdict.color}25`,
                border: `3px solid ${verdict.color}`,
                padding: '14px 40px',
                borderRadius: '999px',
                marginBottom: '35px',
                boxShadow: `0 0 45px ${verdict.color}50`,
                opacity: interpolate(sceneFrame, [0, 15], [0, 1]),
                transform: `scale(${scoreAnim})`
              }}>
                <span style={{ fontSize: '32px', fontWeight: 900, color: verdict.color, letterSpacing: '3px' }}>
                  {verdict.title}
                </span>
              </div>

              <div style={{ fontSize: '26px', color: '#A1A1AA', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '15px' }}>
                Índice de Coherencia Foodie
              </div>

              {/* Giant Coherence Percentage */}
              <div style={{
                fontSize: '160px',
                fontWeight: 900,
                lineHeight: 1,
                color: verdict.color,
                textShadow: `0 0 60px ${verdict.color}80`,
                marginBottom: '20px',
                fontFamily: 'Inter, monospace'
              }}>
                {displayedScore}%
              </div>

              <div style={{
                fontSize: '32px',
                fontWeight: 800,
                color: 'white',
                marginBottom: '45px'
              }}>
                {verdict.subtitle}
              </div>

              {/* Key Discrepancy Card */}
              {data.gap_analysis?.main_discrepancies?.length > 0 && (
                <div style={{
                  width: '100%',
                  maxWidth: '920px',
                  background: 'rgba(24, 24, 27, 0.95)',
                  border: '2px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '26px',
                  padding: '30px 36px',
                  textAlign: 'left',
                  opacity: interpolate(sceneFrame, [20, 35], [0, 1]),
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
                }}>
                  <div style={{ fontSize: '22px', color: '#A1A1AA', fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '1px' }}>
                    Diferencia principal detectada:
                  </div>
                  <div style={{ fontSize: '28px', color: '#E4E4E7', fontWeight: 700, lineHeight: 1.4 }}>
                    "{data.gap_analysis.main_discrepancies[0]}"
                  </div>
                </div>
              )}

              {/* Verified Stamp */}
              <div style={{
                marginTop: '45px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                opacity: interpolate(sceneFrame, [35, 50], [0, 1])
              }}>
                <Sparkles size={28} color="#10B981" />
                <span style={{ fontSize: '22px', fontWeight: 800, color: '#A1A1AA', letterSpacing: '1px' }}>
                  AUDITORÍA REALIZADA POR SOCIALHATE • FOODIE REALITY
                </span>
              </div>
            </div>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
