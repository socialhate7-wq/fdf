import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  ShieldCheck,
  ShieldAlert,
  Building2,
  Utensils,
  Star,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Clock,
  Calendar,
  ChefHat,
  MessageSquare,
  HelpCircle,
  QrCode,
  ExternalLink,
  ChevronRight,
  Flame,
  Award,
  Video,
  FileText
} from "lucide-react";

// Mock Demo Restaurants for B2B Demonstration
const DEMO_RESTAURANTS = {
  "asador-real": {
    name: "Asador Real",
    city: "Valencia",
    googleRating: 3.4,
    cleanedRating: 4.2, // Rating without fake/rage reviews
    totalReviews: 420,
    toxicReviewsCount: 38,
    estimatedMonthlyLoss: "2.400€ - 3.800€",
    vulnerabilityLevel: "Alta (Saturación y Cobros)",
    departments: {
      cocina: {
        score: 65,
        status: "Atención requerida",
        complaints: [
          "Carne servida templada o poco sellada en horas punta (14:30 - 15:30)",
          "Puntos de carne imprecisos entre poco hecho y al punto"
        ],
        positive: "Excelente calidad de corte y sabor de la maduración"
      },
      sala: {
        score: 72,
        status: "Aceptable",
        complaints: [
          "Esperas de más de 25 minutos para la comanda en terraza",
          "Dificultad para pedir la cuenta en turnos de fin de semana"
        ],
        positive: "Camareros amables pese al ritmo alto de mesas"
      },
      ticket: {
        score: 38,
        status: "Fuga crítica de reputación",
        complaints: [
          "El 62% del hate de 1 estrella es por cobrar 3,20€ de pan y aperitivo no pedido",
          "Sorpresa por el precio de las bebidas (agua 50cl a 3,80€)"
        ],
        positive: "Precios de la carne acordes a la calidad ofrecida"
      },
      instalaciones: {
        score: 84,
        status: "Óptimo",
        complaints: ["Nivel de ruido elevado en el salón interior"],
        positive: "Decoración cuidada y terraza muy agradable"
      }
    },
    flaggedReviews: [
      {
        id: "rev-1",
        author: "Usuario_Anonimo_99",
        date: "Hace 3 días",
        rating: 1,
        text: "¡Una auténtica estafa! Nos cobraron 3,20€ por el pan que ni tocamos y los camareros unos maleducados que no saben ni servir. Ojalá os cierren el negocio piratas.",
        infraction: "Calumnias, insultos directos y sospecha de mala fe (cuenta con 1 única reseña histórica).",
        recommendedAction: "Impugnable ante Google por Infracción de Lenguaje Ofensivo y Acoso.",
        appealText: "Solicitamos la eliminación de esta reseña según las políticas de contenido de Google Maps relativas a 'Acoso y lenguaje ofensivo'. El usuario utiliza descalificaciones e insultos ('estafa', 'piratas', 'ojalá os cierren') en lugar de una crítica objetiva del servicio, además de tratarse de una cuenta sin actividad previa."
      },
      {
        id: "rev-2",
        author: "David R.",
        date: "Hace 1 semana",
        rating: 1,
        text: "Fuimos por recomendación de un vídeo de TikTok y qué decepción. La carne fría, 45 minutos esperando entre el entrante y el chuletón. Para no volver.",
        infraction: "Queja operacional verídica por saturación de cocina post-viral.",
        recommendedAction: "No impugnable. Requiere Respuesta Diplomática de Desescalada y Fidelización.",
        appealText: null
      }
    ],
    criticalHours: "Sábados y Domingos entre 14:15 y 15:45 (Baja de 4.4⭐ a 2.9⭐ en esa franja horaria)."
  },
  "braseria-puerto": {
    name: "La Brasería del Puerto",
    city: "Barcelona",
    googleRating: 3.8,
    cleanedRating: 4.5,
    totalReviews: 680,
    toxicReviewsCount: 44,
    estimatedMonthlyLoss: "3.500€ - 5.200€",
    vulnerabilityLevel: "Media (Colapso por Viralidad)",
    departments: {
      cocina: {
        score: 80,
        status: "Óptimo",
        complaints: ["Retraso en reposición de postres caseros"],
        positive: "Pescados y mariscos muy frescos, buen punto de parrilla"
      },
      sala: {
        score: 45,
        status: "Fuga crítica de reputación",
        complaints: [
          "Mesas dobladas con demasiada prisa; clientes presionados para pagar",
          "Personal desbordado sin tiempo para explicar la carta"
        ],
        positive: "Recepción cordial en puerta"
      },
      ticket: {
        score: 75,
        status: "Correcto",
        complaints: ["Suplemento de terraza del 15% considerado excesivo"],
        positive: "Buena relación calidad-precio en menú diario"
      },
      instalaciones: {
        score: 88,
        status: "Óptimo",
        complaints: ["Vistas al puerto preciosas pero mesas muy juntas"],
        positive: "Ubicación privilegiada"
      }
    },
    flaggedReviews: [
      {
        id: "rev-3",
        author: "Marcos G.",
        date: "Hace 5 días",
        rating: 1,
        text: "Nos echaron prácticamente a los 40 minutos de sentarnos porque tenían la mesa doblada. Jamás me habían tratado con tanta prisa.",
        infraction: "Queja por doblaje de turnos apresurado.",
        recommendedAction: "Respuesta diplomática con invitación a segundo turno tranquilo.",
        appealText: null
      }
    ],
    criticalHours: "Viernes y Sábados noche (21:30 - 23:00)."
  }
};

