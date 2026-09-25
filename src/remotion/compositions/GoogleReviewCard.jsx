import React from 'react';
import { Star, MoreVertical } from 'lucide-react';

export const GoogleLogo = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
  </svg>
);

export const GoogleReviewCard = ({
  author = "Juan Carlos Arias",
  badge = "Local Guide",
  rating = "5/5",
  timeAgo = "Hace 2 meses",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
  text = "Tardaron 10 minutos desde que llegamos hasta que nos sentamos por qué no había camareros suficientes para atender o dicho de otra manera había muchos camareros ... Más",
  highlightText = "Tardaron 10 minutos desde que llegamos hasta que nos sentamos",
  highlightBg = "#FEF08A",
  compact = false,
  scale = 1,
  rotation = 0,
  highlightProgress = 1, // 0 to 1 for animated underline/highlighter
  isZoomed = false,
  style = {}
}) => {
  const isPositive = rating.startsWith('5') || rating.startsWith('4');
  const isNegative = rating.startsWith('1') || rating.startsWith('2');
  const ratingColor = isNegative ? '#DC2626' : isPositive ? '#16A34A' : '#D97706';

  const padY = compact ? (isZoomed ? '22px' : '18px') : '26px';
  const padX = compact ? (isZoomed ? '28px' : '24px') : '30px';
  const avatarSize = compact ? (isZoomed ? 48 : 44) : 54;
  const authorSize = compact ? (isZoomed ? '20px' : '19px') : '22px';
  const subSize = compact ? '13px' : '15px';
  const textSize = compact ? (isZoomed ? '19px' : '17px') : '20px';

  // Highlight colors
  const strokeColor = isNegative ? '#EF4444' : '#F59E0B';
  const progressClamped = Math.max(0, Math.min(1, highlightProgress));

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: compact ? '22px' : '24px',
        padding: `${padY} ${padX}`,
        boxShadow: isZoomed
          ? '0 30px 70px -10px rgba(0, 0, 0, 0.85), 0 0 40px rgba(220, 38, 38, 0.4), 0 0 0 3px #DC2626'
          : '0 20px 45px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        fontFamily: "'Roboto', 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: '#202124',
        width: '100%',
        maxWidth: '920px',
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        position: 'relative',
        boxSizing: 'border-box',
        transition: 'box-shadow 0.15s ease',
        ...style
      }}
    >
      {/* Zoom Spotlight Tag */}
      {isZoomed && (
        <div
          style={{
            position: 'absolute',
            top: '-14px',
            right: '24px',
            background: 'linear-gradient(135deg, #DC2626, #991B1B)',
            color: '#FFFFFF',
            padding: '4px 14px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 900,
            letterSpacing: '1px',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 10,
          }}
        >
          <span>🔥</span>
          <span>EVIDENCIA CLAVE</span>
        </div>
      )}

      {/* Header: Avatar, Name, Google attribution, Menu */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: compact ? '8px' : '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Avatar with Local Guide Badge */}
          <div style={{ position: 'relative', width: `${avatarSize}px`, height: `${avatarSize}px`, flexShrink: 0 }}>
            <img
              src={avatarUrl}
              alt={author}
              style={{
                width: `${avatarSize}px`,
                height: `${avatarSize}px`,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #F1F3F4'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.style.backgroundColor = '#EA4335';
                e.target.parentElement.style.color = '#fff';
                e.target.parentElement.style.display = 'flex';
                e.target.parentElement.style.alignItems = 'center';
                e.target.parentElement.style.justifyContent = 'center';
                e.target.parentElement.style.fontSize = '18px';
                e.target.parentElement.style.fontWeight = 'bold';
                e.target.parentElement.innerText = author.charAt(0) || 'G';
              }}
            />
            {/* Local Guide Star Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: compact ? '18px' : '22px',
                height: compact ? '18px' : '22px',
                backgroundColor: '#FBBC04',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #FFFFFF',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
              title="Local Guide"
            >
              <Star size={compact ? 10 : 12} fill="#FFFFFF" color="#FFFFFF" />
            </div>
          </div>

          {/* Name & Subtitle */}
          <div>
            <div style={{ fontSize: authorSize, fontWeight: 700, color: '#202124', lineHeight: 1.2 }}>
              {author}
            </div>
            <div style={{ fontSize: subSize, color: '#5F6368', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
              <span>Reseña de</span>
              <GoogleLogo size={compact ? 14 : 16} />
              <span style={{ fontWeight: 500, color: '#3C4043' }}>Google</span>
              {badge && (
                <span style={{ color: '#70757A', fontSize: compact ? '11px' : '13px', marginLeft: '3px' }}>
                  · {badge}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3 Dots Menu */}
        <div style={{ color: '#5F6368', padding: '2px' }}>
          <MoreVertical size={compact ? 20 : 24} />
        </div>
      </div>

      {/* Rating line & Time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: compact ? '10px' : '14px' }}>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[1, 2, 3, 4, 5].map((s) => {
            const currentStar = parseInt(rating.charAt(0), 10) || 5;
            const isFilled = s <= currentStar;
            return (
              <Star
                key={s}
                size={compact ? 15 : 18}
                fill={isFilled ? (isNegative ? '#EA4335' : '#FBBC04') : '#E8EAED'}
                color={isFilled ? (isNegative ? '#EA4335' : '#FBBC04') : '#E8EAED'}
              />
            );
          })}
        </div>
        <span style={{ fontSize: compact ? '15px' : '17px', fontWeight: 700, color: ratingColor }}>
          {rating}
        </span>
        <span style={{ color: '#70757A', fontSize: compact ? '14px' : '16px' }}>·</span>
        <span style={{ color: '#70757A', fontSize: compact ? '14px' : '16px' }}>
          {timeAgo}
        </span>
      </div>

      {/* Review Text Body with TikTok-style animated underline & highlighter */}
      <div
        style={{
          fontSize: textSize,
          lineHeight: '1.45',
          color: '#3C4043',
          fontWeight: 400,
          letterSpacing: '-0.2px'
        }}
      >
        {highlightText && text.includes(highlightText) ? (
          <>
            {text.split(highlightText)[0]}
            <span
              style={{
                position: 'relative',
                display: 'inline',
                fontWeight: 700,
                color: '#111827',
              }}
            >
              {/* Animated Highlighter marker background */}
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: highlightBg,
                  borderRadius: '4px',
                  opacity: isZoomed ? 0.95 : 0.8,
                  zIndex: 0,
                  transformOrigin: 'left center',
                  transform: `scaleX(${progressClamped})`,
                  transition: 'transform 0.05s linear',
                }}
              />
              {/* Animated Underline bar beneath the words */}
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: '-3px',
                  height: isZoomed ? '4px' : '3px',
                  width: `${progressClamped * 100}%`,
                  backgroundColor: strokeColor,
                  borderRadius: '2px',
                  boxShadow: isZoomed ? `0 0 8px ${strokeColor}` : 'none',
                  zIndex: 2,
                }}
              />
              <span style={{ position: 'relative', zIndex: 1, padding: '1px 3px' }}>
                {highlightText}
              </span>
            </span>
            {text.split(highlightText)[1]}
          </>
        ) : (
          text
        )}
      </div>
    </div>
  );
};
