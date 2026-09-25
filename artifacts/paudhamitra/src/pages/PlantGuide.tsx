import { useState, useEffect } from "react";
import { Search, Sun, Droplets, Sprout, FlaskConical, Leaf } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import Papa from "papaparse";

interface PlantData {
  name: string;
  scientificName: string;
  image: string;
  planting: string;
  watering: string;
  sunlight: string;
  soil: string;
  fertilizer: string;
}

const plantDatabase: Record<string, PlantData> = {
  tomato: {
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    image: "https://images.pexels.com/photos/33499935/pexels-photo-33499935.jpeg",
    planting:
      "Plant tomato seeds in a seed tray or small pots and transplant seedlings when they are about 10-15 cm tall. Use a container of at least 30 cm diameter with good drainage. Provide a stake or support as the plant grows.",
    watering:
      "Water deeply when the top 2-3 cm of soil feels dry. In hot weather, container tomatoes may need watering daily. Water at the base and avoid keeping the soil constantly waterlogged.",
    sunlight:
      "Full sun with around 6-8 hours of direct sunlight daily. Good sunlight is important for flowering and fruit production.",
    soil:
      "Use fertile, well-draining soil enriched with compost or vermicompost. A slightly acidic to neutral soil around pH 6.0-6.8 works well.",
    fertilizer:
      "Add compost or vermicompost before planting. Feed with a balanced fertilizer every 2-3 weeks, and provide more phosphorus and potassium once flowering begins.",
  },

  rose: {
    name: "Rose",
    scientificName: "Rosa spp.",
    image: "https://images.pexels.com/photos/14297662/pexels-photo-14297662.jpeg",
    planting:
      "Plant roses in a container or garden bed with good drainage. Choose a pot large enough for the root system and leave sufficient space around the plant for air circulation.",
    watering:
      "Water deeply when the upper layer of soil begins to dry. Water at the base of the plant and avoid frequent wetting of the leaves.",
    sunlight:
      "Full sun with at least 5-6 hours of direct sunlight daily. Morning sunlight is particularly useful for drying foliage.",
    soil:
      "Rich, fertile and well-draining soil containing compost or other organic matter. Avoid heavy soil that remains waterlogged.",
    fertilizer:
      "Apply a balanced rose or flowering-plant fertilizer during active growth. Compost or vermicompost can also be added periodically.",
  },

  basil: {
    name: "Basil",
    scientificName: "Ocimum basilicum",
    image: "https://images.pexels.com/photos/5864225/pexels-photo-5864225.jpeg",
    planting:
      "Sow basil seeds directly in a pot or transplant young seedlings into a container with drainage holes. Keep plants around 20-30 cm apart when growing multiple plants.",
    watering:
      "Keep the soil consistently moist but not waterlogged. Water when the top layer begins to dry, especially during hot weather.",
    sunlight:
      "Provide around 6-8 hours of sunlight. In very hot climates, some afternoon shade can help prevent heat stress.",
    soil:
      "Use light, fertile and well-draining potting soil enriched with compost. Avoid compacted soil.",
    fertilizer:
      "Apply a mild balanced liquid fertilizer every 3-4 weeks during active growth. Avoid excessive fertilizer because it can reduce leaf aroma.",
  },

  monstera: {
    name: "Monstera",
    scientificName: "Monstera deliciosa",
    image: "https://images.pexels.com/photos/31533981/pexels-photo-31533981.jpeg",
    planting:
      "Grow Monstera in a container with drainage holes and a loose, well-draining potting mix. Repot when roots become crowded, usually every 1-2 years.",
    watering:
      "Water when the top 2-5 cm of soil becomes dry. Allow excess water to drain completely and reduce watering during cooler months.",
    sunlight:
      "Bright indirect light is ideal. Avoid strong direct afternoon sunlight because it can scorch the leaves.",
    soil:
      "Use an airy mixture containing potting soil, coco peat, perlite and organic material. Good drainage is essential.",
    fertilizer:
      "Apply a balanced liquid fertilizer approximately once a month during spring and summer. Reduce or stop feeding during periods of slow growth.",
  },

  lavender: {
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    image: "https://images.pexels.com/photos/128883/lavender-flowers-purple-flowers-blue-flowers-128883.jpeg",
    planting:
      "Plant lavender in a container with excellent drainage. Choose a sunny location and avoid placing the plant in a pot where water collects.",
    watering:
      "Allow the soil to dry between waterings. Water deeply but less frequently rather than keeping the soil constantly wet.",
    sunlight:
      "Full sun with approximately 6-8 hours of direct sunlight daily.",
    soil:
      "Use sandy or gritty, fast-draining soil. Lavender performs poorly in heavy, water-retaining soil.",
    fertilizer:
      "Lavender generally requires little fertilizer. A small amount of slow-release fertilizer or compost in spring is usually sufficient.",
  },

  chilli: {
    name: "Chilli",
    scientificName: "Capsicum annuum",
    image: "https://images.pexels.com/photos/10607850/pexels-photo-10607850.jpeg",
    planting:
      "Start chilli seeds in small containers and transplant healthy seedlings into a 25-30 cm pot. Choose compact varieties for balconies and small gardens.",
    watering:
      "Keep the soil moderately moist. Water when the top 2-3 cm becomes dry, increasing frequency during hot weather and fruit formation.",
    sunlight:
      "Provide 5-7 hours of direct sunlight daily. Good sunlight encourages flowering and fruit production.",
    soil:
      "Use fertile, loose and well-draining soil mixed with compost or vermicompost.",
    fertilizer:
      "Feed every 2-3 weeks with a balanced fertilizer. Once flowering begins, a fertilizer with relatively higher phosphorus and potassium can support fruiting.",
  },

  brinjal: {
    name: "Brinjal",
    scientificName: "Solanum melongena",
    image: "https://images.pexels.com/photos/16732700/pexels-photo-16732700.jpeg",
    planting:
      "Grow brinjal seedlings in a large container of around 30-40 cm diameter. Choose compact varieties for small gardens and provide support if required.",
    watering:
      "Keep soil evenly moist but never waterlogged. Water deeply whenever the upper soil layer starts to dry.",
    sunlight:
      "Full sun with approximately 6-8 hours of direct sunlight daily.",
    soil:
      "Use fertile, well-draining soil enriched with compost or vermicompost.",
    fertilizer:
      "Apply compost before planting and feed with a balanced fertilizer every 2-3 weeks during active growth and fruiting.",
  },

  okra: {
    name: "Okra",
    scientificName: "Abelmoschus esculentus",
    image: "https://images.pexels.com/photos/17975554/pexels-photo-17975554.jpeg",
    planting:
      "Sow okra seeds directly in a deep container because the plant develops a strong root system. Use a container of around 30 cm or more and avoid disturbing young roots unnecessarily.",
    watering:
      "Water regularly when the top layer of soil becomes dry. Increase watering during hot and dry weather.",
    sunlight:
      "Full sun with at least 6 hours of direct sunlight daily.",
    soil:
      "Use fertile, loose and well-draining soil containing compost or vermicompost.",
    fertilizer:
      "Add compost before planting and apply a balanced fertilizer every 3-4 weeks. Avoid excessive nitrogen because it can encourage leaves over pods.",
  },

  capsicum: {
    name: "Capsicum",
    scientificName: "Capsicum annuum",
    image: "https://images.pexels.com/photos/28352592/pexels-photo-28352592.jpeg",
    planting:
      "Transplant healthy capsicum seedlings into a 30 cm or larger container with good drainage. Use compact varieties when space is limited.",
    watering:
      "Keep the soil evenly moist. Water when the upper layer begins to dry and avoid prolonged waterlogging.",
    sunlight:
      "Provide around 6-8 hours of sunlight daily for good flowering and fruit development.",
    soil:
      "Use fertile, well-draining soil enriched with compost or vermicompost.",
    fertilizer:
      "Feed with a balanced fertilizer every 2-3 weeks during active growth. Increase potassium during flowering and fruiting.",
  },

  radish: {
    name: "Radish",
    scientificName: "Raphanus sativus",
    image: "https://images.pexels.com/photos/6761088/pexels-photo-6761088.jpeg",
    planting:
      "Sow radish seeds directly into a shallow but wide container. Use loose soil so the developing roots can expand without obstruction.",
    watering:
      "Keep the soil consistently moist but not saturated. Irregular watering can result in poor or cracked roots.",
    sunlight:
      "Around 4-6 hours of sunlight daily is suitable. Morning sunlight is particularly useful in warmer climates.",
    soil:
      "Use loose, sandy or loamy soil free of large stones and clumps. Good drainage is important for healthy roots.",
    fertilizer:
      "Mix compost into the soil before sowing. Avoid excessive nitrogen fertilizer because it can encourage leafy growth instead of root development.",
  },

  carrot: {
    name: "Carrot",
    scientificName: "Daucus carota",
    image: "https://images.pexels.com/photos/1306559/pexels-photo-1306559.jpeg",
    planting:
      "Sow carrot seeds directly into a deep container with loose soil. Choose shorter or round carrot varieties for small-scale container gardening.",
    watering:
      "Keep the soil evenly moist during germination and root development. Water when the surface begins to dry.",
    sunlight:
      "Provide around 5-7 hours of sunlight daily.",
    soil:
      "Use loose, fine-textured and well-draining soil without stones or compacted sections so roots can develop properly.",
    fertilizer:
      "Mix a moderate amount of compost into the soil before sowing. Avoid excessive nitrogen fertilizer.",
  },

  spinach: {
    name: "Spinach",
    scientificName: "Spinacia oleracea",
    image: "https://images.pexels.com/photos/8845078/pexels-photo-8845078.jpeg",
    planting:
      "Sow spinach seeds in a wide container or planter. Scatter seeds lightly and thin seedlings after germination to prevent overcrowding.",
    watering:
      "Keep the soil consistently moist. Water when the surface begins to dry, especially in warm weather.",
    sunlight:
      "Around 3-6 hours of sunlight is generally suitable. Protect plants from intense afternoon heat in very hot climates.",
    soil:
      "Use fertile, moisture-retentive but well-draining soil enriched with compost or vermicompost.",
    fertilizer:
      "Add compost before sowing. A mild nitrogen-containing fertilizer can be applied during active leaf growth if necessary.",
  },

  fenugreek: {
    name: "Fenugreek",
    scientificName: "Trigonella foenum-graecum",
    image: "https://images.pexels.com/photos/37657373/pexels-photo-37657373.jpeg",
    planting:
      "Sow fenugreek seeds directly in a shallow, wide container. The seeds can be planted fairly close together when growing for leafy greens.",
    watering:
      "Keep the soil lightly and consistently moist, especially during germination. Avoid excessive watering.",
    sunlight:
      "Provide around 3-5 hours of sunlight or bright morning light.",
    soil:
      "Use loose, fertile and well-draining potting soil with compost or vermicompost.",
    fertilizer:
      "Compost mixed into the soil before sowing is generally sufficient. Avoid heavy fertilization for short leafy-green crops.",
  },

  coriander: {
    name: "Coriander",
    scientificName: "Coriandrum sativum",
    image: "https://images.pexels.com/photos/10329642/pexels-photo-10329642.jpeg",
    planting:
      "Sow coriander seeds directly into a wide, shallow container. Lightly crush whole coriander seeds before sowing to improve germination.",
    watering:
      "Keep the soil consistently moist but avoid standing water. Water gently to avoid disturbing the seeds.",
    sunlight:
      "Around 3-5 hours of sunlight, preferably morning sunlight, works well in warm climates.",
    soil:
      "Use loose, fertile and well-draining soil containing compost or vermicompost.",
    fertilizer:
      "A compost-rich potting mix is usually sufficient. If growth is weak, apply a mild balanced fertilizer during active growth.",
  },

  mint: {
    name: "Mint",
    scientificName: "Mentha spp.",
    image: "https://images.pexels.com/photos/36435666/pexels-photo-36435666.jpeg",
    planting:
      "Mint grows easily from rooted cuttings. Plant it in a separate container because it spreads quickly and can crowd other plants.",
    watering:
      "Keep the soil consistently moist. Mint dries out quickly in small containers, especially during hot weather.",
    sunlight:
      "Bright indirect light or around 3-5 hours of morning sunlight is suitable. Protect from harsh afternoon heat.",
    soil:
      "Use moisture-retentive but well-draining soil enriched with compost.",
    fertilizer:
      "Apply a mild balanced fertilizer once every 4-6 weeks during active growth. Regular harvesting also encourages new growth.",
  },

  curryLeaf: {
    name: "Curry Leaf",
    scientificName: "Murraya koenigii",
    image: "https://images.pexels.com/photos/11757902/pexels-photo-11757902.jpeg",
    planting:
      "Start with a healthy nursery plant or established sapling and transplant it into a deep container with drainage. Curry leaf plants need more root space as they mature.",
    watering:
      "Water deeply when the upper soil layer becomes dry. Reduce watering during cooler periods and never allow the pot to remain waterlogged.",
    sunlight:
      "Provide around 5-7 hours of direct sunlight daily for strong growth.",
    soil:
      "Use fertile, well-draining soil mixed with compost or vermicompost. Avoid heavy clay-like soil.",
    fertilizer:
      "Feed with compost or vermicompost every 4-6 weeks during active growth. A balanced fertilizer can also be used periodically.",
  },

  lemongrass: {
    name: "Lemongrass",
    scientificName: "Cymbopogon citratus",
    image: "https://images.pexels.com/photos/12564402/pexels-photo-12564402.png",
    planting:
      "Plant rooted lemongrass stalks or young plants in a medium to large container. Leave enough space for the clump to expand.",
    watering:
      "Keep the soil moderately moist during establishment. Once established, water when the upper soil begins to dry.",
    sunlight:
      "Full sun with around 5-7 hours of direct sunlight daily.",
    soil:
      "Use fertile, loose and well-draining soil containing compost or organic matter.",
    fertilizer:
      "Apply compost or a balanced fertilizer every 4-6 weeks during active growth.",
  },

  greenBeans: {
    name: "Green Beans",
    scientificName: "Phaseolus vulgaris",
    image: "https://images.pexels.com/photos/17975550/pexels-photo-17975550.jpeg",
    planting:
      "Sow bean seeds directly in a container. Bush varieties are easier for small spaces, while climbing varieties need a trellis or vertical support.",
    watering:
      "Keep the soil evenly moist, especially during flowering and pod formation. Avoid excessive waterlogging.",
    sunlight:
      "Provide approximately 6-8 hours of sunlight daily.",
    soil:
      "Use fertile, well-draining soil enriched with compost. Good drainage is essential.",
    fertilizer:
      "Add compost before planting. Avoid excessive nitrogen because beans can produce abundant leaves at the expense of pods.",
  },

  cucumber: {
    name: "Cucumber",
    scientificName: "Cucumis sativus",
    image: "https://images.pexels.com/photos/7543157/pexels-photo-7543157.jpeg",
    planting:
      "Sow cucumber seeds directly in a large container. Provide a trellis or vertical support so vines can grow upward and save space.",
    watering:
      "Cucumbers need consistent moisture. Water deeply when the surface begins to dry, especially during flowering and fruit formation.",
    sunlight:
      "Provide 6-8 hours of sunlight daily.",
    soil:
      "Use rich, fertile and well-draining soil with plenty of compost or vermicompost.",
    fertilizer:
      "Apply compost before planting and feed with a balanced fertilizer every 2-3 weeks during active growth and fruiting.",
  },

  strawberry: {
    name: "Strawberry",
    scientificName: "Fragaria × ananassa",
    image: "https://images.pexels.com/photos/277262/pexels-photo-277262.jpeg",
    planting:
      "Plant strawberry crowns or healthy nursery plants in containers with good drainage. Keep the crown at soil level and provide adequate spacing between plants.",
    watering:
      "Keep the soil consistently moist but not waterlogged. Water at the base and avoid prolonged wetness around the fruit.",
    sunlight:
      "Around 6-8 hours of direct sunlight is ideal for flowering and fruit production.",
    soil:
      "Use fertile, slightly acidic and well-draining soil rich in organic matter.",
    fertilizer:
      "Use a balanced fertilizer during establishment and switch to a fruiting fertilizer during flowering and fruit development. Follow product instructions to avoid overfeeding.",
  },

  marigold: {
    name: "Marigold",
    scientificName: "Tagetes spp.",
    image: "https://images.pexels.com/photos/14304140/pexels-photo-14304140.jpeg",
    planting:
      "Sow marigold seeds in small pots or seed trays and transplant healthy seedlings into containers with drainage. Remove spent flowers to encourage more blooms.",
    watering:
      "Water when the top layer of soil begins to dry. Avoid keeping the soil constantly wet.",
    sunlight:
      "Full sun with around 5-7 hours of direct sunlight daily.",
    soil:
      "Use loose, fertile and well-draining soil enriched with compost.",
    fertilizer:
      "Apply a balanced or flowering-plant fertilizer every 3-4 weeks during active growth. Avoid excessive nitrogen.",
  },

  jasmine: {
    name: "Jasmine",
    scientificName: "Jasminum spp.",
    image: "https://images.pexels.com/photos/7477559/pexels-photo-7477559.jpeg",
    planting:
      "Plant jasmine in a container with good drainage and provide a trellis or support for climbing varieties. Choose a container large enough for long-term root growth.",
    watering:
      "Water deeply when the upper soil layer becomes dry. Increase watering during hot weather but avoid waterlogging.",
    sunlight:
      "Provide around 5-6 hours of sunlight daily. Good light encourages flowering.",
    soil:
      "Use fertile, well-draining soil containing compost or other organic matter.",
    fertilizer:
      "Feed with a balanced fertilizer every 4-6 weeks during active growth. A flowering fertilizer can be used when buds develop.",
  },

  aloeVera: {
    name: "Aloe Vera",
    scientificName: "Aloe vera",
    image: "https://images.pexels.com/photos/15725408/pexels-photo-15725408.jpeg",
    planting:
      "Plant aloe vera in a pot with drainage holes. Use a container only slightly larger than the root system and repot when offsets or roots become crowded.",
    watering:
      "Allow the soil to dry completely or almost completely between waterings. Overwatering is one of the most common causes of aloe root rot.",
    sunlight:
      "Provide bright light and several hours of sunlight. Gradually acclimatize plants to strong direct sunlight.",
    soil:
      "Use cactus or succulent soil with excellent drainage. Adding coarse sand or perlite can improve drainage.",
    fertilizer:
      "Use a diluted succulent fertilizer once or twice during the active growing season. Heavy fertilization is unnecessary.",
  },

  moneyPlant: {
    name: "Money Plant",
    scientificName: "Epipremnum aureum",
    image: "https://images.pexels.com/photos/35350353/pexels-photo-35350353.jpeg",
    planting:
      "Money plant can be grown from stem cuttings in soil or water. For soil growing, use a pot with drainage holes and a loose potting mix.",
    watering:
      "Water when the upper 2-3 cm of soil becomes dry. Reduce watering in low-light or cooler conditions.",
    sunlight:
      "Bright indirect light is ideal. It can tolerate lower light, although growth may become slower and leaf variegation may reduce.",
    soil:
      "Use a loose, well-draining indoor potting mix containing coco peat, perlite and organic matter.",
    fertilizer:
      "Apply a diluted balanced liquid fertilizer approximately once a month during active growth.",
  },

  snakePlant: {
    name: "Snake Plant",
    scientificName: "Dracaena trifasciata",
    image: "https://images.pexels.com/photos/14771840/pexels-photo-14771840.jpeg",
    planting:
      "Plant snake plants in a container with drainage holes using a loose succulent-style potting mix. Choose a pot only slightly larger than the root system.",
    watering:
      "Allow the soil to dry substantially between waterings. Water less frequently in low light and cooler conditions.",
    sunlight:
      "Bright indirect light is ideal, but snake plants can tolerate lower-light indoor locations.",
    soil:
      "Use fast-draining succulent or cactus soil. Avoid dense soil that retains water around the roots.",
    fertilizer:
      "Apply a diluted balanced fertilizer once every 2-3 months during active growth. Avoid over-fertilizing.",
  },
};

