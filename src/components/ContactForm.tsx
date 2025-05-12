import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';


export default function ContactForm() {

    const submitContactForm = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Formulario enviado');
    }
    return (
        <div className="contactForm">
            <h1>Datos del Cliente</h1>
            <form aria-label='' onSubmit={submitContactForm} className="contactFormContainer">
                <h2>Por favor, completá el siguiente formulario para completar tu pedido y emitir tu factura.</h2>
                <FloatLabel>
                    <label htmlFor="name" aria-label='name'>Nombre:</label>
                    <InputText variant="filled" id="name" name="name" placeholder="Nombre" required aria-labelledby='name'/>
                </FloatLabel>
                <FloatLabel>
                    <label htmlFor="surname" aria-label='surname'>Apellido:</label>
                    <InputText variant="filled" id="surname" name="surname" placeholder="Apellido" required aria-labelledby='surname'/>
                </FloatLabel>
                <FloatLabel>
                    <label htmlFor="dni" aria-label='DNI'>DNI:</label>
                    <InputText variant="filled" id="dni" name="dni" placeholder="DNI" required aria-labelledby='dni'/>
                </FloatLabel>
                <FloatLabel>
                    <label htmlFor="email" aria-label='Email'>Email:</label>
                    <InputText variant="filled" type="email" id="email" name="email" required aria-labelledby='email'/>
                </FloatLabel>
                <FloatLabel>
                    <label htmlFor="address" aria-label='address'>Dirección de Envío:</label>
                    <InputText variant="filled" id="address" name="address" placeholder="Dirección (Calle, Número, Piso/Puerta, Código Postal)" required aria-labelledby='address'/>
                </FloatLabel>
                <Button label="Submit" aria-label='Submit Button' onClick={submitContactForm}/>
            </form>
        </div>
    );
};