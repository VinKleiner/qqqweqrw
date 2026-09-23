import { z } from 'zod';

export const adSchema = z.object({
    title: z.string().min(10, 'Мінімум 10 символів').max(70, 'Максимум 70 символів'),
    category: z.string().min(1, 'Оберіть категорію'),
    // порожнє поле -> undefined, щоб показати "Вкажіть ціну"
    price: z.preprocess(
        (v) => (v === '' || v == null ? undefined : Number(v)),
        z
            .number({ required_error: 'Вкажіть ціну', invalid_type_error: 'Ціна має бути числом' })
            .min(0, 'Ціна не може бути від’ємною')
    ),
    description: z.string().min(40, 'Опис має бути від 40 символів'),
    city: z.string().min(2, 'Вкажіть місто'),
    contactPerson: z.string().min(2, 'Вкажіть ім’я'),
    phone: z.string().regex(/^\+380\d{9}$/, 'Формат: +380XXXXXXXXX'),
});