export function PlantGuide() {
  const [searchQuery, setSearchQuery] = useState("");
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [csvData, setCsvData] = useState<Record<string, string>[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("/api/dataset/Indoor_Plant_Health_and_Growth_Factors.csv")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch CSV");
        return response.text();
      })
      .then((csvString) => {
        const results = Papa.parse<Record<string, string>>(csvString, {
          header: true,
          skipEmptyLines: true,
        });
        setCsvData(results.data);
      })
      .catch((err) => console.log("CSV not available:", err));
  }, []);

  const searchPlant = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    setNotFound(false);
    setPlantData(null);

    const dbMatch = Object.entries(plantDatabase).find(([key, plant]) =>
      key.includes(query) || plant.name.toLowerCase().includes(query)
    );

    if (dbMatch) {
      setPlantData(dbMatch[1]);
      return;
    }

    if (csvData.length > 0) {
      const csvMatch = csvData.find(
        (row) =>
          row.Plant_ID && row.Plant_ID.toLowerCase().includes(query)
      );

      if (csvMatch) {
        setPlantData({
          name: csvMatch.Plant_ID || query,
          scientificName: csvMatch.Species || "",
          image: `https://images.unsplash.com/photo-1416879595882-3373a0480b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080`,
          planting: `Plant in well-prepared soil. Optimal temperature: ${csvMatch.Room_Temperature_C || "20-25"}°C.`,
          watering: `Water every ${csvMatch.Watering_Frequency_days || "3-5"} days with approximately ${csvMatch.Watering_Amount_ml || "200"}ml.`,
          sunlight: csvMatch.Sunlight_Exposure || "Moderate indirect light recommended.",
          soil: `Maintain soil moisture around ${csvMatch["Soil_Moisture_%"] || "50"}%.`,
          fertilizer: `Fertilizer usage: ${csvMatch.Fertilizer_Used === "Yes" ? "Regular fertilization recommended" : "Minimal fertilization needed"}.`,
        });
        return;
      }
    }

    setNotFound(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") searchPlant();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Plant Care Guide
          </h1>
          <p className="text-lg text-foreground/70">
            Search for detailed care instructions for your plants
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                placeholder="Search for a plant (e.g., tomato, rose, basil)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>
            <button
              onClick={searchPlant}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors font-medium shadow-md"
            >
              Search
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-foreground/60">Try:</span>
            {[
  "Tomato",
  "Rose",
  "Basil",
  "Monstera",
  "Lavender",
  "Chilli",
  "Brinjal",
  "Okra",
  "Capsicum",
  "Radish",
  "Carrot",
  "Spinach",
  "Fenugreek",
  "Coriander",
  "Mint",
  "Curry Leaf",
  "Lemongrass",
  "Green Beans",
  "Cucumber",
  "Strawberry",
  "Marigold",
  "Jasmine",
  "Aloe Vera",
  "Money Plant",
  "Snake Plant",
].map((plant) => (
              <button
                key={plant}
                onClick={() => {
                  setSearchQuery(plant.toLowerCase());
                  const key = plant.toLowerCase();
                  if (plantDatabase[key]) {
                    setPlantData(plantDatabase[key]);
                    setNotFound(false);
                  }
                }}
                className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
              >
                {plant}
              </button>
            ))}
          </div>
        </div>

        {notFound && (
          <div className="bg-card rounded-2xl border border-border p-8 text-center">
            <Leaf className="w-12 h-12 text-primary/40 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Plant Not Found</h3>
            <p className="text-foreground/60">
             We don't have information for "{searchQuery}" yet.Try searching for one of our 25 supported home-gardening plants.
            </p>
          </div>
        )}

        {plantData && (
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            {plantData.image && (
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={plantData.image}
                  alt={plantData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">{plantData.name}</h2>
                {plantData.scientificName && (
                  <p className="text-foreground/60 italic">{plantData.scientificName}</p>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sprout className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Planting Instructions</h3>
                    <p className="text-foreground/70 leading-relaxed">{plantData.planting}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Watering Schedule</h3>
                    <p className="text-foreground/70 leading-relaxed">{plantData.watering}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sun className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Sunlight Requirement</h3>
                    <p className="text-foreground/70 leading-relaxed">{plantData.sunlight}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Soil Type</h3>
                    <p className="text-foreground/70 leading-relaxed">{plantData.soil}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Fertilizer Recommendation</h3>
                    <p className="text-foreground/70 leading-relaxed">{plantData.fertilizer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
