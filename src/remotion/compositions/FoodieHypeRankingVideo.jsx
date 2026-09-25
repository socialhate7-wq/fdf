import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';
import { Utensils, AlertTriangle, Flame, TrendingDown, Star, Sparkles, Trophy, List } from 'lucide-react';

export const DEFAULT_FOODIE_RANKING_ITEMS = [
  { rank: 1, restaurant: "Gran Buffet Fusión", location: "Barcelona", foodie: "FoodieVip Spain", coherence: 24, googleRating: 2.8, discrepancy: "Marisco congelado vs vídeo prémium" },
  { rank: 2, restaurant: "Asador Real", location: "Valencia", foodie: "GastroAdictos", coherence: 39, googleRating: 3.4, discrepancy: "Carne fría y precios desorbitados" },
  { rank: 3, restaurant: "Smash Burger Galaxy", location: "Madrid", foodie: "Tiktoker Gourmet", coherence: 45, googleRating: 3.6, discrepancy: "Colas de 1h y pan empapado" },
  { rank: 4, restaurant: "Taco Loco Deluxe", location: "Sevilla", foodie: "FoodExplorer", coherence: 52, googleRating: 3.9, discrepancy: "Raciones reducidas" },
  { rank: 5, restaurant: "Hundred Burgers", location: "Madrid", foodie: "Cenando con Pablo", coherence: 82, googleRating: 4.6, discrepancy: "Saturación y reservas difíciles" }
];

// Helper to normalize input items (works with raw reality checks or formatted ranking items)
const normalizeItems = (data) => {
  if (!Array.isArray(data) || data.length === 0) return DEFAULT_FOODIE_RANKING_ITEMS;
  return data.map((item, index) => ({
    rank: item.rank || index + 1,
    restaurant: item.restaurant_name || item.restaurant || 'Restaurante',
    location: item.restaurant_location || item.location || 'España',
    foodie: item.channel_name || item.foodie || 'Foodie Creator',
    coherence: item.coherence_index ?? item.coherence ?? 40,
    googleRating: item.community_sentiment?.estimated_rating || item.googleRating || 3.5,
    discrepancy: item.gap_analysis?.main_discrepancies?.[0] || item.discrepancy || "Hype vs realidad"
  }));
};

