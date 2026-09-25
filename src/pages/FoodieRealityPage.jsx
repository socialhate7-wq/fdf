import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  Youtube, 
  Utensils,
  ArrowRight,
  Loader2,
  X,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  MapPin,
  Star,
  Users,
  XCircle,
  Video,
  Building2,
  Sparkles,
  Award
} from "lucide-react";

const API = `${""}/api`;

const FoodieRealityPage = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisId, setAnalysisId] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  // Progress popup state
  const [showProgressPopup, setShowProgressPopup] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState("");
  const pollingRef = useRef(null);

  // Recent analyses
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    fetchRecentAnalyses();
  }, []);

  // Poll for results
  useEffect(() => {
    if (!analysisId || result?.status === 'completed' || result?.status === 'failed') return;

    pollingRef.current = setInterval(async () => {
      try {
        const response = await fetch(`${API}/reality-check/${analysisId}`);
        const data = await response.json();
        
        // Update progress based on status
        if (data.status === 'processing') {
          setAnalysisProgress(prev => Math.min(prev + 15, 90));
        }

        if (data.status === 'completed' || data.status === 'failed') {
          setResult(data);
          setIsAnalyzing(false);
          setShowProgressPopup(false);
          setAnalysisProgress(100);
          clearInterval(pollingRef.current);
          fetchRecentAnalyses(); // Refresh recent list
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 2000);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [analysisId, result?.status]);

  const fetchRecentAnalyses = async () => {
    try {
      const response = await fetch(`${API}/reality-checks?limit=5`);
      const data = await response.json();
      setRecentAnalyses(data.filter(a => a.status === 'completed'));
    } catch (err) {
      console.error('Failed to fetch recent:', err);
    } finally {
      setLoadingRecent(false);
    }
  };

  const handleAnalyze = async () => {
    if (!videoUrl.trim() || !restaurantName.trim()) {
      toast.error("Introduce la URL del video y el nombre del restaurante");
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setResult(null);
    setAnalysisProgress(10);
    setAnalysisStatus("Iniciando análisis...");
    setShowProgressPopup(true);

    try {
      const response = await fetch(`${API}/reality-check/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          video_url: videoUrl,
          restaurant_name: restaurantName,
          restaurant_location: restaurantLocation
        })
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Error de servidor. Inténtalo de nuevo.');
      }
      
      if (!response.ok) {
        throw new Error(data.detail || 'Error al iniciar el análisis');
      }

      setAnalysisId(data.id);
      setAnalysisStatus("Descargando audio del video...");
      setAnalysisProgress(25);
      
      // Update status messages over time
      setTimeout(() => setAnalysisStatus("Transcribiendo con IA..."), 5000);
      setTimeout(() => { setAnalysisStatus("Buscando reseñas reales..."); setAnalysisProgress(50); }, 15000);
      setTimeout(() => { setAnalysisStatus("Comparando percepciones..."); setAnalysisProgress(75); }, 25000);

    } catch (err) {
      setError(err.message || 'Error desconocido');
      setIsAnalyzing(false);
      setShowProgressPopup(false);
      toast.error(err.message);
    }
  };

  const cancelAnalysis = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    setShowProgressPopup(false);
    setIsAnalyzing(false);
    setAnalysisId(null);
    toast.info("Análisis cancelado");
  };

  const getCoherenceColor = (index) => {
    if (index >= 70) return 'text-emerald-400';
    if (index >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getCoherenceLabel = (index) => {
    if (index >= 70) return { text: 'Alta coherencia', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
    if (index >= 40) return { text: 'Coherencia media', icon: Minus, color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    return { text: 'Baja coherencia', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  const loadAnalysis = async (id) => {
    try {
      const response = await fetch(`${API}/reality-check/${id}`);
      const data = await response.json();
      setResult(data);
      setVideoUrl(data.video_url || '');
      setRestaurantName(data.restaurant_name || '');
      setRestaurantLocation(data.restaurant_location || '');
    } catch (err) {
      toast.error("Error al cargar el análisis");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] relative overflow-hidden">
      {/* Progress Popup */}
      {showProgressPopup && (
        <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-zinc-900/95 backdrop-blur-md border-b border-zinc-700 shadow-2xl">
            <div className="max-w-3xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                    <div className="absolute inset-0 w-6 h-6 bg-emerald-500/20 rounded-full animate-ping" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Analizando video</h3>
                    <p className="text-sm text-zinc-400">{analysisStatus}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelAnalysis}
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="relative">
                <Progress value={analysisProgress} className="h-2 bg-zinc-800" />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-zinc-500">Whisper + Reseñas + IA</span>
                  <span className="text-xs text-emerald-500 font-mono font-bold">{analysisProgress}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/80 via-[#09090B]/90 to-[#09090B]" />

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto border-b border-zinc-800/60 pb-4">
          <div className="flex items-center gap-3">
            {/* Fork and Knife Logo - exact match */}
            <div className="flex items-center gap-1 text-emerald-500">
              {/* Fork - 3 prongs up */}
              <svg className="w-6 h-8" viewBox="0 0 24 32" fill="currentColor">
                <path d="M4 1v10c0 2 2 3 4 3v17h4V14c2 0 4-1 4-3V1h-3v9h-2V1h-2v9H7V1H4z"/>
              </svg>
              {/* Knife - blade up */}
              <svg className="w-5 h-8" viewBox="0 0 20 32" fill="currentColor">
                <path d="M8 1c-4 4-6 8-6 14v2h6v14h4V17h6v-2c0-6-2-10-6-14h-4z"/>
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight">
              <span className="text-white">FOODIE </span><span className="text-emerald-500">FAKE</span>
            </span>
            <span className="text-xs text-zinc-500 hidden sm:inline ml-1">Reality Checker</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button 
              onClick={() => navigate("/foodie-pro")}
              className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 font-bold text-xs"
            >
              <Building2 className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              <span>FoodieFake PRO (Restaurantes)</span>
            </Button>

            <Button 
              onClick={() => navigate("/foodie-creator")}
              className="bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 font-bold text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              <span>FoodieFake Creator</span>
            </Button>

            <Button 
              onClick={() => navigate("/foodie-videos")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
            >
              <Video className="w-4 h-4 mr-1.5" />
              <span>Vídeos 9:16</span>
            </Button>

            <Button 
              variant="outline"
              onClick={() => navigate("/")}
              className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700 text-white text-xs"
            >
              <span className="hidden sm:inline">SocialHate</span>
              <ArrowRight className="w-4 h-4 sm:ml-1" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Portales Destacados: FoodieFake PRO y FoodieFake Creator */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Card B2B Restaurantes */}
              <div 
                onClick={() => navigate("/foodie-pro")}
                className="group p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900/80 to-zinc-900 border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer shadow-lg hover:shadow-amber-500/5 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <Building2 className="w-4 h-4" />
                    <span>SaaS B2B Para Restaurantes</span>
                  </div>
                  <span className="text-[10px] font-black bg-amber-500 text-zinc-950 px-2 py-0.5 rounded-full uppercase">
                    NUEVO PRO
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    FoodieFake PRO: Auditoría y Escudo contra Hate en Google Maps
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Audita qué departamento falla (Cocina, Sala, Ticket), detecta reseñas falsas/impugnables y neutraliza las críticas tóxicas con respuestas diplomáticas IA.
                  </p>
                </div>
                <div className="flex items-center text-xs font-bold text-amber-400 pt-1">
                  <span>Acceder al Portal para Restaurantes</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card Creadores */}
              <div 
                onClick={() => navigate("/foodie-creator")}
                className="group p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-zinc-900/80 to-zinc-900 border border-cyan-500/30 hover:border-cyan-500/60 transition-all cursor-pointer shadow-lg hover:shadow-cyan-500/5 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Para Creadores e Influencers</span>
                  </div>
                  <span className="text-[10px] font-black bg-cyan-400 text-zinc-950 px-2 py-0.5 rounded-full uppercase">
                    CREATOR SUITE
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                    FoodieFake Creator: Sello de Credibilidad Anti-Vendido
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Blinda tu reputación con comensales reales, haz fact-checking preventivo de platos antes de grabar y genera réplicas virales de tus visitas.
                  </p>
                </div>
                <div className="flex items-center text-xs font-bold text-cyan-400 pt-1">
                  <span>Acceder a la Suite de Creadores</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 mb-12">
              {/* Left - Hero */}
              <div className="lg:col-span-5 space-y-6">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  ¿Coincide el{" "}
                  <span className="text-emerald-500">influencer</span>
                  <br />
                  con la <span className="text-emerald-500">realidad</span>?
                </h1>
                <p className="text-zinc-400 text-lg">
                  Comparamos lo que dicen los foodies con las opiniones reales de clientes. Tú decides.
                </p>

                {/* Analysis Form */}
                <Card className="p-6 bg-zinc-900/50 border-zinc-800 space-y-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Youtube className="w-5 h-5 text-red-500" />
                    Analizar video de foodie
                  </h3>
                  <div className="space-y-3">
                    <Input
                      data-testid="video-url-input"
                      placeholder="https://youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                      disabled={isAnalyzing}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          data-testid="restaurant-name-input"
                          placeholder="Restaurante *"
                          value={restaurantName}
                          onChange={(e) => setRestaurantName(e.target.value)}
                          className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                          disabled={isAnalyzing}
                        />
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          data-testid="location-input"
                          placeholder="Ciudad"
                          value={restaurantLocation}
                          onChange={(e) => setRestaurantLocation(e.target.value)}
                          className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                          disabled={isAnalyzing}
                        />
                      </div>
                    </div>
                    <Button 
                      data-testid="analyze-btn"
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-6"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !videoUrl || !restaurantName}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Analizando...
                        </>
                      ) : (
                        <>
                          Verificar coherencia
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2 text-red-400">
                      <XCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}
                </Card>

                {/* How it works */}
                <Card className="p-6 bg-zinc-900/50 border-zinc-800 space-y-6">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Info className="w-5 h-5 text-emerald-500" />
                    ¿Cómo funciona?
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                        <span className="text-emerald-400 font-bold text-lg">1</span>
                      </div>
                      <h4 className="font-semibold text-white text-sm mb-2">Analizamos el video</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">Extraemos el contenido y el tono del influencer sobre el restaurante.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                        <span className="text-emerald-400 font-bold text-lg">2</span>
                      </div>
                      <h4 className="font-semibold text-white text-sm mb-2">Comparamos con la realidad</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">Contrastamos con opiniones y experiencias típicas de clientes reales.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                        <span className="text-emerald-400 font-bold text-lg">3</span>
                      </div>
                      <h4 className="font-semibold text-white text-sm mb-2">Índice de coherencia</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">Te mostramos cuánto coincide la opinión del influencer con la realidad.</p>
                    </div>
                  </div>
                  
                  {/* Disclaimer */}
                  <div className="pt-4 border-t border-zinc-800">
                    <p className="text-xs text-zinc-500 text-center flex items-center justify-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      Este análisis es orientativo. No afirmamos si alguien miente o dice la verdad. Mostramos datos para que tú decidas.
                    </p>
                  </div>
                </Card>
              </div>

              {/* Right - Results or Recent */}
              <div className="lg:col-span-7">
                {result?.status === 'completed' ? (
                  <div className="space-y-4">
                    {/* Result Header */}
                    <Card className="p-4 bg-zinc-900/50 border-zinc-800">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {result.thumbnail_url && (
                          <img
                            src={result.thumbnail_url}
                            alt={result.video_title}
                            className="w-full sm:w-40 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white line-clamp-2">{result.video_title}</h3>
                          <p className="text-sm text-zinc-400">{result.channel_name}</p>
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <Utensils className="w-4 h-4 text-emerald-400" />
                            <span className="text-zinc-300">{result.restaurant_name}</span>
                            {result.restaurant_location && (
                              <span className="text-zinc-500">• {result.restaurant_location}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Coherence Index */}
                    <Card className="p-6 bg-zinc-900/50 border-zinc-800 overflow-hidden">
                      <div className={`absolute top-0 left-0 right-0 h-1 ${result.coherence_index >= 70 ? 'bg-emerald-500' : result.coherence_index >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <div className="text-center">
                        <p className="text-zinc-400 text-sm uppercase tracking-wider mb-2">Índice de Coherencia</p>
                        <div className={`text-6xl font-black mb-4 ${getCoherenceColor(result.coherence_index)}`}>
                          {result.coherence_index}%
                        </div>
                        {(() => {
                          const label = getCoherenceLabel(result.coherence_index);
                          const Icon = label.icon;
                          return (
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${label.bg}`}>
                              <Icon className={`w-5 h-5 ${label.color}`} />
                              <span className={label.color}>{label.text}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </Card>

                    {/* Comparison Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Influencer */}
                      <Card className="p-4 bg-zinc-900/50 border-zinc-800">
                        <h4 className="font-bold text-white flex items-center gap-2 mb-3">
                          <Youtube className="w-4 h-4 text-red-500" />
                          Dice el influencer
                        </h4>
                        {result.influencer_sentiment && (
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Tono:</span>
                              <span className="text-white capitalize">{result.influencer_sentiment.overall_tone || 'N/A'}</span>
                            </div>
                            {result.influencer_sentiment.key_claims?.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {result.influencer_sentiment.key_claims.slice(0, 3).map((claim, i) => (
                                  <span key={i} className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300">
                                    {claim}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </Card>

                      {/* Community */}
                      <Card className="p-4 bg-zinc-900/50 border-zinc-800">
                        <h4 className="font-bold text-white flex items-center gap-2 mb-3">
                          <Users className="w-4 h-4 text-emerald-500" />
                          Dicen los clientes
                        </h4>
                        {result.community_sentiment && (
                          <div className="space-y-3 text-sm">
                            {result.community_sentiment.estimated_rating > 0 && (
                              <div className="flex justify-between">
                                <span className="text-zinc-500">Rating:</span>
                                <span className="text-white flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  {result.community_sentiment.estimated_rating}/5
                                </span>
                              </div>
                            )}
                            {result.community_sentiment.common_complaints?.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {result.community_sentiment.common_complaints.slice(0, 3).map((item, i) => (
                                  <span key={i} className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </Card>
                    </div>

                    {/* Gap Analysis (Discrepancias vs Coincidencias) */}
                    {result.gap_analysis && (
                      <Card className="p-4 bg-zinc-900/50 border-zinc-800">
                        <h4 className="font-bold text-white flex items-center gap-2 mb-3">
                          {result.gap_analysis.perception_gap === 'high' ? (
                            <TrendingDown className="w-4 h-4 text-red-400" />
                          ) : result.gap_analysis.perception_gap === 'medium' ? (
                            <Minus className="w-4 h-4 text-yellow-400" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                          )}
                          Análisis de discrepancias
                        </h4>
                        <div className="space-y-4 text-sm">
                          {result.gap_analysis.main_discrepancies?.length > 0 && (
                            <div>
                              <span className="text-zinc-400 text-xs uppercase tracking-wider block mb-2 font-semibold">
                                Diferencias encontradas con Google Maps:
                              </span>
                              <ul className="space-y-2">
                                {result.gap_analysis.main_discrepancies.map((disc, i) => (
                                  <li key={i} className="flex items-start gap-2 text-zinc-300">
                                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span>{disc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {result.gap_analysis.aligned_points?.length > 0 && (
                            <div className="pt-3 border-t border-zinc-800/80">
                              <span className="text-zinc-400 text-xs uppercase tracking-wider block mb-2 font-semibold">
                                Puntos que coinciden:
                              </span>
                              <ul className="space-y-2">
                                {result.gap_analysis.aligned_points.map((point, i) => (
                                  <li key={i} className="flex items-start gap-2 text-zinc-300">
                                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </Card>
                    )}

                    {/* Summary */}
                    {result.analysis_summary && (
                      <Card className="p-4 bg-zinc-900/50 border-zinc-800">
                        <h4 className="font-bold text-white flex items-center gap-2 mb-2">
                          <Info className="w-4 h-4 text-blue-400" />
                          Resumen
                        </h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">{result.analysis_summary}</p>
                        
                        {/* Data sources */}
                        <div className="mt-4 pt-3 border-t border-zinc-800 flex flex-wrap gap-4 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className={result.transcription_source === 'whisper' ? 'text-emerald-400' : 'text-yellow-400'}>
                              {result.transcription_source === 'whisper' ? '✓' : '⚠'}
                            </span>
                            <span className="text-zinc-500">
                              {result.transcription_source === 'whisper' ? 'Audio transcrito' : 'Solo descripción'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={result.reviews_count > 0 ? 'text-emerald-400' : 'text-yellow-400'}>
                              {result.reviews_count > 0 ? '✓' : '⚠'}
                            </span>
                            <span className="text-zinc-500">
                              {result.reviews_count > 0 ? `${result.reviews_count} reseñas Google Places` : 'Estimación IA'}
                            </span>
                          </div>
                        </div>
                      </Card>
                    )}

                    {/* Actions: Generate Video & New Analysis */}
                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      <Button
                        onClick={() => navigate("/foodie-videos")}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Generar Video TikTok
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setResult(null);
                          setAnalysisId(null);
                          setVideoUrl('');
                          setRestaurantName('');
                          setRestaurantLocation('');
                        }}
                        className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                      >
                        Analizar otro video
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Recent Analyses */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        Análisis recientes
                      </h2>
                    </div>
                    
                    {loadingRecent ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                      </div>
                    ) : recentAnalyses.length === 0 ? (
                      <Card className="p-8 bg-zinc-900/50 border-zinc-800 text-center">
                        <Utensils className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                        <p className="text-zinc-500">Aún no hay análisis. ¡Sé el primero!</p>
                      </Card>
                    ) : (
                      <div className="space-y-3">
                        {recentAnalyses.map((analysis) => (
                          <Card 
                            key={analysis.id}
                            className="p-4 bg-zinc-900/50 border-zinc-800 hover:border-emerald-500/50 transition-colors cursor-pointer"
                            onClick={() => loadAnalysis(analysis.id)}
                          >
                            <div className="flex items-center gap-4">
                              {analysis.thumbnail_url && (
                                <img
                                  src={analysis.thumbnail_url}
                                  alt=""
                                  className="w-20 h-12 object-cover rounded"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-white text-sm line-clamp-1">
                                  {analysis.video_title || 'Sin título'}
                                </h3>
                                <p className="text-xs text-zinc-500 flex items-center gap-1">
                                  <Utensils className="w-3 h-3" />
                                  {analysis.restaurant_name}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className={`text-2xl font-bold ${getCoherenceColor(analysis.coherence_index)}`}>
                                  {analysis.coherence_index}%
                                </div>
                                <p className="text-xs text-zinc-500">coherencia</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FoodieRealityPage;