export default function FoodieProPage() {
  const navigate = useNavigate();
  const [selectedRestId, setSelectedRestId] = useState("asador-real");
  const [activeTab, setActiveTab] = useState("audit");
  const [selectedReviewForResponse, setSelectedReviewForResponse] = useState(0);
  const [responseTone, setResponseTone] = useState("diplomatic");
  const [customResponse, setCustomResponse] = useState("");

  const restaurant = DEMO_RESTAURANTS[selectedRestId];

  // AI-generated responses based on tone
  const generateResponseText = (review, tone) => {
    if (!review) return "";
    if (tone === "diplomatic") {
      return `Hola ${review.author}, lamentamos enormemente que tu experiencia no haya estado a la altura de nuestro estándar. Trasladamos tu comentario a nuestro equipo de cocina y sala para corregir los tiempos en horas punta. Nos gustaría invitarte a contactarnos directamente en gerencia@${selectedRestId}.es para compensarte y que conozcas el servicio que nos caracteriza habitualmente. Atentamente, el equipo de ${restaurant.name}.`;
    }
    if (tone === "disarming") {
      return `Estimado/a ${review.author}: En ${restaurant.name} cuidamos la calidad de cada producto y agradecemos las críticas fundamentadas. Sin embargo, no toleramos insultos ni descalificaciones hacia nuestro personal, que trabaja incansablemente a diario. Tomamos nota de los aspectos operativos a mejorar y seguimos a disposición de cualquier cliente con ánimo constructivo. Un saludo.`;
    }
    return `Gracias por tu valoración, ${review.author}. Lamentamos los inconvenientes descritos. En ${restaurant.name} revisamos diariamente nuestros procesos para garantizar la satisfacción de todos los comensales. Quedamos a tu disposición en nuestro correo oficial.`;
  };

  const handleCopy = (text, message) => {
    navigator.clipboard.writeText(text);
    toast.success(message || "Copiado al portapapeles");
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Top Header */}
      <header className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/foodie-reality")}>
              <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-zinc-950 font-black">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="font-heading text-xl font-black tracking-tight text-white">
                FOODIE<span className="text-emerald-500">FAKE</span>
              </span>
            </div>
            <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/40 text-xs font-black tracking-wider uppercase px-2.5 py-0.5">
              PRO • HOSTELERÍA
            </Badge>
          </div>

          {/* Unified Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/foodie-creator")}
              className="text-xs text-zinc-300 hover:text-cyan-400"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-cyan-400" />
              FoodieFake Creator
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
              className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs"
              onClick={() => {
                setActiveTab("pricing");
                window.scrollTo({ top: 600, behavior: 'smooth' });
              }}
            >
              Probar para mi Local
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-16 overflow-hidden border-b border-zinc-800/80">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 px-3 py-1 text-sm font-semibold">
            🛡️ Inteligencia de Reputación y Escudo contra Hate en Google Maps
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Tus reseñas en Google deciden tus mesas.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Audita qué falla y neutraliza el odio injustificado.
            </span>
          </h1>

          <p className="text-zinc-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Bajar de 4.3 a 3.9 estrellas en Google Places te cuesta entre un 20% y un 30% de comensales semanales. 
            <strong> FoodieFake PRO</strong> desglosa tus fugas de reputación (Cocina, Sala, Ticket), detecta reseñas falsas/impugnables y redacta respuestas diplomáticas que protegen tu facturación.
          </p>

          {/* Restaurant Selector for Demo */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-bold">
              Restaurante Demo:
            </span>
            <div className="bg-zinc-900 border border-zinc-700/80 rounded-xl p-1 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedRestId("asador-real")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedRestId === "asador-real"
                    ? "bg-amber-500 text-zinc-950 shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                🥩 Asador Real (Valencia)
              </button>
              <button
                type="button"
                onClick={() => setSelectedRestId("braseria-puerto")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedRestId === "braseria-puerto"
                    ? "bg-amber-500 text-zinc-950 shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                🦐 La Brasería del Puerto (Barcelona)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main SaaS Dashboard Container */}
      <main className="px-6 py-10 max-w-7xl mx-auto space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 bg-zinc-900/60 border-zinc-800">
            <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-1">
              Nota Actual vs Nota Real
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-400">{restaurant.googleRating}⭐</span>
              <span className="text-sm text-zinc-500 line-through">Oficial</span>
              <span className="text-xl font-bold text-emerald-400 ml-auto">
                {restaurant.cleanedRating}⭐ Depurada
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 mt-2">
              Sin reseñas tóxicas o ataques de 1 estrella injustificados.
            </div>
          </Card>

          <Card className="p-5 bg-zinc-900/60 border-zinc-800">
            <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-1">
              Pérdida Mensual Estimada
            </div>
            <div className="text-3xl font-black text-red-400">
              {restaurant.estimatedMonthlyLoss}
            </div>
            <div className="text-[11px] text-zinc-400 mt-2">
              Por clientes que rechazan reservar al ver notas &lt; 4.0⭐.
            </div>
          </Card>

          <Card className="p-5 bg-zinc-900/60 border-zinc-800">
            <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-1">
              Reseñas Sospechosas / Trolls
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-white">{restaurant.toxicReviewsCount}</span>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                {Math.round((restaurant.toxicReviewsCount / restaurant.totalReviews) * 100)}% del total
              </Badge>
            </div>
            <div className="text-[11px] text-zinc-400 mt-2">
              Detectadas con patrones de cuentas fantasma o lenguaje infractor.
            </div>
          </Card>

          <Card className="p-5 bg-zinc-900/60 border-zinc-800">
            <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-1">
              Nivel de Vulnerabilidad
            </div>
            <div className="text-2xl font-black text-amber-400">
              {restaurant.vulnerabilityLevel}
            </div>
            <div className="text-[11px] text-zinc-400 mt-2">
              Fuga principal: <strong>Cobro de pan/aperitivos</strong>.
            </div>
          </Card>
        </div>

        {/* Feature Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1 rounded-xl w-full grid grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger
              value="audit"
              className="py-2.5 text-xs font-bold data-[state=active]:bg-amber-500 data-[state=active]:text-zinc-950"
            >
              <ChefHat className="w-4 h-4 mr-1.5" />
              Auditoría Departamentos
            </TabsTrigger>
            <TabsTrigger
              value="shield"
              className="py-2.5 text-xs font-bold data-[state=active]:bg-amber-500 data-[state=active]:text-zinc-950"
            >
              <ShieldAlert className="w-4 h-4 mr-1.5" />
              Escudo Anti-Reseñas Falsas
            </TabsTrigger>
            <TabsTrigger
              value="responses"
              className="py-2.5 text-xs font-bold data-[state=active]:bg-amber-500 data-[state=active]:text-zinc-950"
            >
              <MessageSquare className="w-4 h-4 mr-1.5" />
              Respuestas Diplomáticas IA
            </TabsTrigger>
            <TabsTrigger
              value="seal"
              className="py-2.5 text-xs font-bold data-[state=active]:bg-amber-500 data-[state=active]:text-zinc-950"
            >
              <Award className="w-4 h-4 mr-1.5" />
              Sello Físico & QR
            </TabsTrigger>
            <TabsTrigger
              value="pricing"
              className="py-2.5 text-xs font-bold data-[state=active]:bg-amber-500 data-[state=active]:text-zinc-950"
            >
              <Building2 className="w-4 h-4 mr-1.5" />
              Planes Restaurantes
            </TabsTrigger>
          </TabsList>

          {/* ========================================================
              TAB 1: AUDITORÍA DEPARTAMENTOS (Cocina, Sala, Ticket, Local)
          ======================================================== */}
          <TabsContent value="audit" className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ChefHat className="w-6 h-6 text-amber-500" />
                  Rayo X de Reputación por Departamentos
                </h2>
                <p className="text-zinc-400 text-sm">
                  Desglosamos las opiniones de Google Places en áreas de responsabilidad directa para saber exactamente dónde se fuga el dinero.
                </p>
              </div>
              <div className="text-xs bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-400">
                Turno crítico: <strong className="text-amber-400">{restaurant.criticalHours}</strong>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Cocina */}
              <Card className="p-6 bg-zinc-900/60 border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-lg text-white">
                    <span>🍳</span>
                    <span>1. Cocina & Comida</span>
                  </div>
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                    {restaurant.departments.cocina.score}/100 • {restaurant.departments.cocina.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300">
                    <strong className="block text-red-400 font-semibold mb-1">⚠️ Quejas recurrentes:</strong>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {restaurant.departments.cocina.complaints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                    <strong className="block text-emerald-400 font-semibold mb-0.5">✓ Puntos fuertes:</strong>
                    {restaurant.departments.cocina.positive}
                  </div>
                </div>
              </Card>

              {/* Sala & Servicio */}
              <Card className="p-6 bg-zinc-900/60 border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-lg text-white">
                    <span>🤵</span>
                    <span>2. Sala & Servicio</span>
                  </div>
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                    {restaurant.departments.sala.score}/100 • {restaurant.departments.sala.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300">
                    <strong className="block text-red-400 font-semibold mb-1">⚠️ Quejas recurrentes:</strong>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {restaurant.departments.sala.complaints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                    <strong className="block text-emerald-400 font-semibold mb-0.5">✓ Puntos fuertes:</strong>
                    {restaurant.departments.sala.positive}
                  </div>
                </div>
              </Card>

              {/* Ticket & Cobro */}
              <Card className="p-6 bg-zinc-900/60 border-zinc-800 space-y-4 border-l-4 border-l-red-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-lg text-white">
                    <span>💳</span>
                    <span>3. Ticket, Precios & Cobro</span>
                  </div>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    {restaurant.departments.ticket.score}/100 • {restaurant.departments.ticket.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300">
                    <strong className="block text-red-400 font-semibold mb-1">🚨 FUGA CRÍTICA DETECTADA:</strong>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {restaurant.departments.ticket.complaints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-xs text-zinc-400 bg-zinc-800/40 p-2.5 rounded-lg">
                    💡 <em>Consejo FoodieFake:</em> Incluir el pan en el precio del plato o avisar verbalmente al sentar al cliente elimina instantáneamente el 40% de tus reseñas de 1 estrella.
                  </div>
                </div>
              </Card>

              {/* Instalaciones */}
              <Card className="p-6 bg-zinc-900/60 border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-lg text-white">
                    <span>🏛️</span>
                    <span>4. Instalaciones & Acústica</span>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                    {restaurant.departments.instalaciones.score}/100 • {restaurant.departments.instalaciones.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300">
                    <strong className="block text-red-400 font-semibold mb-1">⚠️ Quejas recurrentes:</strong>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {restaurant.departments.instalaciones.complaints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                    <strong className="block text-emerald-400 font-semibold mb-0.5">✓ Puntos fuertes:</strong>
                    {restaurant.departments.instalaciones.positive}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* ========================================================
              TAB 2: ESCUDO ANTI-RESEÑAS FALSAS & IMPUGNACIÓN
          ======================================================== */}
          <TabsContent value="shield" className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-red-500" />
                  Escudo Legal y Detección de Reseñas Impugnables
                </h2>
                <p className="text-zinc-400 text-sm">
                  La IA detecta automáticamente reseñas que infringen las políticas oficiales de Google Maps (insultos, calumnias, bots o ataques sin comprobante de ticket) y redacta la solicitud formal para su retirada.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {restaurant.flaggedReviews.map((rev, idx) => (
                <Card key={rev.id} className="p-6 bg-zinc-900/60 border-zinc-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-300">
                        {rev.author[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{rev.author}</div>
                        <div className="text-[11px] text-zinc-500">{rev.date} • {"⭐".repeat(rev.rating)}</div>
                      </div>
                    </div>

                    <Badge className={rev.appealText ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}>
                      {rev.appealText ? "🚨 Impugnable ante Google" : "⚠️ Queja Operativa"}
                    </Badge>
                  </div>

                  <p className="text-sm text-zinc-200 italic bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80">
                    "{rev.text}"
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-zinc-800/40 p-3 rounded-lg">
                      <strong className="text-zinc-300 block mb-1">Diagnóstico IA:</strong>
                      <span className="text-zinc-400">{rev.infraction}</span>
                    </div>

                    <div className="bg-zinc-800/40 p-3 rounded-lg">
                      <strong className="text-zinc-300 block mb-1">Acción recomendada:</strong>
                      <span className="text-amber-300">{rev.recommendedAction}</span>
                    </div>
                  </div>

                  {rev.appealText && (
                    <div className="mt-2 p-4 rounded-xl bg-red-950/20 border border-red-800/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                          <FileText className="w-4 h-4" />
                          Texto Legal Preparado para Google Business Profile
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(rev.appealText, "Alegato legal copiado. Pégalo en la opción 'Denunciar reseña' de Google.")}
                          className="h-7 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300"
                        >
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          Copiar Alegato
                        </Button>
                      </div>
                      <p className="text-xs text-zinc-300 bg-black/40 p-3 rounded-lg border border-zinc-800 font-mono">
                        {rev.appealText}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ========================================================
              TAB 3: RESPUESTAS DIPLOMÁTICAS IA
          ======================================================== */}
          <TabsContent value="responses" className="space-y-6 mt-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-amber-500" />
                Asistente Diplomático Anti-Hate (Respuestas IA)
              </h2>
              <p className="text-zinc-400 text-sm">
                Responder enfadado a una mala reseña espanta a cientos de futuros clientes. Este módulo genera respuestas calculadas para apagar el fuego y desarmar al cliente tóxico.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left Column: Select Review & Tone */}
              <div className="lg:col-span-5 space-y-4">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                  1. Selecciona la reseña a responder:
                </label>
                <div className="space-y-2">
                  {restaurant.flaggedReviews.map((rev, idx) => (
                    <div
                      key={rev.id}
                      onClick={() => {
                        setSelectedReviewForResponse(idx);
                        setCustomResponse(generateResponseText(rev, responseTone));
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedReviewForResponse === idx
                          ? "bg-amber-500/10 border-amber-500 text-white"
                          : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span>{rev.author}</span>
                        <span>{"⭐".repeat(rev.rating)}</span>
                      </div>
                      <div className="text-xs line-clamp-2 italic">"{rev.text}"</div>
                    </div>
                  ))}
                </div>

                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block pt-2">
                  2. Selecciona la estrategia de respuesta:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setResponseTone("diplomatic");
                      setCustomResponse(generateResponseText(restaurant.flaggedReviews[selectedReviewForResponse], "diplomatic"));
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                      responseTone === "diplomatic"
                        ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    🤝 Fidelización & Disculpa
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setResponseTone("disarming");
                      setCustomResponse(generateResponseText(restaurant.flaggedReviews[selectedReviewForResponse], "disarming"));
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                      responseTone === "disarming"
                        ? "bg-amber-600 text-white border-amber-500 shadow-md"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    🛡️ Firme & Desarmante
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setResponseTone("corporate");
                      setCustomResponse(generateResponseText(restaurant.flaggedReviews[selectedReviewForResponse], "corporate"));
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                      responseTone === "corporate"
                        ? "bg-blue-600 text-white border-blue-500 shadow-md"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    ⚖️ Corporativa Aséptica
                  </button>
                </div>
              </div>

              {/* Right Column: AI Output & Copy */}
              <div className="lg:col-span-7 space-y-4">
                <Card className="p-6 bg-zinc-900/80 border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Respuesta Generada por IA (Lista para pegar en Google)
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleCopy(customResponse || generateResponseText(restaurant.flaggedReviews[selectedReviewForResponse], responseTone), "Respuesta copiada al portapapeles")}
                      className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs"
                    >
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      Copiar Respuesta
                    </Button>
                  </div>

                  <textarea
                    rows={6}
                    value={customResponse || generateResponseText(restaurant.flaggedReviews[selectedReviewForResponse], responseTone)}
                    onChange={(e) => setCustomResponse(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 leading-relaxed font-sans"
                  />

                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Redactada con psicología de servicio para transmitir máxima profesionalidad a los comensales futuros que lean tu perfil.</span>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ========================================================
              TAB 4: SELLO FÍSICO Y CERTIFICADO DE TRANSPARENCIA
          ======================================================== */}
          <TabsContent value="seal" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                  DISTINTIVO OFICIAL DE CALIDAD
                </Badge>
                <h2 className="text-3xl font-black text-white">
                  Sello Verificado: "0% Postureo • Gastronomía Real"
                </h2>
                <p className="text-zinc-400 text-base leading-relaxed">
                  En un momento en el que el público desconfía de los restaurantes virales de TikTok y los acusa de pagar a influencers, este distintivo demuestra que tu local ha sido auditado de forma independiente y que la opinión de los comensales reales de Google Maps respalda tu carta.
                </p>
                <div className="space-y-2 text-sm text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Pegatina física con código QR para la puerta y cartas de tu restaurante.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Widget dinámico para tu página web y reservas online.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Enlace directo a tu informe transparente de FoodieFake.</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <Button
                    onClick={() => toast.success("Código QR y pack de diseño descargado (Demo)")}
                    className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Descargar Pack de Adhesivos QR
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleCopy('<div class="foodiefake-seal" data-id="' + selectedRestId + '"></div>', "Widget HTML copiado")}
                    className="border-zinc-700 text-zinc-300 hover:text-white"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Widget Web
                  </Button>
                </div>
              </div>

              {/* Physical Seal Mockup */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border-4 border-amber-500/80 p-6 flex flex-col items-center justify-between text-center shadow-2xl shadow-amber-500/10 relative">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-400">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-widest text-amber-400 uppercase font-black">
                      CERTIFICADO OFICIAL
                    </div>
                    <div className="text-xl font-black text-white mt-1">
                      FOODIE<span className="text-emerald-500">FAKE</span>
                    </div>
                    <div className="text-xs text-zinc-300 mt-2 font-semibold">
                      {restaurant.name}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-bold mt-0.5">
                      ✓ Gastronomía Real Verificada
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded-xl">
                    <QrCode className="w-16 h-16 text-black" />
                  </div>
                  <div className="text-[9px] text-zinc-500 font-mono">
                    ID: FAKE-VERIFIED-{selectedRestId.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ========================================================
              TAB 5: PLANES Y PRICING B2B
          ======================================================== */}
          <TabsContent value="pricing" className="space-y-6 mt-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <h2 className="text-3xl font-black text-white">
                Planes para Restaurantes y Grupos Gastronómicos
              </h2>
              <p className="text-zinc-400 text-sm">
                Recupera mesas perdidas y protege la reputación de tu negocio por una fracción del coste de una sola mesa semanal.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Starter */}
              <Card className="p-6 bg-zinc-900/60 border-zinc-800 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="font-bold text-white text-lg">Starter</div>
                  <div className="text-3xl font-black text-white">
                    49€ <span className="text-xs font-normal text-zinc-400">/ mes</span>
                  </div>
                  <p className="text-xs text-zinc-400">Para locales individuales que quieren auditoría y detección de quejas recurrentes.</p>
                  <ul className="text-xs text-zinc-300 space-y-2 pt-4 border-t border-zinc-800">
                    <li className="flex items-center gap-2">✓ Auditoría mensual de Google Places</li>
                    <li className="flex items-center gap-2">✓ Desglose por departamentos</li>
                    <li className="flex items-center gap-2">✓ Alertas de turnos críticos</li>
                    <li className="flex items-center gap-2 text-zinc-500">✗ Respuestas automáticas con IA</li>
                  </ul>
                </div>
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs" onClick={() => toast.info("Demo: Contacta con el equipo comercial")}>
                  Empezar Prueba Gratuita
                </Button>
              </Card>

              {/* Pro */}
              <Card className="p-6 bg-gradient-to-b from-amber-500/10 via-zinc-900 to-zinc-900 border-2 border-amber-500 flex flex-col justify-between space-y-6 relative shadow-xl shadow-amber-500/10">
                <Badge className="absolute -top-3 right-6 bg-amber-500 text-zinc-950 font-black text-[10px] tracking-wider uppercase">
                  MÁS RECOMENDADO
                </Badge>
                <div className="space-y-3">
                  <div className="font-bold text-amber-400 text-lg">FoodieFake PRO</div>
                  <div className="text-3xl font-black text-white">
                    99€ <span className="text-xs font-normal text-zinc-400">/ mes</span>
                  </div>
                  <p className="text-xs text-zinc-400">Escudo completo, impugnación legal de hate y respuestas diplomáticas ilimitadas.</p>
                  <ul className="text-xs text-zinc-300 space-y-2 pt-4 border-t border-zinc-800">
                    <li className="flex items-center gap-2">✓ Todo lo del plan Starter</li>
                    <li className="flex items-center gap-2 text-amber-300 font-semibold">✓ Escudo Anti-Reseñas Falsas (Alegatos)</li>
                    <li className="flex items-center gap-2 text-amber-300 font-semibold">✓ Respuestas diplomáticas IA ilimitadas</li>
                    <li className="flex items-center gap-2">✓ Pack físico distintivo QR para local</li>
                    <li className="flex items-center gap-2">✓ Auditoría de impacto post-influencers</li>
                  </ul>
                </div>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black text-xs" onClick={() => toast.info("Demo: Contacta con el equipo comercial")}>
                  Activar FoodieFake PRO
                </Button>
              </Card>

              {/* Enterprise */}
              <Card className="p-6 bg-zinc-900/60 border-zinc-800 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="font-bold text-white text-lg">Grupos & Cadenas</div>
                  <div className="text-3xl font-black text-white">
                    199€ <span className="text-xs font-normal text-zinc-400">/ mes (hasta 5 locales)</span>
                  </div>
                  <p className="text-xs text-zinc-400">Control unificado de reputación para franquicias y grupos hosteleros.</p>
                  <ul className="text-xs text-zinc-300 space-y-2 pt-4 border-t border-zinc-800">
                    <li className="flex items-center gap-2">✓ Multi-local y comparativa entre sedes</li>
                    <li className="flex items-center gap-2">✓ Panel de control centralizado</li>
                    <li className="flex items-center gap-2">✓ API e integración con TPV / Reservas</li>
                    <li className="flex items-center gap-2">✓ Asesor gastronómico dedicado</li>
                  </ul>
                </div>
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs" onClick={() => toast.info("Demo: Contacta con el equipo comercial")}>
                  Consultar para Grupos
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
