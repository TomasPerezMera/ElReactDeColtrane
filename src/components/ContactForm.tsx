import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import useToast from '../hooks/useToast';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase-service'

// Form field type declaration.
interface FormData {
    name: string;
    surname: string;
    dni: string;
    email: string;
    address: string;
}

// Form errors type declaration.
interface FormErrors {
    name?: string;
    surname?: string;
    dni?: string;
    email?: string;
    address?: string;
}


export default function ContactForm() {
    const toast = useToast;
    const [isSubmitting, setIsSubmitting] = useState(false);

      // Form state.
    const [formData, setFormData] = useState<FormData>({
        name: '',
        surname: '',
        dni: '',
        email: '',
        address: ''
    });

    // Form errors state.
    const [errors, setErrors] = useState<FormErrors>({});

  // Input change handler.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

      // Form validation.
    const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name validation.
    if (!formData.name.trim()) {
    newErrors.name = 'Error - el nombre es requerido.';
    isValid = false;
    }

    // Surname validation.
    if (!formData.surname.trim()) {
    newErrors.surname = 'Error - el apellido es requerido.';
    isValid = false;
    }

    // DNI validation (numeric, 7-8 digits).
    const dniPattern = /^\d{7,8}$/;
    if (!formData.dni.trim()) {
    newErrors.dni = 'Error - el DNI es requerido.';
    isValid = false;
    } else if (!dniPattern.test(formData.dni)) {
    newErrors.dni = 'Error - el DNI debe tener 7-8 dígitos numéricos.';
    isValid = false;
    }

    // Email validation.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
    newErrors.email = 'Error - el email es requerido';
    isValid = false;
    } else if (!emailPattern.test(formData.email)) {
    newErrors.email = 'Error - por favor, ingresa un email válido.';
    isValid = false;
    }

    // Address validation.
    if (!formData.address.trim()) {
    newErrors.address = 'Error - la dirección es requerida.';
    isValid = false;
    } else if (formData.address.trim().length < 10) {
    newErrors.address = 'Error - por favor, ingresa una dirección completa (min. 10 caracteres).';
    isValid = false;
    }

    setErrors(newErrors);
    return isValid;
    };

    // Firebase submission.
    const saveToFirebase = async () => {
        try {
        const docRef = await addDoc(collection(db, "contacts"), formData);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
        } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
        }
    };


  // Form submission handler.
    const submitContactForm = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
        toast('Por favor, corregí los errores en el formulario y volvé a intentarlo.', 3000);
        return;
        }
    setIsSubmitting(true);

        try {
      // Save to Firebase
        await saveToFirebase();

        // Show success message
        toast('Tus datos se han guardado correctamente', 3000);

        // Clear form
        setFormData({
            name: '',
            surname: '',
            dni: '',
            email: '',
            address: ''
        });
        } catch (error) {
        // Show error message
        toast('Hubo un problema al enviar el formulario. Por favor, intenta nuevamente.', 3000);
        console.error("Form submission error:", error);
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <div className="contactFormContainer">
            <h1>Datos del Cliente</h1>
            <h2>Para finalizar tu pedido, completá el siguiente formulario con tus datos para emitir la factura.</h2>
            <form aria-label='Contact Form for Invoice and Delivery' onSubmit={submitContactForm} className="contactFormBodyContainer">
                <div className="formField">
                    <label htmlFor="name" aria-label='name'>Nombre:</label>
                    <InputText
                        variant="filled"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'p-invalid' : ''}
                        required
                        aria-labelledby='name'
                    />
                </div>
                {errors.name && <small className="p-error">{errors.name}</small>}
                <div className="formField">
                    <label htmlFor="surname" aria-label='surname'>Apellido:</label>
                    <InputText
                        variant="filled"
                        id="surname"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        className={errors.surname ? 'p-invalid' : ''}
                        required
                        aria-labelledby='surname'
                    />
                </div>
                {errors.surname && <small className="p-error">{errors.surname}</small>}
                <div className="formField">
                    <label htmlFor="dni" aria-label='DNI'>DNI:</label>
                    <InputText
                        variant="filled"
                        id="dni"
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        className={errors.dni ? 'p-invalid' : ''}
                        required
                        aria-labelledby='dni'
                    />
                </div>
                {errors.dni && <small className="p-error">{errors.dni}</small>}
                <div className="formField">
                    <label htmlFor="email" aria-label='Email'>Email:</label>
                    <InputText
                        variant="filled"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'p-invalid' : ''}
                        required
                        aria-labelledby='email'
                    />
                </div>
                {errors.email && <small className="p-error">{errors.email}</small>}
                <div className="formField">
                    <label htmlFor="address" aria-label='address'>Dirección de Envío:</label>
                    <InputText
                        variant="filled"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? 'p-invalid' : ''}
                        required
                        aria-labelledby='address'
                    />
                </div>
                {errors.address && <small className="p-error">{errors.address}</small>}
                <Button
                    label={isSubmitting ? "Enviando..." : "Enviar"}
                    aria-label='Submit Button'
                    type="submit"
                    disabled={isSubmitting}
                />
            </form>
        </div>
    );
};