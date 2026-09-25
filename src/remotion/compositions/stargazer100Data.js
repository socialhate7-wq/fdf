// 100 Curated YouTube Controversy Videos (Ordered from #100 to #1)
// Designed for the rapid Stargazer flow

const AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=120&h=120&fit=crop&q=80",
];

const THUMBNAILS = [
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=960&h=540&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=960&h=540&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=960&h=540&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=960&h=540&fit=crop&q=80",
  "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=960&h=540&fit=crop&q=80",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=960&h=540&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=960&h=540&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=960&h=540&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=960&h=540&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=960&h=540&fit=crop&q=80",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=960&h=540&fit=crop&q=80",
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=960&h=540&fit=crop&q=80",
];

// Raw titles and creators for generating 100 items from #100 up to #1
const CREATORS_AND_TITLES = [
  // 100 to 91 (Mild controversies, 14% - 21%)
  { channel: "Luzu", title: "Mi opinión sincera sobre los nuevos streamers de Twitch", hate: 14 },
  { channel: "Mangel", title: "Por qué ya casi no subo vídeos a YouTube", hate: 15 },
  { channel: "Alexby11", title: "Aclarando lo que pasó en el servidor de Rust", hate: 16 },
  { channel: "Staxx", title: "La verdad sobre mi distanciamiento con Willyrex", hate: 16 },
  { channel: "Folagor03", title: "Perdí el Nuzlocke por un fallo injusto del juego", hate: 17 },
  { channel: "Mikecrack", title: "Respondiendo a las críticas sobre el contenido infantil", hate: 18 },
  { channel: "Nil Ojeda", title: "Nos colamos en un evento privado y casi nos arrestan", hate: 19 },
  { channel: "Ampeterby7", title: "Por qué decidí no participar en La Velada 4", hate: 20 },
  { channel: "IlloJuan", title: "Hablemos de la toxicidad en el chat de Twitch", hate: 20 },
  { channel: "Rivers GG", title: "Mi respuesta al robo en La Velada del Año 3", hate: 21 },

  // 90 to 81 (22% - 29%)
  { channel: "Spreen", title: "Aclarando mi sanción en los Squid Craft Games", hate: 22 },
  { channel: "Cry", title: "La verdad detrás del ship con Yeri Mua", hate: 23 },
  { channel: "DJMaRiiO", title: "Me quejo de EA Sports y me banean la cuenta", hate: 24 },
  { channel: "Quackity", title: "El drama con el servidor QSMP y los traductores", hate: 25 },
  { channel: "ElMariana", title: "Por qué cancelé mi viaje a España a última hora", hate: 26 },
  { channel: "Roier", title: "Respondiendo a los comentarios tóxicos de Twitter", hate: 27 },
  { channel: "Plex", title: "La polémica con la capibara y por qué la devolví", hate: 28 },
  { channel: "Mostopapi", title: "Respondemos preguntas incómodas sin filtro", hate: 28 },
  { channel: "Tiparraco", title: "Nos echan de un centro comercial por esta broma", hate: 29 },
  { channel: "Wismichu", title: "El documental de Torrente que enfadó a Santiago Segura", hate: 29 },

  // 80 to 71 (30% - 37%)
  { channel: "Yao Cabrera", title: "Fingí mi secuestro para conseguir visitas (Explicación)", hate: 30 },
  { channel: "Coscu", title: "Hablo sobre las acusaciones que me hicieron en stream", hate: 31 },
  { channel: "Westcol", title: "Mis declaraciones sobre Ibagué y las disculpas públicas", hate: 32 },
  { channel: "Duki", title: "Paré el concierto porque me tiraron un móvil a la cara", hate: 33 },
  { channel: "Kevsho", title: "La realidad de ser influencer cuando nadie te apoya", hate: 34 },
  { channel: "PedritoVM", title: "Por qué dejé de hablar con mis mejores amigos de YouTube", hate: 35 },
  { channel: "RodSquare", title: "El declive de los canales de salseo en Argentina", hate: 35 },
  { channel: "Bnet", title: "Por qué me retiré de las batallas de FMS para siempre", hate: 36 },
  { channel: "Chuty", title: "La final robada en Red Bull Batalla Internacional", hate: 37 },
  { channel: "Gazir", title: "Respondiendo a los que dicen que me escriben las rimas", hate: 37 },

  // 70 to 61 (38% - 46%)
  { channel: "Jordi Wild", title: "RESPONDO A TODAS LAS POLÉMICAS (De una vez por todas)", hate: 38 },
  { channel: "Skone", title: "Lo que nadie sabe de los contratos en las ligas de freestyle", hate: 39 },
  { channel: "Papo MC", title: "Mi bronca con el jurado tras la última jornada", hate: 40 },
  { channel: "Mister Ego", title: "Le digo en la cara a todos los raperos lo que pienso", hate: 41 },
  { channel: "Arkano", title: "La verdad de mi paso por MasterChef Celebrity", hate: 42 },
  { channel: "Sweet Pain", title: "No me presento a la batalla y explico mis motivos", hate: 43 },
  { channel: "elrubiusOMG", title: "Explicando lo que pasó con mis impuestos en Andorra", hate: 44 },
  { channel: "Force", title: "Los insultos que recibo a diario por mi físico", hate: 45 },
  { channel: "Zasko Master", title: "El freestyle actual ha perdido toda la métrica real", hate: 45 },
  { channel: "Blon", title: "El día que casi me retiro por culpa de los jueces", hate: 46 },

  // 60 to 51 (47% - 55%)
  { channel: "Sara Socas", title: "El machismo en la escena urbana española (Sin pelos)", hate: 47 },
  { channel: "Walls", title: "Dejé el rap para hacer pop y mis fans me odiaron", hate: 48 },
  { channel: "BTA", title: "La doble moral de los organizadores de eventos", hate: 49 },
  { channel: "byViruZz", title: "La verdad sobre el positivo en el test de La Velada", hate: 50 },
  { channel: "Errecé", title: "Me deben miles de euros por competir en torneos", hate: 51 },
  { channel: "Hander", title: "El tongo más descarado de la historia de FMS", hate: 52 },
  { channel: "Klan", title: "La calle contra el negocio de las multinacionales", hate: 53 },
  { channel: "Stuart", title: "No quiero ser campeón si las decisiones son políticas", hate: 54 },
  { channel: "Frank Cuesta Oficial", title: "Por qué cierro el santuario y abandono España", hate: 55 },
  { channel: "Marithea", title: "Respondiendo al hate racista que recibo en redes", hate: 56 },

  // 50 to 41 (57% - 65%)
  { channel: "Larrix", title: "El show que hice no fue entendido por el público", hate: 57 },
  { channel: "Mecha", title: "Discutí en directo con los jueces y no me arrepiento", hate: 58 },
  { channel: "Invert", title: "Diez años después, sigo aguantando que me llamen tongo", hate: 59 },
  { channel: "Tirpa", title: "La depresión que me provocaron las críticas de YouTube", hate: 60 },
  { channel: "Mnak", title: "Por qué rechacé la invitación a la liga internacional", hate: 61 },
  { channel: "Willyrex", title: "Mi respuesta a las acusaciones de estafa con los NFTs", hate: 62 },
  { channel: "Jesus LC", title: "La mafia de los eventos clandestinos de freestyle", hate: 63 },
  { channel: "Le33", title: "Las amenazas que recibí tras ganar la clasificatoria", hate: 64 },
  { channel: "Ibai Llanos", title: "La polémica con el precio de las entradas de La Velada", hate: 64 },
  { channel: "Mounts", title: "Me acusaron de plagio y demuestro mi inocencia", hate: 65 },

  // 40 to 31 (66% - 73%)
  { channel: "Barón", title: "El jurado favoreció claramente al freestyler local", hate: 66 },
  { channel: "Vivi", title: "El acoso selectivo que sufrimos los nuevos talentos", hate: 67 },
  { channel: "Gerard Piqué", title: "Aclarando el conflicto con Casillas y Kings League", hate: 68 },
  { channel: "Segrelles", title: "Revelando las votaciones secretas de los árbitros", hate: 69 },
  { channel: "Jado PV", title: "Por qué abandoné las redes en mi mejor momento", hate: 70 },
  { channel: "Navalha", title: "La hipocresía de los creadores que van de humildes", hate: 71 },
  { channel: "Kensuke", title: "El día que me pegaron por hacer una rima en directo", hate: 71 },
  { channel: "Botta", title: "Desmiento las mentiras de mi ex-mánager sobre el dinero", hate: 72 },
  { channel: "Dani", title: "El freestyle me arruinó la salud mental y la vida", hate: 73 },
  { channel: "AuronPlay", title: "El problema real con los funados y la cultura de cancelación", hate: 74 },

  // 30 to 21 (75% - 82%)
  { channel: "Compare Flow", title: "Me expulsaron del torneo sin darme explicaciones", hate: 75 },
  { channel: "Mark", title: "La verdad detrás del veto que sufrí durante dos años", hate: 76 },
  { channel: "Tader", title: "Respondo al vídeo de difamación que me hicieron", hate: 77 },
  { channel: "Michu", title: "Los patrocinadores me retiraron el dinero por este tweet", hate: 78 },
  { channel: "Dalas Review", title: "Desmantelando la mayor estafa de Twitch (Caso Definitivo)", hate: 79 },
  { channel: "Mario VI", title: "Filtraron mis conversaciones privadas para hundirme", hate: 80 },
  { channel: "Neko", title: "Por qué borré todos mis vídeos antiguos del canal", hate: 80 },
  { channel: "Kavvo", title: "La discográfica me robó los derechos de mis canciones", hate: 81 },
  { channel: "Lit Killah", title: "Aclarando el choque de coche y la polémica policial", hate: 81 },
  { channel: "TheGrefg", title: "Mi error con los premios ESLAND y los desahucios de Andorra", hate: 82 },

  // 20 to 11 (83% - 89%)
  { channel: "Biyin_", title: "Pido perdón por los tweets y el humor negro del pasado", hate: 83 },
  { channel: "El Cejas", title: "Cobré por publicitar una página de apuestas y me equivoqué", hate: 84 },
  { channel: "Peluchin Entertainment", title: "El vídeo que provocó que me cerraran todas las cuentas", hate: 85 },
  { channel: "WindyGirk", title: "YouTube me destruyó el canal por culpa de los haters", hate: 86 },
  { channel: "Mexivergas", title: "Me burlo de los terremotos y me denuncian penalmente", hate: 87 },
  { channel: "Dabiz Muñoz", title: "Cobro 450€ por menú porque mi comida es arte, no necesidad", hate: 88 },
  { channel: "Soy una Pringada", title: "Odio a todos los influencers de Instagram (Sin filtro)", hate: 88 },
  { channel: "Reset", title: "El vídeo de la galleta con pasta de dientes al mendigo", hate: 89 },
  { channel: "Badabun", title: "Ex-empleados revelan el acoso laboral masivo en la empresa", hate: 89 },
  { channel: "Naim Darrechi", title: "Mis declaraciones machistas en el podcast de Mostopapi", hate: 90 },

  // 10 to 1 (Top 10 - The Deceleration Climax, 91% - 98%)
  { channel: "Amadeo Lladós", title: "Tienes panza y eres un mileurista fracasado (Masterclass)", hate: 91 },
  { channel: "Álvaro Reyes", title: "Técnicas de seducción callejera que indignaron a España", hate: 92 },
  { channel: "Borja Escalona", title: "No voy a pagar la empanadilla y me da igual que me grabes", hate: 93 },
  { channel: "Dalas Review", title: "Denuncio a 15 youtubers a la vez y muestro las demandas", hate: 94 },
  { channel: "Willyrex", title: "Comprad mis monos NFT o seréis pobres en el metaverso", hate: 94 },
  { channel: "TheGrefg", title: "La anciana del edificio de Andorra tenía que irse", hate: 95 },
  { channel: "Frank Cuesta", title: "Mi bronca a gritos con Yuyee por el dinero del santuario", hate: 95 },
  { channel: "Borja Escalona", title: "Me cuelo en el metro de Madrid y amenazo a los guardias", hate: 96 },
  { channel: "AuronPlay & Biyin", title: "El directo de explicaciones sobre el acoso en Twitter", hate: 97 },
  { channel: "ElXokas", title: "Tengo 5 cuentas secundarias para insultar en Twitter (CathyVipi)", hate: 98 },
];

export const STARGAZER_100_VIDEOS = CREATORS_AND_TITLES.map((item, index) => {
  const rank = 100 - index;
  const avatarIndex = index % AVATARS.length;
  const thumbIndex = index % THUMBNAILS.length;

  return {
    rank,
    channel_name: item.channel,
    video_title: item.title,
    hate_percentage: item.hate,
    view_count: `${(Math.floor((100 - rank * 0.7) * 95000 + 400000)).toLocaleString()}`,
    comment_count: `${(Math.floor((item.hate * 850) + 1200)).toLocaleString()}`,
    avatar_url: AVATARS[avatarIndex],
    thumbnail_url: THUMBNAILS[thumbIndex],
    verified: rank <= 40 || rank % 3 === 0,
    duration: `${Math.floor((index * 7) % 35 + 8)}:${String((index * 13) % 60).padStart(2, '0')}`,
    date: rank < 10 ? "Polémica Histórica" : `Hace ${Math.floor((index % 11) + 2)} meses`,
  };
});
