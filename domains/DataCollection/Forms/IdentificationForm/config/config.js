const configArray = [
  {
    label: 'identificationForm.demographics',
    fieldType: 'header',
    formikKey: 'none_bi',
  },
  {
    label: 'global.fName',
    formikKey: 'fname',
    value: '',
    fieldType: 'input',
    validation: true
  },
  {
    label: 'global.lName',
    formikKey: 'lname',
    value: '',
    fieldType: 'input',
    validation: true
  },
  {
    label: 'identificationForm.nickname',
    formikKey: 'nickname',
    value: '',
    fieldType: 'input',
    validation: false
  },
  {
    label: 'identificationForm.dob.label',
    formikKey: 'dob',
    value: '',
    fieldType: 'multiInputRowNum',
    options: [
      {
        label: 'identificationForm.dob.month',
        value: 'Month',
        maxLength: 2
      },
      {
        label: 'identificationForm.dob.day',
        value: 'Day',
        maxLength: 2
      },
      {
        label: 'identificationForm.dob.year',
        value: 'Year',
        maxLength: 4
      }
    ],
    validation: false
  },
  {
    label: 'identificationForm.age',
    formikKey: 'age',
    value: '',
    fieldType: 'numberInput',
    validation: false
  },
  {
    label: 'identificationForm.sex.label',
    formikKey: 'sex',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'identificationForm.sex.male',
        value: 'male'
      },
      {
        label: 'identificationForm.sex.female',
        value: 'female'
      },
      {
        label: 'identificationForm.sex.notSay',
        value: 'prefer_not_to_say'
      }
    ],
    validation: true
  },
  {
    label: 'identificationForm.telephone',
    formikKey: 'telephoneNumber',
    value: '',
    fieldType: 'numberInput',
    validation: false
  },
  {
    label: 'identificationForm.marriageStatus.label',
    formikKey: 'marriageStatus',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'identificationForm.marriageStatus.single',
        value: 'single'
      },
      {
        label: 'identificationForm.marriageStatus.married',
        value: 'married'
      },
      {
        label: 'identificationForm.marriageStatus.cohabitation',
        value: 'free_union'
      },
      {
        label: 'identificationForm.marriageStatus.widow',
        value: 'widow'
      }
    ],
    validation: true
  },
  {
    label: 'identificationForm.occupation',
    formikKey: 'occupation',
    value: '',
    fieldType: 'input',
    validation: false
  },
  {
    label: 'identificationForm.educationLevel.label',
    formikKey: 'educationLevel',
    value: '',
    fieldType: 'select',
    options: [
      {
        label: 'identificationForm.educationLevel.lessPrim',
        value: 'lessThanprimary'
      },
      {
        label: 'identificationForm.educationLevel.prim',
        value: 'primary'
      },
      {
        label: 'identificationForm.educationLevel.someHS',
        value: 'someHighSchool'
      },
      {
        label: 'identificationForm.educationLevel.hs',
        value: 'highschool'
      },
      {
        label: 'identificationForm.educationLevel.someCollege',
        value: 'someCollege'
      },
      {
        label: 'identificationForm.educationLevel.college',
        value: 'college'
      },
    ],
    validation: true
  },
  {
    label: 'identificationForm.location',
    fieldType: 'header',
    formikKey: 'none_location',
    validation: false
  },
  {
    label: 'global.commName',
    formikKey: 'communityname',
    value: '',
    fieldType: 'autofill',
    parameter: 'Communities',
    validation: false
  },
  {
    label: 'identificationForm.subcounty',
    formikKey: 'subcounty',
    value: '',
    fieldType: 'autofill',
    parameter: 'Sub-county',
    validation: false
  },
  {
    label: 'global.city',
    formikKey: 'city',
    value: '',
    fieldType: 'autofill',
    parameter: 'City',
    validation: false
  },
  {
    label: 'identificationForm.province',
    formikKey: 'province',
    value: '',
    fieldType: 'autofill',
    parameter: 'Province',
    validation: false
  },
  {
    label: 'identificationForm.region',
    formikKey: 'region',
    value: '',
    fieldType: 'autofill',
    parameter: 'Region',
    validation: false
  },
  {
    label: 'identificationForm.country',
    formikKey: 'country',
    value: '',
    fieldType: 'autofill',
    parameter: 'Country',
    validation: false
  },
  {
    label: 'identificationForm.insurance',
    fieldType: 'header',
    formikKey: 'none_insurance',
  },
  {
    label: 'identificationForm.insNumber',
    formikKey: 'insuranceNumber',
    value: '',
    fieldType: 'numberInput',
    validation: false
  },
  {
    label: 'identificationForm.insProvider',
    formikKey: 'insuranceProvider',
    value: '',
    fieldType: 'input',
    validation: false
  },
  {
    label: 'identificationForm.clinicProvider',
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
