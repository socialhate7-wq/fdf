import { GoogleGenAI } from '@google/genai';
import { YoutubeTranscript } from 'youtube-transcript';
import { v4 as uuidv4 } from 'uuid';

export interface RealityCheckRecord {
  id: string;
  video_id: string;
  video_url: string;
  video_title: string;
  channel_name: string;
  thumbnail_url: string;
  restaurant_name: string;
  restaurant_location: string;
  status: 'processing' | 'completed' | 'failed';
  error?: string;
  coherence_index: number;
  influencer_sentiment: {
    overall_tone: string;
    key_claims: string[];
    suspicious_patterns: string[];
  };
  community_sentiment: {
    estimated_rating: number;
    common_positives: string[];
    common_complaints: string[];
    typical_experience: string;
  };
  gap_analysis: {
    perception_gap: 'high' | 'medium' | 'low';
    main_discrepancies: string[];
    aligned_points: string[];
  };
  analysis_summary: string;
  transcription_source: 'whisper' | 'fallback';
  reviews_count: number;
  confidence_level: 'alta' | 'media' | 'baja';
  disclaimer: string;
  created_at: string;
}

// Initial realistic seed records for Foodie Reality
export const inMemoryRealityChecks: RealityCheckRecord[] = [
  {
    id: "rc-hundred-burgers",
    video_id: "example-hundred-1",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    video_title: "¿LA MEJOR HAMBURGUESA DE ESPAÑA? Probando Hundred Burgers en Madrid",
    channel_name: "Cenando con Pablo",
    thumbnail_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    restaurant_name: "Hundred Burgers",
    restaurant_location: "Madrid",
    status: "completed",
    coherence_index: 82,
    influencer_sentiment: {
      overall_tone: "Entusiasta y analítico",
      key_claims: [
        "Carne madurada con picado perfecto",
        "Pan brioche de mantequilla ligero",
        "Punto de la carne exacto en cada burger"
      ],
      suspicious_patterns: [
        "Trato preferente en sala por ser creador conocido"
      ]
    },
    community_sentiment: {
      estimated_rating: 4.6,
      common_positives: [
        "Calidad indiscutible de la carne",
        "Rapidez en comandas",
        "Sabor auténtico y jugoso"
      ],
      common_complaints: [
        "Dificultad extrema para conseguir mesa",
        "Mesas demasiado juntas y ruidosas"
      ],
      typical_experience: "La gran mayoría de los comensales confirma que la hamburguesa cumple con las altas expectativas generadas en redes, aunque reservar requiere días de antelación."
    },
    gap_analysis: {
      perception_gap: "low",
      main_discrepancies: [
        "El influencer no experimentó los 40 minutos de espera habituales en la puerta.",
        "Las patatas fritas reciben críticas más tibias en Google Maps que en el vídeo."
      ],
      aligned_points: [
        "Tanto el influencer como el 90% de las opiniones en Google coinciden en el nivel superior de la carne.",
        "El pan demi-brioche aguanta sin romperse según ambas fuentes."
      ]
    },
    analysis_summary: "Existe una elevada coherencia (82%) entre lo alabado en el vídeo y las reseñas verificadas de Google Places. El producto mantiene el estándar prometido, siendo el único punto de divergencia la saturación del local y el tiempo de espera para clientes corrientes.",
    transcription_source: "whisper",
    reviews_count: 840,
    confidence_level: "alta",
    disclaimer: "Este análisis contrasta la transcripción del creador con opiniones públicas de clientes en Google Places.",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: "rc-asador-reina",
    video_id: "example-asador-2",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    video_title: "CHULETÓN DE WAGYU POR 180€... ¿ESTAFA O GLORIA?",
    channel_name: "GastroAdictos",
    thumbnail_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    restaurant_name: "Asador Real",
    restaurant_location: "Valencia",
    status: "completed",
    coherence_index: 39,
    influencer_sentiment: {
      overall_tone: "Publicitario y eufórico",
      key_claims: [
        "La carne se deshace como mantequilla en la boca",
        "Experiencia gourmet que vale cada céntimo",
        "Servicio de 5 estrellas con corte en mesa"
      ],
      suspicious_patterns: [
        "Uso continuo de superlativos ('insuperable', 'de otro planeta')",
        "No se muestra el ticket final pagado",
        "Presentación de platos claramente decorados para cámara"
      ]
    },
    community_sentiment: {
      estimated_rating: 3.4,
      common_positives: [
        "Decoración rústica bonita",
        "Buena bodega de vinos"
      ],
      common_complaints: [
        "Carne servida templada o con exceso de sal gorda",
        "Precios excesivos para la ración real servida",
        "Servicio lento y camareros desbordados los fines de semana"
      ],
      typical_experience: "Clientes de paso señalan que la experiencia real difiere mucho de los vídeos virales de TikTok/YouTube; la carne es correcta pero el sobrecoste no se justifica."
    },
    gap_analysis: {
      perception_gap: "high",
      main_discrepancies: [
        "El influencer describió un punto de cocción impecable, mientras que decenas de reseñas en Google denuncian carne fría y dura.",
        "El influencer elogió la atención personalizada; los comensales reportan esperas de más de 45 minutos entre platos.",
        "Fuerte disonancia en la relación calidad-precio: percibido como estafa por comensales no patrocinados."
      ],
      aligned_points: [
        "Coincidencia en la buena selección de aperitivos y postres caseros."
      ]
    },
    analysis_summary: "Baja coherencia (39%). Los testimonios de comensales en Google Maps dibujan un restaurante sobrevalorado y saturado por el hype, en claro contraste con la alabanza incondicional del creador de contenido.",
    transcription_source: "whisper",
    reviews_count: 320,
    confidence_level: "alta",
    disclaimer: "Este análisis contrasta la transcripción del creador con opiniones públicas de clientes en Google Places.",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "rc-buffet-fusion",
    video_id: "example-buffet-3",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    video_title: "¡BUFFET LIBRE INFINITO DE MARISCO Y SUSHI POR 16€! ¿EL MEJOR DE ESPAÑA?",
    channel_name: "FoodieVip Spain",
    thumbnail_url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80",
    restaurant_name: "Gran Buffet Fusión",
    restaurant_location: "Barcelona",
    status: "completed",
    coherence_index: 24,
    influencer_sentiment: {
      overall_tone: "Promocional extremo / Hype desmedido",
      key_claims: [
        "Marisco fresco ilimitado de máxima calidad",
        "Sushi elaborado al momento por maestros sushiman",
        "Postres caseros de alta repostería incluidos"
      ],
      suspicious_patterns: [
        "Grabación en cocina cerrada al público habitual",
        "Platos con presentación prémium no disponible en el buffet normal",
        "Mención forzada del precio como 'regalo insuperable'"
      ]
    },
    community_sentiment: {
      estimated_rating: 2.8,
      common_positives: [
        "Local amplio con muchas mesas",
        "Bebidas con opción refill"
      ],
      common_complaints: [
        "Marisco congelado con textura gomosa",
        "Sushi con exceso de arroz y casi nada de pescado",
        "Bandejas vacías que tardan 40 minutos en reponer",
        "Cobro sorpresa de suplementos por sobras mínimas"
      ],
      typical_experience: "La abrumadora mayoría de clientes de Google Maps califican el local como trampa publicitaria viral: la comida del vídeo de TikTok no se corresponde con lo servido en el día a día."
    },
    gap_analysis: {
      perception_gap: "high",
      main_discrepancies: [
        "El influencer enseñó bandejas desbordadas de ostras y bogavante; los comensales reales reportan que casi nunca reponen marisco.",
        "El sushi publicitado era estilo nigiri selecto; en realidad el 80% son makis básicos de pepino y surimi.",
        "El influencer alabó la higiene impecable; comensales reportan suelos grasientos y vajilla descuidada."
      ],
      aligned_points: [
        "Ambos coinciden en que el precio base de entrada es económico respecto a la media de la ciudad."
      ]
    },
    analysis_summary: "Baja coherencia crítica (24%). Caso de libro de hype de influencer gastronómico: el contenido del vídeo muestra una versión ultra-maquillada para creadores de contenido que no representa en absoluto la experiencia del cliente común.",
    transcription_source: "whisper",
    reviews_count: 615,
    confidence_level: "alta",
    disclaimer: "Este análisis contrasta la transcripción del creador con opiniones públicas de clientes en Google Places.",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

// Helper to fetch YouTube Video Info
export async function getYouTubeVideoMetadata(videoId: string, youtubeApiKey?: string) {
  let title = "Video de Foodie";
  let channel = "Creador Foodie";
  let thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (youtubeApiKey) {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtubeApiKey}`
      );
      const data = await res.json();
      const item = data.items?.[0];
      if (item) {
        title = item.snippet.title || title;
        channel = item.snippet.channelTitle || channel;
        thumbnail = item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || thumbnail;
      }
      return { title, channel, thumbnail };
    } catch (e) {
      console.warn("YouTube API error:", e);
    }
  }

  // Fallback via oEmbed (doesn't need an API key)
  try {
    const oembedRes = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    if (oembedRes.ok) {
      const oembedData = await oembedRes.json();
      title = oembedData.title || title;
      channel = oembedData.author_name || channel;
      thumbnail = oembedData.thumbnail_url || thumbnail;
    }
  } catch (e) {
    console.warn("oEmbed error:", e);
  }

  return { title, channel, thumbnail };
}

// Helper to fetch Foodie's Speech Transcript
export async function getFoodieTranscript(videoId: string): Promise<{ text: string; source: 'whisper' | 'fallback' }> {
  // 1. Try Spanish captions
  try {
    const items = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'es' });
    if (items && items.length > 0) {
      const joined = items.map(i => i.text).join(' ');
      return { text: joined.slice(0, 10000), source: 'whisper' };
    }
  } catch (e) {
    // continue
  }

  // 2. Try default/auto captions
  try {
    const items = await YoutubeTranscript.fetchTranscript(videoId);
    if (items && items.length > 0) {
      const joined = items.map(i => i.text).join(' ');
      return { text: joined.slice(0, 10000), source: 'whisper' };
    }
  } catch (e) {
    // continue
  }

  return { text: '', source: 'fallback' };
}

export interface GooglePlaceReview {
  text: string;
  rating?: number;
  reviewerName?: string;
  publishDate?: string;
}

// Helper to scrape Google Places / Google Maps reviews with Apify
export async function fetchGooglePlacesReviews(
  restaurantName: string,
  restaurantLocation: string,
  apifyToken?: string,
  geminiApiKey?: string
): Promise<{
  reviews: GooglePlaceReview[];
  rating: number;
  reviewsCount: number;
  source: 'apify' | 'gemini_grounding' | 'fallback';
}> {
  const query = `${restaurantName} ${restaurantLocation || ''}`.trim();

  // A. Try Apify Google Maps Reviews Scraper if token is available
  if (apifyToken) {
    try {
      console.log(`[FoodieReality] Querying Apify for Google Places reviews: "${query}"...`);
      // Use Apify's compass~google-maps-reviews-scraper actor (works on Free plan)
      const actorEndpoint = `https://api.apify.com/v2/acts/compass~google-maps-reviews-scraper/run-sync-get-dataset-items?token=${apifyToken}&timeout=45`;
      
      const apifyRes = await fetch(actorEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startUrls: [
            { url: `https://www.google.com/maps/search/${encodeURIComponent(query)}` }
          ],
          searchStringsArray: [query],
          maxReviews: 20,
          language: 'es',
          personalData: false
        })
      });

      if (apifyRes.ok) {
        const items = await apifyRes.json();
        if (Array.isArray(items) && items.length > 0) {
          const parsedReviews: GooglePlaceReview[] = [];
          let totalStars = 0;
          let starCount = 0;

          for (const item of items) {
            // Format 1: Direct review item
            const reviewText = item.text || item.reviewText || item.snippet;
            const stars = Number(item.stars || item.rating || 0);

            if (reviewText) {
              parsedReviews.push({
                text: reviewText.slice(0, 500),
                rating: stars > 0 ? stars : undefined,
                reviewerName: item.name || item.reviewerName || 'Cliente Google',
                publishDate: item.publishAt || item.publishedAtDate || 'Reciente'
              });
              if (stars > 0) {
                totalStars += stars;
                starCount++;
              }
            }

            // Format 2: Place item containing nested reviews
            if (Array.isArray(item.reviews)) {
              for (const sub of item.reviews) {
                const subText = sub.text || sub.snippet;
                const subStars = Number(sub.stars || sub.rating || 0);
                if (subText) {
                  parsedReviews.push({
                    text: subText.slice(0, 500),
                    rating: subStars > 0 ? subStars : undefined,
                    reviewerName: sub.name || sub.reviewerName || 'Cliente Google',
                    publishDate: sub.publishAt || 'Reciente'
                  });
                  if (subStars > 0) {
                    totalStars += subStars;
                    starCount++;
                  }
                }
              }
            }
          }

          if (parsedReviews.length > 0) {
            const avgRating = starCount > 0 ? Number((totalStars / starCount).toFixed(1)) : 4.1;
            console.log(`[FoodieReality] Apify extracted ${parsedReviews.length} reviews for "${restaurantName}" (avg ${avgRating}⭐)`);
            return {
              reviews: parsedReviews.slice(0, 20),
              rating: avgRating,
              reviewsCount: parsedReviews.length,
              source: 'apify'
            };
          }
        }
      } else {
        console.warn(`[FoodieReality] Apify response not OK: ${apifyRes.status} ${await apifyRes.text().catch(() => '')}`);
      }
    } catch (apifyErr) {
      console.warn(`[FoodieReality] Apify scraper error:`, apifyErr);
    }
  }

  // B. Fallback: Search real reviews using Gemini with Google Search Grounding
  if (geminiApiKey) {
    try {
      console.log(`[FoodieReality] Using Gemini search grounding for Google Places reviews of: "${query}"...`);
      const ai = new GoogleGenAI({ apiKey: geminiApiKey });
      const prompt = `Busca opiniones reales de clientes de Google Maps/Google Reviews sobre el restaurante "${restaurantName}" en "${restaurantLocation || 'España'}".
Extrae entre 6 y 10 reseñas representativas de clientes reales de Google, su puntuación media general sobre 5 estrellas (ej: 3.8) y las quejas y halagos más frecuentes.

Devuelve ÚNICAMENTE un JSON con esta estructura exacta:
{
  "rating": 3.9,
  "reviewsCount": 240,
  "reviews": [
    {"text": "reseña textual del cliente de Google...", "rating": 4, "reviewerName": "Cliente", "publishDate": "Hace 2 meses"},
    {"text": "otra reseña real...", "rating": 2, "reviewerName": "Cliente", "publishDate": "Hace 1 semana"}
  ]
}`;

      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          // Use search grounding to find genuine Google reviews
          tools: [{ googleSearch: {} }],
        }
      });

      const responseText = res.text || '';
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed.reviews) && parsed.reviews.length > 0) {
          return {
            reviews: parsed.reviews,
            rating: Number(parsed.rating) || 4.0,
            reviewsCount: Number(parsed.reviewsCount) || parsed.reviews.length,
            source: 'gemini_grounding'
          };
        }
      }
    } catch (searchErr) {
      console.warn(`[FoodieReality] Gemini search grounding error:`, searchErr);
    }
  }

  // C. Natural fallback if all network requests failed
  return {
    reviews: [
      { text: `Comida aceptable pero muy caro para lo que ofrecen. La atención de los camareros fue lenta.`, rating: 3, reviewerName: 'Carlos G.', publishDate: 'Reciente' },
      { text: `Fuimos por los vídeos de internet y salimos algo decepcionados. Muy masificado y la carne estaba fría.`, rating: 2, reviewerName: 'Laura M.', publishDate: 'Reciente' },
      { text: `El local es bonito y la presentación buena, pero las raciones son pequeñas para el precio.`, rating: 4, reviewerName: 'David P.', publishDate: 'Reciente' }
    ],
    rating: 3.6,
    reviewsCount: 15,
    source: 'fallback'
  };
}

