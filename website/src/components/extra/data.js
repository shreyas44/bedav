const data = {
  localities: {
    "bengaluru-ka": {
      categories: {
        "pri hos": "Private Hospital",
        "gov hos": "Government Hospital",
        "pri med": "Private Medical College",
        "gov med": "Government Medical College",
        covid: "Covid Care Centre",
      },
      mobileCategories: {
        "Government Hospital": "GH",
        "Private Hospital": "PH",
        "Government Medical College": "GMC",
        "Private Medical College": "PMC",
        "Covid Care Centre": "CCC",
      },
    },
    "pune-mh": {
      categories: {
        DCH: "Dedicated Covid Hospital",
        DCHC: "Dedicated Covid Health Centre",
        CCC: "Covid Care Centre",
      },
      mobileCategories: {
        "Dedicated Covid Hospital": "DCH",
        "Dedicated Covid Health Centre": "DCHC",
        "Covid Care Centre": "CCC",
      },
    },
    "delhi-dl": {
      categories: {
        PH: "Private Hospital",
        GH: "Government Hospital",
      },
      mobileCategories: {
        "Private Hospital": "PH",
        "Government Hospital": "GH",
      },
    },
  },
  columns: {
    "bengaluru-ka": ["general", "hdu", "icu", "ventilator"],
    "pune-mh": ["general", "oxygen", "icu", "ventilator"],
    "delhi-dl": ["general", "icu"],
    "adilabad-ts": ["general", "oxygen", "icu"],
    "nagpur-mh": ["gneral", "oxygen", "icu", "ventilator"],
    "nashik-mh": ["gneral", "oxygen", "icu", "ventilator"],
  },
  abbreviations: {
    HDU: "High Dependency Unit",
    ICU: "Intensive Care Unit",
  },
  columnAbbreviations: {
    general: "General",
    oxygen: "General with O2",
    icu: "ICU",
    hdu: "HDU",
    ventilator: "Ventilator",
  },
};

const mh1Locations = ["solapur-mh", "satara-mh", "sangli-mh", "kohlapur-mh"];

const tsLocations = [
  "adilabad-ts",
  "badradri-ts",
  "hyderabad-ts",
  "jagtial-ts",
  "jangaon-ts",
  "jayashankar-ts",
  "jogulamba-ts",
  "kamareddy-ts",
  "karimnagar-ts",
  "khammam-ts",
  "komaram_bheem-ts",
  "mahabubabad-ts",
  "mahabubnagar-ts",
  "mancherial-ts",
  "medak-ts",
  "medchal-ts",
  "mulugu-ts",
  "nagarkurnool-ts",
  "nalgonda-ts",
  "narayanpet-ts",
  "nirmal-ts",
  "nizamabad-ts",
  "peddapalli-ts",
  "rajanna-ts",
  "rangareddy-ts",
  "sangareddy-ts",
  "siddipet-ts",
  "suryapet-ts",
  "vikarabad-ts",
  "wanaparthy-ts",
  "warangal_rural-ts",
  "warangal_urban-ts",
  "yadadri-ts",
];

const apLocations = [
  "anantapur-ap",
  "chittoor-ap",
  "east_godavari-ap",
  "guntur-ap",
  "krishna-ap",
  "kurnool-ap",
  "prakasam-ap",
  "spsr_nellore-ap",
  "srikakulam-ap",
  "visakhapatanam-ap",
  "vizianagaram-ap",
  "west_godavari-ap",
  "kadapa-ap",
];

apLocations.map(
  (location) => (data.columns[location] = data.columns["pune-mh"])
);

mh1Locations.map((location) => {
  data.localities[location] = data.localities["pune-mh"];
  data.columns[location] = data.columns["pune-mh"];
});

tsLocations.map((location) => {
  data.localities[location] = data.localities["delhi-dl"];
  data.columns[location] = data.columns["adilabad-ts"];
});

data.localities["nashik-mh"] = data.localities["pune-mh"];

export default data;
