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

data.columns["badradri-ts"] = data.columns["adilabad-ts"];
data.columns["hyderabad-ts"] = data.columns["adilabad-ts"];
data.columns["jagtial-ts"] = data.columns["adilabad-ts"];
data.columns["jangaon-ts"] = data.columns["adilabad-ts"];
data.columns["jayashankar-ts"] = data.columns["adilabad-ts"];
data.columns["jogulamba-ts"] = data.columns["adilabad-ts"];
data.columns["kamareddy-ts"] = data.columns["adilabad-ts"];
data.columns["karimnagar-ts"] = data.columns["adilabad-ts"];
data.columns["khammam-ts"] = data.columns["adilabad-ts"];
data.columns["komaram_bheem-ts"] = data.columns["adilabad-ts"];
data.columns["mahabubabad-ts"] = data.columns["adilabad-ts"];
data.columns["mahabubnagar-ts"] = data.columns["adilabad-ts"];
data.columns["mancherial-ts"] = data.columns["adilabad-ts"];
data.columns["medak-ts"] = data.columns["adilabad-ts"];
data.columns["medchal-ts"] = data.columns["adilabad-ts"];
data.columns["mulugu-ts"] = data.columns["adilabad-ts"];
data.columns["nagarkurnool-ts"] = data.columns["adilabad-ts"];
data.columns["nalgonda-ts"] = data.columns["adilabad-ts"];
data.columns["narayanpet-ts"] = data.columns["adilabad-ts"];
data.columns["nirmal-ts"] = data.columns["adilabad-ts"];
data.columns["nizamabad-ts"] = data.columns["adilabad-ts"];
data.columns["peddapalli-ts"] = data.columns["adilabad-ts"];
data.columns["rajanna-ts"] = data.columns["adilabad-ts"];
data.columns["rangareddy-ts"] = data.columns["adilabad-ts"];
data.columns["sangareddy-ts"] = data.columns["adilabad-ts"];
data.columns["siddipet-ts"] = data.columns["adilabad-ts"];
data.columns["suryapet-ts"] = data.columns["adilabad-ts"];
data.columns["vikarabad-ts"] = data.columns["adilabad-ts"];
data.columns["wanaparthy-ts"] = data.columns["adilabad-ts"];
data.columns["warangal_rural-ts"] = data.columns["adilabad-ts"];
data.columns["warangal_urban-ts"] = data.columns["adilabad-ts"];
data.columns["yadadri-ts"] = data.columns["adilabad-ts"];

export default data;
