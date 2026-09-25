import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@remotion/player";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { HateRankingScroll, HateRankingNBA, HateRankingInferno, HateRankingStargazer, DEFAULT_STARGAZER_HATE_VIDEOS } from "@/remotion/compositions/HateRankingVideo";
import { VideoAnalysisVertical } from "@/remotion/compositions/VideoAnalysisVertical";
import { ChannelEvolutionVideo } from "@/remotion/compositions/ChannelEvolutionVideo";
import { DevilPresenterVideo } from "@/remotion/compositions/DevilPresenterVideo";
import { VideoPresenterVideo } from "@/remotion/compositions/VideoPresenterVideo";
import { VideoHookTimeline } from "@/components/VideoHookTimeline";
import axios from "axios";
import { 
  Flame, 
  ArrowLeft, 
  Video,
  TrendingUp,
  BarChart3,
  Play,
  Info,
  Smartphone,
  Monitor,
  Mic,
  Volume2,
  VolumeX,
  Sparkles,
  Loader2,
  Download,
  List,
  Trophy,
  Zap,
  Ghost,
  Video as VideoIcon
} from "lucide-react";

const API = `${""}/api`;

// Ranking style components map
const RANKING_STYLES = {
  stargazer: { 
    component: HateRankingStargazer, 
    name: 'Stargazer Hate Stream', 
    icon: Sparkles, 
    badge: '100 VÍDEOS',
    description: 'Flujo Stargazer 100 vídeos: rush a toda velocidad y desaceleración épica en el Top 10' 
  },
  scroll: { component: HateRankingScroll, name: 'Scroll Clásico', icon: List, description: 'Lista con scroll animado' },
  nba: { component: HateRankingNBA, name: 'Cuenta Atrás NBA', icon: Trophy, description: 'Revelación dramática uno a uno' },
  inferno: { component: HateRankingInferno, name: 'Inferno Mode', icon: Flame, description: 'Fuego, explosiones y caos' },
};

const VideoGeneratorPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analyses, setAnalyses] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedVideoData, setSelectedVideoData] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [activeTab, setActiveTab] = useState("video-stats");
  const [rankingStyle, setRankingStyle] = useState("stargazer");
  const [useExampleVideos, setUseExampleVideos] = useState(true);

  // 3-Second Original Video Hook + 1.mp4 Fullscreen Chroma presenter configuration
  const [hookConfig, setHookConfig] = useState({
    enabled: true,
    startTime: 0,
    duration: 3,
    attribution: "",
    presenterVideoEnabled: true,
    presenterHookId: "random",
    durationMode: "30s",
    chromaConfig: {
      greenTolerance: 1.25,
      minGreen: 80,
      despill: true,
    },
    avatarEnabled: false,
    avatarQuote: "¿Qué opina la gente en comentarios? ¡Vamos a verlo!",
    transitionStyle: "glitch",
  });
  
  // Devil video states
  const [selectedDevilVideoId, setSelectedDevilVideoId] = useState(null);
  const [selectedDevilVideoData, setSelectedDevilVideoData] = useState(null);
  const [loadingDevilVideo, setLoadingDevilVideo] = useState(false);

  // Video Presenter states
  const [selectedPresenterVideoId, setSelectedPresenterVideoId] = useState(null);
  const [selectedPresenterVideoData, setSelectedPresenterVideoData] = useState(null);
  const [loadingPresenterVideo, setLoadingPresenterVideo] = useState(false);
  
  // Voice states
  const [voiceScript, setVoiceScript] = useState(null);
  const [voiceAudioUrl, setVoiceAudioUrl] = useState(null);
  const [generatingVoice, setGeneratingVoice] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState('es-ES-AlvaroNeural');
  const audioRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [analysesRes, channelsRes] = await Promise.all([
        axios.get(`${API}/analyses`),
        axios.get(`${API}/channels`)
      ]);
      setAnalyses(analysesRes.data);
      setChannels(channelsRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch full video data when selected
  const fetchVideoData = async (analysisId) => {
    if (!analysisId) {
      setSelectedVideoData(null);
      return;
    }
    
    setLoadingVideo(true);
    try {
      const res = await axios.get(`${API}/analysis/${analysisId}`);
      setSelectedVideoData(res.data);
    } catch (error) {
      console.error("Failed to fetch video data:", error);
      setSelectedVideoData(null);
    } finally {
      setLoadingVideo(false);
    }
  };

  useEffect(() => {
    fetchVideoData(selectedVideoId);
    if (selectedVideoId) {
      // Connect voice audio URL to video and fetch current script
      setVoiceAudioUrl(`${API}/voice-audio/${selectedVideoId}`);
      axios.get(`${API}/voice-status/${selectedVideoId}`)
        .then(res => {
          if (res.data?.script) {
            setVoiceScript(res.data.script);
          }
        })
        .catch(() => {});
    } else {
      setVoiceScript(null);
      setVoiceAudioUrl(null);
      setIsPlayingAudio(false);
    }
  }, [selectedVideoId]);

  // Synchronize hook attribution with selected video channel
  useEffect(() => {
    if (selectedVideoData?.channel_name) {
      setHookConfig(prev => ({
        ...prev,
        attribution: selectedVideoData.channel_name,
      }));
    }
  }, [selectedVideoData]);

  // Fetch devil video data
  const fetchDevilVideoData = async (analysisId) => {
    if (!analysisId) {
      setSelectedDevilVideoData(null);
      return;
    }
    
    setLoadingDevilVideo(true);
    try {
      const res = await axios.get(`${API}/analysis/${analysisId}`);
      setSelectedDevilVideoData(res.data);
    } catch (error) {
      console.error("Failed to fetch devil video data:", error);
      setSelectedDevilVideoData(null);
    } finally {
      setLoadingDevilVideo(false);
    }
  };

  useEffect(() => {
    fetchDevilVideoData(selectedDevilVideoId);
  }, [selectedDevilVideoId]);

  // Fetch presenter video data
  const fetchPresenterVideoData = async (analysisId) => {
    if (!analysisId) {
      setSelectedPresenterVideoData(null);
      return;
    }
    
    setLoadingPresenterVideo(true);
    try {
      const res = await axios.get(`${API}/analysis/${analysisId}`);
      setSelectedPresenterVideoData(res.data);
    } catch (error) {
      console.error("Failed to fetch presenter video data:", error);
      setSelectedPresenterVideoData(null);
    } finally {
      setLoadingPresenterVideo(false);
    }
  };

  useEffect(() => {
    fetchPresenterVideoData(selectedPresenterVideoId);
  }, [selectedPresenterVideoId]);

  // Generate voice narration
  const generateVoice = async (customText = null) => {
    if (!selectedVideoId) return;
    
    setGeneratingVoice(true);
    try {
      const textToUse = typeof customText === 'string' ? customText : (voiceScript || undefined);
      const res = await axios.post(`${API}/generate-voice/${selectedVideoId}`, {
        hookConfig,
        voiceId: selectedVoiceId,
        customScript: textToUse,
      });
      setVoiceScript(res.data.script);
      const url = res.data.audioUrl 
        ? `${res.data.audioUrl}?t=${Date.now()}` 
        : `${API}/voice-audio/${selectedVideoId}?t=${Date.now()}`;
      setVoiceAudioUrl(url);
    } catch (error) {
      console.error("Failed to generate voice:", error);
      const msg = error?.response?.data?.error || "Error generando la voz";
      alert(msg);
    } finally {
      setGeneratingVoice(false);
    }
  };

  // Play/pause audio
  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlayingAudio) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlayingAudio(!isPlayingAudio);
  };

  // Prepare data for Top 10 Ranking
  const top10Data = analyses
    .filter(a => a.status === "completed")
    .sort((a, b) => (b.hate_percentage || 0) - (a.hate_percentage || 0))
    .slice(0, 10);

  // Get completed analyses for video selector
  const completedAnalyses = analyses.filter(a => a.status === "completed");

  // Prepare data for channel evolution
  const getChannelEvolutionData = (channelId) => {
    const channelAnalyses = analyses
      .filter(a => a.channel_id === channelId && a.status === "completed")
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    if (channelAnalyses.length === 0) return null;

    const avgHate = channelAnalyses.reduce((sum, a) => sum + (a.hate_percentage || 0), 0) / channelAnalyses.length;
    
    const recent = channelAnalyses.slice(-3);
    const old = channelAnalyses.slice(0, 3);
    const recentAvg = recent.reduce((sum, a) => sum + (a.hate_percentage || 0), 0) / recent.length;
    const oldAvg = old.reduce((sum, a) => sum + (a.hate_percentage || 0), 0) / old.length;
    const trend = recentAvg - oldAvg;

    return {
      channel_name: channelAnalyses[0].channel_name,
      analyses: channelAnalyses,
      avg_hate: avgHate,
      trend: Math.round(trend),
    };
  };

  const selectedChannelData = selectedChannel ? getChannelEvolutionData(selectedChannel) : null;

  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="text-zinc-400 hover:text-white"
              data-testid="back-button"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-600" />
              <span className="font-heading text-xl font-black tracking-tight text-white">
                SOCIAL<span className="text-red-600">HATE</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Video className="w-8 h-8 text-red-600" />
              <h1 className="font-heading text-3xl font-black text-white" data-testid="page-title">
                GENERADOR DE VIDEOS
              </h1>
            </div>
            <p className="text-zinc-500 text-lg">
              Crea videos dinámicos con tus análisis. Formato 9:16 para Reels y TikTok.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                100% Gratis
              </Badge>
              <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/30">
                <Smartphone className="w-3 h-3 mr-1" />
                Formato Vertical 9:16
              </Badge>
              <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/30">
                60 segundos
              </Badge>
            </div>
          </div>

          {/* Info Card */}
          <Card className="p-4 mb-8 bg-zinc-900/50 border-zinc-800">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-1">Video Vertical para Redes Sociales</h3>
                <p className="text-zinc-400 text-sm">
                  Genera videos de 1 minuto en formato 9:16 (1080x1920) optimizados para TikTok, Instagram Reels y YouTube Shorts. 
                  Incluye miniatura, estadísticas, gráficos de sentimiento, ranking de palabras, temas trending y más.
                </p>
                <p className="text-zinc-500 text-xs mt-2">
                  Tip: Para descargar el video, usa grabación de pantalla (OBS, QuickTime, etc.)
                </p>
              </div>
            </div>
          </Card>

          {loading ? (
            <div className="grid gap-4">
              <Skeleton className="h-96 bg-zinc-800" />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-zinc-900 border-zinc-800 mb-6">
                <TabsTrigger value="video-stats" className="data-[state=active]:bg-red-600" data-testid="tab-video-stats">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Análisis Individual (9:16)
                </TabsTrigger>
                <TabsTrigger value="devil-presenter" className="data-[state=active]:bg-red-600" data-testid="tab-devil-presenter">
                  <Ghost className="w-4 h-4 mr-2" />
                  Diablito Presentador
                </TabsTrigger>
                <TabsTrigger value="video-presenter" className="data-[state=active]:bg-red-600" data-testid="tab-video-presenter">
                  <VideoIcon className="w-4 h-4 mr-2" />
                  Video Presentador
                </TabsTrigger>
                <TabsTrigger value="ranking" className="data-[state=active]:bg-red-600" data-testid="tab-ranking">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Top 10 Ranking
                </TabsTrigger>
                <TabsTrigger value="channel-evolution" className="data-[state=active]:bg-red-600" data-testid="tab-evolution">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Evolución de Canal
                </TabsTrigger>
              </TabsList>

              {/* Video Stats - Vertical 9:16 */}
              <TabsContent value="video-stats" className="space-y-4">
                <Card className="p-6 bg-zinc-900/50 border-zinc-800">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-red-600" />
                    Video Individual - Formato Vertical
                  </h2>
                  <p className="text-zinc-400 mb-6">
                    Selecciona un video analizado para generar un video de 60 segundos con todas las métricas.
                  </p>

                  {/* Video Selector */}
                  <div className="mb-6">
                    <label className="text-sm text-zinc-400 mb-2 block">Selecciona un video analizado:</label>
                    <select
                      value={selectedVideoId || ""}
                      onChange={(e) => setSelectedVideoId(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      data-testid="video-selector"
                    >
                      <option value="">-- Selecciona un video --</option>
                      {completedAnalyses.map(analysis => (
                        <option key={analysis.id} value={analysis.id}>
                          {analysis.video_title?.substring(0, 60) || 'Sin título'} - {analysis.channel_name} ({Math.round(analysis.hate_percentage || 0)}% hate)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Hook de 3 Segundos del Video Original (Línea de Tiempo interactiva) */}
                  {selectedVideoData && (
                    <VideoHookTimeline
                      videoData={selectedVideoData}
                      hookConfig={hookConfig}
                      onChange={setHookConfig}
                    />
                  )}

                  {loadingVideo ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                    </div>
                  ) : !selectedVideoData ? (
                    <div className="text-center py-12 text-zinc-500">
                      Selecciona un video para generar la visualización.
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      {/* Vertical Video Player - 9:16 */}
                      <div 
                        className="bg-black rounded-2xl overflow-hidden shadow-2xl shadow-red-900/30 border border-zinc-800"
                        style={{ 
                          width: '405px',  // 1080/2.67
                          height: '720px', // 1920/2.67
                        }}
                        data-testid="video-player-vertical"
                      >
                        <Player
                          key={`player-${selectedVideoId}-${hookConfig.enabled}-${hookConfig.startTime}-${hookConfig.presenterVideoEnabled}-${hookConfig.presenterHookId}-${hookConfig.durationMode}-${hookConfig.chromaConfig?.greenTolerance}-${hookConfig.transitionStyle}-${hookConfig.muteCreator}-${voiceAudioUrl}`}
                          component={VideoAnalysisVertical}
                          inputProps={{ 
                            data: {
                              ...selectedVideoData,
                              hookConfig,
                              voiceAudioUrl,
                            }
                          }}
                          durationInFrames={
                            hookConfig.durationMode === '60s'
                              ? (1800 + (hookConfig.enabled ? 90 : 0) + (hookConfig.presenterVideoEnabled !== false ? 165 : 0))
                              : 900 // Exactamente 30.0 segundos (900 frames a 30fps)
                          }
                          fps={30}
                          compositionWidth={1080}
                          compositionHeight={1920}
                          style={{ width: '100%', height: '100%' }}
                          controls
                        />
                      </div>

                      {/* Sincronización de Audio & Hook HUD */}
                      <div className="mt-3 w-full max-w-[405px] flex flex-col gap-2">
                        {/* Audio Status Strip */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {/* Creator Clip Sound Status */}
                          <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${
                            !hookConfig?.muteCreator 
                              ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' 
                              : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'
                          }`}>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold flex items-center gap-1.5 text-[11px]">
                                {!hookConfig?.muteCreator ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-500" />}
                                Clip Creador (0-3s)
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-5 px-1.5 text-[10px] text-zinc-400 hover:text-white"
                                onClick={() => setHookConfig(prev => ({ ...prev, muteCreator: !prev.muteCreator }))}
                              >
                                {hookConfig?.muteCreator ? 'Activar' : 'Mutear'}
                              </Button>
                            </div>
                            <div className="text-[10px] text-zinc-400 mt-1">
                              {!hookConfig?.muteCreator ? '🔊 Sonido activo en reproductor' : '🔇 Silenciado'}
                            </div>
                          </div>

                          {/* Voice Narration Status */}
                          <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${
                            voiceAudioUrl 
                              ? 'bg-red-950/40 border-red-800/60 text-red-300' 
                              : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'
                          }`}>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold flex items-center gap-1.5 text-[11px]">
                                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                                Voz Neuronal (3s➔)
                              </span>
                              <Badge className={`text-[9px] px-1 py-0 h-4 ${voiceAudioUrl ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                                {voiceAudioUrl ? 'LISTA' : 'PENDIENTE'}
                              </Badge>
                            </div>
                            <div className="text-[10px] text-zinc-400 mt-1">
                              {voiceAudioUrl ? '🎙️ Álvaro sincronizado al vídeo' : 'Genera la voz abajo'}
                            </div>
                          </div>
                        </div>

                        {/* Format timeline summary */}
                        <div className="text-[11px] text-zinc-400 flex items-center justify-center gap-1.5 bg-zinc-900/50 border border-zinc-800/80 rounded-lg py-1.5 px-3">
                          <span className="font-semibold text-red-400">
                            {hookConfig.durationMode === '60s' ? '⏱️ 60s' : '🔥 30s Viral'}
                          </span>
                          <span>:</span>
                          <span>
                            {hookConfig.enabled ? "Hook (3s) ➔ " : ""}
                            {hookConfig.presenterVideoEnabled !== false ? "1.mp4 Demonio (5.5s) ➔ " : ""}
                            {hookConfig.durationMode === '60s' ? "Análisis (60s)" : "Censura & Revelación (21.5s)"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Video Info */}
                  {selectedVideoData && (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-500">{Math.round(selectedVideoData.hate_percentage || 0)}%</div>
                        <div className="text-xs text-zinc-500">Hate</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-500">{Math.round(selectedVideoData.positive_percentage || 0)}%</div>
                        <div className="text-xs text-zinc-500">Positivo</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">{(selectedVideoData.total_comments_analyzed || 0).toLocaleString()}</div>
                        <div className="text-xs text-zinc-500">Comentarios</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">{(selectedVideoData.view_count || 0).toLocaleString()}</div>
                        <div className="text-xs text-zinc-500">Vistas</div>
                      </div>
                    </div>
                  )}

                  {/* Voice Generation Section */}
                  {selectedVideoData && (
                    <div className="mt-6">
                      <Card className="p-5 bg-zinc-800/40 border-zinc-700/70">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <Mic className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-bold text-white">Narración con Voz Neuronal</h3>
                            <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs font-semibold">
                              100% GRATIS
                            </Badge>
                            <Badge className="bg-purple-500/15 text-purple-300 border-purple-500/30 text-xs">
                              Microsoft Edge Neural
                            </Badge>
                          </div>
                          
                          {/* Voice Selector */}
                          <div className="flex items-center gap-2 bg-zinc-900/80 p-1 rounded-lg border border-zinc-700/60">
                            <button
                              type="button"
                              onClick={() => setSelectedVoiceId('es-ES-AlvaroNeural')}
                              className={`px-3 py-1 text-xs rounded font-medium transition-all ${
                                selectedVoiceId === 'es-ES-AlvaroNeural'
                                  ? 'bg-purple-600 text-white shadow-sm'
                                  : 'text-zinc-400 hover:text-zinc-200'
                              }`}
                            >
                              Álvaro (Streamer)
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedVoiceId('es-ES-ElviraNeural')}
                              className={`px-3 py-1 text-xs rounded font-medium transition-all ${
                                selectedVoiceId === 'es-ES-ElviraNeural'
                                  ? 'bg-purple-600 text-white shadow-sm'
                                  : 'text-zinc-400 hover:text-zinc-200'
                              }`}
                            >
                              Elvira (Dinámica)
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-zinc-400 text-xs mb-4">
                          Voz neuronal ultra-realista con cadencia de youtuber, entonación natural y pausas dinámicas sin límite de uso.
                        </p>

                        {/* Script Editor & Controls */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                              Guión de locución (Editable)
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const channel = selectedVideoData.channel_name || 'este creador';
                                const hatePct = Math.round(selectedVideoData.hate_percentage || 38);
                                const topComm = (selectedVideoData.top_critics?.[0]?.text || "no se sostiene por ningún lado").substring(0, 60);
                                const sample = `Mira, según los comentarios este tío está canceladísimo... Pero espera un segundo: vamos a meterle el bisturí de SocialHate y contar comentarios de verdad, no sensaciones. El escáner empieza a subir a toda velocidad... ¡pero quieto ahí! La cifra oficial te la tengo censurada hasta el final. Primera sorpresa: la mayoría de críticas no van al vídeo, van directo a su actitud. Y mira lo que le han soltado: "${topComm}". Y aquí viene la hostia de realidad: ¡un ${hatePct}% de hate real! ¿Se han pasado o se lo ha ganado? ¡Dímelo en comentarios!`;
                                setVoiceScript(sample);
                              }}
                              className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
                            >
                              Cargar guión viral del demonio
                            </button>
                          </div>

                          <textarea
                            value={voiceScript || ''}
                            onChange={(e) => setVoiceScript(e.target.value)}
                            placeholder="Escribe aquí el guión o haz clic en 'Generar Guión & Voz' para que la IA lo cree automáticamente según los datos de hate del vídeo..."
                            rows={3}
                            className="w-full text-sm bg-zinc-900/90 border border-zinc-700/80 rounded-lg p-3 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-3">
                          <Button
                            onClick={() => generateVoice()}
                            disabled={generatingVoice}
                            className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/20"
                            data-testid="generate-voice-btn"
                          >
                            {generatingVoice ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Sintetizando voz neuronal...
                              </>
                            ) : (
                              <>
                                <Mic className="w-4 h-4 mr-2" />
                                {voiceAudioUrl ? 'Regenerar Audio' : 'Generar Voz con Álvaro'}
                              </>
                            )}
                          </Button>

                          {voiceAudioUrl && (
                            <>
                              <Button
                                onClick={toggleAudio}
                                variant="outline"
                                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                                data-testid="play-audio-btn"
                              >
                                {isPlayingAudio ? (
                                  <>
                                    <Volume2 className="w-4 h-4 mr-2 text-purple-400" />
                                    Pausar
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 mr-2 text-purple-400" />
                                    Escuchar
                                  </>
                                )}
                              </Button>
                              
                              <a
                                href={voiceAudioUrl}
                                download={`socialhate_voice_${selectedVideoId}.mp3`}
                                className="inline-flex items-center px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md text-sm font-medium transition-colors"
                                data-testid="download-audio-btn"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Descargar MP3
                              </a>
                            </>
                          )}
                        </div>
                        
                        {/* Hidden audio element */}
                        {voiceAudioUrl && (
                          <audio
                            ref={audioRef}
                            src={voiceAudioUrl}
                            onEnded={() => setIsPlayingAudio(false)}
                            onPlay={() => setIsPlayingAudio(true)}
                            onPause={() => setIsPlayingAudio(false)}
                          />
                        )}
                      </Card>
                    </div>
                  )}
                </Card>
              </TabsContent>

              {/* Devil Presenter Video */}
              <TabsContent value="devil-presenter" className="space-y-4">
                <Card className="p-6 bg-zinc-900/50 border-zinc-800">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Ghost className="w-5 h-5 text-red-600" />
                    Diablito Presentador - Video Animado
                  </h2>
                  <p className="text-zinc-400 mb-6">
                    ¡Deja que nuestro diablito presente los datos de tu análisis de forma divertida! 
                    Video de 45 segundos en formato vertical para Reels y TikTok.
                  </p>

                  {/* Video Selector */}
                  <div className="mb-6">
                    <label className="text-sm text-zinc-400 mb-2 block">Selecciona un video analizado:</label>
                    <select
                      value={selectedDevilVideoId || ""}
                      onChange={(e) => setSelectedDevilVideoId(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      data-testid="devil-video-selector"
                    >
                      <option value="">-- Selecciona un video --</option>
                      {completedAnalyses.map(analysis => (
                        <option key={analysis.id} value={analysis.id}>
                          {analysis.video_title?.substring(0, 60) || 'Sin título'} - {analysis.channel_name} ({Math.round(analysis.hate_percentage || 0)}% hate)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Features Preview */}
                  <div className="mb-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">👋</div>
                      <div className="text-xs text-zinc-400">Intro animada</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🎬</div>
                      <div className="text-xs text-zinc-400">Info del video</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🔥</div>
                      <div className="text-xs text-zinc-400">Reveal de hate</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">📊</div>
                      <div className="text-xs text-zinc-400">Estadísticas</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🗣️</div>
                      <div className="text-xs text-zinc-400">Top palabras</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">✌️</div>
                      <div className="text-xs text-zinc-400">Outro</div>
                    </div>
                  </div>

                  {loadingDevilVideo ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                    </div>
                  ) : !selectedDevilVideoData ? (
                    <div className="text-center py-12 text-zinc-500">
                      Selecciona un video para generar la animación con el diablito.
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      {/* Vertical Video Player - 9:16 */}
                      <div 
                        className="bg-black rounded-2xl overflow-hidden shadow-2xl shadow-red-900/20"
                        style={{ 
                          width: '405px',
                          height: '720px',
                        }}
                        data-testid="devil-video-player"
                      >
                        <Player
                          component={DevilPresenterVideo}
                          inputProps={{ data: selectedDevilVideoData }}
                          durationInFrames={1350}
                          fps={30}
                          compositionWidth={1080}
                          compositionHeight={1920}
                          style={{ width: '100%', height: '100%' }}
                          controls
                        />
                      </div>
                    </div>
                  )}

                  {/* Video Info */}
                  {selectedDevilVideoData && (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-500">{Math.round(selectedDevilVideoData.hate_percentage || 0)}%</div>
                        <div className="text-xs text-zinc-500">Hate</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-500">{Math.round(selectedDevilVideoData.positive_percentage || 0)}%</div>
                        <div className="text-xs text-zinc-500">Positivo</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">{(selectedDevilVideoData.total_comments_analyzed || 0).toLocaleString()}</div>
                        <div className="text-xs text-zinc-500">Comentarios</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">{(selectedDevilVideoData.view_count || 0).toLocaleString()}</div>
                        <div className="text-xs text-zinc-500">Vistas</div>
                      </div>
                    </div>
                  )}
                </Card>
              </TabsContent>

              {/* Video Presenter */}
              <TabsContent value="video-presenter" className="space-y-4">
                <Card className="p-6 bg-zinc-900/50 border-zinc-800">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <VideoIcon className="w-5 h-5 text-red-600" />
                    Video Presentador - Con Personaje Animado
                  </h2>
                  <p className="text-zinc-400 mb-6">
                    Un presentador animado con video real presenta los datos de tu análisis. 
                    El personaje aparece y desaparece entre escenas para hacer el video más dinámico.
                  </p>

                  {/* Video Selector */}
                  <div className="mb-6">
                    <label className="text-sm text-zinc-400 mb-2 block">Selecciona un video analizado:</label>
                    <select
                      value={selectedPresenterVideoId || ""}
                      onChange={(e) => setSelectedPresenterVideoId(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      data-testid="presenter-video-selector"
                    >
                      <option value="">-- Selecciona un video --</option>
                      {completedAnalyses.map(analysis => (
                        <option key={analysis.id} value={analysis.id}>
                          {analysis.video_title?.substring(0, 60) || 'Sin título'} - {analysis.channel_name} ({Math.round(analysis.hate_percentage || 0)}% hate)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Features Preview */}
                  <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🎬</div>
                      <div className="text-xs text-zinc-400">Video real</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">💬</div>
                      <div className="text-xs text-zinc-400">Burbujas de texto</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🔥</div>
                      <div className="text-xs text-zinc-400">Efectos de fuego</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">📊</div>
                      <div className="text-xs text-zinc-400">Stats animados</div>
                    </div>
                  </div>

                  {loadingPresenterVideo ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                    </div>
                  ) : !selectedPresenterVideoData ? (
                    <div className="text-center py-12 text-zinc-500">
                      Selecciona un video para generar la animación con el presentador.
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      {/* Vertical Video Player - 9:16 */}
                      <div 
                        className="bg-black rounded-2xl overflow-hidden shadow-2xl shadow-red-900/20"
                        style={{ 
                          width: '405px',
                          height: '720px',
                        }}
                        data-testid="presenter-video-player"
                      >
                        <Player
                          component={VideoPresenterVideo}
                          inputProps={{ data: selectedPresenterVideoData }}
                          durationInFrames={1350}
                          fps={30}
                          compositionWidth={1080}
                          compositionHeight={1920}
                          style={{ width: '100%', height: '100%' }}
                          controls
                        />
                      </div>
                    </div>
                  )}

                  {/* Video Info */}
                  {selectedPresenterVideoData && (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-500">{Math.round(selectedPresenterVideoData.hate_percentage || 0)}%</div>
                        <div className="text-xs text-zinc-500">Hate</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-500">{Math.round(selectedPresenterVideoData.positive_percentage || 0)}%</div>
                        <div className="text-xs text-zinc-500">Positivo</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">{(selectedPresenterVideoData.total_comments_analyzed || 0).toLocaleString()}</div>
                        <div className="text-xs text-zinc-500">Comentarios</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">{(selectedPresenterVideoData.view_count || 0).toLocaleString()}</div>
                        <div className="text-xs text-zinc-500">Vistas</div>
                      </div>
                    </div>
                  )}
                </Card>
              </TabsContent>

              {/* Top 10 Ranking */}
              <TabsContent value="ranking" className="space-y-4">
                <Card className="p-6 bg-zinc-900/50 border-zinc-800">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-red-600" />
                    Top 10 Videos con Mayor Hate (9:16)
                  </h2>
                  <p className="text-zinc-400 mb-4">
                    Ranking de los 10 videos con mayor porcentaje de comentarios de odio. Formato vertical para Reels/TikTok.
                  </p>

                  {/* Style Selector */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-bold text-zinc-300 block">Selecciona el estilo del video:</label>
                      
                      {/* Example videos vs real data toggle */}
                      <div className="flex items-center gap-2 bg-zinc-800/80 p-1 rounded-lg border border-zinc-700 text-xs">
                        <button
                          type="button"
                          onClick={() => setUseExampleVideos(true)}
                          className={`px-3 py-1 rounded-md font-semibold transition-all ${
                            useExampleVideos 
                              ? 'bg-red-600 text-white shadow-sm' 
                              : 'text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          🔥 100 Vídeos Stargazer
                        </button>
                        <button
                          type="button"
                          onClick={() => setUseExampleVideos(false)}
                          disabled={top10Data.length === 0}
                          className={`px-3 py-1 rounded-md font-semibold transition-all ${
                            !useExampleVideos && top10Data.length > 0
                              ? 'bg-red-600 text-white shadow-sm' 
                              : 'text-zinc-500 hover:text-zinc-300 disabled:opacity-50'
                          }`}
                        >
                          Mis Análisis ({top10Data.length})
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {Object.entries(RANKING_STYLES).map(([key, style]) => {
                        const Icon = style.icon;
                        const isSelected = rankingStyle === key;
                        return (
                          <button
                            key={key}
                            onClick={() => setRankingStyle(key)}
                            className={`p-4 rounded-xl border-2 transition-all relative text-left ${
                              isSelected 
                                ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-950/40' 
                                : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                            }`}
                            data-testid={`ranking-style-${key}`}
                          >
                            {style.badge && (
                              <span className="absolute top-2 right-2 text-[10px] font-black bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                                {style.badge}
                              </span>
                            )}
                            <div className="flex flex-col gap-2">
                              <Icon className={`w-7 h-7 ${isSelected ? 'text-red-500' : 'text-zinc-400'}`} />
                              <span className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                                {style.name}
                              </span>
                              <span className="text-xs text-zinc-500 line-clamp-2">
                                {style.description}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {(!useExampleVideos && top10Data.length === 0) ? (
                    <div className="text-center py-12 text-zinc-500">
                      No hay suficientes análisis completados para generar el ranking con datos reales.
                      <div className="mt-3">
                        <button 
                          onClick={() => setUseExampleVideos(true)}
                          className="text-red-500 hover:text-red-400 underline font-semibold text-sm"
                        >
                          Activar los 100 vídeos de ejemplo para probar el estilo Stargazer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      {/* Vertical Video Player - 9:16 */}
                      <div 
                        className="bg-black rounded-2xl overflow-hidden shadow-2xl shadow-red-900/20 border border-zinc-800"
                        style={{ 
                          width: '405px',
                          height: '720px',
                        }}
                        data-testid="ranking-player"
                      >
                        <Player
                          key={`player-${rankingStyle}-${useExampleVideos ? 'example' : 'real'}`}
                          component={RANKING_STYLES[rankingStyle].component}
                          inputProps={{ 
                            data: useExampleVideos 
                              ? DEFAULT_STARGAZER_HATE_VIDEOS 
                              : (top10Data.length > 0 ? top10Data : DEFAULT_STARGAZER_HATE_VIDEOS)
                          }}
                          durationInFrames={900}
                          fps={30}
                          compositionWidth={1080}
                          compositionHeight={1920}
                          style={{ width: '100%', height: '100%' }}
                          controls
                        />
                      </div>

                      {rankingStyle === 'stargazer' && (
                        <div className="mt-4 max-w-md text-center text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                          <span className="font-bold text-red-500">Efecto Stargazer (100 vídeos):</span> Inicia a toda velocidad desde el puesto #100 con filas compactas (avatar, canal, título, hate y puesto). Al llegar arriba se proyecta la miniatura en 16:9 de YouTube y la velocidad se ralentiza gradualmente hasta coronar al #1.
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </TabsContent>

              {/* Channel Evolution */}
              <TabsContent value="channel-evolution" className="space-y-4">
                <Card className="p-6 bg-zinc-900/50 border-zinc-800">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                    Evolución de Canal (16:9)
                  </h2>
                  <p className="text-zinc-400 mb-4">
                    Gráfica de evolución del hate en los videos de un canal a lo largo del tiempo.
                  </p>

                  {/* Channel Selector */}
                  <div className="mb-6">
                    <label className="text-sm text-zinc-400 mb-2 block">Selecciona un canal:</label>
                    <select
                      value={selectedChannel || ""}
                      onChange={(e) => setSelectedChannel(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      data-testid="channel-selector"
                    >
                      <option value="">-- Selecciona un canal --</option>
                      {channels.map(channel => (
                        <option key={channel.id} value={channel.id}>
                          {channel.name} ({channel.total_videos_analyzed} videos)
                        </option>
                      ))}
                    </select>
                  </div>

                  {!selectedChannelData ? (
                    <div className="text-center py-12 text-zinc-500">
                      {selectedChannel 
                        ? "Este canal no tiene suficientes análisis." 
                        : "Selecciona un canal para ver su evolución."}
                    </div>
                  ) : (
                    <div className="aspect-video bg-black rounded-lg overflow-hidden" data-testid="evolution-player">
                      <Player
                        component={ChannelEvolutionVideo}
                        inputProps={{ data: selectedChannelData }}
                        durationInFrames={300}
                        fps={30}
                        compositionWidth={1920}
                        compositionHeight={1080}
                        style={{ width: '100%', height: '100%' }}
                        controls
                      />
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {/* Scenes Info */}
          <Card className="mt-8 p-6 bg-zinc-900/50 border-zinc-800">
            <h3 className="text-lg font-bold text-white mb-4">Escenas del Video Individual (60s)</h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="text-red-500 font-bold mb-1">0-6s</div>
                <div className="text-white font-semibold">Intro</div>
                <div className="text-zinc-500 text-xs">Miniatura, título, stats básicos</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="text-red-500 font-bold mb-1">6-12s</div>
                <div className="text-white font-semibold">Estadísticas</div>
                <div className="text-zinc-500 text-xs">% Hate, positivo, negativo, toxicidad</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="text-red-500 font-bold mb-1">12-18s</div>
                <div className="text-white font-semibold">Gráfico Circular</div>
                <div className="text-zinc-500 text-xs">Desglose de sentimientos</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="text-red-500 font-bold mb-1">18-24s</div>
                <div className="text-white font-semibold">Emociones</div>
                <div className="text-zinc-500 text-xs">Ira, alegría, asco, tristeza...</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="text-red-500 font-bold mb-1">24-31s</div>
                <div className="text-white font-semibold">Ranking Palabras</div>
                <div className="text-zinc-500 text-xs">Palabras más mencionadas</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="text-red-500 font-bold mb-1">31-38s</div>
                <div className="text-white font-semibold">Temas Trending</div>
                <div className="text-zinc-500 text-xs">Tópicos más discutidos</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="text-red-500 font-bold mb-1">38-48s</div>
                <div className="text-white font-semibold">¿Qué falla?</div>
                <div className="text-zinc-500 text-xs">Insights y resumen de críticas</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="text-red-500 font-bold mb-1">48-60s</div>
                <div className="text-white font-semibold">Outro</div>
                <div className="text-zinc-500 text-xs">Resumen final y CTA</div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VideoGeneratorPage;