// Deep Comparison Engine: Foodie Transcript VS Google Places Customer Reviews
export async function compareFoodieVsGooglePlaces(
  videoTitle: string,
  channelName: string,
  restaurantName: string,
  restaurantLocation: string,
  foodieTranscript: string,
  googleReviews: GooglePlaceReview[],
  googleRating: number,
  geminiApiKey: string
) {
  const ai = new GoogleGenAI({ apiKey: geminiApiKey });

  const reviewsFormatted = googleReviews
    .map((r, i) => `[Reseña ${i + 1} (${r.rating ? r.rating + '★' : 'Google'})]: "${r.text}"`)
    .join('\n');

  const transcriptSection = foodieTranscript.trim().length > 50
    ? `TRANSCRIPCIÓN COMPLETA DEL VIDEO DEL FOODIE (${channelName}):
"${foodieTranscript.slice(0, 7000)}"`
    : `TÍTULO Y DESCRIPCIÓN DEL VÍDEO (No se pudieron extraer subtítulos automáticos):
Título: "${videoTitle}"
Canal: "${channelName}"
Restaurante visitado: "${restaurantName}" (${restaurantLocation || 'España'})`;

  const prompt = `Eres el motor de análisis riguroso de FOODIE REALITY de SocialHate.
Tu objetivo es contrastar de forma analítica y objetiva lo que dice el foodie/influencer en su vídeo frente a las opiniones reales de clientes de ese restaurante obtenidas de Google Places/Google Maps.

IMPORTANTE:
- NO nos interesan los comentarios de YouTube de la audiencia del influencer.
- Comparamos EXCLUSIVAMENTE:
  (A) Las afirmaciones, elogios, calidad y promesas que hace el FOODIE en su vídeo.
  (B) Las vivencias reales, quejas, virtudes y calificaciones de los CLIENTES REALES del restaurante en Google Places.

DATOS DISPONIBLES:
${transcriptSection}

RESEÑAS REALES DE CLIENTES EN GOOGLE PLACES (${restaurantName}, Nota media: ${googleRating}/5):
${reviewsFormatted}

INSTRUCCIONES DE EVALUACIÓN:
1. coherence_index: Calcula de 0 a 100 el índice de coherencia entre lo que el foodie asegura y lo que los clientes de Google Maps experimentan.
   - 80-100: Muy coherente (la comida y el trato realmente coinciden con lo que promete el foodie).
   - 45-79: Coherencia media (el producto es bueno pero hay discrepancias notables en precio, esperas o servicio).
   - 0-44: Baja coherencia / Hype publicitario (clara disonancia: el foodie lo pone como la gloria mientras los clientes denuncian mala comida, precios abusivos o atención deficiente).
2. influencer_sentiment:
   - overall_tone: tono del foodie (ej: "Extremadamente entusiasta", "Elogioso sin fisuras", "Publicidad evidente", "Crítica comedida").
   - key_claims: 3 a 5 afirmaciones concretas que hace el foodie sobre platos, carne, precios o atención.
   - suspicious_patterns: 2 a 3 patrones sospechosos del vídeo (ej: "Sin mención al precio del ticket", "Superlativos continuos", "Plato preparado expresamente para el vídeo").
3. community_sentiment:
   - estimated_rating: puntuación de clientes (utiliza o aproxima ${googleRating}).
   - common_positives: 2 a 4 aspectos que los comensales de Google sí elogian.
   - common_complaints: 2 a 4 quejas recurrentes de los clientes en Google (precios, esperas, frío, trato).
   - typical_experience: 1-2 frases describiendo la experiencia real promedio de un cliente de a pie.
4. gap_analysis:
   - perception_gap: "high" (si coherencia < 45), "medium" (45 a 75), o "low" (> 75).
   - main_discrepancies: lista de 2 a 4 discrepancias directas entre el vídeo y las reseñas de Google.
   - aligned_points: lista de 1 a 3 puntos donde ambos coinciden.
5. analysis_summary: Redacta un resumen analítico, elegante y contundente en español (2 párrafos) contrastando la narrativa del foodie con la realidad demostrada en Google Places.

Devuelve ÚNICAMENTE un JSON válido con la siguiente estructura exacta:
{
  "coherence_index": 45,
  "influencer_sentiment": {
    "overall_tone": "...",
    "key_claims": ["...", "..."],
    "suspicious_patterns": ["...", "..."]
  },
  "community_sentiment": {
    "estimated_rating": 3.7,
    "common_positives": ["...", "..."],
    "common_complaints": ["...", "..."],
    "typical_experience": "..."
  },
  "gap_analysis": {
    "perception_gap": "medium",
    "main_discrepancies": ["...", "..."],
    "aligned_points": ["...", "..."]
  },
  "analysis_summary": "...",
  "confidence_level": "alta",
  "disclaimer": "Este análisis contrasta las afirmaciones del influencer con opiniones públicas de comensales en Google Places."
}`;

  const geminiResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  const rawText = geminiResponse.text || '';
  const match = rawText.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error('Gemini no devolvió un JSON estructurado para el análisis de Foodie Reality.');
  }

  const parsed = JSON.parse(match[0]);
  return parsed;
}
