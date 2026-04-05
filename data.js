// Immigration Dashboard Data
// Source: DHS Office of Homeland Security Statistics, FY2022 Yearbook

const immigrationData = {

  // ── Refugee Arrivals 1980–2022 ──────────────────────────────────────────────
  refugeeArrivals: [
    {year:1980,total:207116},{year:1981,total:159252},{year:1982,total:98096},
    {year:1983,total:61218},{year:1984,total:70393},{year:1985,total:67704},
    {year:1986,total:62146},{year:1987,total:64528},{year:1988,total:76483},
    {year:1989,total:107070},{year:1990,total:122066},{year:1991,total:113389},
    {year:1992,total:115548},{year:1993,total:114181},{year:1994,total:111680},
    {year:1995,total:98973},{year:1996,total:75421},{year:1997,total:69653},
    {year:1998,total:76712},{year:1999,total:85285},{year:2000,total:72165},
    {year:2001,total:68920},{year:2002,total:26785},{year:2003,total:28286},
    {year:2004,total:52840},{year:2005,total:53738},{year:2006,total:41094},
    {year:2007,total:48218},{year:2008,total:60107},{year:2009,total:74602},
    {year:2010,total:73293},{year:2011,total:56384},{year:2012,total:58179},
    {year:2013,total:69909},{year:2014,total:69975},{year:2015,total:69920},
    {year:2016,total:84989},{year:2017,total:53691},{year:2018,total:22405},
    {year:2019,total:29916},{year:2020,total:11840},{year:2021,total:11454},
    {year:2022,total:25519}
  ],

  // ── Presidential administrations (for shading) ──────────────────────────────
  // party: 'R' = Republican, 'D' = Democrat
  administrations: [
    {start:1980,end:1981,party:'D',name:'Carter'},
    {start:1981,end:1989,party:'R',name:'Reagan'},
    {start:1989,end:1993,party:'R',name:'Bush Sr.'},
    {start:1993,end:2001,party:'D',name:'Clinton'},
    {start:2001,end:2009,party:'R',name:'Bush Jr.'},
    {start:2009,end:2017,party:'D',name:'Obama'},
    {start:2017,end:2021,party:'R',name:'Trump'},
    {start:2021,end:2022,party:'D',name:'Biden'}
  ],

  // ── Refugee Arrivals by Region 2013–2022 ────────────────────────────────────
  refugeeByRegion: {
    years: [2013,2014,2015,2016,2017,2018,2019,2020,2021,2022],
    Africa:       [15990,17506,22497,31640,20251,10462,16373,4173,6259,11406],
    Asia:         [48756,47165,43091,48268,26648,7524,7852,4235,3833,9469],
    Europe:       [530,825,2178,3676,5019,3459,4850,2477,924,2139],
    NorthAmerica: [4206,4067,1528,812,1456,827,511,712,349,2062],
    SouthAmerica: [233,253,522,531,232,128,298,236,53,424]
  },

  // ── Top refugee nationalities 2022 ─────────────────────────────────────────
  refugeeTopNationalities2022: [
    {country:"Congo, Dem. Rep.",arrivals:7742},
    {country:"Syria",arrivals:4562},
    {country:"Burma",arrivals:2141},
    {country:"Ukraine",arrivals:1586},
    {country:"Sudan",arrivals:1665},
    {country:"Afghanistan",arrivals:1619},
    {country:"Somalia",arrivals:491},
    {country:"El Salvador",arrivals:524},
    {country:"Guatemala",arrivals:1084},
    {country:"Honduras",arrivals:447}
  ],

  // ── Asylum Granted (Affirmative + Defensive) 1990–2022 ─────────────────────
  asylumGranted: [
    {year:1990,total:8472,affirmative:5672,defensive:2800},
    {year:1991,total:5035,affirmative:2908,defensive:2127},
    {year:1992,total:6307,affirmative:4123,defensive:2184},
    {year:1993,total:9543,affirmative:7509,defensive:2034},
    {year:1994,total:13828,affirmative:11775,defensive:2053},
    {year:1995,total:20703,affirmative:17573,defensive:3130},
    {year:1996,total:23532,affirmative:18624,defensive:4908},
    {year:1997,total:22939,affirmative:16380,defensive:6559},
    {year:1998,total:20507,affirmative:13216,defensive:7291},
    {year:1999,total:26571,affirmative:18150,defensive:8421},
    {year:2000,total:32514,affirmative:23278,defensive:9236},
    {year:2001,total:39148,affirmative:29147,defensive:10001},
    {year:2002,total:36937,affirmative:25960,defensive:10977},
    {year:2003,total:28743,affirmative:15367,defensive:13376},
    {year:2004,total:27376,affirmative:14354,defensive:13022},
    {year:2005,total:25304,affirmative:13547,defensive:11757},
    {year:2006,total:26352,affirmative:13048,defensive:13304},
    {year:2007,total:25318,affirmative:12459,defensive:12859},
    {year:2008,total:23022,affirmative:12130,defensive:10892},
    {year:2009,total:22303,affirmative:12003,defensive:10300},
    {year:2010,total:19777,affirmative:11258,defensive:8519},
    {year:2011,total:23631,affirmative:13493,defensive:10138},
    {year:2012,total:27446,affirmative:16871,defensive:10575},
    {year:2013,total:24631,affirmative:14886,defensive:9745},
    {year:2014,total:23038,affirmative:14424,defensive:8614},
    {year:2015,total:25946,affirmative:17807,defensive:8139},
    {year:2016,total:20311,affirmative:11616,defensive:8695},
    {year:2017,total:26382,affirmative:15817,defensive:10565},
    {year:2018,total:37702,affirmative:24504,defensive:13198},
    {year:2019,total:45805,affirmative:26893,defensive:18912},
    {year:2020,total:30736,affirmative:16132,defensive:14604},
    {year:2021,total:16628,affirmative:9212,defensive:7416},
    {year:2022,total:36615,affirmative:14134,defensive:22481}
  ],

  // ── Top affirmative asylum nationalities 2022 ───────────────────────────────
  asylumTopNationalities2022: [
    {country:"China",granted:1538},
    {country:"Venezuela",granted:2228},
    {country:"Turkey",granted:980},
    {country:"Ethiopia",granted:582},
    {country:"Afghanistan",granted:1438},
    {country:"Russia",granted:450},
    {country:"Colombia",granted:464},
    {country:"Egypt",granted:683},
    {country:"Guatemala",granted:328},
    {country:"El Salvador",granted:300}
  ],

  // ── LPR (Lawful Permanent Residents) 2000–2022 ─────────────────────────────
  lprTotal: [
    {year:2000,total:841002},{year:2001,total:1058902},{year:2002,total:1059356},
    {year:2003,total:703542},{year:2004,total:957883},{year:2005,total:1122257},
    {year:2006,total:1266129},{year:2007,total:1052415},{year:2008,total:1107126},
    {year:2009,total:1130818},{year:2010,total:1042625},{year:2011,total:1062040},
    {year:2012,total:1031631},{year:2013,total:990553},{year:2014,total:1016518},
    {year:2015,total:1051031},{year:2016,total:1183505},{year:2017,total:1127167},
    {year:2018,total:1096611},{year:2019,total:1031765},{year:2020,total:707362},
    {year:2021,total:740002},{year:2022,total:1018349}
  ],

  // ── LPR by class of admission 2013–2022 ────────────────────────────────────
  lprByClass: {
    years: [2013,2014,2015,2016,2017,2018,2019,2020,2021,2022],
    immediateRelatives: [439460,416456,465068,566706,516508,478961,505765,321148,385396,428268],
    familySponsored:    [210303,229104,213910,238087,232238,216563,204139,121560,65690,166041],
    employmentBased:    [161110,151596,144047,137893,137855,138171,139458,148959,193338,270284],
    diversity:          [45618,53490,47934,49865,51592,45350,43463,25028,15145,43233],
    refugeesAsylees:    [119630,134242,151995,157425,145003,185909,106911,63875,56397,83082]
  },

  // ── LPR top countries of birth 2022 ────────────────────────────────────────
  lprTopCountries2022: [
    {country:"Mexico",total:138772},
    {country:"India",total:127012},
    {country:"China",total:67950},
    {country:"Philippines",total:35998},
    {country:"Cuba",total:36642},
    {country:"Dominican Republic",total:40152},
    {country:"El Salvador",total:30876},
    {country:"Vietnam",total:24425},
    {country:"Brazil",total:24169},
    {country:"Honduras",total:17099}
  ],

  // ── LPR by region of birth 2013–2022 ───────────────────────────────────────
  lprByRegion: {
    years: [2013,2014,2015,2016,2017,2018,2019,2020,2021,2022],
    Africa:       [98304,98413,101415,113426,118824,115736,111194,76649,66211,89571],
    Asia:         [400548,430508,419297,462299,424743,397187,364761,272597,295306,414951],
    Europe:       [86556,83266,85803,93567,84335,80024,87597,68994,61521,75606],
    NorthAmerica: [315660,324354,366126,427293,413650,418991,370860,222272,240435,332672],
    SouthAmerica: [80945,73715,72309,79608,79076,78869,90850,62219,71371,99025],
    Oceania:      [5277,5112,5404,5588,5071,4653,5359,3998,4147,5132]
  },

  // ── Naturalizations 1990–2022 (selected years) ─────────────────────────────
  naturalizations: [
    {year:1990,total:267586},{year:1995,total:485720},{year:1996,total:1040991},
    {year:2000,total:886026},{year:2005,total:604280},{year:2008,total:1046539},
    {year:2010,total:619913},{year:2011,total:694193},{year:2012,total:757434},
    {year:2013,total:779929},{year:2014,total:653416},{year:2015,total:730259},
    {year:2016,total:753060},{year:2017,total:707265},{year:2018,total:761901},
    {year:2019,total:843593},{year:2020,total:628254},{year:2021,total:813861},
    {year:2022,total:969380}
  ],

  // ── Naturalizations by region 2013–2022 ────────────────────────────────────
  naturalizationsByRegion: {
    years: [2013,2014,2015,2016,2017,2018,2019,2020,2021,2022],
    Africa:       [71872,62175,71492,72339,61864,64999,85014,66450,76009,106094],
    Asia:         [275700,233163,261374,271733,255382,275822,327434,246215,295224,361176],
    Europe:       [80333,71325,78074,74345,65166,71483,81051,57410,77085,92242],
    NorthAmerica: [271807,222547,247492,259845,258394,277822,276969,204269,288431,324409],
    SouthAmerica: [76167,60665,67927,70821,63065,67934,68687,50442,72701,79982]
  },

  // ── Top naturalization countries 2022 ──────────────────────────────────────
  naturalizationTopCountries2022: [
    {country:"Mexico",total:128878},
    {country:"India",total:65960},
    {country:"Philippines",total:53413},
    {country:"Cuba",total:46913},
    {country:"Dominican Republic",total:34525},
    {country:"Vietnam",total:33246},
    {country:"China",total:27038},
    {country:"El Salvador",total:21453},
    {country:"Jamaica",total:22963},
    {country:"Colombia",total:18089}
  ],

  // ── Top states for LPR 2022 ─────────────────────────────────────────────────
  lprByState2022: [
    {state:"California",total:182921},
    {state:"Florida",total:113653},
    {state:"New York",total:111309},
    {state:"Texas",total:109720},
    {state:"New Jersey",total:54958},
    {state:"Illinois",total:34551},
    {state:"Washington",total:31835},
    {state:"Massachusetts",total:32885},
    {state:"Virginia",total:28902},
    {state:"Georgia",total:26312},
    {state:"Maryland",total:24233},
    {state:"Pennsylvania",total:28381}
  ],

  // ── Summary KPIs 2022 ───────────────────────────────────────────────────────
  kpi2022: {
    lpr: 1018349,
    naturalizations: 969380,
    refugees: 25519,
    asylumGranted: 36615,
    asylumAffirmative: 14134,
    asylumDefensive: 22481
  }
};
