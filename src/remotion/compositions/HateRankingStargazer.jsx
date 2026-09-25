import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from 'remotion';
import { 
  Flame, 
  Trophy, 
  CheckCircle2, 
  Youtube, 
  Radio, 
  TrendingUp,
  Skull
} from 'lucide-react';
import { STARGAZER_100_VIDEOS } from './stargazer100Data';

export { STARGAZER_100_VIDEOS as DEFAULT_STARGAZER_HATE_VIDEOS };

// =======================================================================
// PROGRESS CURVE FOR 100 VIDEOS:
// Starts fast (hyperspeed rush) and progressively decelerates at the top
// =======================================================================
const PROGRESS_KEYFRAMES = [
  { frame: 0,   val: 0 },    // #100 - Start
  { frame: 35,  val: 5 },    // Quick launch ramp
  { frame: 120, val: 24 },   // Hyperspeed rush through #100 -> #76
  { frame: 220, val: 50 },   // Flying through the middle #50
  { frame: 330, val: 72 },   // Fast stream #28
  { frame: 450, val: 86 },   // Still fast #14
  { frame: 540, val: 91 },   // Deceleration begins: #9
  { frame: 620, val: 94 },   // Slower: #6
  { frame: 690, val: 97 },   // Slower: #3
  { frame: 750, val: 98.6 }, // Very slow: #2 -> #1
  { frame: 790, val: 99 },   // Arrives at #1
  { frame: 900, val: 99 },   // Climax spotlight on #1
];

