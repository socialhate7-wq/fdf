import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@remotion/player";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Utensils,
  ArrowLeft,
  Video as VideoIcon,
  Play,
  Smartphone,
  Mic,
  Volume2,
  VolumeX,
  Sparkles,
  Loader2,
  Download,
  Flame,
  Star,
  MapPin,
  TrendingUp,
  BarChart3,
  Info,
  ChefHat,
  AlertTriangle,
  Layers,
  List,
  Trophy,
  RefreshCw,
  Building2,
  CheckCircle2,
  Scissors
} from "lucide-react";

import {
  FoodieStoryboardVideo,
  DEFAULT_FOODIE_REVIEWS
} from "@/remotion/compositions/FoodieStoryboardVideo";
import { FoodieSceneStoryboardTimeline } from "@/components/FoodieSceneStoryboardTimeline";
import {
  FoodieRankingStargazer,
  FoodieRankingScroll,
  FoodieRankingNBA,
  FoodieRankingInferno,
  DEFAULT_FOODIE_RANKING_ITEMS
} from "@/remotion/compositions/FoodieHypeRankingVideo";
import { FoodieChannelEvolutionVideo } from "@/remotion/compositions/FoodieChannelEvolutionVideo";
import { GoogleLogo } from "@/remotion/compositions/GoogleReviewCard";

const API = "/api";

const RANKING_STYLES = {
  stargazer: {
    name: 'Stargazer Foodie',
    badge: 'VIRAL',
    icon: Sparkles,
    description: 'Stream rápido de restaurantes y desaceleración épica en el podio.',
    component: FoodieRankingStargazer,
  },
  scroll: {
    name: 'Scroll Clásico',
    badge: null,
    icon: List,
    description: 'Lista animada de mayor a menor discrepancia con Google Maps.',
    component: FoodieRankingScroll,
  },
  nba: {
    name: 'Cuenta Atrás Gourmet',
    badge: 'SUSPENSE',
    icon: Trophy,
    description: 'Revelación cinematográfica restaurante por restaurante.',
    component: FoodieRankingNBA,
  },
  inferno: {
    name: 'Hype Inferno',
    badge: 'MÁXIMO POSTUREO',
    icon: Flame,
    description: 'Fuego y alertas rojas para las peores incoherencias.',
    component: FoodieRankingInferno,
  },
};

