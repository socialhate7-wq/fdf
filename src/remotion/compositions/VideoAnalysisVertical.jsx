import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence, Audio } from 'remotion';
import { Flame, MessageSquare, ThumbsUp, TrendingDown, Eye, Heart, AlertTriangle, Hash, Zap, Target } from 'lucide-react';
import { HookClipScene, AvatarInterludeScene } from './HookClipScene';
import { PresenterFullscreenChromaScene } from './PresenterFullscreenChromaScene';

// Fixed Header Component - Always visible at top
const FixedHeader = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });
  const statsOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '45px 50px 25px 50px',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        marginBottom: '28px',
        opacity,
      }}>
        <Flame color="#DC2626" size={48} strokeWidth={2.5} />
        <div style={{ fontSize: '38px', fontWeight: 900, color: 'white', fontFamily: 'Inter, sans-serif' }}>
          SOCIAL<span style={{ color: '#DC2626' }}>HATE</span>
        </div>
      </div>

      {/* Thumbnail */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        aspectRatio: '16/9',
        borderRadius: '20px',
        overflow: 'hidden',
        marginBottom: '22px',
        opacity,
        boxShadow: '0 20px 60px rgba(220, 38, 38, 0.35)',
        border: '4px solid #DC2626',
        backgroundColor: '#18181B',
      }}>
        {data.thumbnail_url && (
          <img
            src={data.thumbnail_url}
            alt={data.video_title || 'Video thumbnail'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            crossOrigin="anonymous"
          />
        )}
      </div>

      {/* Title */}
      <div style={{
        opacity: titleOpacity,
        textAlign: 'center',
        marginBottom: '18px',
        padding: '0 30px',
        width: '100%',
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: 900,
          color: 'white',
          margin: 0,
          lineHeight: 1.15,
          fontFamily: 'Inter, sans-serif',
        }}>
          {data.video_title?.substring(0, 40)}{data.video_title?.length > 40 ? '...' : ''}
        </h1>
        <p style={{
          fontSize: '24px',
          color: '#71717A',
          marginTop: '10px',
          fontFamily: 'Inter, sans-serif',
        }}>
          {data.channel_name}
        </p>
      </div>

      {/* Quick Stats Row */}
      <div style={{
        display: 'flex',
        gap: '50px',
        opacity: statsOpacity,
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <Eye color="#3B82F6" size={30} />
          <div style={{ color: 'white', fontSize: '24px', fontWeight: 700, marginTop: '6px' }}>
            {(data.view_count || 0).toLocaleString()}
          </div>
          <div style={{ color: '#52525B', fontSize: '14px' }}>vistas</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Heart color="#EC4899" size={30} />
          <div style={{ color: 'white', fontSize: '24px', fontWeight: 700, marginTop: '6px' }}>
            {(data.like_count || 0).toLocaleString()}
          </div>
          <div style={{ color: '#52525B', fontSize: '14px' }}>likes</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <MessageSquare color="#10B981" size={30} />
          <div style={{ color: 'white', fontSize: '24px', fontWeight: 700, marginTop: '6px' }}>
            {(data.comment_count || 0).toLocaleString()}
          </div>
          <div style={{ color: '#52525B', fontSize: '14px' }}>comentarios</div>
        </div>
      </div>
    </div>
  );
};

// Stats Panel 1: Main Hate Stats
const StatsPanel1 = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = spring({ frame, fps, config: { damping: 60 } });
  const animateNumber = (target) => Math.floor((target || 0) * progress);
  const opacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      padding: '25px 50px',
      width: '100%',
      boxSizing: 'border-box',
      opacity,
    }}>
      {/* Big Hate Card */}
      <div style={{
        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
        borderRadius: '20px',
        padding: '30px 35px',
        marginBottom: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div>
          <div style={{ fontSize: '20px', color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginBottom: '6px' }}>
            HATE DETECTADO
          </div>
          <div style={{ fontSize: '80px', fontWeight: 900, color: 'white', lineHeight: 1 }}>
            {animateNumber(data.hate_percentage)}%
          </div>
        </div>
        <Flame color="white" size={90} strokeWidth={1.5} style={{ opacity: 0.5 }} />
      </div>

      {/* Grid Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', width: '100%' }}>
        <div style={{
          backgroundColor: '#18181B',
          border: '2px solid #27272A',
          borderRadius: '18px',
          padding: '22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <ThumbsUp color="#10B981" size={24} />
            <span style={{ color: '#71717A', fontSize: '15px' }}>Positivo</span>
          </div>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#10B981' }}>
            {animateNumber(data.positive_percentage)}%
          </div>
        </div>

        <div style={{
          backgroundColor: '#18181B',
          border: '2px solid #27272A',
          borderRadius: '18px',
          padding: '22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <TrendingDown color="#F59E0B" size={24} />
            <span style={{ color: '#71717A', fontSize: '15px' }}>Negativo</span>
          </div>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#F59E0B' }}>
            {animateNumber(data.negative_percentage)}%
          </div>
        </div>

        <div style={{
          backgroundColor: '#18181B',
          border: '2px solid #27272A',
          borderRadius: '18px',
          padding: '22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <MessageSquare color="#3B82F6" size={24} />
            <span style={{ color: '#71717A', fontSize: '15px' }}>Analizados</span>
          </div>
          <div style={{ fontSize: '48px', fontWeight: 900, color: 'white' }}>
            {animateNumber(data.total_comments_analyzed)}
          </div>
        </div>

        <div style={{
          backgroundColor: '#18181B',
          border: '2px solid #27272A',
          borderRadius: '18px',
          padding: '22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <AlertTriangle color="#EF4444" size={24} />
            <span style={{ color: '#71717A', fontSize: '15px' }}>Toxicidad</span>
          </div>
          <div style={{ 
            fontSize: '34px', 
            fontWeight: 900, 
            color: data.toxicity_level === 'severe' ? '#EF4444' : data.toxicity_level === 'moderate' ? '#F59E0B' : '#10B981',
            textTransform: 'uppercase'
          }}>
            {data.toxicity_level || 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats Panel 2: Sentiment Pie Chart
const StatsPanel2 = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const positive = data.positive_percentage || 0;
  const negative = data.negative_percentage || 0;
  const neutral = data.neutral_percentage || Math.max(0, 100 - positive - negative);
  const hate = data.hate_percentage || 0;

  const pieProgress = spring({ frame, fps, config: { damping: 40, stiffness: 80 } });
  const opacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });

  const createPieSlice = (startAngle, endAngle) => {
    const animatedEnd = startAngle + (endAngle - startAngle) * pieProgress;
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (animatedEnd - 90) * Math.PI / 180;
    const r = 130;
    const cx = 150;
    const cy = 150;
    
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    
    const largeArc = (animatedEnd - startAngle) > 180 ? 1 : 0;
    
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  let currentAngle = 0;
  const slices = [
    { value: positive, color: '#10B981' },
    { value: neutral, color: '#52525B' },
    { value: Math.max(0, negative - hate), color: '#F59E0B' },
    { value: hate, color: '#DC2626' },
  ].filter(s => s.value > 0);

  return (
    <div style={{
      padding: '25px 50px',
      width: '100%',
      boxSizing: 'border-box',
      opacity,
    }}>
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 800, 
        color: 'white', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <Flame color="#DC2626" size={26} />
        DESGLOSE DE SENTIMIENTOS
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '35px', justifyContent: 'center' }}>
        {/* Pie Chart */}
        <div style={{ position: 'relative', width: '300px', height: '300px', flexShrink: 0 }}>
          <svg width="300" height="300" viewBox="0 0 300 300">
            {slices.map((slice, i) => {
              const startAngle = currentAngle;
              const endAngle = currentAngle + (slice.value / 100) * 360;
              currentAngle = endAngle;
              return (
                <path
                  key={i}
                  d={createPieSlice(startAngle, endAngle)}
                  fill={slice.color}
                  stroke="#09090B"
                  strokeWidth="3"
                />
              );
            })}
            <circle cx="150" cy="150" r="65" fill="#09090B" />
            <text x="150" y="142" textAnchor="middle" fill="white" fontSize="44" fontWeight="900">
              {Math.round(hate * pieProgress)}%
            </text>
            <text x="150" y="175" textAnchor="middle" fill="#DC2626" fontSize="16" fontWeight="700">
              HATE
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          {[
            { label: 'Positivo', value: positive, color: '#10B981' },
            { label: 'Neutral', value: neutral, color: '#52525B' },
            { label: 'Negativo', value: negative, color: '#F59E0B' },
            { label: 'Hate', value: hate, color: '#DC2626' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#18181B',
              padding: '14px 18px',
              borderRadius: '12px',
            }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '6px', backgroundColor: item.color }} />
              <div style={{ flex: 1 }}>
                <span style={{ color: '#A1A1AA', fontSize: '14px' }}>{item.label}</span>
              </div>
              <span style={{ color: 'white', fontSize: '24px', fontWeight: 900 }}>{Math.round(item.value)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Stats Panel 3: Emotions
const StatsPanel3 = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const emotions = data.emotion_breakdown || {};
  const emotionData = [
    { name: 'Ira', value: emotions.anger || 0, color: '#EF4444' },
    { name: 'Asco', value: emotions.disgust || 0, color: '#A855F7' },
    { name: 'Alegría', value: emotions.joy || 0, color: '#10B981' },
    { name: 'Tristeza', value: emotions.sadness || 0, color: '#3B82F6' },
    { name: 'Sorpresa', value: emotions.surprise || 0, color: '#F59E0B' },
    { name: 'Miedo', value: emotions.fear || 0, color: '#6366F1' },
  ].sort((a, b) => b.value - a.value);

  const maxValue = Math.max(...emotionData.map(e => e.value), 1);
  const barProgress = spring({ frame, fps, config: { damping: 50 } });
  const opacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      padding: '25px 50px',
      width: '100%',
      boxSizing: 'border-box',
      opacity,
    }}>
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 800, 
        color: 'white', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <Flame color="#DC2626" size={26} />
        EMOCIONES DETECTADAS
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {emotionData.map((emotion, i) => (
          <div key={i}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '6px'
            }}>
              <span style={{ color: 'white', fontSize: '18px', fontWeight: 700 }}>{emotion.name}</span>
              <span style={{ color: emotion.color, fontSize: '22px', fontWeight: 900 }}>
                {Math.round(emotion.value * barProgress)}%
              </span>
            </div>
            <div style={{
              height: '32px',
              backgroundColor: '#27272A',
              borderRadius: '16px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${(emotion.value / maxValue) * 100 * barProgress}%`,
                background: `linear-gradient(90deg, ${emotion.color}99, ${emotion.color})`,
                borderRadius: '16px',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Stats Panel 4: Word Rankings - SIN ANIMACIONES DE ESCALA
const StatsPanel4 = ({ data }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });

  const words = (data.word_rankings || []).slice(0, 8);

  const getCategoryColor = (cat) => {
    const colors = {
      'hate': '#EF4444',
      'target': '#F59E0B',
      'criticism': '#F97316',
      'negative': '#A855F7',
      'positive': '#10B981',
      'support': '#3B82F6',
      'neutral': '#71717A',
    };
    return colors[cat] || '#71717A';
  };

  return (
    <div style={{
      padding: '25px 50px',
      width: '100%',
      boxSizing: 'border-box',
      opacity,
    }}>
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 800, 
        color: 'white', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <Hash color="#DC2626" size={26} />
        RANKING DE PALABRAS
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {words.map((word, i) => (
          <div key={i} style={{
            backgroundColor: '#18181B',
            border: `2px solid ${getCategoryColor(word.category)}44`,
            borderRadius: '14px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ 
                color: getCategoryColor(word.category), 
                fontSize: '18px', 
                fontWeight: 800,
                marginBottom: '3px',
              }}>
                {word.word}
              </div>
              <div style={{ 
                color: '#52525B', 
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                {word.category}
              </div>
            </div>
            <div style={{
              backgroundColor: getCategoryColor(word.category),
              color: 'white',
              padding: '6px 14px',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: 900,
            }}>
              {word.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Stats Panel 5: Trending Topics - SIN ANIMACIONES DE ESCALA
const StatsPanel5 = ({ data }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });

  const topics = (data.trending_topics || []).slice(0, 5);

  const getSentimentColor = (sentiment) => {
    const colors = {
      'hostile': '#EF4444',
      'negative': '#F59E0B',
      'positive': '#10B981',
      'neutral': '#71717A',
    };
    return colors[sentiment] || '#71717A';
  };

  return (
    <div style={{
      padding: '25px 50px',
      width: '100%',
      boxSizing: 'border-box',
      opacity,
    }}>
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 800, 
        color: 'white', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <Zap color="#DC2626" size={26} />
        TEMAS TRENDING
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {topics.map((topic, i) => (
          <div key={i} style={{
            backgroundColor: '#18181B',
            borderLeft: `4px solid ${getSentimentColor(topic.sentiment)}`,
            borderRadius: '12px',
            padding: '18px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ 
                color: 'white', 
                fontSize: '18px', 
                fontWeight: 700,
                marginBottom: '4px',
              }}>
                {topic.topic?.substring(0, 30)}{topic.topic?.length > 30 ? '...' : ''}
              </div>
              <div style={{ 
                color: getSentimentColor(topic.sentiment), 
                fontSize: '12px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}>
                {topic.sentiment}
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <MessageSquare size={18} color="#71717A" />
              <span style={{ fontSize: '24px', fontWeight: 900, color: 'white' }}>
                {topic.mentions}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Stats Panel 6: What's Failing - SIN ANIMACIONES DE ESCALA
const StatsPanel6 = ({ data }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });

  const insights = data.content_insights || {};
  const complaints = data.complaints_summary_es || '';

  return (
    <div style={{
      padding: '25px 50px',
      width: '100%',
      boxSizing: 'border-box',
      opacity,
    }}>
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 800, 
        color: 'white', 
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <Target color="#DC2626" size={26} />
        ¿QUÉ ESTÁ FALLANDO?
      </div>

      {/* Insight Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
        {[
          { label: 'Quejas', value: insights.complaints_count || 0, color: '#EF4444', icon: AlertTriangle },
          { label: 'Elogios', value: insights.praise_count || 0, color: '#10B981', icon: ThumbsUp },
          { label: 'Preguntas', value: insights.questions_count || 0, color: '#3B82F6', icon: MessageSquare },
          { label: 'Sugerencias', value: insights.suggestions_count || 0, color: '#F59E0B', icon: Zap },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} style={{
              backgroundColor: '#18181B',
              borderRadius: '14px',
              padding: '18px',
              textAlign: 'center',
            }}>
              <Icon color={card.color} size={28} style={{ marginBottom: '8px' }} />
              <div style={{ color: 'white', fontSize: '38px', fontWeight: 900 }}>{card.value}</div>
              <div style={{ color: '#71717A', fontSize: '13px' }}>{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div style={{
        backgroundColor: '#DC262618',
        border: '2px solid #DC262650',
        borderRadius: '16px',
        padding: '20px',
      }}>
        <div style={{ 
          color: '#DC2626', 
          fontSize: '14px', 
          fontWeight: 700, 
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Resumen de Críticas
        </div>
        <div style={{ 
          color: 'white', 
          fontSize: '16px', 
          lineHeight: 1.5,
        }}>
          {complaints?.substring(0, 180) || 'Sin resumen disponible'}
        </div>
      </div>
    </div>
  );
};

// Scene: Teaser del Hate con Temblor y Censura Explosiva (Open Loop de retención)
const HateTeaserCensoredScene = ({ data }) => {
  const frame = useCurrentFrame();
  const hateValue = Math.round(data.hate_percentage || 28);
  
  // Counting up rapidly before getting cut off
  const countProgress = interpolate(frame, [0, 65], [0, Math.min(65, hateValue + 15)], { extrapolateRight: 'clamp' });
  const displayCount = Math.round(countProgress);

  // Vibration shakes screen more and more as it approaches climax
  const isCensored = frame >= 68;
  const shakeIntensity = interpolate(frame, [15, 68], [1, 9], { extrapolateRight: 'clamp' });
  const shakeX = !isCensored ? Math.sin(frame * 1.4) * shakeIntensity : 0;
  const shakeY = !isCensored ? Math.cos(frame * 1.1) * (shakeIntensity * 0.7) : 0;

  // Flash at censor explosion moment
  const flashOpacity = interpolate(frame, [68, 73], [0.95, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{
      padding: '25px 45px',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transform: `translate(${shakeX}px, ${shakeY}px)`,
      position: 'relative',
    }}>
      {/* Flash overlay at censor moment */}
      {frame >= 68 && frame <= 74 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#EF4444',
          opacity: flashOpacity,
          zIndex: 40,
          borderRadius: '24px',
          pointerEvents: 'none',
        }} />
      )}

      {/* Header Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(220, 38, 38, 0.25)',
        border: '2px solid #DC2626',
        borderRadius: '999px',
        padding: '8px 22px',
        marginBottom: '18px',
      }}>
        <AlertTriangle color="#EF4444" size={24} className="animate-pulse" />
        <span style={{ color: 'white', fontSize: '18px', fontWeight: 900, letterSpacing: '1px' }}>
          ESCÁNER DE HATE EN TIEMPO REAL
        </span>
      </div>

      {!isCensored ? (
        /* Rising Hate Meter with high tension */
        <div style={{
          backgroundColor: '#18181B',
          border: '3px solid #DC2626',
          borderRadius: '24px',
          padding: '35px 30px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 0 50px rgba(220, 38, 38, 0.4)',
        }}>
          <div style={{ color: '#A1A1AA', fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
            Nivel de Odio Subiendo...
          </div>
          <div style={{
            fontSize: '110px',
            fontWeight: 900,
            color: '#DC2626',
            lineHeight: 1,
            textShadow: '0 0 40px rgba(220, 38, 38, 0.8)',
            fontFamily: 'Inter, sans-serif',
          }}>
            {displayCount}%
          </div>
          <div style={{
            marginTop: '18px',
            color: '#F59E0B',
            fontSize: '16px',
            fontWeight: 800,
            letterSpacing: '1px',
          }}>
            ⚠️ SOBRECARGA EN COMENTARIOS DETECTADA...
          </div>
        </div>
      ) : (
        /* EXPLOSION & CENSORED CLIFFHANGER */
        <div style={{
          backgroundColor: 'rgba(15, 10, 10, 0.95)',
          border: '3px solid #DC2626',
          borderRadius: '24px',
          padding: '35px 25px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 0 60px rgba(220, 38, 38, 0.7)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Danger Stripes Tape Header */}
          <div style={{
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            fontSize: '15px',
            fontWeight: 900,
            letterSpacing: '2px',
            padding: '6px 0',
            borderRadius: '8px',
            marginBottom: '16px',
          }}>
            /// ALERTA ROJA: RESULTADO BLOQUEADO ///
          </div>

          {/* Giant Censored Stamp */}
          <div style={{
            display: 'inline-block',
            backgroundColor: '#000000',
            border: '4px dashed #DC2626',
            borderRadius: '16px',
            padding: '14px 28px',
            transform: 'rotate(-3deg) scale(1.05)',
            boxShadow: '0 10px 30px rgba(220, 38, 38, 0.5)',
            marginBottom: '18px',
          }}>
            <span style={{
              fontSize: '44px',
              fontWeight: 900,
              color: '#DC2626',
              letterSpacing: '3px',
              fontFamily: 'Impact, sans-serif',
            }}>
              🔒 [CENSURADO]
            </span>
          </div>

          <div style={{
            fontSize: '24px',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.25,
            marginBottom: '12px',
          }}>
            EL % REAL DE HATE SE REVELA AL FINAL DEL VÍDEO
          </div>

          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#F87171',
            backgroundColor: 'rgba(220, 38, 38, 0.15)',
            padding: '10px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(220, 38, 38, 0.3)',
          }}>
            ¿Superará el récord histórico del canal? Quédate para ver la sentencia... 😈
          </div>
        </div>
      )}
    </div>
  );
};

// Scene: Batalla Creador vs Contenido (¿A quién va dirigido el hate?)
const CreatorVsContentBattleScene = ({ data }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const animProgress = interpolate(frame, [10, 45], [0, 1], { extrapolateRight: 'clamp' });

  const hatePct = Math.round(data.hate_percentage || 28);
  const creatorPct = Math.round(data.hate_to_creator_percentage ?? Math.round(hatePct * 0.55));
  const contentPct = Math.round(data.hate_to_content_percentage ?? Math.max(0, hatePct - creatorPct));
  
  const creatorRatio = Math.round((creatorPct / Math.max(1, creatorPct + contentPct)) * 100);
  const contentRatio = 100 - creatorRatio;

  const isCreatorWorse = creatorRatio >= contentRatio;

  return (
    <div style={{
      padding: '20px 45px',
      width: '100%',
      boxSizing: 'border-box',
      opacity,
    }}>
      {/* Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '16px',
      }}>
        <Target color="#DC2626" size={28} />
        <span style={{ fontSize: '24px', fontWeight: 900, color: 'white', letterSpacing: '0.5px' }}>
          ¿A QUIÉN ATACA LA AUDIENCIA?
        </span>
      </div>

      {/* Versus Container */}
      <div style={{
        backgroundColor: '#18181B',
        borderRadius: '24px',
        border: '2px solid #27272A',
        padding: '24px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)',
      }}>
        {/* Creator Row */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: '#F87171', fontSize: '18px', fontWeight: 800 }}>
              👤 Al Creador (Personal)
            </span>
            <span style={{ color: '#EF4444', fontSize: '28px', fontWeight: 900 }}>
              {Math.round(creatorRatio * animProgress)}%
            </span>
          </div>
          <div style={{ width: '100%', height: '18px', backgroundColor: '#27272A', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              width: `${creatorRatio * animProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #EF4444, #DC2626)',
              boxShadow: '0 0 15px rgba(239, 68, 68, 0.8)',
              borderRadius: '999px',
            }} />
          </div>
          <div style={{ color: '#A1A1AA', fontSize: '13px', marginTop: '4px' }}>
            Ataques por ego, actitud en cámara, tono y prepotencia.
          </div>
        </div>

        {/* Content Row */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: '#60A5FA', fontSize: '18px', fontWeight: 800 }}>
              🎬 Al Contenido (Vídeo)
            </span>
            <span style={{ color: '#3B82F6', fontSize: '28px', fontWeight: 900 }}>
              {Math.round(contentRatio * animProgress)}%
            </span>
          </div>
          <div style={{ width: '100%', height: '18px', backgroundColor: '#27272A', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              width: `${contentRatio * animProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #3B82F6, #1D4ED8)',
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)',
              borderRadius: '999px',
            }} />
          </div>
          <div style={{ color: '#A1A1AA', fontSize: '13px', marginTop: '4px' }}>
            Quejas sobre clickbait, duración, argumentos o edición.
          </div>
        </div>

        {/* Verdict Badge */}
        <div style={{
          marginTop: '20px',
          backgroundColor: isCreatorWorse ? 'rgba(220, 38, 38, 0.18)' : 'rgba(59, 130, 246, 0.18)',
          border: `1.5px solid ${isCreatorWorse ? '#DC2626' : '#3B82F6'}`,
          borderRadius: '16px',
          padding: '12px 18px',
          textAlign: 'center',
        }}>
          <span style={{
            color: isCreatorWorse ? '#F87171' : '#93C5FD',
            fontSize: '15px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            {isCreatorWorse 
              ? '🔥 Conclusión: La audiencia la toma directamente con la persona' 
              : '⚡ Conclusión: El público castiga el enfoque del vídeo'}
          </span>
        </div>
      </div>
    </div>
  );
};

// Scene: Comentario Más Destructivo / Salvaje
const TopHateCommentScene = ({ data }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 25], [0.95, 1], { extrapolateRight: 'clamp' });

  // Get raw comments
  const critics = data.hate_creator_comments || data.top_critics || data.controversial_comments || [];
  const topComment = critics[0]?.text || critics[0]?.comment || data.complaints_summary_es || "Este video demuestra lo desconectado que está de su audiencia. No se sostiene por ningún lado.";

  return (
    <div style={{
      padding: '20px 45px',
      width: '100%',
      boxSizing: 'border-box',
      opacity,
      transform: `scale(${scale})`,
    }}>
      {/* Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '16px',
      }}>
        <Flame color="#DC2626" size={28} />
        <span style={{ fontSize: '24px', fontWeight: 900, color: 'white', letterSpacing: '0.5px' }}>
          EL COMENTARIO MÁS SALVAJE
        </span>
      </div>

      {/* Comment Card */}
      <div style={{
        backgroundColor: '#18181B',
        border: '2.5px solid #DC2626',
        borderRadius: '24px',
        padding: '26px 28px',
        boxShadow: '0 0 50px rgba(220, 38, 38, 0.35)',
        position: 'relative',
      }}>
        {/* Toxicity Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              color: 'white',
              fontSize: '18px',
            }}>
              💀
            </div>
            <div>
              <div style={{ color: 'white', fontSize: '15px', fontWeight: 800 }}>Usuario Anónimo</div>
              <div style={{ color: '#71717A', fontSize: '12px' }}>Comentario con más interacciones</div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#DC2626',
            color: 'white',
            fontSize: '12px',
            fontWeight: 900,
            padding: '4px 10px',
            borderRadius: '999px',
            letterSpacing: '0.5px',
          }}>
            HATE 98%
          </div>
        </div>

        {/* Comment Text with Quotes */}
        <div style={{
          color: '#F4F4F5',
          fontSize: '20px',
          lineHeight: 1.4,
          fontWeight: 700,
          fontStyle: 'italic',
          marginBottom: '16px',
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: '16px',
          borderRadius: '14px',
          borderLeft: '4px solid #DC2626',
        }}>
          "{topComment.length > 170 ? topComment.substring(0, 170) + '...' : topComment}"
        </div>

        <div style={{
          color: '#F87171',
          fontSize: '14px',
          fontWeight: 800,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          🔥 QUEMADURA DE TERCER GRADO DETECTADA
        </div>
      </div>
    </div>
  );
};

// Scene: La Gran Revelación Final del Hate (Desenlace & Veredicto)
const FinalHateRevealScene = ({ data }) => {
  const frame = useCurrentFrame();
  const hateValue = Math.round(data.hate_percentage || 28);

  const revealProgress = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const displayHate = Math.round(hateValue * revealProgress);

  const isSevere = hateValue >= 35;
  const isModerate = hateValue >= 18 && hateValue < 35;

  let verdictText = '🚨 VEREDICTO: TOXICIDAD CRÍTICA (CANCELADO)';
  let verdictColor = '#DC2626';
  if (isModerate) {
    verdictText = '⚠️ VEREDICTO: ZONA DE ALTO CONFLICTO';
    verdictColor = '#F59E0B';
  } else if (!isSevere) {
    verdictText = '🛡️ VEREDICTO: APOYO MAYORITARIO';
    verdictColor = '#10B981';
  }

  return (
    <div style={{
      padding: '20px 45px',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      {/* Unlocked Slogan */}
      <div style={{
        backgroundColor: '#DC2626',
        color: 'white',
        fontSize: '15px',
        fontWeight: 900,
        padding: '6px 20px',
        borderRadius: '999px',
        letterSpacing: '1px',
        marginBottom: '16px',
        boxShadow: '0 0 25px rgba(220, 38, 38, 0.8)',
      }}>
        🔓 RESULTADO OFICIAL DESBLOQUEADO
      </div>

      {/* Main Hate Giant Number */}
      <div style={{
        backgroundColor: '#18181B',
        border: `3px solid ${verdictColor}`,
        borderRadius: '26px',
        padding: '30px 20px',
        width: '100%',
        boxShadow: `0 0 70px ${verdictColor}50`,
        marginBottom: '16px',
      }}>
        <div style={{ color: '#A1A1AA', fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>
          Nivel de Odio Final Auditado
        </div>
        <div style={{
          fontSize: '115px',
          fontWeight: 900,
          color: verdictColor,
          lineHeight: 1,
          textShadow: `0 0 50px ${verdictColor}`,
          fontFamily: 'Inter, sans-serif',
        }}>
          {displayHate}%
        </div>
        <div style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: 800,
          marginTop: '10px',
        }}>
          {verdictText}
        </div>
      </div>

      {/* Call to Action for Engagement */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        border: '1.5px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        padding: '14px 22px',
        width: '100%',
      }}>
        <div style={{ color: '#FFFFFF', fontSize: '17px', fontWeight: 900 }}>
          ¿Tienen razón los haters o se han pasado?
        </div>
        <div style={{ color: '#F87171', fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>
          ¡DEJA TU OPINIÓN EN LOS COMENTARIOS! 👇
        </div>
      </div>
    </div>
  );
};

// Main Composition - Supports 30-second Viral Short-Form Template
export const VideoAnalysisVertical = ({ data = {} }) => {
  const hasHook = Boolean(data?.hookConfig?.enabled);
  const hookDuration = 90; // 3 seconds at 30fps

  // 1.mp4 Fullscreen Chroma Presenter scene (5.5s = 165 frames at 30fps)
  const hasPresenter = data?.hookConfig?.presenterVideoEnabled !== false;
  const presenterDuration = 165; // 5.5 seconds

  const presenterStartFrame = hasHook ? hookDuration : 0;
  const statsStartFrame = (hasHook ? hookDuration : 0) + (hasPresenter ? presenterDuration : 0);

  // Check duration mode: '30s' (default recommended for viral retention) or '60s' (extended)
  const isExtended60s = data?.hookConfig?.durationMode === '60s';

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#09090B',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: 'radial-gradient(circle, #DC2626 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        pointerEvents: 'none',
      }} />

      {/* NARRACIÓN DE VOZ NEURONAL (Sincronizada a partir del segundo 3 / entrada del demonio) */}
      {data?.voiceAudioUrl && (
        <Sequence from={presenterStartFrame}>
          <Audio 
            src={data.voiceAudioUrl} 
            volume={1}
          />
        </Sequence>
      )}

      {/* SCENE 1: 3-Second Original Video Hook (0 to 3s) */}
      {hasHook && (
        <Sequence from={0} durationInFrames={hookDuration}>
          <HookClipScene data={data} hookConfig={data?.hookConfig} />
        </Sequence>
      )}

      {/* SCENE 2: Video 1.mp4 a Pantalla Completa sin Chroma Key con Hook Dinámico (3s a 8.5s) */}
      {hasPresenter && (
        <Sequence from={presenterStartFrame} durationInFrames={presenterDuration}>
          <PresenterFullscreenChromaScene data={data} config={data?.hookConfig?.chromaConfig || {}} />
        </Sequence>
      )}

      {/* SCENE 3+: Template de Análisis de Alta Retención */}
      <Sequence from={statsStartFrame}>
        <AbsoluteFill style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#09090B',
        }}>
          {/* Fixed Header - Always visible during stats */}
          <FixedHeader data={data} />

          {/* Divider line */}
          <div style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent 5%, #DC262660 50%, transparent 95%)',
            margin: '0 50px 8px 50px',
            flexShrink: 0,
          }} />

          {/* Stats Panels Area */}
          <div style={{ 
            flex: 1, 
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {!isExtended60s ? (
              /* NUEVO FORMATO VIRAL 30 SEGUNDOS (MÁXIMA RETENCIÓN) */
              <>
                {/* 1. Medidor de Hate en aumento + CENSURA EXPLOSIVA (0-150 frames = 5s) */}
                <Sequence from={0} durationInFrames={150}>
                  <HateTeaserCensoredScene data={data} />
                </Sequence>

                {/* 2. Batalla Creador vs Contenido (150-320 frames = 5.6s) */}
                <Sequence from={150} durationInFrames={170}>
                  <CreatorVsContentBattleScene data={data} />
                </Sequence>

                {/* 3. El Comentario Más Salvaje de la Audiencia (320-480 frames = 5.3s) */}
                <Sequence from={320} durationInFrames={160}>
                  <TopHateCommentScene data={data} />
                </Sequence>

                {/* 4. Gran Revelación Final del Hate + Veredicto (480-645 frames = 5.5s) */}
                <Sequence from={480} durationInFrames={165}>
                  <FinalHateRevealScene data={data} />
                </Sequence>
              </>
            ) : (
              /* MODO CLÁSICO 60 SEGUNDOS */
              <>
                <Sequence from={0} durationInFrames={300}>
                  <StatsPanel1 data={data} />
                </Sequence>
                <Sequence from={300} durationInFrames={300}>
                  <StatsPanel2 data={data} />
                </Sequence>
                <Sequence from={600} durationInFrames={300}>
                  <StatsPanel3 data={data} />
                </Sequence>
                <Sequence from={900} durationInFrames={240}>
                  <StatsPanel4 data={data} />
                </Sequence>
                <Sequence from={1140} durationInFrames={240}>
                  <StatsPanel5 data={data} />
                </Sequence>
                <Sequence from={1380} durationInFrames={360}>
                  <StatsPanel6 data={data} />
                </Sequence>
              </>
            )}
          </div>

          {/* Footer watermark */}
          <div style={{
            padding: '16px',
            textAlign: 'center',
            color: '#3F3F46',
            fontSize: '14px',
            fontWeight: 700,
            flexShrink: 0,
            letterSpacing: '1px',
          }}>
            SOCIALHATE.COM • AUDITORÍA DE ODIO
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
