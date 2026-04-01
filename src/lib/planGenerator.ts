import { Destination, QuizAnswers, getDurationDays } from "./data";

export interface PlanDay {
  day: number;
  location: string;
  title: string;
  description: string;
  activities: string[];
  accommodation: string;
  meal: string;
  tip: string;
  isTravel?: boolean;
  travelNote?: string;
}

export interface TravelPlan {
  days: PlanDay[];
  totalDays: number;
  destinations: Destination[];
  summary: string;
  highlights: string[];
}

const travelConnections: Record<string, Record<string, string>> = {
  lima: {
    cusco: "Fly Lima → Cusco (1.5h) — book in advance, depart morning",
    south: "Drive Lima → Paracas (4h) or Ica/Huacachina (5h)",
    amazon: "Fly Lima → Puerto Maldonado via Cusco",
  },
  cusco: {
    south: "Bus Cusco → Puno → Arequipa (scenic Andean route, 6h)",
    amazon: "Fly Cusco → Puerto Maldonado (45 min) — very easy day trip hub",
    lima: "Fly Cusco → Lima (1.5h)",
  },
  south: {
    lima: "Bus/drive Arequipa or Puno → Lima via coast",
    cusco: "Bus Puno → Cusco (6h scenic)",
  },
  amazon: {
    cusco: "Fly Puerto Maldonado → Cusco (45 min)",
    lima: "Fly Puerto Maldonado → Lima (1.5h via Cusco)",
  },
};

function getTransfer(fromCluster: string, toCluster: string): string {
  return (
    travelConnections[fromCluster]?.[toCluster] ||
    `Transfer from ${fromCluster} to ${toCluster} region`
  );
}

const destinationActivities: Record<
  string,
  { morningActivity: string; afternoonActivity: string; eveningActivity: string; extraDay?: string[] }
