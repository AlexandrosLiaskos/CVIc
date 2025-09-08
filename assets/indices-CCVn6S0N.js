var StandardParameterNames = /* @__PURE__ */ ((StandardParameterNames2) => {
  StandardParameterNames2["COASTAL_GEOMORPHOLOGY"] = "coastal_geomorphology";
  StandardParameterNames2["COASTAL_SLOPE"] = "coastal_slope";
  StandardParameterNames2["ROCK_TYPE"] = "rock_type";
  StandardParameterNames2["SEA_LEVEL_CHANGE"] = "sea_level_change";
  StandardParameterNames2["SHORELINE_CHANGE"] = "shoreline_change";
  StandardParameterNames2["MEAN_TIDE_RANGE"] = "mean_tide_range";
  StandardParameterNames2["MEAN_WAVE_HEIGHT"] = "mean_wave_height";
  StandardParameterNames2["BARRIER_TYPE"] = "barrier_type";
  StandardParameterNames2["SHORELINE_EXPOSURE"] = "shoreline_exposure";
  StandardParameterNames2["NATURAL_PROTECTION"] = "natural_protection";
  StandardParameterNames2["ECOSYSTEM_TYPE"] = "ecosystem_type";
  StandardParameterNames2["ENVIRONMENTAL_CONSERVANCY"] = "environmental_conservancy";
  StandardParameterNames2["INTEREST_SPECIES"] = "interest_species";
  StandardParameterNames2["LAND_USE"] = "land_use";
  StandardParameterNames2["BUILDING_COAST_RATIO"] = "building_coast_ratio";
  StandardParameterNames2["ECONOMIC_ACTIVITY"] = "economic_activity";
  StandardParameterNames2["ECONOMIC_VALUE"] = "economic_value";
  StandardParameterNames2["SOCIOCULTURAL_HERITAGE"] = "sociocultural_heritage";
  StandardParameterNames2["POPULATION_DENSITY"] = "population_density";
  StandardParameterNames2["INFRASTRUCTURE_DENSITY"] = "infrastructure_density";
  StandardParameterNames2["CULTURAL_HERITAGE"] = "cultural_heritage";
  StandardParameterNames2["USE_OF_TERRITORY"] = "use_of_territory";
  StandardParameterNames2["BEACH_WIDTH"] = "beach_width";
  StandardParameterNames2["DUNE_WIDTH"] = "dune_width";
  StandardParameterNames2["VEGETATION_DISTANCE"] = "vegetation_distance";
  StandardParameterNames2["DISTANCE_BUILT_STRUCTURES"] = "distance_built_structures";
  StandardParameterNames2["SEA_DEFENCES"] = "sea_defences";
  StandardParameterNames2["COMMERCIAL_PROPERTIES"] = "commercial_properties";
  StandardParameterNames2["RESIDENTIAL_PROPERTIES"] = "residential_properties";
  return StandardParameterNames2;
})(StandardParameterNames || {});
const CVIParameters = [
  {
    id: "cvi_coastal_geomorphology",
    standardName: StandardParameterNames.COASTAL_GEOMORPHOLOGY,
    indexId: "cvi-thieler-1999",
    indexSpecificName: "Geomorphology",
    description: "Coastal landform type",
    type: "categorical",
    weight: 1 / 6,
    // Equal weights for CVI
    required: true,
    rankingTable: [
      { value: 1, criteria: "Rocky, cliffed coasts / Fiords / Fiards", color: "#1a9850", label: "Very Low" },
      { value: 2, criteria: "Medium cliffs / Indented coasts", color: "#91cf60", label: "Low" },
      { value: 3, criteria: "Low cliffs / Glacial drift / Alluvial plains", color: "#fee08b", label: "Moderate" },
      { value: 4, criteria: "Cobble beaches / Estuary / Lagoon", color: "#fc8d59", label: "High" },
      { value: 5, criteria: "Barrier beaches / Sand beaches / Salt marsh / Mud flats / Deltas / Mangrove / Coral reefs", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "cvi_coastal_slope",
    standardName: StandardParameterNames.COASTAL_SLOPE,
    indexId: "cvi-thieler-1999",
    indexSpecificName: "Coastal Slope",
    description: "Regional coastal slope",
    type: "numerical",
    unit: "%",
    weight: 1 / 6,
    // Equal weights for CVI
    required: true,
    rankingTable: [
      { value: 1, criteria: ">14.7%", color: "#1a9850", label: "Very Low" },
      { value: 2, criteria: "10.9-14.6%", color: "#91cf60", label: "Low" },
      { value: 3, criteria: "7.2-10.8%", color: "#fee08b", label: "Moderate" },
      { value: 4, criteria: "3.6-7.1%", color: "#fc8d59", label: "High" },
      { value: 5, criteria: "<3.5%", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "cvi_sea_level_change",
    standardName: StandardParameterNames.SEA_LEVEL_CHANGE,
    indexId: "cvi-thieler-1999",
    indexSpecificName: "Relative Sea Level Change",
    description: "Historical rate of relative sea level change",
    type: "numerical",
    unit: "mm/yr",
    weight: 1 / 6,
    // Equal weights for CVI
    required: true,
    rankingTable: [
      { value: 1, criteria: "<1.8 mm/yr", color: "#1a9850", label: "Very Low" },
      { value: 2, criteria: "1.8-2.5 mm/yr", color: "#91cf60", label: "Low" },
      { value: 3, criteria: "2.5-3.4 mm/yr", color: "#fee08b", label: "Moderate" },
      { value: 4, criteria: "3.4-4.6 mm/yr", color: "#fc8d59", label: "High" },
      { value: 5, criteria: ">4.6 mm/yr", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "cvi_shoreline_change",
    standardName: StandardParameterNames.SHORELINE_CHANGE,
    indexId: "cvi-thieler-1999",
    indexSpecificName: "Shoreline Erosion/Accretion Rate",
    description: "Historical shoreline change rate",
    type: "numerical",
    unit: "m/yr",
    weight: 1 / 6,
    // Equal weights for CVI
    required: true,
    rankingTable: [
      { value: 1, criteria: ">2.0 m/yr (accretion)", color: "#1a9850", label: "Very Low" },
      { value: 2, criteria: "1.0-2.0 m/yr (accretion)", color: "#91cf60", label: "Low" },
      { value: 3, criteria: "-1.0 to +1.0 m/yr (stable)", color: "#fee08b", label: "Moderate" },
      { value: 4, criteria: "-2.0 to -1.0 m/yr (erosion)", color: "#fc8d59", label: "High" },
      { value: 5, criteria: "<-2.0 m/yr (erosion)", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "cvi_mean_tide_range",
    standardName: StandardParameterNames.MEAN_TIDE_RANGE,
    indexId: "cvi-thieler-1999",
    indexSpecificName: "Mean Tide Range",
    description: "Mean tidal range",
    type: "numerical",
    unit: "m",
    weight: 1 / 6,
    // Equal weights for CVI
    required: true,
    rankingTable: [
      { value: 1, criteria: ">6.0 m", color: "#1a9850", label: "Very Low" },
      { value: 2, criteria: "4.1-6.0 m", color: "#91cf60", label: "Low" },
      { value: 3, criteria: "2.1-4.0 m", color: "#fee08b", label: "Moderate" },
      { value: 4, criteria: "1.1-2.0 m", color: "#fc8d59", label: "High" },
      { value: 5, criteria: "0.0-1.0 m", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "cvi_mean_wave_height",
    standardName: StandardParameterNames.MEAN_WAVE_HEIGHT,
    indexId: "cvi-thieler-1999",
    indexSpecificName: "Mean Wave Height",
    description: "Mean significant wave height",
    type: "numerical",
    unit: "m",
    weight: 1 / 6,
    // Equal weights for CVI
    required: true,
    rankingTable: [
      { value: 1, criteria: "<0.55 m", color: "#1a9850", label: "Very Low" },
      { value: 2, criteria: "0.55-0.85 m", color: "#91cf60", label: "Low" },
      { value: 3, criteria: "0.85-1.05 m", color: "#fee08b", label: "Moderate" },
      { value: 4, criteria: "1.05-1.25 m", color: "#fc8d59", label: "High" },
      { value: 5, criteria: ">1.25 m", color: "#d73027", label: "Very High" }
    ]
  }
];
const CVIValidationRules = [
  {
    type: "parameter_count",
    message: "CVI requires exactly 6 parameters",
    validate: (parameters) => parameters.length === 6
  },
  {
    type: "formula_compatibility",
    message: "CVI uses true geometric mean with equal weights (no explicit weights needed)",
    validate: () => true
    // Enforced by index definition
  }
];
const CVIIndex = {
  id: "cvi-thieler-1999",
  name: "Coastal Vulnerability Index (CVI)",
  shortName: "CVI",
  description: "Physical coastal vulnerability index developed by Thieler et al. (1999) using 6 physical parameters with geometric mean calculation.",
  citation: `Thieler, E. R., & Hammar-Klose, E. S. (1999). National assessment of coastal vulnerability to sea-level rise: preliminary results for the US Atlantic coast. US Geological Survey Open-File Report 99-593.`,
  type: "true-index",
  formula: "cvi-geometric",
  // Default to geometric mean
  requiredParameters: CVIParameters,
  validationRules: CVIValidationRules,
  requiresEqualWeights: true,
  resultClassification: {
    // Standard CVI classification ranges (1-5 scale)
    absoluteRanges: [
      { min: 1, max: 1.8, label: "Very Low", color: "#1a9850" },
      { min: 1.8, max: 2.6, label: "Low", color: "#91cf60" },
      { min: 2.6, max: 3.4, label: "Moderate", color: "#fee08b" },
      { min: 3.4, max: 4.2, label: "High", color: "#fc8d59" },
      { min: 4.2, max: 5, label: "Very High", color: "#d73027" }
    ]
  },
  availableFormulas: [
    {
      id: "cvi-geometric",
      name: "Geometric Mean",
      description: "CVI = ⁿ√(∏Vi) - True geometric mean with equal weights for all parameters",
      type: "geometric"
    }
  ],
  notes: `* Uses true geometric mean calculation: CVI = ⁿ√(∏Vi) where n=6 parameters.
* All parameters have equal weights (1/6 each).
* Focuses on physical vulnerability factors only.
* Original methodology from Thieler & Hammar-Klose (1999).`
};
const ICVIParameters = [
  // Environmental Vulnerability Index (EVI) Parameters - 6 parameters
  {
    id: "icvi_geomorphological_features",
    standardName: StandardParameterNames.COASTAL_GEOMORPHOLOGY,
    indexId: "icvi-alcantara-2024",
    indexSpecificName: "Geomorphological Features",
    description: "Coastal geomorphological characteristics",
    type: "categorical",
    weight: 1 / 12,
    // 1/6 for EVI, then 1/2 for ICVI
    required: true,
    rankingTable: [
      { value: 0.1, criteria: "High cliffs, Cliff of coherent rocks", color: "#1a9850", label: "Very Low" },
      { value: 0.3, criteria: "Medium cliffs, Cliff of medium resistance rocks", color: "#91cf60", label: "Low" },
      { value: 0.5, criteria: "Low cliffs, Cliff on sedimentary formations, Cliff with high erodibility", color: "#fee08b", label: "Moderate" },
      { value: 0.7, criteria: "Extensive beaches attached to low-elevation coastal sedimentary plains", color: "#fc8d59", label: "High" },
      { value: 0.9, criteria: "Beaches attached to barrier island formations, tombolos, coastal arrows, deltas, Sectors in front of tidal or fluvial-tidal marshes", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "icvi_slope",
    standardName: StandardParameterNames.COASTAL_SLOPE,
    indexId: "icvi-alcantara-2024",
    indexSpecificName: "Slope",
    description: "Coastal slope percentage",
    type: "numerical",
    unit: "%",
    weight: 1 / 12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: "> 8%", color: "#1a9850", label: "Very Low" },
      { value: 0.3, criteria: "4-8%", color: "#91cf60", label: "Low" },
      { value: 0.5, criteria: "2-4%", color: "#fee08b", label: "Moderate" },
      { value: 0.7, criteria: "1-2%", color: "#fc8d59", label: "High" },
      { value: 0.9, criteria: "0-1%", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "icvi_shoreline_migration",
    standardName: StandardParameterNames.SHORELINE_CHANGE,
    indexId: "icvi-alcantara-2024",
    indexSpecificName: "Shoreline Migration Rate",
    description: "Rate of shoreline migration",
    type: "numerical",
    unit: "m/yr",
    weight: 1 / 12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: "> +2.0 m/yr", color: "#1a9850", label: "Very Low" },
      { value: 0.3, criteria: "+1.0 to +2.0 m/yr", color: "#91cf60", label: "Low" },
      { value: 0.5, criteria: "-1.0 to +1.0 m/yr", color: "#fee08b", label: "Moderate" },
      { value: 0.7, criteria: "-2.0 to -1.0 m/yr", color: "#fc8d59", label: "High" },
      { value: 0.9, criteria: "≤ -2.0 m/yr", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "icvi_ecosystem_type",
    standardName: StandardParameterNames.ECOSYSTEM_TYPE,
    indexId: "icvi-alcantara-2024",
    indexSpecificName: "Ecosystem Type",
    description: "Type of coastal ecosystem",
    type: "categorical",
    weight: 1 / 12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: "Without vegetation", color: "#1a9850", label: "Very Low" },
      { value: 0.3, criteria: "Coastal plain and coastal cliffs", color: "#91cf60", label: "Low" },
      { value: 0.5, criteria: "Shrub vegetation, stubble, grasslands", color: "#fee08b", label: "Moderate" },
      { value: 0.7, criteria: "Forests", color: "#fc8d59", label: "High" },
      { value: 0.9, criteria: "Strategic ecosystems: coastal lagoons, mangroves, coral reefs", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "icvi_conservation_measures",
    standardName: StandardParameterNames.ENVIRONMENTAL_CONSERVANCY,
    indexId: "icvi-alcantara-2024",
    indexSpecificName: "Environmental Conservancy Measures",
    description: "Level of environmental protection measures",
    type: "categorical",
    weight: 1 / 12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: "None", color: "#1a9850", label: "Very Low" },
      { value: 0.3, criteria: "Reserve zone for agrarian, fishing or hunting activities", color: "#91cf60", label: "Low" },
      { value: 0.5, criteria: "Regional or local conservation parks", color: "#fee08b", label: "Moderate" },
      { value: 0.7, criteria: "Biosphere reserve areas", color: "#fc8d59", label: "High" },
      { value: 0.9, criteria: "National Parks, RAMSAR sites", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "icvi_species_interest",
    standardName: StandardParameterNames.INTEREST_SPECIES,
    indexId: "icvi-alcantara-2024",
    indexSpecificName: "Presence of Interest Species",
    description: "Presence of species of conservation interest",
    type: "categorical",
    weight: 1 / 12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: "Ecosystems colonized by invasive species", color: "#1a9850", label: "Very Low" },
      { value: 0.3, criteria: "Ecosystems with invasive species with a normal population growth", color: "#91cf60", label: "Low" },
      { value: 0.5, criteria: "Ecosystems with normal population growth and high-value species", color: "#fee08b", label: "Moderate" },
      { value: 0.7, criteria: "Ecosystems with endemism and threatened species (VU, EN, CR) with active conservation programs", color: "#fc8d59", label: "High" },
      { value: 0.9, criteria: "Ecosystems with high quantity of endemism and high-value species", color: "#d73027", label: "Very High" }
    ]
  },
  // Socioeconomic Vulnerability Index (SVI) Parameters - 6 parameters
  {
    id: "icvi_land_use",
    standardName: StandardParameterNames.LAND_USE,
    indexId: "icvi-alcantara-2024",
    indexSpecificName: "Use of Territory",
    description: "Type of land use in coastal areas",
    type: "categorical",
    weight: 1 / 12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: "Natural areas, without buildings", color: "#1a9850", label: "Very Low" },
      { value: 0.3, criteria: "Rural areas", color: "#91cf60", label: "Low" },
      { value: 0.5, criteria: "Semi-urban areas with scattered buildings", color: "#fee08b", label: "Moderate" },
      { value: 0.7, criteria: "Urban areas", color: "#fc8d59", label: "High" },
      { value: 0.9, criteria: "Industrial areas", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "icvi_building_coast_ratio",
    standardName: StandardParameterNames.BUILDING_COAST_RATIO,
    indexId: "icvi-alcantara-2024",
    indexSpecificName: "Building Coast Ratio",
    description: "Ratio of built structures along the coast",
    type: "numerical",
    unit: "ratio",
    weight: 1 / 12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: "0", color: "#1a9850", label: "Very Low" },
      { value: 0.3, criteria: "0.0001-0.1", color: "#91cf60", label: "Low" },
      { value: 0.5, criteria: "0.1-0.5", color: "#fee08b", label: "Moderate" },
      { value: 0.7, criteria: "0.5-1.0", color: "#fc8d59", label: "High" },
      { value: 0.9, criteria: "> 1.0", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "icvi_population_density",
    standardName: StandardParameterNames.POPULATION_DENSITY,
    indexId: "icvi-alcantara-2024",
    indexSpecificName: "Population Density",
    description: "Population density in coastal areas",
    type: "numerical",
    unit: "pop/ha",
    weight: 1 / 12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: "≤ 20 pop/ha", color: "#1a9850", label: "Very Low" },
      { value: 0.3, criteria: "20-50 pop/ha", color: "#91cf60", label: "Low" },
      { value: 0.5, criteria: "50-80 pop/ha", color: "#fee08b", label: "Moderate" },
      { value: 0.7, criteria: "80-170 pop/ha", color: "#fc8d59", label: "High" },
      { value: 0.9, criteria: "> 170 pop/ha", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "icvi_economic_activity",
    standardName: StandardParameterNames.ECONOMIC_ACTIVITY,
    indexId: "icvi-alcantara-2024",
    indexSpecificName: "Socio-economic Activity",
    description: "Level of socio-economic activity",
    type: "categorical",
    weight: 1 / 12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: "None", color: "#1a9850", label: "Very Low" },
      { value: 0.3, criteria: "Low", color: "#91cf60", label: "Low" },
      { value: 0.5, criteria: "Moderate", color: "#fee08b", label: "Moderate" },
      { value: 0.7, criteria: "High", color: "#fc8d59", label: "High" },
      { value: 0.9, criteria: "Very high", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "icvi_economic_value",
    standardName: StandardParameterNames.ECONOMIC_VALUE,
    indexId: "icvi-alcantara-2024",
    indexSpecificName: "Economic Value",
    description: "Economic value of coastal areas",
    type: "numerical",
    unit: "€",
    weight: 1 / 12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: "0 - 10⁵ €", color: "#1a9850", label: "Very Low" },
      { value: 0.3, criteria: "10⁵ - 3.5×10⁵ €", color: "#91cf60", label: "Low" },
      { value: 0.5, criteria: "3.5×10⁵ - 6.5×10⁵ €", color: "#fee08b", label: "Moderate" },
      { value: 0.7, criteria: "6.5×10⁵ - 10⁶ €", color: "#fc8d59", label: "High" },
      { value: 0.9, criteria: "> 10⁶ €", color: "#d73027", label: "Very High" }
    ]
  },
  {
    id: "icvi_heritage",
    standardName: StandardParameterNames.SOCIOCULTURAL_HERITAGE,
    indexId: "icvi-alcantara-2024",
    indexSpecificName: "Archeologic and Historic Heritage",
    description: "Presence of archaeological and historic heritage",
    type: "categorical",
    weight: 1 / 12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: "None", color: "#1a9850", label: "Very Low" },
      { value: 0.3, criteria: "Local relevance", color: "#91cf60", label: "Low" },
      { value: 0.5, criteria: "Regional relevance", color: "#fee08b", label: "Moderate" },
      { value: 0.7, criteria: "National relevance", color: "#fc8d59", label: "High" },
      { value: 0.9, criteria: "World Heritage", color: "#d73027", label: "Very High" }
    ]
  }
];
const ICVIValidationRules = [
  {
    type: "parameter_count",
    message: "ICVI requires exactly 12 parameters (6 environmental + 6 socioeconomic)",
    validate: (parameters) => parameters.length === 12
  },
  {
    type: "weight_sum",
    message: "ICVI requires equal weights (1/12 each)",
    validate: (parameters, weights) => {
      if (!weights) return true;
      const expectedWeight = 1 / 12;
      const expectedCount = parameters.length;
      const weightValues = Object.values(weights);
      return weightValues.length === expectedCount && weightValues.every((w) => Math.abs(w - expectedWeight) < 1e-3);
    }
  },
  {
    type: "formula_compatibility",
    message: "ICVI must use composite formula",
    validate: () => true
    // Enforced by index definition
  }
];
const ICVIIndex = {
  id: "icvi-alcantara-2024",
  name: "Integrated Coastal Vulnerability Index (ICVI)",
  shortName: "ICVI",
  description: "Composite index combining Environmental Vulnerability Index (EVI) and Socioeconomic Vulnerability Index (SVI) developed by Alcántara-Carrió et al. (2024).",
  citation: `Alcántara-Carrió, J., García Echavarría, L. M., & Jaramillo-Vélez, A. (2024). Is the coastal vulnerability index a suitable index? Review and proposal of alternative indices for coastal vulnerability to sea level rise. Geo-Marine Letters, 44(1), 8. https://doi.org/10.1007/s00367-024-00770-9`,
  type: "composite-index",
  formula: "icvi-arithmetic",
  // Default to arithmetic mean
  requiredParameters: ICVIParameters,
  validationRules: ICVIValidationRules,
  requiresEqualWeights: true,
  resultClassification: {
    // Absolute range (global application) - Arithmetic mean formulas (Eq. I & III)
    absoluteRanges: [
      { min: 0, max: 0.2, label: "Very Low", color: "#1a9850" },
      { min: 0.2, max: 0.4, label: "Low", color: "#91cf60" },
      { min: 0.4, max: 0.6, label: "Moderate", color: "#fee08b" },
      { min: 0.6, max: 0.8, label: "High", color: "#fc8d59" },
      { min: 0.8, max: 1, label: "Very High", color: "#d73027" }
    ],
    // Corrected geometric mean ranges for 0.1-0.9 scale
    geometricRanges: [
      { min: 0.1, max: 0.26, label: "Very Low", color: "#1a9850" },
      { min: 0.26, max: 0.42, label: "Low", color: "#91cf60" },
      { min: 0.42, max: 0.58, label: "Moderate", color: "#fee08b" },
      { min: 0.58, max: 0.74, label: "High", color: "#fc8d59" },
      { min: 0.74, max: 0.9, label: "Very High", color: "#d73027" }
    ]
  },
  availableFormulas: [
    {
      id: "icvi-arithmetic",
      name: "Arithmetic Mean",
      description: "",
      type: "arithmetic"
    },
    {
      id: "icvi-geometric",
      name: "Geometric Mean",
      description: "",
      type: "geometric"
    }
  ],
  notes: `* Two calculation methods available: arithmetic mean (global application) and geometric mean.
* The classification of parameters into categories is derived from (Roukounis & Tsihrintzis, 2022).`
};
class IndexRegistry {
  static indices = /* @__PURE__ */ new Map([
    [CVIIndex.id, CVIIndex],
    [ICVIIndex.id, ICVIIndex]
  ]);
  /**
   * Get all available indices
   */
  static getAllIndices() {
    return Array.from(this.indices.values());
  }
  /**
   * Get index by ID
   */
  static getIndexById(id) {
    return this.indices.get(id);
  }
  /**
   * Get all parameters for all indices
   */
  static getAllParameters() {
    const allParameters = [];
    for (const index of this.indices.values()) {
      allParameters.push(...index.requiredParameters);
    }
    return allParameters;
  }
  /**
   * Get parameters for a specific index
   */
  static getParametersForIndex(indexId) {
    const index = this.getIndexById(indexId);
    return index ? index.requiredParameters : [];
  }
  /**
   * Find parameter by standard name across all indices
   */
  static getParameterByStandardName(standardName) {
    const allParameters = this.getAllParameters();
    return allParameters.find((p) => p.standardName === standardName);
  }
  /**
   * Get vulnerability value from parameter value
   */
  static getVulnerabilityFromValue(parameter, value) {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;
    if (parameter.type === "categorical") {
      const match = parameter.rankingTable.find(
        (rank) => rank.criteria.toLowerCase().includes(value.toString().toLowerCase())
      );
      return match ? match.value : 1;
    }
    for (const rank of parameter.rankingTable) {
      if (numericValue <= rank.value) {
        return rank.value;
      }
    }
    return parameter.rankingTable[parameter.rankingTable.length - 1].value;
  }
  /**
   * Validate parameters for an index
   */
  static validateIndexParameters(indexId, parameters, weights) {
    const index = this.getIndexById(indexId);
    if (!index) {
      return { isValid: false, errors: ["Index not found"] };
    }
    const errors = [];
    for (const rule of index.validationRules) {
      if (!rule.validate(parameters, weights)) {
        errors.push(rule.message);
      }
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  /**
   * Register a new index (for extensibility)
   */
  static registerIndex(index) {
    this.indices.set(index.id, index);
  }
  /**
   * Check if an index is registered
   */
  static hasIndex(id) {
    return this.indices.has(id);
  }
}
const STANDARDIZED_COASTAL_INDICES = IndexRegistry.getAllIndices();
IndexRegistry.getAllParameters();
const getStandardizedIndexById = (id) => IndexRegistry.getIndexById(id);
const validateIndexParameters = (indexId, parameters, weights) => IndexRegistry.validateIndexParameters(indexId, parameters, weights);
export {
  STANDARDIZED_COASTAL_INDICES as S,
  getStandardizedIndexById as g,
  validateIndexParameters as v
};
//# sourceMappingURL=indices-CCVn6S0N.js.map