// ============================================
// STYLE 1: STARGAZER FOODIE STREAM (9:16)
// ============================================
export const FoodieRankingStargazer = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = normalizeItems(data);

  return (
    <AbsoluteFill style={{
      backgroundColor: '#09090B',
      fontFamily: 'Inter, sans-serif',
      color: 'white',
      padding: '70px 50px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Dynamic Glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '400px',
        background: 'radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.25) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #10B981, #059669)',
            padding: '12px 14px',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
          }}>
            <Sparkles size={36} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '34px', fontWeight: 900 }}>
              STARGAZER <span style={{ color: '#10B981' }}>FOODIE</span>
            </div>
            <div style={{ fontSize: '16px', color: '#A1A1AA', fontWeight: 700, letterSpacing: '2px' }}>
              MAYORES INCOHERENCIAS EN RESEÑAS
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          padding: '8px 20px',
          borderRadius: '999px',
          fontSize: '18px',
          fontWeight: 800,
          color: '#F87171'
        }}>
          TOP HYPE
        </div>
      </div>

      {/* Items Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1, justifyContent: 'center' }}>
        {items.slice(0, 5).map((item, idx) => {
          const delay = idx * 12;
          const anim = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14 } });
          const isTop1 = idx === 0;

          return (
            <div
              key={idx}
              style={{
                background: 'rgba(24, 24, 27, 0.95)',
                border: `2px solid ${isTop1 ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '24px',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                transform: `translateX(${(1 - anim) * 120}px)`,
                opacity: anim,
                boxShadow: isTop1 ? '0 10px 40px rgba(239, 68, 68, 0.3)' : 'none'
              }}
            >
              <div style={{
                fontSize: '44px',
                fontWeight: 900,
                color: isTop1 ? '#EF4444' : '#71717A',
                width: '45px',
                textAlign: 'center'
              }}>
                #{item.rank}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '30px', fontWeight: 900, color: 'white' }}>
                  {item.restaurant}
                </div>
                <div style={{ fontSize: '18px', color: '#A1A1AA', marginTop: '4px' }}>
                  {item.location} • Vídeo: <span style={{ color: '#E4E4E7', fontWeight: 700 }}>{item.foodie}</span>
                </div>
                <div style={{ fontSize: '16px', color: '#FCA5A5', marginTop: '4px', fontWeight: 600 }}>
                  ⚠️ {item.discrepancy}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '44px',
                  fontWeight: 900,
                  color: item.coherence >= 70 ? '#10B981' : item.coherence >= 40 ? '#F59E0B' : '#EF4444'
                }}>
                  {item.coherence}%
                </div>
                <div style={{ fontSize: '14px', color: '#A1A1AA', textTransform: 'uppercase' }}>
                  Coherencia
                </div>
                <div style={{ fontSize: '16px', color: '#F59E0B', fontWeight: 700 }}>
                  ⭐ {item.googleRating} Google
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '18px', color: '#71717A', fontWeight: 700 }}>
        FOODIE FAKE • CONTRASTE GOOGLE MAPS
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// STYLE 2: SCROLL CLÁSICO (9:16)
// ============================================
export const FoodieRankingScroll = ({ data }) => {
  const frame = useCurrentFrame();
  const items = normalizeItems(data);
  const scrollProgress = interpolate(frame, [30, 420], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#09090B', fontFamily: 'Inter, sans-serif', color: 'white', padding: '50px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '30px' }}>
        <List size={36} color="#10B981" />
        <div style={{ fontSize: '32px', fontWeight: 900 }}>
          RANKING <span style={{ color: '#10B981' }}>SCROLL CLÁSICO</span>
        </div>
      </div>

      <div style={{ transform: `translateY(${-scrollProgress * 200}px)`, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ background: 'rgba(24, 24, 27, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '22px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '26px', fontWeight: 900, color: '#10B981', marginRight: '14px' }}>#{item.rank}</span>
              <span style={{ fontSize: '28px', fontWeight: 800 }}>{item.restaurant}</span>
              <div style={{ fontSize: '18px', color: '#A1A1AA', marginTop: '4px' }}>{item.foodie} • ⭐ {item.googleRating} en Google</div>
            </div>
            <div style={{ fontSize: '38px', fontWeight: 900, color: item.coherence >= 70 ? '#10B981' : '#EF4444' }}>
              {item.coherence}%
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// STYLE 3: CUENTA ATRÁS GOURMET (NBA STYLE 9:16)
// ============================================
export const FoodieRankingNBA = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = normalizeItems(data);
  const activeIdx = Math.min(items.length - 1, Math.floor(frame / 60));
  const currentItem = items[activeIdx];
  const itemAnim = spring({ frame: frame % 60, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: '#09090B', fontFamily: 'Inter, sans-serif', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
      <Trophy size={48} color="#F59E0B" style={{ marginBottom: '20px' }} />
      <div style={{ fontSize: '26px', color: '#A1A1AA', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
        CUENTA ATRÁS GOURMET
      </div>
      <div style={{ fontSize: '90px', fontWeight: 900, color: '#EF4444', margin: '10px 0' }}>
        #{currentItem.rank}
      </div>
      <div style={{
        background: 'rgba(24, 24, 27, 0.95)',
        border: '3px solid #EF4444',
        borderRadius: '30px',
        padding: '40px',
        textAlign: 'center',
        width: '100%',
        maxWidth: '850px',
        transform: `scale(${itemAnim})`,
        boxShadow: '0 20px 60px rgba(239, 68, 68, 0.3)'
      }}>
        <div style={{ fontSize: '42px', fontWeight: 900 }}>{currentItem.restaurant}</div>
        <div style={{ fontSize: '24px', color: '#A1A1AA', margin: '12px 0' }}>
          Grabado por: {currentItem.foodie} ({currentItem.location})
        </div>
        <div style={{ fontSize: '64px', fontWeight: 900, color: '#EF4444' }}>
          {currentItem.coherence}% Coherencia
        </div>
        <div style={{ fontSize: '22px', color: '#FCA5A5', marginTop: '16px' }}>
          ⚠️ {currentItem.discrepancy}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// STYLE 4: HYPE INFERNO (9:16)
// ============================================
export const FoodieRankingInferno = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = normalizeItems(data);
  const pulse = Math.sin(frame * 0.2) * 0.2 + 0.8;

  return (
    <AbsoluteFill style={{
      backgroundColor: '#09090B',
      fontFamily: 'Inter, sans-serif',
      color: 'white',
      padding: '70px 50px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 50% 50%, rgba(239, 68, 68, ${0.3 * pulse}) 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '35px' }}>
        <div style={{ background: '#DC2626', padding: '14px', borderRadius: '16px', boxShadow: '0 0 30px rgba(220, 38, 38, 0.7)' }}>
          <Flame size={40} color="white" />
        </div>
        <div>
          <div style={{ fontSize: '38px', fontWeight: 900, color: '#EF4444' }}>
            HYPE INFERNO 🔥
          </div>
          <div style={{ fontSize: '18px', color: '#A1A1AA', fontWeight: 700, letterSpacing: '2px' }}>
            MÁXIMA DISCREPANCIA Y POSTUREO
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, justifyContent: 'center' }}>
        {items.slice(0, 5).map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'linear-gradient(135deg, rgba(39, 39, 42, 0.95), rgba(24, 24, 27, 0.95))',
              border: `2px solid ${idx === 0 ? '#EF4444' : 'rgba(239, 68, 68, 0.3)'}`,
              borderRadius: '24px',
              padding: '24px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: idx === 0 ? '0 0 35px rgba(239, 68, 68, 0.4)' : 'none'
            }}
          >
            <div>
              <span style={{ fontSize: '36px', fontWeight: 900, color: '#EF4444', marginRight: '16px' }}>#{item.rank}</span>
              <span style={{ fontSize: '32px', fontWeight: 900 }}>{item.restaurant}</span>
              <div style={{ fontSize: '20px', color: '#FCA5A5', marginTop: '4px' }}>
                Influencer: {item.foodie} • {item.discrepancy}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '50px', fontWeight: 900, color: '#EF4444' }}>
                {item.coherence}%
              </div>
              <div style={{ fontSize: '16px', color: '#F59E0B', fontWeight: 700 }}>
                ⭐ {item.googleRating} en Google
              </div>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const FoodieHypeRankingVideo = FoodieRankingStargazer;
