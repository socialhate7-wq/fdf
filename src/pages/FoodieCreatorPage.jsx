import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Sparkles,
  ShieldCheck,
  Video,
  Award,
  Search,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Youtube,
  Instagram,
  Utensils,
  TrendingUp,
  MessageSquare,
  FileText,
  Star,
  Zap,
  BarChart2,
  Flame,
  Building2
} from "lucide-react";

// Mock Creator Profiles
const DEMO_CREATORS = {
  "pablo": {
    name: "Cenando con Pablo",
    handle: "@cenandoconpablo",
    avatar: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    coherenceScore: 88,
    badgeLevel: "Platino • Máxima Honestidad",
    verifiedVideos: 42,
    avgGoogleAgreement: "8.8 / 10",
    hypeRatio: "Bajo (Crítica técnica y equilibrada)",
    topStrengths: [
      "Menciona siempre los precios exactos del ticket en pantalla",
      "Expresa dudas honestas sobre platos que no le convencen",
      "Alta correlación con comensales reales en Google Places"
    ],
    speechAnalysis: {
      technicalTermsRate: "68% (corte, maduración, fermentación, punto)",
      hyperboleRate: "12% (brutal, locura, de otro planeta)",
      objectivityIndex: "91 / 100"
    }
  },
  "foodievip": {
    name: "FoodieVip Spain",
    handle: "@foodievip_es",
    avatar: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80",
    coherenceScore: 28,
    badgeLevel: "Alerta Hype Publicitario",
    verifiedVideos: 19,
    avgGoogleAgreement: "3.2 / 10",
    hypeRatio: "Extremo (Alabanza incondicional sin crítica)",
    topStrengths: [
      "Excelente calidad de edición visual y dinamismo",
      "Cobertura de novedades y aperturas virales"
    ],
    speechAnalysis: {
      technicalTermsRate: "14%",
      hyperboleRate: "78% (superlativos en cada plato)",
      objectivityIndex: "32 / 100"
    }
  }
};

// Mock Pre-Check Restaurant Database
const PRE_CHECK_DATABASE = {
  "smash-king": {
    name: "Smash King Burgers",
    city: "Madrid",
    googleRating: 3.5,
    riskLevel: "Alto",
    safeDishes: ["Bacon Cheeseburger Clásica (4.6★ en Google)"],
    trapDishes: ["Batido Lotus XXL (Quejas recurrentes por empalagoso y 7,50€)", "Patatas Trufadas (congeladas según 28 clientes)"],
    adviceForCreator: "Si vas, pide la burger clásica. Advierte a tus seguidores que el local es muy ruidoso y hay colas de 40 min para no perder credibilidad."
  },
  "casa-carmen": {
    name: "Casa Carmen Tradición",
    city: "Sevilla",
    googleRating: 4.7,
    riskLevel: "Bajo (Sitio Seguro)",
    safeDishes: ["Cola de Toro (4.9★)", "Espinacas con garbanzos (4.8★)"],
    trapDishes: ["Ninguno relevante"],
    adviceForCreator: "Restaurante con altísima consistencia entre cocina y sala. Sitio perfecto para blindar tu reputación como recomendador fiable."
  }
};

