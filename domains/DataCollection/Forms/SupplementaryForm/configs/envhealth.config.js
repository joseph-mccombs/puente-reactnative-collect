const configArray = [
  {
    label: 'Years Lived in the Community',
    formikKey: 'yearsLivedinthecommunity',
    value: '',
    fieldType: 'select',
    options: [
      'lessThan1',
      '1_2',
      '3_4',
      '5_10',
      'moreThan10'
    ]
  },
  {
    label: 'Years Lived in This House',
    formikKey: 'yearsLivedinThisHouse',
    value: '',
    fieldType: 'select',
    options: [
      'lessThan1',
      '1_2',
      '3_4',
      '5_10',
      'moreThan10'
    ]

  },
  {
    label: 'Biggest Problem of the Community',
    formikKey: 'biggestproblemofcommunity',
    value: '',
    fieldType: 'input'
  },
  {
    label: 'Water Access',
    formikKey: 'waterAccess',
    value: '',
    fieldType: 'select',
    options: [
      'everyday',
      '4-6AWeek',
      '2-3AWeek',
      '1AWeek',
      '1AMonth',
      'Never'
    ]
  },
  {
    label: 'Type of Water Do you Drink',
    formikKey: 'typeofWaterdoyoudrink',
    value: '',
    fieldType: 'select',
    options: [
      'bottled',
      'tap',
      'filtered',
    ]
  },
  {
    label: 'Bathroom Access',
    formikKey: 'bathroomAccess',
    value: '',
    fieldType: 'select',
    options: [
      'Y',
      'N',
    ]
  },
  {
    label: 'Latrine Access',
    formikKey: 'latrineAccess',
    value: '',
    fieldType: 'select',
    options: [
      'Y',
      'N',
    ]
  },
  {
    label: 'Clinic Access',
    formikKey: 'clinicAccess',
    value: '',
    fieldType: 'select',
    options: [
      'Y',
      'N',
    ]
  },
  {
    label: 'Where do you go for medical problems?',
    formikKey: 'medicalproblemswheredoyougo',
    value: '',
    fieldType: 'input'
  },
  {
    label: 'Where do you go for dental problems?',
    formikKey: 'dentalproblemswheredoyougo',
    value: '',
    fieldType: 'input'
  },
  {
    label: 'Times per Week Trash is Collected',
    formikKey: 'timesperweektrashcollected',
    value: '',
    fieldType: 'input'
  },
  {
    label: 'Where is trash left between pickups?',
    formikKey: 'wheretrashleftbetweenpickups',
    value: '',
    fieldType: 'input'
  },
  {
    label: 'House Ownership',
    formikKey: 'houseownership',
    value: '',
    fieldType: 'select',
    options: [
      'Y',
      'N',
    ]
  },
  {
    label: 'Condition of Floor in your house?',
    formikKey: 'conditionoFloorinyourhouse',
    value: '',
    fieldType: 'select',
    options: [
      'dirtPoor',
      'dirtWorking',
      'cementPoor',
      'cementWorking'
    ]
  },
  {
    label: 'Condition of Roof in your house?',
    formikKey: 'conditionoRoofinyourhouse',
    value: '',
    fieldType: 'select',
    options: [
      'poor',
      'working',
    ]
  },
  {
    label: 'Type of Stove Top',
    formikKey: 'stoveType',
    value: '',
    fieldType: 'select',
    options: [
      'cementStove-Ventilation',
      'stoveTop',
      'openfire-noVentilation',
    ]
  },
  {
    label: 'Number of Individuals Living in the House',
    formikKey: 'numberofIndividualsLivingintheHouse',
    value: '',
    fieldType: 'input'
  },
  {
    label: 'Number of children Living in this House under age of 5',
    formikKey: 'numberofChildrenLivinginHouseUndertheAgeof5',
    value: '',
    fieldType: 'input'
  },
  // {
  //   label: "Latitude",
  //   formikKey: 'latitude',
  //   value: 0
  // },
  // {
  //   label: "Longitude",
  //   formikKey: 'longitude',
  //   value: 0
  // },
  // {
  //   label: "Surveying User",
  //   formikKey: 'surveyingUser',
  //   value: "Test"
  // },
  // {
  //   label: "Surveying Organization",
  //   formikKey: 'surveyingOrganization',
  //   value: "Test"
  // },
];

export default configArray;
