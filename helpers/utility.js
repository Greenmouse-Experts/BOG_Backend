exports.generateOrderId = Math.floor(190000000 + Math.random() * 990000000);

exports.projectSlug = (type) => {
  let slug;
  if (type === "land_survey") {
    slug = "LNS";
  } else if (type === "construction_drawing") {
    slug = "CND";
  } else if (type === "building_approval") {
    slug = "BDA";
  } else if (type === "geotechnical_investigation") {
    slug = "GTI";
  } else if (type === "contractor") {
    slug = "CNT";
  } else {
    slug = type.toUpperCase().slice(0, 3);
  }
  return slug;
};

/**
 * List of the levels of administrators
 */
exports.adminLevels = [
  { level: 1, type: "super admin" },
  { level: 2, type: "article admin" },
  { level: 3, type: "finance admin" },
  { level: 4, type: "product admin" },
  { level: 5, type: "project admin" },
  { level: 6, type: "general admin" },
];

exports.adminLevelCheck = [
  { level: 1, type: "general" },
  { level: 2, type: "article" },
  { level: 3, type: "finance" },
  { level: 4, type: "product" },
  { level: 5, type: "project" },
  { level: 6, type: "general" },
];

exports.adminPrivileges = [
  {
    type: "general admin",
    privileges: [
      "BLOG",
      "PROFILE",
      "TRANSACTION",
      "PRODUCT",
      "ORDER",
      "NOTIFICATION",
      "PROJECT",
      "MEETING",
    ],
  },
  { type: "article admin", privileges: ["BLOG", "PROFILE"] },
  {
    type: "finance admin",
    privileges: [
      "TRANSACTION",
      "PROFILE",
      "PROJECT",
      "PRODUCT",
      "PAYOUT",
      "NOTIFICATION",
    ],
  },
  {
    type: "product admin",
    privileges: ["PRODUCT", "ADDRESS", "ORDER", "NOTIFICATION", "PROFILE"],
  },
  {
    type: "project admin",
    privileges: [
      "PROJECT",
      "FEE",
      "SERVICE",
      "MEETING",
      "NOTIFICATION",
      "PROFILE",
    ],
  },
];

exports.generalInformation = {
  foundationDesign: [{ type: "strip", formula: "" }, "pad", "raft", "pile"],
  frameStructureDesign: ["concrete columns", "beams", "slab"],
  blockWork: [
    "225mm thick sandcrete block",
    "150mm thick sandcrete block",
    "100mm thick sandcrete block",
    "clay bricks",
  ],
  roofDesign: [
    "concrete roof slab & beam",
    "stonecoated roofing",
    "aluminium roofing",
  ],
};

exports.formula = {};

exports.ticket_issues = [
  {
    name: "Billing",
    slug: "billing",
    desc: "For financial issues",
  },
  {
    name: "Sales",
    slug: "sales",
    desc: "For Product & Service issues",
  },
  {
    name: "Technical",
    slug: "technical",
    desc: "For system use/behavior issues",
  },
];

const money = (value) => {
  return parseInt(value.replace(/,/g, ''), 10);
}

exports.USERTYPE = {
  SERVICE_PARTNER: 'professional'
}

/**
 * Criteria for rating service partners
 */


const years_of_experience = [
  {
    experience: '3-5',
    rating: 1,
  },
  {
    experience: '6-10',
    rating: 2,
  },
  {
    experience: '11-15',
    rating: 3,
  },
  {
    experience: '16-20',
    rating: 4,
  },
  {
    experience: 'Over 20',
    rating: 5,
  },
];

const no_of_staff_members = [
  {
    experience: '1-10',
    rating: 1,
  },
  {
    experience: '11-50',
    rating: 2,
  },
  {
    experience: '51-100',
    rating: 3,
  },
  {
    experience: '101-200',
    rating: 4,
  },
  {
    experience: 'Over 200',
    rating: 5,
  },
];

const cost_of_projects_completed = [
  {
    experience: 'Less than 50 million',
    rating: 1,
  },
  {
    experience: '51-100 million',
    rating: 2,
  },
  {
    experience: '101-200 million',
    rating: 3,
  },
  {
    experience: '201-500 million',
    rating: 4,
  },
  {
    experience: 'Over 500 million',
    rating: 5,
  },
]

