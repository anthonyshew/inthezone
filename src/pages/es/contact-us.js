import React, { useState } from "react"
import '../../styles/contact.scss'
import { useForm } from 'react-hook-form'

import Layout from "../../components/layout"
import SEO from "../../components/seo"

export default ({ data, location }) => {
    const [success, setSuccess] = useState(false)

    return (
        <Layout location={location}>
            <SEO title="Contactar Con Nosotros" >
                <meta name="og:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image:alt" content="Contactar Adopt a Minor Leaguer" />
            </SEO>
            <div className="page-contact">
                <h1>Contacto con Nosotros</h1>
                {success ? <SuccessMessage /> : <ContactForm setSuccess={setSuccess} />}
            </div>
        </Layout>
    )
}

const SuccessMessage = () => <p className="success-message">Gracias por nos contactando. En breve estarás escuchando de nosotros (generalmente en menos que 48 horas).</p>

const ContactForm = ({ setSuccess }) => {
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = (formData, e) => {
        fetch("/.netlify/functions/api/contact-us", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => setSuccess(true))
    }
    return (
        <>
            <p>Si te gustaría contactar con nosotros, por favor usa la forma por enviarnos un email.</p>
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">
                    Nombre
                <input className="form-input" type="text" name="name" ref={register({ required: true, })} />
                </label>
                {errors.name && <p className="error">Se requiere un nombre.</p>}

                <label htmlFor="email">
                    Tu Email
                <input className="form-input" type="email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                </label>
                {errors.email && <p className="error">Se requiere un email válido.</p>}

                <label htmlFor="message">
                    Tu Mensaje
                <textarea className="form-input" type="textarea" name="message" ref={register({ required: true, min: 1, })} />
                </label>
                {errors.message && <p className="error">Se requiere un mensaje.</p>}

                <button className="submit-button" type="submit">
                    Enviar
                </button>
            </form>
        </>
    )
}
