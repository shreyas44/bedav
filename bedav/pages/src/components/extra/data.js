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
  abbreviations: {
    "HDU": "High Dependency Unit",
    "ICU": "Intensive Care Unit"
  }
}

export default data
