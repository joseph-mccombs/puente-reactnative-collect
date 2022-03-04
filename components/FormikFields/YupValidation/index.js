import * as yup from 'yup';

import I18n from '../../../modules/i18n';

export default function yupValidationPicker(fields) {
  let validationSchema = yup.object().shape({});
  fields.forEach((result) => {
    const {
      label, formikKey, fieldType, validation, options, validationRules
    } = result;
    if (validation) {
      if (validationRules !== undefined) {
        console.log("val rles active")
        switch (fieldType) {
          case "numberInput": {
            console.log(fieldType, validationRules)
            const resultSchemaInput = {};
            resultSchemaInput[formikKey] = yup.string().label(I18n.t(label)).required().max(validationRules.maxLength).min(validationRules.minLength);
            const resultObjectInput = yup.object().shape(resultSchemaInput);
            validationSchema = validationSchema.concat(resultObjectInput);
            break;
          }
          default:
            break;
        }
      } else if (fieldType === 'input' || fieldType === 'numberInput' || fieldType === 'select'
        || fieldType === ' autofill') {
        const resultSchemaInput = {};
        resultSchemaInput[formikKey] = yup.string().label(I18n.t(label)).required();
        const resultObjectInput = yup.object().shape(resultSchemaInput);
        validationSchema = validationSchema.concat(resultObjectInput);
      } else if (fieldType === 'geolocation') {
        const resultSchemaGeo = {};
        resultSchemaGeo[formikKey] = yup.object().label(I18n.t(label)).required();
        const resultObjectGeo = yup.object().shape(resultSchemaGeo);
        validationSchema = validationSchema.concat(resultObjectGeo);
      } else if (fieldType === 'multiInputRow' || fieldType === 'multiInputRowNum') {
        options.forEach((option) => {
          const resultSchemaMultiInput = {};
          resultSchemaMultiInput[option.value] = yup.string().label(option.value).required();
          const resultObjectMultiInput = yup.object().shape(resultSchemaMultiInput);
          validationSchema = validationSchema.concat(resultObjectMultiInput);
        });
      }
    }
  });
  return validationSchema;
}
