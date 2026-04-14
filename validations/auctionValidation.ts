import * as yup from 'yup';

export const auctionSchema = yup.object().shape({
    title: yup
        .string()
        .required('Auction title is required')
        .min(5, 'Title must be at least 5 characters'),
    description: yup
        .string()
        .required('Description is required')
        .min(20, 'Description should be at least 20 characters'),
    starting_price: yup
        .number()
        .typeError('Starting price must be a number')
        .required('Starting price is required')
        .positive('Price must be greater than zero'),
    quantity: yup
        .number()
        .typeError('Quantity must be a number')
        .required('Quantity is required')
        .positive('Quantity must be greater than zero'),
    location: yup
        .string()
        .required('Location is required'),
    variety: yup
        .string()
        .optional(),
    harvest_date: yup
        .date()
        .typeError('Please select a valid harvest date')
        .required('Harvest date is required'),
    start_time: yup
        .date()
        .typeError('Please select a valid start date & time')
        .required('Start time is required'),
    end_time: yup
        .date()
        .typeError('Please select a valid end date & time')
        .required('End time is required')
        .min(yup.ref('start_time'), 'End date cannot be chosen before the start date'),
});

export type AuctionFormData = yup.InferType<typeof auctionSchema>;
