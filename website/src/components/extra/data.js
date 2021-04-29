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
  },
  columns: {
    "bengaluru-ka": ["general", "hdu", "icu", "ventilator"],

    "pune-mh": ["general", "oxygen", "icu", "ventilator"],
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

data.localities["solapur-mh"] = data.localities["pune-mh"];
data.localities["satara-mh"] = data.localities["pune-mh"];
data.localities["sangli-mh"] = data.localities["pune-mh"];
data.localities["kohlapur-mh"] = data.localities["pune-mh"];

data.columns["solapur-mh"] = data.columns["pune-mh"];
data.columns["satara-mh"] = data.columns["pune-mh"];
data.columns["sangli-mh"] = data.columns["pune-mh"];
data.columns["kohlapur-mh"] = data.columns["pune-mh"];

data.columns["anantapur-ap"] = data.columns["pune-mh"];
data.columns["chittoor-ap"] = data.columns["pune-mh"];
data.columns["east_godavari-ap"] = data.columns["pune-mh"];
data.columns["guntur-ap"] = data.columns["pune-mh"];
data.columns["krishna-ap"] = data.columns["pune-mh"];
data.columns["kurnool-ap"] = data.columns["pune-mh"];
data.columns["prakasam-ap"] = data.columns["pune-mh"];
data.columns["spsr_nellore-ap"] = data.columns["pune-mh"];
data.columns["srikakulam-ap"] = data.columns["pune-mh"];
data.columns["vishakapatanam-ap"] = data.columns["pune-mh"];
data.columns["vizianagaram-ap"] = data.columns["pune-mh"];
data.columns["west_godavari-ap"] = data.columns["pune-mh"];
data.columns["kadapa-ap"] = data.columns["pune-mh"];

export default data;