> = {
  "machu-picchu": {
    morningActivity: "Arrive by train/bus, enter citadel at opening — walk the Classic Circuit and visit the Temple of the Sun, Royal Tomb, and Intihuatana Stone",
    afternoonActivity: "Explore the agricultural terraces and Sun Temple; hike to the Sun Gate (Inti Punku) for panoramic views",
    eveningActivity: "Return to Aguas Calientes — dinner and soak in the hot springs town",
    extraDay: [
      "Early start: Huayna Picchu Mountain hike (steep, 1.5h up) for bird's-eye views over the citadel",
      "Alternative: Machu Picchu Mountain trail for broader Andean panoramas",
    ],
  },
  "cusco": {
    morningActivity: "Arrive and acclimatize; gentle walk around Plaza de Armas, visit the Cathedral and Qorikancha (Temple of the Sun)",
    afternoonActivity: "Hike or taxi up to Sacsayhuamán fortress overlooking the city; explore San Blas artisan neighborhood",
    eveningActivity: "Dinner at a traditional picanterías — try lomo saltado, cuy chactado, or chicha morada",
    extraDay: [
      "Half-day tour of lesser-known ruins: Tambomachay, Puca Pucara, and Qenqo",
      "San Pedro Market — buy textiles, local fruits, and mingle with locals",
    ],
  },
  "sacred-valley": {
    morningActivity: "Pisac archaeological site early (beat crowds); explore the massive terraced ruins and views over the valley",
    afternoonActivity: "Pisac artisan market — textiles, ceramics, and silver jewelry. Drive to Ollantaytambo",
    eveningActivity: "Overnight in Ollantaytambo — explore the fortress at sunset by golden light",
    extraDay: [
      "Moray circular terracing and Maras salt mines — half-day 4WD tour",
      "Chinchero village — market day (Sun/Thu/Tue) with traditional weaving demonstrations",
    ],
  },
  "rainbow-mountain": {
    morningActivity: "Depart Cusco 4:30 AM; 2h drive to trailhead. Begin the 6km ascent through alpaca grassland at 4,200m",
    afternoonActivity: "Summit at Red Valley viewpoint — witness the mineral rainbow stripes of Vinicunca in full color",
    eveningActivity: "Return to Cusco. Rest and rehydrate after the high-altitude day",
  },
  "lake-titicaca": {
    morningActivity: "Boat to Uros Floating Reed Islands — meet families who live on totora reed platforms, learn how islands are built and maintained",
    afternoonActivity: "Continue by boat to Taquile Island; hike the terraced hillsides and visit the central plaza",
    eveningActivity: "Optional homestay on Taquile or Amantaní island with a local family — dinner and traditional textiles",
    extraDay: [
      "Visit Sillustani chullpas (pre-Inca funerary towers) on the drive to/from Puno",
      "Explore Puno's main square and vibrant local market",
    ],
  },
  "colca-canyon": {
    morningActivity: "Drive from Arequipa via high-altitude puna at 4,910m — stop at Patapampa pass; arrive at Cruz del Condor by 9 AM to watch condors soar",
    afternoonActivity: "Explore the canyon rim villages of Yanque or Chivay; visit the thermal baths at La Calera",
    eveningActivity: "Overnight in Chivay; dinner with Andean folk music at local restaurant",
    extraDay: [
      "Two-day trekking option: descend 1,200m to the canyon floor, cross the river, and hike to the oasis village of Sangalle",
      "Return hike up via the opposite wall — one of South America's great canyon treks",
    ],
  },
  amazon: {
    morningActivity: "Fly to Puerto Maldonado; transfer by motorboat into the jungle. Dawn canoe paddle on an oxbow lake — spot caimans and dozens of bird species",
    afternoonActivity: "Guided rainforest walk — learn to identify medicinal plants, insects, and the sounds of the canopy. Sunset at the treetop observation tower",
    eveningActivity: "Night walk with headlamps — spot tarantulas, tree frogs, and giant walking sticks in the undergrowth",
    extraDay: [
      "Sunrise visit to the Blanquillo macaw clay lick (collpa) — watch hundreds of macaws and parrots descend at dawn",
      "Canopy zipline and platform walk in the jungle canopy",
      "Visit to a local community to learn about traditional Amazon culture and forest management",
    ],
  },
  huacachina: {
    morningActivity: "Arrive in Ica; relax by the oasis lagoon surrounded by 100m sand dunes. Explore the town and the Huacachina lagoon edge",
    afternoonActivity: "Dune buggy adventure into the dunes — race up and down mega-dunes at sunset speed",
    eveningActivity: "Sandboarding at golden hour, then watch the sky turn crimson and violet over the dunes. Dinner at a lakeshore restaurant",
  },
  lima: {
    morningActivity: "Larco Museum in Pueblo Libre — world-class pre-Columbian gold, ceramics, and erotic pottery collection",
    afternoonActivity: "Historic Centro: Plaza Mayor, Government Palace, Santo Domingo convent, and the catacombs under San Francisco church",
    eveningActivity: "Miraflores cliffside park (Parque del Amor); dinner at a recommended cevichería for the best ceviche of your life",
    extraDay: [
      "Barranco neighborhood walking tour — bohemian art galleries, the Bridge of Sighs, and oceanfront cafés",
      "Paragliding over the Pacific cliffs from Miraflores",
      "Day trip to Pachacamac pre-Inca ruins (30 min from Lima)",
    ],
  },
  "nazca-lines": {
    morningActivity: "Small-plane overflight over the Nazca Pampa — see the hummingbird, spider, whale, astronaut, and monkey geoglyphs from the air",
    afternoonActivity: "Visit Chauchilla Cemetery with preserved pre-Inca mummies, then the Nazca Lines interpretive museum",
    eveningActivity: "Relax in Nazca town; optional astronomy tour at night with a local guide",
  },
  arequipa: {
    morningActivity: "Santa Catalina Monastery — wander the cobalt-blue and terracotta walled city within a city, built in 1579",
    afternoonActivity: "Plaza de Armas with the baroque Cathedral; Museo Santuarios Andinos to see Juanita, the Ice Maiden",
    eveningActivity: "Dinner at a traditional picantería; sunset view of El Misti volcano from the rooftops",
    extraDay: [
      "Day trip to the countryside: Yanahuara viewpoint arch framing El Misti volcano; Sabandia mill",
      "Cooking class featuring Arequipeño specialties: rocoto relleno and adobo",
    ],
  },
  paracas: {
    morningActivity: "Early boat tour to Ballestas Islands — see the Candelabra geoglyph from the sea, then mass colonies of penguins, sea lions, and seabirds",
    afternoonActivity: "4WD tour through Paracas National Reserve — crimson cliffs, natural arches, and flamingo lagoons",
    eveningActivity: "Sunset over the Pacific at Playa Roja (Red Beach); seafood dinner in Paracas town",
  },
};

function buildDaysForDestination(
  destination: Destination,
  startDay: number,
  prevCluster: string | null,
  daysAvailable: number
): PlanDay[] {
  const days: PlanDay[] = [];
  let currentDay = startDay;

  // Travel day between distant clusters
  if (prevCluster && prevCluster !== destination.geoCluster) {
    const travelNote = getTransfer(prevCluster, destination.geoCluster);
    days.push({
      day: currentDay++,
      location: `En Route to ${destination.name}`,
      title: `Travel Day — Journey to ${destination.region}`,
      description: `Today you transfer between regions. Use the travel time to enjoy changing landscapes and arrive ready to explore.`,
      activities: [
        travelNote,
        "Pack and check out; store luggage if needed",
        "Arrive at next destination, check in, rest and rehydrate",
        "Evening orientation walk or dinner in the new location",
      ],
      accommodation: `Hotel in ${destination.name}`,
      meal: "Lunch on the road; dinner at destination",
      tip: "Book transport in advance — buses and trains can sell out weeks ahead.",
      isTravel: true,
      travelNote,
    });
  }

  const acts = destinationActivities[destination.id];
  const daysToSpend = Math.min(daysAvailable, destination.daysNeeded);

  // Day 1 at destination
  days.push({
    day: currentDay++,
    location: destination.name,
    title: `Discover ${destination.name}`,
    description: `Your first full day in ${destination.name} — ${destination.tagline.toLowerCase()}. Take it at your own pace and soak in the atmosphere.`,
    activities: acts
      ? [acts.morningActivity, acts.afternoonActivity, acts.eveningActivity]
      : [
          `Explore the highlights of ${destination.name}`,
          `Guided tour or self-guided walk`,
          `Local dinner and rest`,
        ],
    accommodation: `Recommended hotel in ${destination.name}`,
    meal: `Try local specialties — ask your hotel for the best spots`,
    tip: `Tip: ${destination.altitude ? `The altitude here is ${destination.altitude} — go slow on arrival.` : `Hire a local guide for richer insight.`}`,
  });

  // Extra days
  if (daysToSpend > 1 && acts?.extraDay) {
    const extraActivities = acts.extraDay;
    days.push({
      day: currentDay++,
      location: destination.name,
      title: `${destination.name} — Deeper Exploration`,
      description: `A second day to go further and slower. Choose activities that match your energy and interests.`,
      activities: [...extraActivities, `Afternoon at leisure or visit local market`],
      accommodation: `Same hotel in ${destination.name}`,
      meal: `Try a different restaurant today — ask locals for their favorite`,
      tip: `Best time for photos: golden hour at sunrise or 1 hour before sunset.`,
    });
  }

  return days;
}

