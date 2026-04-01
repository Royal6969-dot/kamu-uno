export type TravelStyle = "adventure" | "culture" | "nature" | "relaxation";
export type Interest = "history" | "jungle" | "mountains" | "beaches";
export type GroupType = "solo" | "couple" | "family" | "friends";
export type Duration = "short" | "week" | "twoweeks" | "extended";

export interface QuizAnswers {
  style: TravelStyle;
  duration: Duration;
  group: GroupType;
  interest: Interest;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  tags: TravelStyle[];
  interests: Interest[];
  daysNeeded: number;
  highlights: string[];
  bestTime: string;
  difficulty: "easy" | "moderate" | "challenging";
  altitude?: string;
  scores: Record<TravelStyle, number>;
  interestScores: Record<Interest, number>;
  geoCluster: "lima" | "cusco" | "south" | "north" | "amazon";
  geoOrder: number; // for route ordering
}

export const destinations: Destination[] = [
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    region: "Cusco Region",
    tagline: "The Lost City of the Incas",
    description:
      "Perched at 2,430 meters above sea level and cloaked in morning mist, Machu Picchu is the crown jewel of the Inca Empire. This 15th-century citadel, declared a UNESCO World Heritage Site and one of the New Seven Wonders of the World, rises from the jungle-covered mountains in breathtaking splendor. Walk the same stones as ancient Inca priests, marvel at perfectly fitted stonework built without mortar, and watch the sun rise over the Andes in a moment you will never forget.",
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=900&q=85&fit=crop",
    tags: ["adventure", "culture"],
    interests: ["history", "mountains"],
    daysNeeded: 2,
    highlights: [
      "Sunrise at the Sun Gate (Inti Punku)",
      "Huayna Picchu or Machu Picchu Mountain hike",
      "Temple of the Sun & Intihuatana Stone",
      "Agricultural terraces and cloud forest",
    ],
    bestTime: "May to October",
    difficulty: "moderate",
    altitude: "2,430 m",
    scores: { adventure: 4, culture: 5, nature: 3, relaxation: 2 },
    interestScores: { history: 5, jungle: 0, mountains: 4, beaches: 0 },
    geoCluster: "cusco",
    geoOrder: 2,
  },
  {
    id: "cusco",
    name: "Cusco",
    region: "Cusco Region",
    tagline: "The Imperial Capital of the Incas",
    description:
      "Once the capital of the greatest empire in pre-Columbian America, Cusco is a living museum where Inca stonework forms the foundations of Spanish colonial churches and palaces. Walk cobblestone streets at 3,400 meters surrounded by baroque cathedrals, vibrant markets, and warm-hearted people in traditional dress. The Plaza de Armas pulses with street life day and night, while the Sacsayhuamán fortress looms over the city like a stone guardian. Cusco is both a gateway and a destination in itself.",
    image:
      "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=900&q=85&fit=crop",
    tags: ["culture", "relaxation"],
    interests: ["history"],
    daysNeeded: 2,
    highlights: [
      "Plaza de Armas and Cathedral",
      "Sacsayhuamán Inca fortress",
      "Qorikancha Temple of the Sun",
      "San Pedro Market and local cuisine",
    ],
    bestTime: "April to October",
    difficulty: "easy",
    altitude: "3,400 m",
    scores: { adventure: 2, culture: 5, nature: 1, relaxation: 3 },
    interestScores: { history: 5, jungle: 0, mountains: 2, beaches: 0 },
    geoCluster: "cusco",
    geoOrder: 1,
  },
  {
    id: "sacred-valley",
    name: "Sacred Valley",
    region: "Cusco Region",
    tagline: "Valley of the Inca Kings",
    description:
      "Stretching between the towns of Pisac and Ollantaytambo, the Sacred Valley of the Incas is a breathtaking corridor of terraced hillsides, rushing rivers, and ancient ruins. At a slightly lower altitude than Cusco, it serves as the perfect acclimatization stop and adventure hub. Explore the vast Pisac market brimming with artisan weavings, hike up to the sky-high ruins of Ollantaytambo, and visit traditional Andean villages where Quechua is still the first language.",
    image:
      "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=900&q=85&fit=crop",
    tags: ["culture", "nature", "adventure"],
    interests: ["history", "mountains"],
    daysNeeded: 2,
    highlights: [
      "Pisac archaeological site and Sunday market",
      "Ollantaytambo Inca fortress",
      "Moray circular terraces",
      "Maras salt mines",
    ],
    bestTime: "May to September",
    difficulty: "easy",
    altitude: "2,800 m",
    scores: { adventure: 3, culture: 4, nature: 4, relaxation: 3 },
    interestScores: { history: 4, jungle: 0, mountains: 3, beaches: 0 },
    geoCluster: "cusco",
    geoOrder: 0,
  },
  {
    id: "rainbow-mountain",
    name: "Rainbow Mountain",
    region: "Cusco Region",
    tagline: "Vinicunca — Colors of the Andes",
    description:
      "Vinicunca, or Rainbow Mountain, is one of Peru's most spectacular natural wonders. Striped in vivid bands of red, gold, green, and lavender — the result of mineral-rich sedimentary layers — this 5,200-meter peak was hidden under glaciers until just a decade ago. The hike through high-altitude puna grassland alongside llamas and alpacas, with snowcapped Ausangate looming in the distance, is one of the most surreal and rewarding experiences the Andes can offer.",
    image:
      "https://images.unsplash.com/photo-1547149694-e51ce8b5b3fa?w=900&q=85&fit=crop",
    tags: ["adventure", "nature"],
    interests: ["mountains"],
    daysNeeded: 1,
    highlights: [
      "Colorful mineral-striped peak at 5,200 m",
      "Trekking through Andean puna grassland",
      "Grazing llamas and alpacas en route",
      "Views of Mount Ausangate (6,384 m)",
    ],
    bestTime: "April to November",
    difficulty: "challenging",
    altitude: "5,200 m",
    scores: { adventure: 5, culture: 1, nature: 5, relaxation: 1 },
    interestScores: { history: 0, jungle: 0, mountains: 5, beaches: 0 },
    geoCluster: "cusco",
    geoOrder: 3,
  },
  {
    id: "lake-titicaca",
    name: "Lake Titicaca",
    region: "Puno Region",
    tagline: "The Highest Navigable Lake on Earth",
    description:
      "At 3,812 meters above sea level, Lake Titicaca shimmers like a piece of sky that fell to Earth. It is both the world's highest navigable lake and a sacred cradle of Andean civilization. Step aboard reed boats to visit the extraordinary Uros Floating Islands — man-made platforms of totora reeds occupied since pre-Inca times — and sail to Taquile Island, where communities still weave textiles recognized by UNESCO as Intangible Cultural Heritage. The lake's electric-blue waters and endless horizon are utterly otherworldly.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&fit=crop",
    tags: ["culture", "nature"],
    interests: ["history"],
    daysNeeded: 2,
    highlights: [
      "Uros Floating Reed Islands",
      "Taquile Island and traditional weaving communities",
      "Sunset over the altiplano",
      "Homestay with local families",
    ],
    bestTime: "May to September",
    difficulty: "easy",
    altitude: "3,812 m",
    scores: { adventure: 2, culture: 5, nature: 4, relaxation: 3 },
    interestScores: { history: 4, jungle: 0, mountains: 2, beaches: 1 },
    geoCluster: "south",
    geoOrder: 6,
  },
  {
    id: "colca-canyon",
    name: "Colca Canyon",
    region: "Arequipa Region",
    tagline: "Twice as Deep as the Grand Canyon",
    description:
      "Plunging over 3,270 meters deep, Colca Canyon is one of the deepest canyons on Earth. Far more than a geological marvel, it is a living Andean landscape of Pre-Inca terraces clinging to near-vertical walls, colonial-era churches in tiny villages, and hot springs steaming in the canyon floor. Rise early at the Cruz del Condor viewpoint to watch Andean condors — the world's largest flying bird — glide effortlessly on thermal currents at eye level. The silence here is prehistoric.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=85&fit=crop",
    tags: ["adventure", "nature"],
    interests: ["mountains"],
    daysNeeded: 2,
    highlights: [
      "Cruz del Condor — condor watching at sunrise",
      "Trekking 2-day descent to the canyon floor",
      "Pre-Inca terraces and colonial villages",
      "Natural hot springs (La Calera)",
    ],
    bestTime: "April to December",
    difficulty: "challenging",
    altitude: "3,287 m",
    scores: { adventure: 5, culture: 2, nature: 5, relaxation: 2 },
    interestScores: { history: 1, jungle: 0, mountains: 5, beaches: 0 },
    geoCluster: "south",
    geoOrder: 7,
  },
  {
    id: "amazon",
    name: "Amazon Rainforest",
    region: "Madre de Dios / Loreto",
    tagline: "The Lungs of the Earth",
    description:
      "Peru contains roughly 13% of the entire Amazon basin, including some of the most biodiverse and pristine jungle on the planet. Whether you fly into Puerto Maldonado near Manu Biosphere Reserve or venture deep into the northern Loreto region from Iquitos — a city accessible only by boat or plane — the experience is transformative. Spot pink river dolphins, giant river otters, macaws and howler monkeys, navigate oxbow lakes by canoe at dawn, and fall asleep to the symphony of the jungle.",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&q=85&fit=crop",
    tags: ["adventure", "nature"],
    interests: ["jungle"],
    daysNeeded: 3,
    highlights: [
      "Canoe ride on oxbow lakes at dawn",
      "Night walks spotting caimans and frogs",
      "Pink river dolphin watching",
      "Macaw clay lick (collpa) at sunrise",
    ],
    bestTime: "June to October (dry season)",
    difficulty: "moderate",
    scores: { adventure: 5, culture: 2, nature: 5, relaxation: 2 },
    interestScores: { history: 0, jungle: 5, mountains: 0, beaches: 0 },
    geoCluster: "amazon",
    geoOrder: 9,
  },
  {
    id: "huacachina",
    name: "Huacachina Oasis",
    region: "Ica Region",
    tagline: "An Oasis in the Heart of the Desert",
    description:
      "A palm-fringed lagoon nestled in a bowl of towering sand dunes — Huacachina looks like a mirage. This tiny oasis town, one of only a handful of natural desert oases in South America, is pure magic at sunset when the dunes glow burnt orange and amber. By day, race down 100-meter dunes on sandboards or barrel through them in dune buggies. By night, the sky above the desert is one of the clearest stargazing canvases in South America.",
    image:
      "https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=900&q=85&fit=crop",
    tags: ["adventure", "relaxation"],
    interests: ["beaches"],
    daysNeeded: 1,
    highlights: [
      "Dune buggy sunset ride",
      "Sandboarding on massive dunes",
      "Oasis swimming and relaxation",
      "Stargazing over the Atacama-edge desert",
    ],
    bestTime: "Year-round (avoid Jan–Feb rains)",
    difficulty: "easy",
    scores: { adventure: 4, culture: 1, nature: 3, relaxation: 4 },
    interestScores: { history: 0, jungle: 0, mountains: 1, beaches: 4 },
    geoCluster: "lima",
    geoOrder: 4,
  },
  {
    id: "lima",
    name: "Lima",
    region: "Lima Region",
    tagline: "Gastronomic Capital of Latin America",
    description:
      "Lima is a city of contrasts: sprawling and frenetic yet home to elegant cliffside neighborhoods, world-class museums, and the finest cuisine on the continent. Start in the Miraflores district where paragliders soar over the Pacific, walk to the historic center — a UNESCO World Heritage Site — to explore lavish colonial churches and the catacombs beneath them. Dine on ceviche, tiradito, and causa in restaurants that have earned global acclaim. Lima always surprises.",
    image:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=900&q=85&fit=crop",
    tags: ["culture", "relaxation"],
    interests: ["history", "beaches"],
    daysNeeded: 2,
    highlights: [
      "Larco Museum — world-class pre-Columbian art",
      "Miraflores cliffside parks and paragliding",
      "Historic center: Plaza Mayor and catacombs",
      "Ceviche and Peruvian fine dining",
    ],
    bestTime: "Year-round (Dec–Mar sunny, Jun–Nov misty)",
    difficulty: "easy",
    scores: { adventure: 1, culture: 5, nature: 1, relaxation: 5 },
    interestScores: { history: 4, jungle: 0, mountains: 0, beaches: 3 },
    geoCluster: "lima",
    geoOrder: 0,
  },
  {
    id: "nazca-lines",
    name: "Nazca Lines",
    region: "Ica Region",
    tagline: "Ancient Geoglyphs That Defy Explanation",
    description:
      "Etched into the Peruvian desert between 200 BCE and 700 CE, the Nazca Lines are one of archaeology's greatest mysteries. These massive geoglyphs — a hummingbird, a spider, a monkey, a condor — stretch for kilometers across the pampa and can only be fully appreciated from the air. Boarding a small plane over the desert is an unforgettable and slightly stomach-churning experience. The lines were declared a UNESCO World Heritage Site in 1994 and continue to fascinate and puzzle researchers worldwide.",
    image:
      "https://images.unsplash.com/photo-1609591469153-98ee52b9cc2c?w=900&q=85&fit=crop",
    tags: ["culture"],
    interests: ["history"],
    daysNeeded: 1,
    highlights: [
      "Overflight to see the geoglyphs from above",
      "Figures: hummingbird, spider, astronaut, monkey",
      "Cerro Blanco — highest sand dune in the world",
      "Chauchilla Cemetery — pre-Inca mummies",
    ],
    bestTime: "Year-round",
    difficulty: "easy",
    scores: { adventure: 2, culture: 5, nature: 1, relaxation: 2 },
    interestScores: { history: 5, jungle: 0, mountains: 0, beaches: 1 },
    geoCluster: "lima",
    geoOrder: 5,
  },
  {
    id: "arequipa",
    name: "Arequipa",
    region: "Arequipa Region",
    tagline: "The White City beneath Three Volcanoes",
    description:
      "Built from sillar — a pearlescent white volcanic stone that gives the city its nickname — Arequipa is one of Peru's most beautiful colonial cities. Set against three imposing volcanoes including the active Misti, the historic center is a UNESCO World Heritage Site. Explore the immense Santa Catalina Monastery, a walled city within a city splashed in terracotta and indigo, browse the city's world-famous picanterías serving traditional creole cuisine, and use the city as your base for Colca Canyon.",
    image:
      "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=900&q=85&fit=crop",
    tags: ["culture", "relaxation"],
    interests: ["history"],
    daysNeeded: 2,
    highlights: [
      "Santa Catalina Monastery — city within a city",
      "Plaza de Armas and sillar architecture",
      "Juanita the Ice Maiden (Andean Museum)",
      "El Misti Volcano backdrop views",
    ],
    bestTime: "April to November",
    difficulty: "easy",
    altitude: "2,335 m",
    scores: { adventure: 2, culture: 5, nature: 2, relaxation: 4 },
    interestScores: { history: 5, jungle: 0, mountains: 2, beaches: 0 },
    geoCluster: "south",
    geoOrder: 8,
  },
  {
    id: "paracas",
    name: "Paracas & Ballestas Islands",
    region: "Ica Region",
    tagline: "The Galápagos of Peru",
    description:
      "The Paracas Peninsula, where the Atacama Desert meets the Pacific Ocean in a collision of color and life, is one of South America's premier wildlife destinations. Speed boat to the Ballestas Islands — called the 'poor man's Galápagos' — to see thousands of Humboldt penguins, sea lions, pelicans, and Peruvian boobies nesting on dramatic sea stacks. The Reserve's rust-red cliffs, flamingo-dotted bays, and windswept beaches offer some of the most photogenic coastal scenery in the Americas.",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=85&fit=crop",
    tags: ["nature", "relaxation"],
    interests: ["beaches", "jungle"],
    daysNeeded: 1,
    highlights: [
      "Ballestas Islands boat tour — penguins and sea lions",
      "Paracas National Reserve desert-coast scenery",
      "Flamingo lagoon at Paracas Bay",
      "The Candelabra geoglyph seen from sea",
    ],
    bestTime: "October to March",
    difficulty: "easy",
    scores: { adventure: 3, culture: 1, nature: 5, relaxation: 4 },
    interestScores: { history: 1, jungle: 3, mountains: 0, beaches: 5 },
    geoCluster: "lima",
    geoOrder: 3,
  },
];

export const getDurationDays = (duration: Duration): number => {
  switch (duration) {
    case "short": return 4;
    case "week": return 7;
    case "twoweeks": return 14;
    case "extended": return 21;
  }
};

export const getDurationLabel = (duration: Duration): string => {
  switch (duration) {
    case "short": return "3–5 Days";
    case "week": return "1 Week";
    case "twoweeks": return "2 Weeks";
    case "extended": return "3+ Weeks";
  }
};

export function scoreDestinations(
  destinations: Destination[],
  answers: QuizAnswers
): Destination[] {
  return [...destinations]
    .map((d) => ({
      destination: d,
      score:
        d.scores[answers.style] * 2 +
        d.interestScores[answers.interest] * 2 +
        (answers.style === "relaxation" ? d.scores.relaxation : 0) +
        (answers.group === "family" && d.difficulty !== "challenging" ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.destination);
}