export default function FoodieCreatorPage() {
  const navigate = useNavigate();
  const [selectedCreatorId, setSelectedCreatorId] = useState("pablo");
  const [activeTab, setActiveTab] = useState("badge");
  const [searchQuery, setSearchQuery] = useState("Smash King Burgers");
  const [preCheckResult, setPreCheckResult] = useState(PRE_CHECK_DATABASE["smash-king"]);
  const [searching, setSearching] = useState(false);

  const creator = DEMO_CREATORS[selectedCreatorId];

  const handleSearchPreCheck = (e) => {
    e.preventDefault();
    setSearching(true);
    setTimeout(() => {
      if (searchQuery.toLowerCase().includes("carmen") || searchQuery.toLowerCase().includes("sevilla")) {
        setPreCheckResult(PRE_CHECK_DATABASE["casa-carmen"]);
      } else {
        setPreCheckResult(PRE_CHECK_DATABASE["smash-king"]);
      }
      setSearching(false);
      toast.success("Fact-check completado con Google Places");
    }, 600);
  };

  const handleCopy = (text, message) => {
    navigator.clipboard.writeText(text);
    toast.success(message || "Copiado al portapapeles");
  };

  const getBadgeSnippet = () => {
    return `🛡️ Canal Auditado por FoodieFake: ${creator.coherenceScore}% de Coherencia con comensales reales de Google Places.\nVer informe independiente de credibilidad: https://foodiefake.app/creator/${creator.handle.replace('@', '')}`;
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/foodie-reality")}>
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-zinc-950 font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-heading text-xl font-black tracking-tight text-white">
                FOODIE<span className="text-emerald-500">FAKE</span>
              </span>
            </div>
            <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/40 text-xs font-black tracking-wider uppercase px-2.5 py-0.5">
              CREATOR SUITE
            </Badge>
          </div>

          {/* Unified Header Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/foodie-pro")}
              className="text-xs text-zinc-300 hover:text-amber-400"
            >
              <Building2 className="w-3.5 h-3.5 mr-1 text-amber-400" />
              FoodieFake PRO (Restaurantes)
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/foodie-reality")}
              className="text-xs text-zinc-300 hover:text-emerald-400"
            >
              <Utensils className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              Auditor Viral
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/foodie-videos")}
              className="text-xs text-zinc-300 hover:text-white"
            >
              <Video className="w-3.5 h-3.5 mr-1 text-emerald-500" />
              Vídeos 9:16
            </Button>
            <Button
              size="sm"
              className="bg-cyan-500 hover:bg-cyan-600 text-zinc-950 font-bold text-xs"
              onClick={() => {
                setActiveTab("badge");
                toast.success("Snippet de credibilidad preparado para tu descripción");
              }}
            >
              Mi Sello de Credibilidad
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-16 overflow-hidden border-b border-zinc-800/80">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-3 py-1 text-sm font-semibold">
            🛡️ El Escudo de Credibilidad para Creadores Gastronómicos Honestos
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Demuestra a tu audiencia que no eres un vendido.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Blinda tu criterio con opiniones de clientes reales.
            </span>
          </h1>

          <p className="text-zinc-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            ¿Cansado de que duden de tus recomendaciones? <strong>FoodieFake Creator</strong> te otorga el sello de credibilidad contrastado con Google Places, te permite hacer <em>fact-checking preventivo</em> antes de ir a grabar y te da datos objetivos para callar a tus haters.
          </p>

          {/* Creator Profile Toggle */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-bold">
              Perfil Creador Demo:
            </span>
            <div className="bg-zinc-900 border border-zinc-700/80 rounded-xl p-1 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedCreatorId("pablo")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedCreatorId === "pablo"
                    ? "bg-cyan-500 text-zinc-950 shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                🍔 Cenando con Pablo (88% Coherencia)
              </button>
              <button
                type="button"
                onClick={() => setSelectedCreatorId("foodievip")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedCreatorId === "foodievip"
                    ? "bg-cyan-500 text-zinc-950 shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                🔥 FoodieVip Spain (28% Coherencia)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Creator Hub */}
      <main className="px-6 py-10 max-w-7xl mx-auto space-y-8">
        {/* Creator Identity Strip */}
        <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white">{creator.name}</h3>
                <span className="text-xs text-zinc-400 font-mono">{creator.handle}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={creator.coherenceScore >= 70 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}>
                  {creator.badgeLevel}
                </Badge>
                <span className="text-xs text-zinc-400">
                  {creator.verifiedVideos} restaurantes contrastados
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-zinc-400 uppercase font-semibold">Índice Coherencia</div>
              <div className={`text-4xl font-black ${creator.coherenceScore >= 70 ? 'text-emerald-400' : 'text-red-400'}`}>
                {creator.coherenceScore}%
              </div>
            </div>
            <div className="text-right border-l border-zinc-800 pl-6">
              <div className="text-xs text-zinc-400 uppercase font-semibold">Objetividad IA</div>
              <div className="text-2xl font-bold text-white">
                {creator.speechAnalysis.objectivityIndex}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1 rounded-xl w-full grid grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger
              value="badge"
              className="py-2.5 text-xs font-bold data-[state=active]:bg-cyan-500 data-[state=active]:text-zinc-950"
            >
              <Award className="w-4 h-4 mr-1.5" />
              Sello Anti-Vendido (Social)
            </TabsTrigger>
            <TabsTrigger
              value="radar"
              className="py-2.5 text-xs font-bold data-[state=active]:bg-cyan-500 data-[state=active]:text-zinc-950"
            >
              <Search className="w-4 h-4 mr-1.5" />
              Radar Pre-Grabación
            </TabsTrigger>
            <TabsTrigger
              value="speech"
              className="py-2.5 text-xs font-bold data-[state=active]:bg-cyan-500 data-[state=active]:text-zinc-950"
            >
              <BarChart2 className="w-4 h-4 mr-1.5" />
              Análisis del Discurso
            </TabsTrigger>
            <TabsTrigger
              value="script"
              className="py-2.5 text-xs font-bold data-[state=active]:bg-cyan-500 data-[state=active]:text-zinc-950"
            >
              <Video className="w-4 h-4 mr-1.5" />
              Generador de Réplicas Shorts
            </TabsTrigger>
          </TabsList>

          {/* ========================================================
              TAB 1: SELLO ANTI-VENDIDO Y SNIPPET SOCIAL
          ======================================================== */}
          <TabsContent value="badge" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                  TU ESCUDO EN COMENTARIOS
                </Badge>
                <h2 className="text-3xl font-black text-white">
                  "Mi criterio coincide un {creator.coherenceScore}% con los clientes reales"
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Copia este snippet en la caja de descripción de tus vídeos de YouTube o en la biografía de tu perfil. Cuando un usuario te acuse de estar comprado, el enlace a tu auditoría pública en FoodieFake cerrará el debate con datos fríos de Google Places.
                </p>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 font-mono text-xs text-zinc-300">
                  <div className="text-[11px] text-zinc-500 uppercase font-sans font-bold flex items-center justify-between">
                    <span>Snippet para Descripción de YouTube / TikTok:</span>
                    <Button
                      size="sm"
                      onClick={() => handleCopy(getBadgeSnippet(), "Snippet copiado para tu descripción")}
                      className="h-6 text-[10px] bg-cyan-500 hover:bg-cyan-600 text-zinc-950 font-bold"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copiar Snippet
                    </Button>
                  </div>
                  <div className="p-3 bg-zinc-900 rounded-lg text-cyan-300 whitespace-pre-line">
                    {getBadgeSnippet()}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-zinc-400 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Calculado a partir de {creator.verifiedVideos} restaurantes analizados en Google Places.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Inalterable e independiente: no se puede comprar ni falsificar.</span>
                  </div>
                </div>
              </div>

              {/* Graphic Transparency Card */}
              <div className="lg:col-span-5 flex justify-center">
                <Card className="w-80 p-6 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border-2 border-cyan-500/60 rounded-3xl shadow-2xl shadow-cyan-500/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-black tracking-wider text-white">FOODIEFAKE CERTIFIED</span>
                    </div>
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/40 text-[10px]">
                      VERIFICADO
                    </Badge>
                  </div>

                  <div className="text-center py-2 space-y-1">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-cyan-400"
                    />
                    <div className="font-bold text-white text-base pt-1">{creator.name}</div>
                    <div className="text-xs text-zinc-500">{creator.handle}</div>
                  </div>

                  <div className="bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800 text-center space-y-1">
                    <div className="text-[11px] text-zinc-400 uppercase font-semibold">Índice de Coherencia Gastronómica</div>
                    <div className={`text-4xl font-black ${creator.coherenceScore >= 70 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {creator.coherenceScore}%
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      {creator.coherenceScore >= 70 ? '🟢 Alta correspondencia con clientes reales' : '🔴 Riesgo alto de discrepancia'}
                    </div>
                  </div>

                  <div className="text-[10px] text-center text-zinc-500 font-mono">
                    FOODIEFAKE.APP/CREATOR/{creator.handle.replace('@', '')}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ========================================================
              TAB 2: RADAR PRE-GRABACIÓN (FACT-CHECK)
          ======================================================== */}
          <TabsContent value="radar" className="space-y-6 mt-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Search className="w-6 h-6 text-cyan-400" />
                Radar Pre-Grabación (Fact-Check antes de ir al restaurante)
              </h2>
              <p className="text-zinc-400 text-sm">
                ¿Te han invitado a un restaurante o piensas visitarlo? Consulta antes qué opinan los comensales anónimos para no pillarte los dedos recomendando un desastre.
              </p>
            </div>

            {/* Search Box */}
            <form onSubmit={handleSearchPreCheck} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Introduce el restaurante a chequear (ej: Smash King Burgers o Casa Carmen)..."
                  className="pl-11 bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 h-12 rounded-xl text-sm"
                />
              </div>
              <Button
                type="submit"
                disabled={searching}
                className="bg-cyan-500 hover:bg-cyan-600 text-zinc-950 font-bold px-6 h-12 rounded-xl"
              >
                {searching ? "Consultando Google..." : "Fact-Check"}
              </Button>
            </form>

            {/* Result Box */}
            {preCheckResult && (
              <Card className="p-6 bg-zinc-900/60 border-zinc-800 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{preCheckResult.name}</span>
                      <span className="text-xs text-zinc-400">({preCheckResult.city})</span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <strong className="text-white">{preCheckResult.googleRating} / 5</strong> en Google Maps
                    </div>
                  </div>

                  <Badge className={preCheckResult.riskLevel === 'Alto' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}>
                    Nivel de Riesgo para tu Reputación: {preCheckResult.riskLevel}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      ✓ Platos Seguros (Aprobados por comensales):
                    </div>
                    <ul className="text-xs text-emerald-200 list-disc list-inside space-y-1">
                      {preCheckResult.safeDishes.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 space-y-2">
                    <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
                      ⚠️ Platos Trampa (Quejas masivas en Google):
                    </div>
                    <ul className="text-xs text-red-200 list-disc list-inside space-y-1">
                      {preCheckResult.trapDishes.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200 space-y-1">
                  <strong className="text-cyan-400 block font-semibold">💡 Consejo Estratégico FoodieFake para tu Grabación:</strong>
                  <p className="leading-relaxed">{preCheckResult.adviceForCreator}</p>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* ========================================================
              TAB 3: ANÁLISIS DEL DISCURSO Y POSTUREÓMETRO
          ======================================================== */}
          <TabsContent value="speech" className="space-y-6 mt-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-6 h-6 text-cyan-400" />
                Auditoría del Lenguaje: ¿Suenas a Crítico o a Anuncio de Teletienda?
              </h2>
              <p className="text-zinc-400 text-sm">
                Analizamos las transcripciones de tus vídeos mediante IA para medir cuántos adjetivos inflados utilizas frente a análisis gastronómico fundamentado.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-5 bg-zinc-900/60 border-zinc-800 space-y-2">
                <div className="text-xs font-semibold text-zinc-400 uppercase">Términos Técnicos Gastronómicos</div>
                <div className="text-3xl font-black text-cyan-400">{creator.speechAnalysis.technicalTermsRate}</div>
                <p className="text-[11px] text-zinc-500">Menciones a maduración, corte, punto, emulsión, salazón, etc.</p>
              </Card>

              <Card className="p-5 bg-zinc-900/60 border-zinc-800 space-y-2">
                <div className="text-xs font-semibold text-zinc-400 uppercase">Frecuencia de Hipérboles / Hype</div>
                <div className="text-3xl font-black text-amber-400">{creator.speechAnalysis.hyperboleRate}</div>
                <p className="text-[11px] text-zinc-500">Uso de "locura", "brutal", "el mejor de mi vida", "orgásmico".</p>
              </Card>

              <Card className="p-5 bg-zinc-900/60 border-zinc-800 space-y-2">
                <div className="text-xs font-semibold text-zinc-400 uppercase">Índice de Objetividad Global</div>
                <div className="text-3xl font-black text-emerald-400">{creator.speechAnalysis.objectivityIndex}</div>
                <p className="text-[11px] text-zinc-500">Equilibrio entre halagos y críticas constructivas en tus vídeos.</p>
              </Card>
            </div>
          </TabsContent>

          {/* ========================================================
              TAB 4: GENERADOR DE RÉPLICAS SHORTS
          ======================================================== */}
          <TabsContent value="script" className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Video className="w-6 h-6 text-cyan-400" />
                  Generador de Guiones: "La Réplica Detrás de Cámaras"
                </h2>
                <p className="text-zinc-400 text-sm">
                  Crea automáticamente un segundo vídeo para TikTok / Shorts con la comparativa de tu visita y la realidad de los clientes. ¡Duplica tus visitas con polémica sana!
                </p>
              </div>
              <Button
                onClick={() => navigate("/foodie-videos")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                Abrir Generador Remotion 9:16
              </Button>
            </div>

            <Card className="p-6 bg-zinc-900/60 border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Guión Viral Sugerido (30 segundos)
                </span>
                <Button
                  size="sm"
                  onClick={() => handleCopy("Fui a probar la burger más viral de TikTok... A mí me encantó el punto de la carne, pero al revisar las 400 reseñas de Google Maps, la peña denuncia que cobran el pan a precio de oro y que las patatas llegan frías. ¿Es postureo o merece la pena? ¡Os leo en comentarios!", "Guión copiado")}
                  className="h-7 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300"
                >
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Copiar Guión
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-300 leading-relaxed font-sans space-y-2">
                <p><strong>[0-3s Hook]:</strong> "Fui a probar el restaurante más viral de TikTok... pero la realidad de Google Maps es otra historia."</p>
                <p><strong>[3-10s Tu experiencia]:</strong> "A mí me atendieron de diez y la chuleta estaba en su punto..."</p>
                <p><strong>[10-20s El contraste]:</strong> "...pero en Google hay decenas de clientes quejándose de 45 minutos de espera y cobros sorpresa en el ticket."</p>
                <p><strong>[20-30s Veredicto]:</strong> "Índice de coherencia de FoodieFake: 45%. ¿Habéis ido vosotros? ¡Dejadme en comentarios si os la colaron o si comisteis bien!"</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