export function generatePlan(
  selectedDestinations: Destination[],
  answers: QuizAnswers
): TravelPlan {
  const totalDays = getDurationDays(answers.duration);

  // Sort destinations by geo cluster order for a logical route
  const sorted = [...selectedDestinations].sort(
    (a, b) => a.geoOrder - b.geoOrder
  );

  // Distribute days across destinations
  const totalDestDays = sorted.reduce((sum, d) => sum + d.daysNeeded, 0);
  const travelDays = new Set<string>();
  let prevCluster: string | null = null;
  for (const d of sorted) {
    if (prevCluster && prevCluster !== d.geoCluster) {
      travelDays.add(`${prevCluster}-${d.geoCluster}`);
    }
    prevCluster = d.geoCluster;
  }
  const numTravelDays = travelDays.size;
  const freeDays = Math.max(0, totalDays - totalDestDays - numTravelDays);

  const days: PlanDay[] = [];
  let currentDay = 1;
  prevCluster = null;

  // Add arrival day if lima is not the first destination
  if (sorted[0]?.id !== "lima" && sorted[0]?.geoCluster === "cusco") {
    days.push({
      day: currentDay++,
      location: "Lima",
      title: "Arrival in Peru",
      description:
        "Welcome to Peru! Today is for arrival and settling in. Lima's Jorge Chávez airport is the main international gateway.",
      activities: [
        "Arrive at Lima airport; transfer to hotel",
        "Rest and acclimatize — avoid altitude medication until Cusco",
        "Evening walk along Miraflores cliffs (Parque del Amor)",
        "First taste of Peruvian ceviche at a local restaurant",
      ],
      accommodation: "Hotel in Miraflores, Lima",
      meal: "Welcome dinner: classic ceviche and a pisco sour",
      tip: "Stay hydrated and rest on arrival day — you'll need energy for what's ahead!",
    });
  }

  for (const dest of sorted) {
    const newDays = buildDaysForDestination(
      dest,
      currentDay,
      prevCluster,
      dest.daysNeeded
    );
    days.push(...newDays);
    currentDay += newDays.length;
    prevCluster = dest.geoCluster;
  }

  // Add departure day
  if (days.length < totalDays) {
    days.push({
      day: currentDay,
      location: "Lima",
      title: "Farewell to Peru",
      description:
        "Your final morning in Peru. Time for last-minute souvenirs, a final coffee in a colonial square, or a leisurely breakfast before your flight home.",
      activities: [
        "Morning at leisure — last coffee and pastries in a café",
        "Last-minute shopping: alpaca goods, pisco, and ceramics",
        "Transfer to Lima airport for departure",
        "Carry home the memories of a lifetime",
      ],
      accommodation: "Airport hotel or direct flight",
      meal: "Farewell breakfast and departure",
      tip: "Arrive at Lima airport 3 hours before international flights.",
    });
  }

  // Trim or pad to totalDays
  const finalDays = days.slice(0, totalDays);

  const highlights = selectedDestinations
    .flatMap((d) => d.highlights.slice(0, 1))
    .slice(0, 6);

  const summary = `Your ${totalDays}-day Peru adventure spans ${sorted.length} extraordinary destination${sorted.length > 1 ? "s" : ""} — from ${sorted[0]?.name || "Peru's highlights"} to ${sorted[sorted.length - 1]?.name || "the Andes"}. This journey is crafted for ${answers.style === "adventure" ? "thrill-seekers" : answers.style === "culture" ? "history lovers" : answers.style === "nature" ? "nature enthusiasts" : "those seeking wonder and rest"}, traveling ${answers.group === "solo" ? "solo" : answers.group === "couple" ? "as a couple" : answers.group === "family" ? "as a family" : "with friends"}.`;

  return { days: finalDays, totalDays, destinations: sorted, summary, highlights };
}
