import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Utensils, TrendingUp, TrendingDown, Minus, MapPin, Star } from 'lucide-react';

export const FoodieChannelEvolutionVideo = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  if (!data) return null;

  const fadeIn = spring({ frame, fps, config: { damping: 100 } });

  const channelName = data.channel_name || 'Creador Foodie';
  const analyses = data.analyses || [];
  const avgCoherence = Math.round(data.avg_coherence ?? 65);
  const trend = data.trend || 0;

  // Chart dimensions (16:9)
  const chartWidth = width * 0.8;
  const chartHeight = 320;

  const lineProgress = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 60 },
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: '#09090B',
      padding: '60px 80px',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      {/* Background Dots */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.04,
        backgroundImage: 'radial-gradient(circle, #10B981 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
        opacity: fadeIn
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #10B981, #059669)',
            padding: '12px 14px',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
          }}>
            <Utensils size={36} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 900 }}>
              FOODIE <span style={{ color: '#10B981' }}>EVOLUTION</span>
            </div>
            <div style={{ fontSize: '16px', color: '#A1A1AA', fontWeight: 700, letterSpacing: '2px' }}>
              HISTORIAL DE COHERENCIA EN RESEÑAS
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(24, 24, 27, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '10px 24px',
          borderRadius: '999px',
          fontSize: '22px',
          fontWeight: 800,
          color: '#E4E4E7'
        }}>
          {channelName}
        </div>
      </div>

      {/* Stats Summary Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div style={{
          background: 'rgba(24, 24, 27, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '18px', color: '#A1A1AA', fontWeight: 700, textTransform: 'uppercase' }}>
            Coherencia Media
          </div>
          <div style={{
            fontSize: '52px',
            fontWeight: 900,
            color: avgCoherence >= 70 ? '#10B981' : avgCoherence >= 40 ? '#F59E0B' : '#EF4444',
            marginTop: '6px'
          }}>
            {avgCoherence}%
          </div>
        </div>

        <div style={{
          background: 'rgba(24, 24, 27, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '18px', color: '#A1A1AA', fontWeight: 700, textTransform: 'uppercase' }}>
            Restaurantes Auditados
          </div>
          <div style={{ fontSize: '52px', fontWeight: 900, color: 'white', marginTop: '6px' }}>
            {analyses.length || 3}
          </div>
        </div>

        <div style={{
          background: 'rgba(24, 24, 27, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '18px', color: '#A1A1AA', fontWeight: 700, textTransform: 'uppercase' }}>
            Tendencia Reciente
          </div>
          <div style={{
            fontSize: '52px',
            fontWeight: 900,
            color: trend >= 0 ? '#10B981' : '#EF4444',
            marginTop: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            {trend >= 0 ? <TrendingUp size={44} /> : <TrendingDown size={44} />}
            {trend >= 0 ? `+${trend}%` : `${trend}%`}
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div style={{
        flex: 1,
        background: 'rgba(24, 24, 27, 0.9)',
        border: '2px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        padding: '30px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#A1A1AA', marginBottom: '20px' }}>
          EVOLUCIÓN TEMPORAL DE COHERENCIA EN VIDEOS
        </div>

        {/* Data points visual list */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '220px', padding: '0 20px' }}>
          {analyses.map((item, idx) => {
            const barHeight = Math.max(30, (item.coherence_index / 100) * 180 * lineProgress);
            const color = item.coherence_index >= 70 ? '#10B981' : item.coherence_index >= 40 ? '#F59E0B' : '#EF4444';
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color }}>
                  {item.coherence_index}%
                </div>
                <div style={{
                  width: '60px',
                  height: `${barHeight}px`,
                  backgroundColor: color,
                  borderRadius: '12px 12px 4px 4px',
                  boxShadow: `0 0 20px ${color}60`
                }} />
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'white', maxWidth: '140px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.restaurant_name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        paddingTop: '25px',
        fontSize: '18px',
        color: '#71717A',
        fontWeight: 700
      }}>
        DATOS EXTRAÍDOS Y CONTRASTADOS CON RESEÑAS PÚBLICAS DE GOOGLE PLACES
      </div>
    </AbsoluteFill>
  );
};