function getStargazer100Progress(frame) {
  const frames = PROGRESS_KEYFRAMES.map(k => k.frame);
  const values = PROGRESS_KEYFRAMES.map(k => k.val);

  return interpolate(frame, frames, values, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

export const HateRankingStargazer = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 100 videos array
  const videos = useMemo(() => {
    if (Array.isArray(data) && data.length >= 80) {
      return data;
    }
    return STARGAZER_100_VIDEOS;
  }, [data]);

  const totalVideos = videos.length;
  const progress = getStargazer100Progress(frame);

  // Active current leading index (0 to 99)
  const activeIndex = Math.min(totalVideos - 1, Math.max(0, Math.floor(progress)));
  const currentVideo = videos[activeIndex] || videos[0];

  // Dynamic Hate % Counter (smooth interpolated number for header)
  const interpolatedHate = interpolate(
    progress,
    videos.map((_, i) => i),
    videos.map(v => v.hate_percentage),
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Layout parameters for 1080 x 1920
  const showcaseTopHeight = 580; // Top header + YouTube Video Preview
  const streamStartY = 610;      // Start of the scrolling stream below
  const cardGap = 88;            // Compact gap between cards

  // Climax pulse for #1
  const isFinalNumberOne = activeIndex === totalVideos - 1 && progress >= 98.8;
  const finalePulse = isFinalNumberOne ? 1 + Math.sin(frame * 0.25) * 0.03 : 1;

  // Spring entrance for header
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#09090B', 
      fontFamily: "'Space Grotesk', 'Inter', -apple-system, sans-serif",
      color: 'white',
      overflow: 'hidden',
    }}>
      {/* Background Cyber Grid & Crimson Ambient Glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(220, 38, 38, ${isFinalNumberOne ? 0.32 : 0.16}) 0%, transparent 70%),
          radial-gradient(circle, rgba(220, 38, 38, 0.07) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 36px 36px',
      }} />

      {/* ================================================================= */}
      {/* 1. TOP SECTION (HEADER + YOUTUBE VIDEO SHOWCASE)                   */}
      {/* (In Stargazer this was the GitHub Repo Profile, adapted to YT)     */}
      {/* ================================================================= */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: `${showcaseTopHeight}px`,
        backgroundColor: '#09090BFA',
        backdropFilter: 'blur(24px)',
        borderBottom: '2px solid rgba(220, 38, 38, 0.35)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(220, 38, 38, 0.15)',
        padding: '24px 36px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 50,
        transform: `translateY(${(1 - headerSpring) * -100}px)`,
      }}>
        {/* Top Brand Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.7)',
            }}>
              <Flame color="white" size={26} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px', lineHeight: 1 }}>
                SOCIAL<span style={{ color: '#DC2626' }}>HATE</span>
              </div>
              <div style={{ fontSize: '11px', color: '#A1A1AA', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Top 100 YouTube Hate Stream
              </div>
            </div>
          </div>

          {/* Live Stream Speed Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(220, 38, 38, 0.4)',
            padding: '6px 14px',
            borderRadius: '999px',
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#DC2626',
              boxShadow: '0 0 10px #DC2626',
              display: 'inline-block',
            }} />
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#FCA5A5', letterSpacing: '0.5px' }}>
              {isFinalNumberOne ? '👑 FINAL #1' : progress > 85 ? '🐢 RALENTIZANDO TOP 10' : '⚡ RUSH ALTA VELOCIDAD'}
            </span>
          </div>
        </div>

        {/* YouTube Video Showcase Card of the CURRENT LEADING Video */}
        <div style={{
          backgroundColor: isFinalNumberOne ? '#1E0C0F' : '#141416',
          borderRadius: '18px',
          border: isFinalNumberOne ? '2px solid #DC2626' : '1px solid #27272A',
          boxShadow: isFinalNumberOne ? '0 0 35px rgba(220, 38, 38, 0.5)' : 'none',
          padding: '16px',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          transform: `scale(${isFinalNumberOne ? finalePulse : 1})`,
          transition: 'all 0.1s ease-out',
        }}>
          {/* 16:9 YouTube Thumbnail of the video reaching top */}
          <div style={{
            position: 'relative',
            width: '280px',
            aspectRatio: '16/9',
            borderRadius: '12px',
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: '#09090B',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <Img 
              src={currentVideo.thumbnail_url} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            {/* Play Button Overlay */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: 'rgba(220, 38, 38, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: 0,
                height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: '10px solid white',
                marginLeft: '2px',
              }} />
            </div>
            {/* Duration */}
            <div style={{
              position: 'absolute',
              bottom: 6,
              right: 6,
              backgroundColor: 'rgba(0,0,0,0.85)',
              color: 'white',
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 5px',
              borderRadius: '4px',
            }}>
              {currentVideo.duration}
            </div>
          </div>

          {/* Video Metadata in Top Card */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Rank + Channel */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{
                backgroundColor: currentVideo.rank === 1 ? '#DC2626' : '#27272A',
                color: 'white',
                fontSize: '15px',
                fontWeight: 900,
                padding: '2px 10px',
                borderRadius: '8px',
              }}>
                #{currentVideo.rank}
              </div>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <Img src={currentVideo.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentVideo.channel_name}
                </span>
                {currentVideo.verified && <CheckCircle2 size={13} color="#3B82F6" fill="#3B82F6" stroke="black" />}
              </div>
            </div>

            {/* Video Title */}
            <div style={{
              fontSize: '17px',
              fontWeight: 700,
              color: '#F4F4F5',
              lineHeight: 1.25,
              marginBottom: '10px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}>
              {currentVideo.video_title}
            </div>

            {/* Hate Percentage + Engagement */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#71717A', fontWeight: 600 }}>
                <span>👁️ {currentVideo.view_count}</span>
                <span>💬 {currentVideo.comment_count}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700 }}>HATE:</span>
                <span style={{
                  fontSize: '26px',
                  fontWeight: 900,
                  color: '#DC2626',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {currentVideo.hate_percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Progress Bar (#100 -> #1) */}
        <div style={{ marginTop: '8px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            fontWeight: 800,
            color: '#71717A',
            marginBottom: '4px',
            letterSpacing: '0.5px',
          }}>
            <span>PUESTO #{currentVideo.rank} / 100</span>
            <span>ÍNDICE HATE: {Math.round(interpolatedHate)}%</span>
            <span>PUESTO #1</span>
          </div>
          <div style={{
            height: '5px',
            backgroundColor: '#27272A',
            borderRadius: '999px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${(progress / 99) * 100}%`,
              background: 'linear-gradient(90deg, #991B1B 0%, #DC2626 70%, #EF4444 100%)',
              boxShadow: '0 0 10px #DC2626',
              borderRadius: '999px',
            }} />
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. THE STARGAZER STREAM: 100 COMPACT ROWS FLYING UPWARDS           */}
      {/* (Only Youtuber icon, channel name, video title, hate, ranking)     */}
      {/* ================================================================= */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
      }}>
        {videos.map((item, index) => {
          // As progress increases, cards move UPWARDS
          // startY + (index - progress) * cardGap
          const y = streamStartY + (index - progress) * cardGap;
          const diff = index - progress;

          // Virtualization window: only render items near the viewport
          if (diff < -1.8 || diff > 15) {
            return null;
          }

          const isAtTopShowcase = Math.abs(diff) < 0.7;
          const isLeaving = diff < 0;

          // Smooth opacity and scale
          const opacity = isLeaving 
            ? interpolate(diff, [-1.5, 0], [0, 1], { extrapolateLeft: 'clamp' })
            : interpolate(diff, [0, 13], [1, 0.25], { extrapolateRight: 'clamp' });

          const isCrown = item.rank === 1;

          return (
            <div
              key={`stargazer-row-${item.rank}-${index}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 36,
                right: 36,
                transform: `translateY(${y}px) scale(${isAtTopShowcase ? 1.02 : 1})`,
                opacity,
                zIndex: isAtTopShowcase ? 30 : Math.round(20 - Math.abs(diff)),
                transition: 'none',
              }}
            >
              <StargazerCompactRow
                item={item}
                isActive={isAtTopShowcase}
                isCrown={isCrown}
              />
            </div>
          );
        })}
      </div>

      {/* Top subtle fade gradient for cards sliding into the showcase */}
      <div style={{
        position: 'absolute',
        top: showcaseTopHeight,
        left: 0,
        right: 0,
        height: '40px',
        background: 'linear-gradient(to bottom, #09090B 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 40,
      }} />

      {/* Bottom fade gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to top, #09090B 20%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 40,
      }} />
    </AbsoluteFill>
  );
};

// =======================================================================
// COMPACT STARGAZER ROW COMPONENT
// Exactly as requested: Youtuber icon, Channel name, Video title, Hate %, Rank #
// (No image thumbnails inside the row)
// =======================================================================
function StargazerCompactRow({ item, isActive, isCrown }) {
  return (
    <div style={{
      height: '74px',
      backgroundColor: isCrown && isActive 
        ? '#2A0B10' 
        : isActive 
        ? '#1C0E11' 
        : '#121214',
      borderRadius: '16px',
      border: isCrown && isActive
        ? '2px solid #DC2626'
        : isActive
        ? '1.5px solid rgba(220, 38, 38, 0.7)'
        : '1px solid #222226',
      boxShadow: isActive 
        ? '0 0 25px rgba(220, 38, 38, 0.4), 0 8px 16px rgba(0,0,0,0.8)' 
        : '0 4px 10px rgba(0,0,0,0.5)',
      padding: '0 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '14px',
    }}>
      {/* Left: Ranking Number + YouTuber Icon + Names */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
        {/* Ranking Number */}
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '12px',
          backgroundColor: isCrown ? '#DC2626' : isActive ? '#991B1B' : '#1F1F23',
          color: 'white',
          fontSize: item.rank >= 100 ? '14px' : '17px',
          fontWeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: isCrown ? '0 0 15px rgba(220, 38, 38, 0.8)' : 'none',
        }}>
          #{item.rank}
        </div>

        {/* YouTuber Circular Icon (Avatar) */}
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#27272A',
          border: isActive ? '2px solid #DC2626' : '1px solid #3F3F46',
          flexShrink: 0,
        }}>
          <Img 
            src={item.avatar_url} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        {/* Channel Name + Video Title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 800,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            lineHeight: 1.2,
          }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.channel_name}
            </span>
            {item.verified && (
              <CheckCircle2 size={13} color="#3B82F6" fill="#3B82F6" stroke="black" />
            )}
            {isCrown && (
              <span style={{
                backgroundColor: '#DC2626',
                color: 'white',
                fontSize: '9px',
                fontWeight: 900,
                padding: '2px 6px',
                borderRadius: '999px',
                letterSpacing: '0.5px',
              }}>
                #1
              </span>
            )}
          </div>
          <div style={{
            fontSize: '13px',
            color: isActive ? '#D4D4D8' : '#71717A',
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginTop: '2px',
          }}>
            {item.video_title}
          </div>
        </div>
      </div>

      {/* Right: Hate Percentage Score */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        flexShrink: 0,
      }}>
        <Flame size={18} color="#DC2626" />
        <span style={{
          fontSize: '22px',
          fontWeight: 900,
          color: '#DC2626',
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1,
        }}>
          {item.hate_percentage}%
        </span>
      </div>
    </div>
  );
}