const SAMPLE_FOODIE_ANALYSES = [
  {
    id: "rc-buffet-fusion",
    restaurant_name: "Gran Buffet Fusión",
    restaurant_location: "Barcelona",
    video_title: "¡BUFFET LIBRE INFINITO POR 16€! ¿EL MEJOR DE ESPAÑA?",
    channel_name: "FoodieVip Spain",
    thumbnail_url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1080&q=80",
    status: "completed",
    coherence_index: 24,
    reviews_count: 615,
    videoId: "dQw4w9WgXcQ",
    video_src: null,
    avatar_src: "/videos/ff3.mp4",
    influencer_sentiment: {
      overall_tone: "Promocional extremo / Hype desmedido",
      key_claims: ["Marisco fresco ilimitado", "Sushi de alta gama", "Experiencia 10/10 insuperable"]
    },
    community_sentiment: {
      estimated_rating: 2.8,
      common_complaints: ["Marisco congelado gomoso", "Sushi con exceso de arroz", "Bandejas vacías"]
    },
    reviews: [
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
        text: "Fuimos por el vídeo de FoodieVip y fue una estafa. El marisco estaba congelado y seco, y nos cobraron 4,50€ de suplemento de bebida por persona.",
        highlightText: "El marisco estaba congelado y suplemento de 4,50€",
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
        highlightText: "Cola de 45 min y te meten prisa para doblar mesa",
        highlightBg: "#FEF08A",
        sentiment: "negative"
      }
    ]
  },
  {
    id: "rc-asador-real",
    restaurant_name: "Asador Real Gourmet",
    restaurant_location: "Madrid",
    video_title: "CHULETÓN DE 1.5KG Y TARTA DE QUESO CREMOSA: ¿VALE LOS 120€?",
    channel_name: "Cenando con Pablo",
    thumbnail_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1080&q=80",
    status: "completed",
    coherence_index: 38,
    reviews_count: 890,
    videoId: "dQw4w9WgXcQ",
    video_src: null,
    avatar_src: "/videos/ff3.mp4",
    influencer_sentiment: {
      overall_tone: "Crítica elogiosa de alta gama",
      key_claims: ["Carne madurada 60 días mantequilla", "Punto perfecto a la brasa"]
    },
    community_sentiment: {
      estimated_rating: 3.4,
      common_complaints: ["Cobros sorpresa en la cuenta", "Carne servida templada a fría"]
    },
    reviews: [
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
        author: "Carlos Méndez",
        badge: "Local Guide · 52 reseñas",
        rating: "2/5",
        stars: 2,
        timeAgo: "Hace 1 mes",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
        text: "Pedimos el chuletón que recomendó Pablo. Vino casi frío por dentro y 40% grasa no aprovechable. Nos clavaron 135€ por dos personas.",
        highlightText: "Vino frío por dentro y 40% grasa no aprovechable",
        highlightBg: "#FECACA",
        sentiment: "negative"
      },
      {
        id: 3,
        author: "Beatriz Lozano",
        badge: "28 reseñas",
        rating: "1/5",
        stars: 1,
        timeAgo: "Hace 2 semanas",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop",
        text: "El pan y aperitivo no pedido te lo cobran a 4,80€ por cabeza. El local estaba a oscuras y los camareros desbordados.",
        highlightText: "Pan y aperitivo no pedido a 4,80€ por cabeza",
        highlightBg: "#FECACA",
        sentiment: "negative"
      }
    ]
  },
  {
    id: "rc-smash-deluxe",
    restaurant_name: "Smash Burger Deluxe",
    restaurant_location: "Valencia",
    video_title: "LA SMASH BURGER MÁS VIRAL DE INSTAGRAM: CHEDDAR CHORREANDO",
    channel_name: "GastroAdictos",
    thumbnail_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1080&q=80",
    status: "completed",
    coherence_index: 29,
    reviews_count: 530,
    videoId: "dQw4w9WgXcQ",
    video_src: null,
    avatar_src: "/videos/ff3.mp4",
    influencer_sentiment: {
      overall_tone: "PornFood viral y sensacionalista",
      key_claims: ["La mejor costra caramelizada", "Queso cheddar artesanal fundido"]
    },
    community_sentiment: {
      estimated_rating: 3.1,
      common_complaints: ["Humo de aceite reutilizado", "Patatas grasientas y blandas"]
    },
    reviews: [
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
        author: "Raúl Santamaría",
        badge: "Local Guide · 19 reseñas",
        rating: "1/5",
        stars: 1,
        timeAgo: "Hace 5 días",
        avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop",
        text: "Puro queso de bote sintético para la foto de Instagram. Al comerla solo sabe a grasa y te deja el estómago revuelto.",
        highlightText: "Puro queso sintético para la foto de Instagram",
        highlightBg: "#FECACA",
        sentiment: "negative"
      }
    ]
  }
];

