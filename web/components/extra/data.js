const data = {
  localities: {
    "bengaluru-karnataka": {
      categories: {
        "pri hos": "Private Hospital",
        "gov hos": "Government Hospital",
        "pri med": "Private Medical College",
        "gov med": "Government Medical College",
        "covid": "Covid Care Centre",
      },
      mobileCategories: {
        "Government Hospital": "GH",
        "Private Hospital": "PH",
        "Government Medical College": "GMC",
        "Private Medical College": "PMC",
        "Covid Care Centre": "CCC",
      },
    },
    "pune-maharashtra": {
      categories: {
        "DCH": "Dedicated Covid Hospital",
        "DCHC": "Dedicated Covid Health Centre",
        "CCC": "Covid Care Centre"
      },
      mobileCategories: {
        "Dedicated Covid Hospital": "DCH",
        "Dedicated Covid Health Centre": "DCHC",
        "Covid Care Centre": "CCC"
      }
    }  
  },
  columns: {
    "bengaluru-karnataka": [
      "general",
      "hdu",
      "icu",
      "ventilator"
    ],

    "pune-maharashtra": [
      "general",
      "oxygen",
      "icu",
      "ventilator"
    ]
  },
  abbreviations: {
    "HDU": "High Dependency Unit",
    "ICU": "Intensive Care Unit"
  },
  columnAbbreviations: {
    general: "General",
    oxygen: "General with O2",
    icu: "ICU",
    hdu: "HDU",
    ventilator: "Ventilator"
  },
}

data.localities["solapur-maharashtra"] = data.localities["pune-maharashtra"]
data.localities["satara-maharashtra"] = data.localities["pune-maharashtra"]
data.localities["sangli-maharashtra"] = data.localities["pune-maharashtra"]
data.localities["kohlapur-maharashtra"] = data.localities["pune-maharashtra"]

data.columns["solapur-maharashtra"] = data.columns["pune-maharashtra"]
data.columns["satara-maharashtra"] = data.columns["pune-maharashtra"]
data.columns["sangli-maharashtra"] = data.columns["pune-maharashtra"]
data.columns["kohlapur-maharashtra"] = data.columns["pune-maharashtra"]

data.columns["anantapur-andhra pradesh"] = data.columns["pune-maharashtra"]
data.columns["chittoor-andhra pradesh"] = data.columns["pune-maharashtra"]
data.columns["east godavari-andhra pradesh"] = data.columns["pune-maharashtra"]
data.columns["guntur-andhra pradesh"] = data.columns["pune-maharashtra"]
data.columns["krishna-andhra pradesh"] = data.columns["pune-maharashtra"]
data.columns["kurnool-andhra pradesh"] = data.columns["pune-maharashtra"]
data.columns["prakasam-andhra pradesh"] = data.columns["pune-maharashtra"]
data.columns["spsr nellore-andhra pradesh"] = data.columns["pune-maharashtra"]
data.columns["srikakulam-andhra pradesh"] = data.columns["pune-maharashtra"]
data.columns["vishakapatanam-andhra pradesh"] = data.columns["pune-maharashtra"]
data.columns["vizianagaram-andhra pradesh"] = data.columns["pune-maharashtra"]
data.columns["west godavari-andhra pradesh"] = data.columns["pune-maharashtra"]
data.columns["kadapa-andhra pradesh"] = data.columns["pune-maharashtra"]

export default data
