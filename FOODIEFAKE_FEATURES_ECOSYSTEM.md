# 🍔 FOODIEFAKE: ECOSISTEMA INTEGRAL DE FEATURES, ESTRATEGIA Y PRODUCTOS

> **Documento Maestro de Producto, Arquitectura B2B/B2C y Roadmap Estratégico**  
> *Recopilación exhaustiva de todas las ideas, análisis técnicos, funciones analíticas y modelos de negocio de FoodieFake.*

---

## 📌 ÍNDICE GENERAL
1. [Visión y Arquitectura de Marca (FoodieFake, PRO y Creator)](#1-visión-y-arquitectura-de-marca)
2. [Estrategia de Naming y Psicología de Marca ("Fake" como Fortalecedor)](#2-estrategia-de-naming-y-psicología-de-marca)
3. [El Vínculo con SocialHate: Trasladar el Análisis de Hate a Google Places](#3-el-vínculo-con-socialhate-de-youtube-a-google-places)
4. [Módulo 1: FoodieFake Público / B2C (Para el Comensal y Curioso Viral)](#4-módulo-1-foodiefake-público--b2c)
5. [Módulo 2: FoodieFake PRO (SaaS B2B para Restaurantes y Hostelería)](#5-módulo-2-foodiefake-pro-saas-b2b)
6. [Módulo 3: FoodieFake Creator (Suite para Creadores e Influencers Gastronómicos)](#6-módulo-3-foodiefake-creator-suite-para-creadores)
7. [Features de Análisis Avanzado e Inteligencia Multimodal (Miniatura, Audio, Vídeo, Places)](#7-features-de-análisis-avanzado-e-inteligencia-multimodal)
8. [Gamificación, Rankings y Dinámicas Virales para Redes Sociales](#8-gamificación-rankings-y-dinámicas-virales)
9. [Modelo de Negocio, Monetización y Pricing](#9-modelo-de-negocio-monetización-y-pricing)
10. [Estado Actual de Implementación en la Aplicación](#10-estado-actual-de-implementación-en-la-aplicación)
11. [Estrategia de Dominios y Expansión Internacional (.com vs .es)](#11-estrategia-de-dominios-y-expansión-internacional)

---

## 1. VISIÓN Y ARQUITECTURA DE MARCA

El ecosistema se vertebra en torno a **FoodieFake** como marca paraguas que aporta disrupción, verdad y contraste con datos objetivos entre el contenido de redes sociales (YouTube / TikTok / Instagram) y la realidad operativa de los restaurantes (Google Places / Maps).

```
                      ┌──────────────────────────────────────┐
                      │             FOODIEFAKE               │
                      │   (Auditor Viral & Público General)  │
                      └──────────────────┬───────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
   ┌───────────────────────────┐                   ┌───────────────────────────┐
   │      FOODIEFAKE PRO       │                   │    FOODIEFAKE CREATOR     │
   │  (SaaS B2B Restaurantes)  │                   │    (Suite para Creadores) │
   │  • Escudo anti-hate       │                   │  • Sello Anti-Vendido     │
   │  • Auditoría departamentos│                   │  • Fact-Check preventivo  │
   │  • Impugnación Google     │                   │  • Análisis del discurso  │
   │  • Respuestas IA          │                   │  • Generador de réplicas  │
   └───────────────────────────┘                   └───────────────────────────┘
```

---

## 2. ESTRATEGIA DE NAMING Y PSICOLOGÍA DE MARCA

### ¿Asusta la palabra "Fake" a los buenos restaurantes y creadores?
* **El precedente FakeSpot (Amazon):** En auditoría digital, cuando un certificador tiene fama de implacable y busca el fraude, **su aprobado vale el triple**. Si un restaurante obtiene un sello de un auditor "suave", a nadie le importa; si obtiene la certificación de **FoodieFake**, su autenticidad queda demostrada.
* **El giro narrativo positivo:**  
  * *"FoodieFake no te llama fake a ti; es la herramienta que te defiende del postureo."*
  * Para el hostelero con buena cocina: *"Demuestra que tu éxito proviene de tus fogones y no de pagar a un influencer de TikTok."*
  * Para el creador honesto: *"Demuestra con datos de clientes reales que no eres un vendido y que tus recomendaciones son de verdad excelentes."*
* **Fricción y Viralidad:** Un nombre plano como *GastroAudit* o *RestauranteCheck* carece de gancho en redes. **FoodieFake** despierta curiosidad inmediata, debate en comentarios y clics.

---

## 3. EL VÍNCULO CON SOCIALHATE: DE YOUTUBE A GOOGLE PLACES

### La Gran Oportunidad Comercial B2B
* **SocialHate (B2C / Viral):** Analiza comentarios tóxicos, ataques e insultos en vídeos de YouTube para entretenimiento, análisis social y salseo.
* **FoodieFake PRO (B2B / Facturación Directa):** Aplica la misma tecnología analítica a las **reseñas de Google Places**.
  * Para un restaurante, **una reseña de 1 estrella es dinero perdido**. Bajar de 4.3 a 3.9 estrellas reduce entre un 20% y un 30% las reservas semanales.
  * Trasladar el detector de toxicidad a Google Maps resuelve el dolor más grande del hostelero: **el odio injustificado, las pataletas desmedidas y las reseñas falsas**.

---

## 4. MÓDULO 1: FOODIEFAKE PÚBLICO / B2C
*(Diseñado para el comensal, espectador curioso y viralidad en redes)*

1. **Índice de Coherencia Hype vs. Realidad (%):**
   * Grado de coincidencia entre las afirmaciones del influencer en el vídeo (transcripción) y las calificaciones/opiniones de clientes en Google Places.
2. **Matriz Plato por Plato ("Qué Pedir vs. De Qué Huir"):**
   * Gemini extrae cada plato alabado por el creador y busca menciones específicas de ese plato en Google Maps.
   * Alertas semafóricas: platos con 5★ en la calle vs. platos que en Google acumulan quejas por venir fríos o congelados por dentro.
3. **Detector del Sablazo Oculto (Ghost Bill / Ticket Fantasma):**
   * Identifica si el influencer omitió convenientemente el precio real.
   * Calcula el coste real de una comida para 2 personas y extrae cobros trampa denunciados por comensales (ej: cobrar 3,50€ por pan no solicitado, agua a 4€, suplementos de terraza no avisados).
   * Métrica: **Ratio Hype por Euro (€)**.
4. **Radar de Alternativas Anti-Hype a <1 km:**
   * Si el restaurante auditado tiene baja coherencia o nota pobre (<3.8★), la IA recomienda automáticamente 2 locales cercanos con >4.5★ y mejor precio sin colas de postureo.
5. **Timeline del "Efecto Avalancha" (Masificación Post-Vídeo):**
   * Cruza la fecha de publicación del vídeo con la serie temporal de Google Maps.
   * Muestra la caída de puntuación en los 3 meses posteriores por colapso de cocina (*"el abrazo de la muerte"*).

---

## 5. MÓDULO 2: FOODIEFAKE PRO (SAAS B2B)
*(Plataforma de suscripción para restaurantes, bares y grupos gastronómicos)*

1. **Rayo X de Reputación por Departamentos (4 Fugas de Dinero):**
   * **Cocina:** Temperatura de servicio, puntos de carne, raciones, platos recalentados.
   * **Sala / Personal:** Tiempos de espera, atención de comanda, prisa excesiva por doblar mesas.
   * **Ticket / Cobro:** Quejas por suplementos de pan, cubierto, bebidas o postres caros.
   * **Instalaciones / Acústica:** Ruido excesivo, climatización, extracción de humos en ropa.
2. **Escudo Anti-Reseñas Falsas & Asesor de Impugnación ante Google:**
   * Detecta reseñas que vulneran las políticas oficiales de Google Maps (insultos directos, calumnias, bots, cuentas con 1 sola review histórica creadas para atacar).
   * **Generador de Alegato Legal:** Redacta con 1 clic el texto formal listo para pegar en la opción *"Denunciar reseña"* de Google Business Profile.
3. **Asistente Diplomático Anti-Hate (Respuestas IA con Gemini):**
   * Redacción estratégica de respuestas a reseñas negativas con 3 estilos:
     * *Fidelización & Disculpa:* Convierte clientes insatisfechos en comensales recuperados.
     * *Firme & Desarmante:* Desactiva a clientes tóxicos o maleducados con elegancia británica.
     * *Corporativa Aséptica:* Neutral para no dar visibilidad al troll.
4. **Auditoría de Inconsistencia: "VIP vs. Cliente Anónimo":**
   * Compara el trato servido al influencer (raciones gigantes, visita del dueño a la mesa) con las quejas de comensales anónimos, alertando al hostelero de la brecha operativa de su cocina.
5. **Detección de Turnos y Franjas Críticas:**
   * Localiza exactamente en qué turnos se desploma la nota (ej: *Lunes a Jueves 4.6★ vs. Domingos a las 15:00h 3.1★ por saturación*).
6. **Sello Físico y Digital "Gastronomía Real Verificada (0% Postureo)":**
   * Pack de adhesivos físicos con código QR para la puerta y cartas del local.
   * Widget embebible para la web y motor de reservas.

---

## 6. MÓDULO 3: FOODIEFAKE CREATOR (SUITE PARA CREADORES)
*(Herramientas de prestigio, scouting y blindaje para influencers gastronómicos)*

1. **Insignia de Credibilidad & Snippet Social Anti-Vendido:**
   * Certificado numérico de correspondencia con clientes reales (ej: *88% de Coherencia*).
   * Generador de texto para la caja de descripción de YouTube o bio de Instagram:  
     `🛡️ Canal Auditado por FoodieFake: 88% de Coherencia con comensales reales de Google Places.`
2. **Radar Preventivo Pre-Grabación (Fact-Check antes de ir):**
   * Buscador donde el creador mete un restaurante antes de aceptar una colaboración o visita.
   * Semáforo preventivo: platos seguros, platos trampa que suelen fallar y cobros abusivos que debe mencionar para no ser acusado de ocultar información.
3. **Auditoría del Discurso y Medidor de Postureo:**
   * Analiza la transcripción del audio del vídeo con IA.
   * Desglose entre **términos técnicos culinarios** (maduración, corte, punto, emulsión) vs. **hipérboles infladas** (*"brutal", "locura", "el mejor que he probado en mi vida"*).
   * Cálculo del **Índice de Objetividad Global**.
4. **Generador de Guiones de Réplica ("Detrás de Cámaras"):**
   * Redacta guiones automáticos de 30-45s para publicar un Reel/Short complementario:  
     *"Fui a X sitio... ¡y esto es lo que opinan los clientes que van de incógnito!"* (duplica el alcance del creador).

---

## 7. FEATURES DE ANÁLISIS AVANZADO E INTELIGENCIA MULTIMODAL

1. **Caza-Clickbait: Miniatura vs. Plato Real (Gemini Vision):**
   * Compara la saturación, volumen y filtros de la miniatura del vídeo frente a fotografías reales subidas por clientes a Google Maps.
   * Slider interactivo de expectativa vs. realidad.
2. **Detector de #Ad Oculto / Colaboración No Declarada:**
   * Escanea descripción, etiquetas y patrones verbales de la transcripción para calcular la **Probabilidad de Comida Gratis / Patrocinio No Declarado (0 a 100%)**.
3. **Detector de Reseñas Infladas y Bots en Google:**
   * Analiza picos repentinos de reseñas de 5★ sin texto tras la publicación del vídeo viral para destapar intentos del restaurante de inflar su nota.
4. **Detector de PornFood de Postureo (Efectismo vs. Calidad):**
   * Mide el recurso a trucos visuales vacíos: cascadas de cheddar procesado, humo de campana, jeringuillas con salsas y sopletes en mesa.
5. **Diccionario de Eufemismos Foodie (Traductor de Humo):**
   * Traductor interactivo:  
     * *"Ambiente íntimo"* ➔ *"Mesas pegadas y poca luz"*.  
     * *"Fusión arriesgada de autor"* ➔ *"Plato de 28€ con el que te quedas con hambre"*.  
     * *"Se deshace en la boca"* ➔ *"Grasa pura sin textura de carne"*.
6. **Simulador de Cuenta para 2 Personas:**
   * Algoritmo que calcula el coste real de replicar el vídeo incluyendo bebidas, cubierto, IVA, postre y café.
7. **Índice € / Gramo de Comida Noble:**
   * Contrasta si el precio pagado corresponde a producto noble (pescado fresco, carne madurada) o a rellenos industriales de bajo coste y alto margen (brioche, salsas emulsionadas, patatas congeladas).

---

## 8. GAMIFICACIÓN, RANKINGS Y DINÁMICAS VIRALES

1. **Batalla Creador vs. Calle (Votación Popular en Vivo):**
   * Módulo donde los usuarios de la comunidad votan si le dan la razón al influencer o a las opiniones de Google Maps.
2. **Ranking Público de Fiabilidad de Influencers:**
   * Clasificación de los foodies más honestos vs. los más proclives a inflar el hype, generando tracción orgánica en Twitter, TikTok y Reddit.
3. **Vídeos Verticales 9:16 Automatizados (Remotion + Voces Neuronales):**
   * Generación con 1 clic de vídeos listos para TikTok con las plantillas *FoodieRealityVideo*, *FoodiePresenterVideo* y *FoodieRankingVideo* (estilos Stargazer, Scroll, NBA e Inferno).

---

## 9. MODELO DE NEGOCIO, MONETIZACIÓN Y PRICING

| Producto | Público Objetivo | Modelo de Precio | Propuesta de Valor |
| :--- | :--- | :--- | :--- |
| **FoodieFake (Público)** | Usuarios, Comensales | Gratuito con anuncios / viral | Motor de captación, tráfico y marca. |
| **FoodieFake PRO Starter** | Locales individuales | 49 € / mes | Auditoría mensual de Google Maps, desglose por departamentos y alertas de turnos críticos. |
| **FoodieFake PRO Business** | Restaurantes consolidados | 99 € / mes | Escudo anti-reseñas falsas (alegatos), respuestas IA ilimitadas, pack de adhesivos QR físicos y auditoría post-influencers. |
| **FoodieFake PRO Enterprise** | Cadenas y franquicias | 199 € / mes (hasta 5 locales) | Comparativa entre sedes, panel multi-local centralizado, API e informes directos a dirección. |
| **FoodieFake Creator** | Influencers gastronómicos | Freemium (Badge básico gratis / Pro 29€/mes) | Radar pre-grabación ilimitado, informe público certificado y generador de réplicas. |

---

## 10. ESTADO ACTUAL DE IMPLEMENTACIÓN EN LA APLICACIÓN

* ✅ **Ruta `/foodie-reality` (o `/reality-check`):** Landing principal de FoodieFake con análisis de vídeos de YouTube, contraste con Google Places, cálculo de coherencia y accesos destacados a los nuevos portales.
* ✅ **Ruta `/foodie-pro` (o `/foodie-fake-pro`):** Portal SaaS B2B interactivo con selector de restaurantes demo (*Asador Real* y *La Brasería del Puerto*), auditoría por departamentos, escudo de impugnación legal, respuestas diplomáticas con IA, sello QR físico y tabla de precios.
* ✅ **Ruta `/foodie-creator` (o `/foodie-fake-creator`):** Portal para creadores con perfiles demo (*Cenando con Pablo* y *FoodieVip Spain*), sello social copiable, radar preventivo pre-grabación, auditoría de discurso y generador de guiones.
* ✅ **Ruta `/foodie-videos`:** Generador de vídeos verticales Remotion 9:16 con voces neuronales TTS para TikTok/Shorts.
* ✅ **Navegación Unificada:** Cabecera en todas las páginas conectando FoodieFake, PRO, Creator, Generador 9:16 y SocialHate.

---

## 11. ESTRATEGIA DE DOMINIOS Y EXPANSIÓN INTERNACIONAL

### ¿Vale la pena `foodiefake.es` o es mejor `.com`? ¿Afecta en Latinoamérica?
**Conclusión categórica:** El dominio principal **debe ser `.com`** (`foodiefake.com`). Un dominio `.es` sí perjudica sensiblemente tanto la percepción psicológica del usuario latinoamericano como el posicionamiento técnico en Google (SEO).

#### 1. Sesgo Técnico de Google (Geotargeting y SEO)
* **Los ccTLD (`.es`, `.mx`, `.ar`, `.co`) tienen geolocalización fija en Google:** Google asume automáticamente que una web `.es` va dirigida de forma exclusiva al público de España.
* Si un usuario busca en Google desde México, Colombia, Argentina o Chile *"mejores tacos CDMX"* o *"auditoría de reseñas"*, Google siempre priorizará resultados locales (`.mx`, `.co` o gTLDs genéricos como `.com`). Con un `.es`, competir en rankings de Google fuera de España es nadar a contracorriente.
* Con un `.com` (gTLD neutro), la web compite en igualdad de condiciones en todo el mundo hispanohablante.

#### 2. Barrera Psicológica y Desconexión del Usuario Latinoamericano
* Al ver un `.es`, el comensal o creador de Latinoamérica percibe inmediatamente: *"Esto es una página de España para españoles, no aplica a mi ciudad ni a mi moneda ni a mis restaurantes"*.
* El `.com` se percibe universal, global, moderno y tecnológicamente consolidado (estándar de Silicon Valley y startups globales).

#### 3. Proyección de Marca y Futura Inversión
* En rondas de inversión, patrocinios con grandes marcas o acuerdos con cadenas de restauración internacionales, un `.com` proyecta escala y solvencia, mientras que un `.es` encasilla el proyecto como una iniciativa estrictamente local.

#### 💡 Estrategia Maestra Recomendada:
1. **Dominio Principal Oficial:** **`foodiefake.com`** para la web, la app SaaS y las cuentas de correo corporativo.
2. **Protección de Marca (Defensivo):** Adquirir también **`foodiefake.es`** (coste habitual de 5€ a 10€/año) y configurar una **redirección permanente 301** hacia `foodiefake.com`.
   * *Ventaja:* Quien teclee `.es` por inercia desde España llegará al sitio oficial sin problemas, y se evita que competidores o terceros reserven la marca en España.
3. **Alternativas viables si el `.com` exacto estuviera ocupado:**
   * `getfoodiefake.com`
   * `foodiefakepro.com`
   * `thefoodiefake.com`
   * `foodiefake.app` (ideal para producto SaaS interactivo)