export default function FoodieVideoGeneratorPage() {
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [analyses, setAnalyses] = useState(SAMPLE_FOODIE_ANALYSES);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState(SAMPLE_FOODIE_ANALYSES[0].id);
  const [activeMainTab, setActiveMainTab] = useState("storyboard");
  const [rankingStyle, setRankingStyle] = useState("stargazer");
  const [isExporting, setIsExporting] = useState(false);

  // Active Storyboard configuration (5 Scenes exact structure)
  const [storyboardData, setStoryboardData] = useState({
    channelName: SAMPLE_FOODIE_ANALYSES[0].channel_name,
    restaurantName: SAMPLE_FOODIE_ANALYSES[0].restaurant_name,
    restaurantLocation: SAMPLE_FOODIE_ANALYSES[0].restaurant_location,
    coherenceIndex: SAMPLE_FOODIE_ANALYSES[0].coherence_index,
    videoId: "dQw4w9WgXcQ",
    videoSrc: null,
    avatarSrc: "/videos/ff3.mp4",
    hook: {
      startTime: 0,
      duration: 3,
      label: "CLIP ORIGINAL FOODIE",
      volume: 1,
    },
    scene2: {
      text: "Hoy {nombre} ha ido a comer a {restaurante} y vamos a ver cómo le ha ido.",
      duration: 4.5,
    },
    polemicClips: [
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
    scene4: {
      text: "Ahora vamos a ver qué dice la gente que ha comido allí.",
      duration: 3.5,
    },
    reviews: SAMPLE_FOODIE_ANALYSES[0].reviews || DEFAULT_FOODIE_REVIEWS,
    reviewsSceneDuration: 7.0,
    videoFormat: "vertical",
    transitionStyle: "glitch",
  });

  // Calculate total duration in frames
  const fps = 30;
  const hookDuration = storyboardData.hook?.duration || 3;
  const scene2Duration = storyboardData.scene2?.duration || 4.5;
  const clipsDuration = (storyboardData.polemicClips || []).reduce((acc, c) => acc + (c.duration || 3), 0);
  const scene4Duration = storyboardData.scene4?.duration || 3.5;
  const scene5Duration = storyboardData.reviewsSceneDuration || 7.0;

  const totalDurationSeconds = hookDuration + scene2Duration + clipsDuration + scene4Duration + scene5Duration;
  const totalDurationFrames = Math.max(300, Math.round(totalDurationSeconds * fps));

  // Change selected analysis
  const handleSelectAnalysis = (analysisId) => {
    setSelectedAnalysisId(analysisId);
    const found = analyses.find((a) => a.id === analysisId);
    if (!found) return;

    setStoryboardData((prev) => ({
      ...prev,
      channelName: found.channel_name || "Foodie Influencer",
      restaurantName: found.restaurant_name || "Restaurante",
      restaurantLocation: found.restaurant_location || "España",
      coherenceIndex: found.coherence_index || 30,
      videoId: found.videoId || found.video_id || "dQw4w9WgXcQ",
      videoSrc: found.video_src || null,
      avatarSrc: found.avatar_src || "/videos/ff3.mp4",
      reviews: found.reviews && found.reviews.length > 0 ? found.reviews : prev.reviews,
    }));
    toast.info(`Cargados datos de auditoría: ${found.restaurant_name}`);
  };

  // Seek helper for Remotion Player
  const handleSeekScene = (sceneIndex) => {
    if (!playerRef.current) return;
    let targetSeconds = 0;
    if (sceneIndex === 1) targetSeconds = 0;
    if (sceneIndex === 2) targetSeconds = hookDuration;
    if (sceneIndex === 3) targetSeconds = hookDuration + scene2Duration;
    if (sceneIndex === 4) targetSeconds = hookDuration + scene2Duration + clipsDuration;
    if (sceneIndex === 5) targetSeconds = hookDuration + scene2Duration + clipsDuration + scene4Duration;

    const targetFrame = Math.round(targetSeconds * fps);
    try {
      playerRef.current.seekTo(targetFrame);
      toast.success(`Saltando a Escena ${sceneIndex} (${targetSeconds.toFixed(1)}s)`);
    } catch (e) {
      // player seek
    }
  };

  // Export video simulation
  const handleExportVideo = () => {
    setIsExporting(true);
    toast.loading("Renderizando vídeo vertical 9:16 con Remotion...", { id: "export-video" });
    setTimeout(() => {
      setIsExporting(false);
      toast.success("¡Vídeo Foodie Fake 9:16 generado listo para TikTok / Shorts!", {
        id: "export-video",
        description: `Resolución 1080x1920 (Duración: ${Math.round(totalDurationSeconds)}s) con audio y avatar sincronizado.`
      });
    }, 2800);
  };

  const currentRankingComponent = RANKING_STYLES[rankingStyle]?.component || FoodieRankingStargazer;

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/foodie-reality")}
              className="text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Utensils className="w-6 h-6 text-emerald-500" />
              <span className="font-heading text-xl font-black tracking-tight text-white">
                FOODIE<span className="text-emerald-500">FAKE</span>
              </span>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 text-[10px] font-black uppercase ml-1">
                STUDIO VIDEO 9:16
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/foodie-pro")}
              className="border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs font-bold"
            >
              <Building2 className="w-3.5 h-3.5 mr-1 text-amber-400" />
              FoodieFake PRO
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/foodie-creator")}
              className="border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 text-xs font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-cyan-400" />
              Creator
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleExportVideo}
              disabled={isExporting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Renderizando...
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Exportar 9:16
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Title Bar & Quick Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              Generador de Vídeos Foodie Fake
              <span className="text-xs bg-red-500 text-white font-mono px-2.5 py-0.5 rounded-full uppercase">
                5 ESCENAS VIRALES
              </span>
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Hook original (0-3s) ➔ Avatar ff3.mp4 ➔ Momentos polémicos elegidos ➔ Avatar ff3.mp4 ➔ Reseñas reales de Google Maps a ritmo rápido.
            </p>
          </div>

          {/* Quick Preset Picker */}
          <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 p-1.5 rounded-2xl">
            <span className="text-xs font-bold text-zinc-400 px-2 uppercase">Auditoría:</span>
            {analyses.map((a) => (
              <Button
                key={a.id}
                type="button"
                size="sm"
                variant={selectedAnalysisId === a.id ? "default" : "ghost"}
                onClick={() => handleSelectAnalysis(a.id)}
                className={`text-xs font-bold ${
                  selectedAnalysisId === a.id
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {a.restaurant_name}
              </Button>
            ))}
          </div>
        </div>

        {/* Global Tabs: Storyboard (5 escenas), Ranking Top 10, etc. */}
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="space-y-6">
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
            <TabsTrigger value="storyboard" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-xs font-bold">
              <Layers className="w-4 h-4 mr-2" />
              Storyboard 5 Escenas (Individual)
            </TabsTrigger>
            <TabsTrigger value="ranking" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-xs font-bold">
              <Trophy className="w-4 h-4 mr-2" />
              Ranking Hype 100 (Stargazer)
            </TabsTrigger>
            <TabsTrigger value="channel" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-xs font-bold">
              <TrendingUp className="w-4 h-4 mr-2" />
              Evolución Influencer
            </TabsTrigger>
          </TabsList>

          {/* ========================================================
              TAB 1: STORYBOARD 5 ESCENAS (THE CORE USER REQUEST)
          ======================================================== */}
          <TabsContent value="storyboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN: 9:16 REMOTION PLAYER PREVIEW */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <Card className="bg-zinc-950 border-zinc-800 p-4 rounded-3xl w-full max-w-[390px] shadow-2xl">
                  {/* Smartphone Viewport Header */}
                  <div className="flex items-center justify-between px-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-zinc-300">Format TikTok / Shorts 9:16</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono border-zinc-800 text-zinc-400">
                      1080x1920
                    </Badge>
                  </div>

                  {/* The Live Remotion Player */}
                  <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-inner">
                    <Player
                      key={`foodie-player-${storyboardData.videoId}-${storyboardData.videoFormat}-${storyboardData.transitionStyle}-${storyboardData.hook?.startTime}-${storyboardData.hook?.duration}-${(storyboardData.polemicClips || []).map(c => `${c.id}_${c.startTime}`).join('-')}-${storyboardData.reviews?.length}`}
                      ref={playerRef}
                      component={FoodieStoryboardVideo}
                      inputProps={storyboardData}
                      durationInFrames={totalDurationFrames}
                      fps={30}
                      compositionWidth={1080}
                      compositionHeight={1920}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      controls
                      autoPlay={false}
                      loop={false}
                    />
                  </div>

                  {/* Scene Quick Jump Bar */}
                  <div className="mt-4 pt-3 border-t border-zinc-900 space-y-2">
                    <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Saltar a Escena en el Player:</span>
                      <span className="font-mono text-emerald-400">{Math.round(totalDurationSeconds)}s total</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleSeekScene(1)}
                        className="p-1.5 bg-zinc-900 hover:bg-red-500/20 hover:border-red-500 border border-zinc-800 rounded-lg text-center transition-colors"
                        title="Escena 1: Hook Original"
                      >
                        <div className="text-[9px] text-zinc-500 font-bold">E1</div>
                        <div className="text-[10px] text-red-400 font-bold">Hook</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSeekScene(2)}
                        className="p-1.5 bg-zinc-900 hover:bg-emerald-500/20 hover:border-emerald-500 border border-zinc-800 rounded-lg text-center transition-colors"
                        title="Escena 2: Avatar ff3.mp4"
                      >
                        <div className="text-[9px] text-zinc-500 font-bold">E2</div>
                        <div className="text-[10px] text-emerald-400 font-bold">ff3.mp4</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSeekScene(3)}
                        className="p-1.5 bg-zinc-900 hover:bg-amber-500/20 hover:border-amber-500 border border-zinc-800 rounded-lg text-center transition-colors"
                        title="Escena 3: Momentos Polémicos"
                      >
                        <div className="text-[9px] text-zinc-500 font-bold">E3</div>
                        <div className="text-[10px] text-amber-400 font-bold">Clips 3s</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSeekScene(4)}
                        className="p-1.5 bg-zinc-900 hover:bg-cyan-500/20 hover:border-cyan-500 border border-zinc-800 rounded-lg text-center transition-colors"
                        title="Escena 4: Avatar ff3.mp4"
                      >
                        <div className="text-[9px] text-zinc-500 font-bold">E4</div>
                        <div className="text-[10px] text-cyan-400 font-bold">ff3.mp4</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSeekScene(5)}
                        className="p-1.5 bg-zinc-900 hover:bg-yellow-500/20 hover:border-yellow-500 border border-zinc-800 rounded-lg text-center transition-colors"
                        title="Escena 5: Reseñas Google Places"
                      >
                        <div className="text-[9px] text-zinc-500 font-bold">E5</div>
                        <div className="text-[10px] text-yellow-400 font-bold">Google</div>
                      </button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* RIGHT COLUMN: INTERACTIVE STORYBOARD TIMELINE & SCENE CONFIGURATOR */}
              <div className="lg:col-span-7">
                <FoodieSceneStoryboardTimeline
                  storyboardData={storyboardData}
                  onChange={setStoryboardData}
                  onSeekPreview={handleSeekScene}
                />
              </div>
            </div>
          </TabsContent>

          {/* ========================================================
              TAB 2: RANKING TOP 100 (STARGAZER / SCROLL / NBA / INFERNO)
          ======================================================== */}
          <TabsContent value="ranking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Player */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <Card className="bg-zinc-950 border-zinc-800 p-4 rounded-3xl w-full max-w-[390px] shadow-2xl">
                  <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-inner">
                    <Player
                      component={currentRankingComponent}
                      inputProps={{
                        data: DEFAULT_FOODIE_RANKING_ITEMS,
                      }}
                      durationInFrames={900}
                      fps={30}
                      compositionWidth={1080}
                      compositionHeight={1920}
                      style={{ width: '100%', height: '100%' }}
                      controls
                      autoPlay={false}
                      loop
                    />
                  </div>
                </Card>
              </div>

              {/* Right Column: Style Selector */}
              <div className="lg:col-span-7 space-y-5">
                <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-4">
                  <h3 className="font-heading text-lg font-bold text-white">
                    Estilos de Ranking para Foodies
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Genera clasificaciones automatizadas de los restaurantes con mayor brecha entre el vídeo y la realidad.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {Object.entries(RANKING_STYLES).map(([key, style]) => {
                      const Icon = style.icon;
                      const isSelected = rankingStyle === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setRankingStyle(key)}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                              : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Icon className={`w-5 h-5 ${isSelected ? "text-emerald-400" : "text-zinc-500"}`} />
                            {style.badge && (
                              <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                {style.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm font-bold text-white mb-1">{style.name}</div>
                          <div className="text-xs text-zinc-400 leading-relaxed">{style.description}</div>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ========================================================
              TAB 3: CHANNEL EVOLUTION
          ======================================================== */}
          <TabsContent value="channel" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 flex flex-col items-center">
                <Card className="bg-zinc-950 border-zinc-800 p-4 rounded-3xl w-full max-w-[390px] shadow-2xl">
                  <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-inner">
                    <Player
                      component={FoodieChannelEvolutionVideo}
                      inputProps={{
                        data: {
                          channel_name: storyboardData.channelName,
                          analyses: analyses,
                          avg_coherence: storyboardData.coherenceIndex,
                          trend: -8,
                        },
                      }}
                      durationInFrames={300}
                      fps={30}
                      compositionWidth={1080}
                      compositionHeight={1920}
                      style={{ width: '100%', height: '100%' }}
                      controls
                      autoPlay={false}
                      loop
                    />
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-4">
                  <h3 className="font-heading text-lg font-bold text-white">
                    Evolución y Fiabilidad del Influencer
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Vídeo vertical de 10 segundos para contrastar la trayectoria del canal {storyboardData.channelName} a lo largo del tiempo.
                  </p>
                  <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-zinc-500 font-bold uppercase">Índice Promedio de Coherencia</div>
                      <div className="text-2xl font-black text-emerald-400">{storyboardData.coherenceIndex}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 font-bold uppercase">Tendencia Últimos 6 Meses</div>
                      <div className="text-2xl font-black text-red-400">-8% Hype al alza</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
