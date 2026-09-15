import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./validation";

const Home = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(productSchema),
    });

    const onSubmit = (data) => console.log(data);

    return (
        <div style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}>
            <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>Створення продукту</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                    <input placeholder="Назва" {...register("name")} style={{ width: "100%", padding: "8px" }} />
                    {errors.name && (
                        <p style={{ color: "red", fontSize: "0.85rem", margin: "4px 0 0" }}>{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <input placeholder="Категорія" {...register("category")} style={{ width: "100%", padding: "8px" }} />
                    {errors.category && (
                        <p style={{ color: "red", fontSize: "0.85rem", margin: "4px 0 0" }}>{errors.category.message}</p>
                    )}
                </div>

                <div>
                    <input
                        placeholder="Ціна"
                        type="number"
                        {...register("price", { valueAsNumber: true })}
                        style={{ width: "100%", padding: "8px" }}
                    />
                    {errors.price && (
                        <p style={{ color: "red", fontSize: "0.85rem", margin: "4px 0 0" }}>{errors.price.message}</p>
                    )}
                </div>

                <div>
                    <input placeholder="Фото (URL)" {...register("photo")} style={{ width: "100%", padding: "8px" }} />
                    {errors.photo && (
                        <p style={{ color: "red", fontSize: "0.85rem", margin: "4px 0 0" }}>{errors.photo.message}</p>
                    )}
                </div>

                <div>
                    <input placeholder="Виробник" {...register("manufacturer")} style={{ width: "100%", padding: "8px" }} />
                    {errors.manufacturer && (
                        <p style={{ color: "red", fontSize: "0.85rem", margin: "4px 0 0" }}>{errors.manufacturer.message}</p>
                    )}
                </div>

                <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
                    Створити
                </button>
            </form>
        </div>
    );
};

export default Home;