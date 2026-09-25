import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';
import { Utensils, Star, AlertTriangle, CheckCircle, XCircle, MapPin, Eye, Sparkles } from 'lucide-react';

export const FoodiePresenterVideo = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!data) return null;

  const coherence = data.coherence_index || 30;
  const coherenceColor = coherence >= 70 ? '#10B981' : coherence >= 40 ? '#F59E0B' : '#EF4444';
  const restaurantName = data.restaurant_name || 'Restaurante';
  const location = data.restaurant_location || 'España';
  const channelName = data.channel_name || 'Influencer Foodie';
  const rating = data.community_sentiment?.estimated_rating || 3.2;
  const reviewsCount = data.reviews_count || 450;
  const claims = data.influencer_sentiment?.key_claims || ["Experiencia 10/10", "Lo mejor de la ciudad"];
  const complaints = data.community_sentiment?.common_complaints || ["Precios excesivos", "Comida fría"];

  // Critic bouncing/speaking animation
  const criticBounce = Math.sin(frame * 0.15) * 6;
  const mouthMove = Math.abs(Math.sin(frame * 0.4)) * 10;

  return (
    <AbsoluteFill style={{
      backgroundColor: '#09090B',
      fontFamily: 'Inter, sans-serif',
      color: 'white',
      overflow: 'hidden'
    }}>
      {/* Background Gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 50% 20%, ${coherenceColor}22 0%, transparent 60%)`,
        pointerEvents: 'none'
      }} />

      {/* Top Header */}
      <div style={{
        position: 'absolute',
        top: '60px',
        left: '60px',
        right: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 40
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #10B981, #059669)',
            padding: '12px 14px',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
          }}>
            <Utensils size={36} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '34px', fontWeight: 900 }}>
              FOODIE <span style={{ color: '#10B981' }}>CRITIC</span>
            </div>
            <div style={{ fontSize: '16px', color: '#A1A1AA', fontWeight: 700, letterSpacing: '2px' }}>
              EL AUDITOR GASTRONÓMICO
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(24, 24, 27, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '10px 20px',
          borderRadius: '999px',
          fontSize: '20px',
          fontWeight: 700,
          color: '#E4E4E7'
        }}>
          📍 {location}
        </div>
      </div>

      {/* ========================================================
          SCENE 1: THE CRITIC PRESENTS THE RESTAURANT (0 - 120 frames / 0-4s)
      ======================================================== */}
      <Sequence from={0} durationInFrames={120}>
        {(() => {
          const introSpring = spring({ frame, fps, config: { damping: 14 } });
          return (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '120px 60px 40px 60px',
              textAlign: 'center'
            }}>
              {/* Speech Bubble */}
              <div style={{
                background: 'rgba(24, 24, 27, 0.95)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '30px',
                padding: '28px 36px',
                maxWidth: '850px',
                marginBottom: '35px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                opacity: introSpring,
                transform: `scale(${introSpring})`
              }}>
                <div style={{ fontSize: '24px', color: '#10B981', fontWeight: 800, marginBottom: '8px' }}>
                  🕵️‍♂️ CRÍTICO AUDITOR DICE:
                </div>
                <div style={{ fontSize: '36px', fontWeight: 900, lineHeight: 1.25 }}>
                  "Hoy auditamos el hype de <span style={{ color: '#F59E0B' }}>{restaurantName}</span> tras el vídeo viral de <span style={{ color: '#38BDF8' }}>{channelName}</span>. ¿Comida de 10 o postureo pagado?"
                </div>
              </div>

              {/* Critic Avatar Graphic */}
              <div style={{
                transform: `translateY(${criticBounce}px)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '30px'
              }}>
                <div style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #18181B, #27272A)',
                  border: '4px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '90px',
                  boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)'
                }}>
                  👨‍🍳
                </div>
              </div>

              {/* Restaurant Preview Card */}
              {data.thumbnail_url && (
                <div style={{
                  width: '100%',
                  maxWidth: '750px',
                  height: '320px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                }}>
                  <img
                    src={data.thumbnail_url}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          );
        })()}
      </Sequence>

      {/* ========================================================
          SCENE 2: PROMISES VS GOOGLE REALITY (120 - 270 frames / 4-9s)
      ======================================================== */}
      <Sequence from={120} durationInFrames={150}>
        {(() => {
          const s2Frame = frame - 120;
          return (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              padding: '140px 60px 40px 60px'
            }}>
              {/* Dual Comparison Columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '26px' }}>
                {/* Foodie Promise */}
                <div style={{
                  background: 'rgba(24, 24, 27, 0.95)',
                  border: '2px solid rgba(56, 189, 248, 0.4)',
                  borderRadius: '26px',
                  padding: '30px 36px',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                  opacity: interpolate(s2Frame, [0, 15], [0, 1])
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '30px' }}>📹</span>
                    <span style={{ fontSize: '24px', fontWeight: 800, color: '#38BDF8', letterSpacing: '1px' }}>
                      PROMESAS DEL INFLUENCER
                    </span>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: 'white', lineHeight: 1.3 }}>
                    "{claims[0]}"
                  </div>
                </div>

                {/* Google Maps Reality */}
                <div style={{
                  background: 'rgba(24, 24, 27, 0.95)',
                  border: '2px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '26px',
                  padding: '30px 36px',
                  boxShadow: '0 16px 40px rgba(239, 68, 68, 0.15)',
                  opacity: interpolate(s2Frame, [20, 35], [0, 1])
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '30px' }}>📍</span>
                      <span style={{ fontSize: '24px', fontWeight: 800, color: '#F87171', letterSpacing: '1px' }}>
                        REALIDAD EN GOOGLE MAPS
                      </span>
                    </div>
                    <span style={{ fontSize: '28px', fontWeight: 900, color: '#F59E0B' }}>
                      ⭐ {rating}/5
                    </span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#FCA5A5', lineHeight: 1.3 }}>
                    ⚠️ Queja común: "{complaints[0]}"
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </Sequence>

      {/* ========================================================
          SCENE 3: FINAL VERDICT BY THE CRITIC (270 - 450 frames / 9-15s)
      ======================================================== */}
      <Sequence from={270} durationInFrames={180}>
        {(() => {
          const s3Frame = frame - 270;
          const scoreAnim = spring({ frame: s3Frame, fps, config: { damping: 14 } });
          const displayedScore = Math.round(coherence * Math.min(1, scoreAnim));

          return (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '120px 60px 40px 60px',
              textAlign: 'center'
            }}>
              {/* Verdict Header */}
              <div style={{
                background: `${coherenceColor}20`,
                border: `3px solid ${coherenceColor}`,
                padding: '16px 44px',
                borderRadius: '999px',
                marginBottom: '30px',
                boxShadow: `0 0 45px ${coherenceColor}40`,
                transform: `scale(${scoreAnim})`
              }}>
                <span style={{ fontSize: '32px', fontWeight: 900, color: coherenceColor, letterSpacing: '2px' }}>
                  {coherence >= 70 ? '✓ RECOMENDADO Y REAL' : coherence >= 40 ? '⚠️ HYPE PARCIAL' : '🚨 ALERTA POSTUREO'}
                </span>
              </div>

              <div style={{ fontSize: '26px', color: '#A1A1AA', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' }}>
                Índice de Coherencia Foodie Fake
              </div>

              <div style={{
                fontSize: '170px',
                fontWeight: 900,
                color: coherenceColor,
                lineHeight: 1,
                margin: '15px 0',
                textShadow: `0 0 60px ${coherenceColor}70`,
                fontFamily: 'Inter, monospace'
              }}>
                {displayedScore}%
              </div>

              <div style={{
                background: 'rgba(24, 24, 27, 0.95)',
                border: '2px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '24px',
                padding: '24px 34px',
                maxWidth: '850px',
                marginBottom: '35px'
              }}>
                <div style={{ fontSize: '24px', color: '#E4E4E7', fontWeight: 700, lineHeight: 1.4 }}>
                  "{data.analysis_summary?.slice(0, 150) || 'Auditoría completada contrastando vídeo vs clientes en Google Places.'}..."
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#71717A', fontSize: '22px', fontWeight: 800 }}>
                <Sparkles size={26} color="#10B981" />
                AUDITORÍA AUTOMATIZADA POR FOODIE FAKE
              </div>
            </div>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