const certification_of_personnel = {
  quantity_surveyor: [
    {
      experience: 'HND, MNIQS, RQS',
      rating: 1
    },
    {
      experience: 'PGD, MNIQS, RQS',
      rating: 2
    },
    {
      experience: 'B.Sc, MNIQS, RQS',
      rating: 3
    },
    {
      experience: 'M.Sc, MNIQS, RQS',
      rating: 4
    },
    {
      experience: 'Ph.D, MNIQS, RQS',
      rating: 5
    },
  ],
  structural_electrical_civil_engineer: [
    {
      experience: 'HND, COREN',
      rating: 1
    },
    {
      experience: 'PGD, COREN',
      rating: 2
    },
    {
      experience: 'B.Sc, COREN',
      rating: 3
    },
    {
      experience: 'M.Sc, COREN',
      rating: 4
    },
    {
      experience: 'Ph.D, COREN',
      rating: 5
    },
  ],
  architect: [
    {
      experience: 'HND, ATECH',
      rating: 1
    },
    {
      experience: 'PGD, ATECH',
      rating: 2
    },
    {
      experience: 'B.Sc, G.M.NIA',
      rating: 3
    },
    {
      experience: 'M.Sc, A.M.NIA,/MNIA',
      rating: 4
    },
    {
      experience: 'Ph.D, MNIA',
      rating: 5
    }
  ],
  mechanical_engineer: [
    {
      experience: 'HND, PGD, B.Sc, M.Sc, Ph.D',
      rating: 1
    },
    {
      experience: 'PGD, MNIMECHE',
      rating: 2
    },
    {
      experience: 'B.Sc, MNIMECHE',
      rating: 3
    },
    {
      experience: 'M.Sc, MNIMECHE',
      rating: 4
    },
    {
      experience: 'Ph.D, MNIMECHE',
      rating: 5
    },
  ],
  surveyor: [
    {
      experience: 'HND, MNIS',
      rating: 1
    },
    {
      experience: 'PGD, MNIS',
      rating: 2
    },
    {
      experience: 'B.Sc, MNIS',
      rating: 3
    },
    {
      experience: 'M.Sc, MNIS',
      rating: 4
    },
    {
      experience: 'Ph.D, MNIS',
      rating: 5
    },
  ]
}

const complexity_of_projects_completed = {
  /**
   * for quantity_surveyor, structural engineer, architects, mechanical engineer, electrical engineer, civil engineer
   */
  q_s_a_m_e_c: [ 
    {
      experience: '<2 Storey',
      rating: 1
    },
    {
      experience: '2 - 5 Storey',
      rating: 2
    },
    {
      experience: '5 - 10 Storey',
      rating: 3
    },
    {
      experience: 'Over 10 Storey',
      rating: 4
    },
    {
      experience: 'Roads, Bridges etc',
      rating: 5
    },
  ],
  surveyor: [
    {
      experience: '1-10 Acres',
      rating: 1
    },
    {
      experience: '10-20 Acres',
      rating: 2
    },
    {
      experience: '20-50 Acres',
      rating: 3
    },
    {
      experience: 'Over 50 Acres',
      rating: 4
    },
    {
      experience: 'Roads, Bridges etc',
      rating: 5
    }
  ]
}

const timely_delivery_performance = [ // in percentage
  {
    experience: {min: 16, max: '*'},
    rating: 1
  },
  {
    experience: {min: 10, max: 15},
    rating: 2
  },
  {
    experience: {min: 5, max: 9},
    rating: 3
  },
  {
    experience: {min: 0.1, max: 4},
    rating: 4
  },
  {
    experience: {max: 0}, // on or before time
    rating: 5
  },
]

/**
 * Lastly, we have the Quality Delivery Performance.
 * This is determined by the formula below:
 * (Timely Delivery * Client Satisfaction) / 2
 */

/**
 * Putting them together
 * Criteria for rating service partners
 */
exports.kyc_criteria_for_rating_service_partners = [
  {
    service_type: 'quantity_surveyor',
    meta_data: {
      years_of_experience,
      no_of_staff_members,
      cost_of_projects_completed,
      certification_of_personnel: certification_of_personnel.quantity_surveyor,
      complexity_of_projects_completed: complexity_of_projects_completed.q_s_a_m_e_c,
      timely_delivery_performance
    }
  },
  {
    service_type: 'structural_engineer',
    meta_data: {
      years_of_experience,
      no_of_staff_members,
      cost_of_projects_completed,
      certification_of_personnel: certification_of_personnel.structural_electrical_civil_engineer,
      complexity_of_projects_completed: complexity_of_projects_completed.q_s_a_m_e_c,
      timely_delivery_performance
    }
  },
  {
    service_type: 'architects',
    meta_data: {
      years_of_experience,
      no_of_staff_members,
      cost_of_projects_completed,
      certification_of_personnel: certification_of_personnel.architect,
      complexity_of_projects_completed: complexity_of_projects_completed.q_s_a_m_e_c,
      timely_delivery_performance
    }
  },
  {
    service_type: 'mechanical_engineer',
    meta_data: {
      years_of_experience,
      no_of_staff_members,
      cost_of_projects_completed,
      certification_of_personnel: certification_of_personnel.mechanical_engineer,
      complexity_of_projects_completed: complexity_of_projects_completed.q_s_a_m_e_c,
      timely_delivery_performance
    }
  },
  {
    service_type: 'electrical_engineer',
    meta_data: {
      years_of_experience,
      no_of_staff_members,
      cost_of_projects_completed,
      certification_of_personnel: certification_of_personnel.structural_electrical_civil_engineer,
      complexity_of_projects_completed: complexity_of_projects_completed.q_s_a_m_e_c,
      timely_delivery_performance
    }
  },
  {
    service_type: 'surveyor',
    meta_data: {
      years_of_experience,
      no_of_staff_members,
      cost_of_projects_completed,
      certification_of_personnel: certification_of_personnel.surveyor,
      complexity_of_projects_completed: complexity_of_projects_completed.surveyor,
      timely_delivery_performance
    }
  },
  {
    service_type: 'civil_engineer',
    meta_data: {
      years_of_experience,
      no_of_staff_members,
      cost_of_projects_completed,
      certification_of_personnel: certification_of_personnel.structural_electrical_civil_engineer,
      complexity_of_projects_completed: complexity_of_projects_completed.q_s_a_m_e_c,
      timely_delivery_performance
    }
  },
];
