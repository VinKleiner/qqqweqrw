import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adSchema } from './validation';

export default function Home() {
    const [submitted, setSubmitted] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: zodResolver(adSchema),
        mode: 'onChange',
        defaultValues: { phone: '+380' },
    });

    const onSubmit = (data) => setSubmitted(data);

    // Клас Bootstrap: червоний при помилці, зелений якщо поле заповнене правильно
    const getFieldClass = (name) => {
        if (errors[name]) return 'is-invalid';
        return dirtyFields[name] ? 'is-valid' : '';
    };

    // Текст помилки під полем
    const showError = (name) =>
        errors[name] && <div className="invalid-feedback">{errors[name].message}</div>;

    // Однакове текстове поле (виклик як функції, не як компонента)
    const textField = (name, label, placeholder, type = 'text') => (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className={`form-control ${getFieldClass(name)}`}
                {...register(name)}
            />
            {showError(name)}
        </div>
    );

    if (submitted) {
        return (
            <div className="container mt-2">
                <h1 className="text-center">Оголошення опубліковано!</h1>
                <div className="col-md-6 offset-md-3">
                    <div className="alert alert-success">
                        «{submitted.title}» — {submitted.price} грн
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-2">
            <h1 className="text-center">Створення оголошення</h1>
            <form className="col-md-6 offset-md-3" onSubmit={handleSubmit(onSubmit)}>
                {textField('title', 'Заголовок оголошення', '')}

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Категорія</label>
                    <select id="category" className={`form-select ${getFieldClass('category')}`} {...register('category')}>
                        <option value="">Оберіть категорію</option>
                        <option value="electronics">Електроніка</option>
                        <option value="fashion">Одяг</option>
                        <option value="home">Дім і сад</option>
                        <option value="auto">Авто</option>
                    </select>
                    {showError('category')}
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Опис</label>
                    <textarea
                        id="description"
                        rows={4}
                        placeholder="Опишіть товар (мінімум 40 символів)"
                        className={`form-control ${getFieldClass('description')}`}
                        {...register('description')}
                    />
                    {showError('description')}
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Ціна (грн)</label>
                    <input
                        id="price"
                        type="number"
                        placeholder="0"
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        {...register('price')}
                    />
                    {showError('price')}
                </div>

                {textField('city', 'Місто', 'Київ')}
                {textField('contactPerson', 'Контактна особа', "Ім'я")}
                {textField('phone', 'Телефон', '+380501234567', 'tel')}

                <button type="submit" className="btn btn-success">Опублікувати</button>
            </form>
        </div>
    );
}