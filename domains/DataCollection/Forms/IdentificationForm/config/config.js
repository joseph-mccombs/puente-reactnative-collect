const configArray = [
  {
    label: 'First Name',
    formikKey: 'fname',
    value: '',
    fieldType: 'input'
  },
  {
    label: 'Last Name',
    formikKey: 'lname',
    value: '',
    fieldType: 'input'

  },
  // {
  //   label: "Relationship",
  //   formikKey: 'relationship',
  //   value: "",
  //   fieldType: "input"
  // },
  {
    label: 'Nickname',
    formikKey: 'nickname',
    value: '',
    fieldType: 'input'
  },
  {
    label: 'Date of Birth',
    formikKey: 'dob',
    value: '',
    fieldType: 'input'
  },
  {
    label: 'Sex',
    formikKey: 'sex',
    value: '',
    fieldType: 'select',
    options: [
      'Male',
      'Female',
      'Prefer Not to Say'
    ]
  },
  {
    label: 'Telephone Number',
    formikKey: 'telephoneNumber',
    value: '',
    fieldType: 'input'
  },
  {
    label: 'Marriage Status',
    formikKey: 'marriageStatus',
    value: '',
    fieldType: 'select',
    options: [
      'single',
      'married',
      'free_union',
      'widow'
    ]
  },
  // {
  //   label: "Family Relationships",
  //   formikKey: 'familyRelationships',
  //   value: ""
  // },
  {
    label: 'Occupation',
    formikKey: 'occupation',
    value: '',
    fieldType: 'input'

  },
  {
    label: 'Education Level',
    formikKey: 'educationLevel',
    value: '',
    fieldType: 'select',
    options: [
      'lessThanprimary',
      'primary',
      'someHighSchool',
      'highschool',
      'someCollege',
      'college'
    ]
  },
  {
    label: 'Community Name',
    formikKey: 'communityname',
    value: '',
    fieldType: 'autofill',
    parameter: 'Communities'
  },
  {
    label: 'City',
    formikKey: 'city',
    value: '',
    fieldType: 'autofill',
    parameter: 'City'
  },
  // {
  //   label: "Province",
  //   formikKey: 'province',
  //   value: ""
  // },
  {
    label: 'Insurance Number',
    formikKey: 'insuranceNumber',
    value: '',
    fieldType: 'input'
  },
  {
    label: 'Insurance Provider',
    formikKey: 'insuranceProvider',
    value: '',
    fieldType: 'input'
  },
  {
    label: 'Clinic Provider',
    formikKey: 'clinicProvider',
    value: '',
    fieldType: 'input'
  },
  // {
  //   label: "Cedula Number",
  //   formikKey: 'cedulaNumber',
  //   value: ""
  // },
  {
    label: 'Latitude',
    formikKey: 'latitude',
    value: 0,
    fieldType: 'geolocation'
  },
  {
    label: 'Longitude',
    formikKey: 'longitude',
    value: 0,
    fieldType: 'geolocation'
  },
  {
    formikKey: 'photo',
    value: '',
    fieldType: 'photo',
  }
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
