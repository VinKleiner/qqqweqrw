import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(2, "Назва занадто коротка"),
    category: z.string().min(1, "Оберіть категорію"),
    price: z.number().positive("Ціна має бути більше 0"),
    photo: z.string().url("Некоректне посилання").optional().or(z.literal("")),
    manufacturer: z.string().min(2, "Вкажіть виробника"),
});