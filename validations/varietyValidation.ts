import * as yup from 'yup';

export const varietySchema = yup.object().shape({
    name: yup
        .string()
        .required('Variety name is required')
        .min(3, 'Name must be at least 3 characters'),
    description: yup
        .string()
        .optional(),
    tag: yup
        .string()
        .optional(),
    metricValue: yup
        .string()
        .optional(),
    metricLabel: yup
        .string()
        .optional(),
    image: yup
        .string()
        .required('Variety image is required'),
});

export type VarietyFormData = yup.InferType<typeof varietySchema>;
