import React, { useState, useEffect } from "react"
import '../../styles/audience-forms.scss'
import { useForm, useFieldArray } from 'react-hook-form'

import Layout from "../../components/layout"
import SEO from "../../components/seo"

export default ({ location }) => {
    const [success, setSuccess] = useState(false)

    return (
        <Layout location={location}>
            <SEO title="Registro de Padrino">
                <meta name="og:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image:alt" content="Registro de Padrino - Adopt a Minor Leaguer" />
            </SEO>
            <div className="page-dear-sponsors">
                {success ? <SuccessMessage /> : <SignUpForm setSuccess={setSuccess} />}
            </div>
        </Layout>
    )
}

const SuccessMessage = () => (
    <p>¡Gracias por registrarte! En breve estarás escuchando de nosotros (generalmente en menos que 48 horas).</p>
)

const SignUpForm = ({ setSuccess }) => {
    const { register, control, reset, watch, errors, handleSubmit } = useForm({
        defaultValues: {
            teams: ["Cualquier!",
                "Arizona Diamondbacks",
                "Atlanta Braves",
                "Baltimore Orioles",
                "Boston Red Sox",
                "Chicago Cubs",
                "Chicago White Sox",
                "Cincinnati Reds",
                "Cleveland Indians",
                "Colorado Rockies",
                "Detroit Tigers",
                "Houston Astros",
                "Kansas City Royals",
                "Los Angeles Angels",
                "Los Angeles Dodgers",
                "Miami Marlins",
                "Milwaukee Brewers",
                "Minnesota Twins",
                "New York Mets",
                "New York Yankees",
                "Oakland Athletics",
                "Philadelphia Phillies",
                "Pittsburgh Pirates",
                "San Diego Padres",
                "San Francisco Giants",
                "Seattle Mariners",
                "St. Louis Cardinals",
                "Tampa Bay Rays",
                "Texas Rangers",
                "Toronto Blue Jays",
                "Washington Nationals"
            ]
        }
    })

    const onSubmit = data => {
        if (data.honeypot.length > 0) return console.log('Hello, robot!')
        fetch("/.netlify/functions/api/sponsor-registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => setSuccess(true))
    }

    const { fields } = useFieldArray({
        control,
        name: "teams"
    })

    useEffect(() => {
        reset()
    }, [reset])

    return (
        <>
            <section className="obligations">
                <h2>Querido Padrino,</h2>
                <p>Estás aquí para ayudar un juador necesitado y no podríamos estar más felices.<span className="bold">Por favor lee todo en esta página antes de registrando para sbaer qué esperar</span></p>
                <h3>Que Pasaré</h3>
                <p>Estás a punto de hacernos que saber que te gustaría ser un padrino por un jugador. Vamos a leer tu mensaje, mirar nuestra lista de jugadores necesitados, y comenzarás construyendo tu 1-a-1 relación con tu jugador. Este proceso generalmente toma menos que 48 horas.</p>
                <h3>Nuestros Responsibilidades</h3>
                <ul>
                    <li>
                        <span className="list-label bold">Anonimato:</span>
                Nuestro organización es jugador primero. Sabemos que a algunos jugadores les gustaría quedarse anónimo sobre recibiendo ayuda financiera externa minetras están un parte de un ogranizacion del beisbol profesional. Lo respetamos y estrictamente requerimos que los padrinos lo respetan también. <span className="bold">Segurense prgeuntar tu jugador si el quiere quedar anónimo. Si no sabes, le concedes ser anónimo a todo excepto que tu.</span>
                    </li>
                    <li>
                        <span className="list-label bold">Casamentero:</span>
                Generalmente emparejamos padrinos con jugadores dentro de las 48 horas pero serámos pacience si significa esperando por un ajuste correcto. Cuando tenomos razon por creer que una ceirta relación no quisa ser log mejor por el jugador, el padrino, o AaML, nosotros podriamos esperar uno mejor. Por ejemplo, si estas interesado en un(os) cierto equipo(s), vamos a esperar por un jugador de eso organización.<br /><br />Confía en nosotros: Emparejando las personas solo por el bien de emparejando no es la camina correcto. Nos aseguraremos todo es correcto y, si no crees que tu relación está bien, dinos.
            </li>
                </ul>
                <h3>Responsibilidades del Jugador</h3>
                <ul>
                    <li>
                        <span className="list-label bold">Si Algo no es Correcto, Dinos:</span>
                No dudaremos eliminar un patrocinio si jugador nos pregunta. Estamos aquí por los jugadores y, si por alguno razon ellos nos pregutan eliminar un patrocinio, lo haremos.
            </li>
                    <li>
                        <span className="list-label bold">Solicitudes Razonables:</span>
                Nosotros nunca hemos tenido una problema con esto pero todavía creemos que vale la pena decir: Nuestros jugadores son requeridos ser razonable con sus solicitudes por ayuda. Si tu, como padrino, crees que to jugador está preguntando por demasido, por favor no duda decirnos.
            </li>
                    <li>
                        <span className="list-label bold">¡No sea tímido!</span>
                    A veces, es dificil pedir ayuda incluso cuando tu y todos a tu alrededor saben que la necesitas. Entendemos que torpe puede ser decir "No he podido comer mi bocadillo favorito por mucho tiempo porque no lo vender in la ciudad be mi equipo. ¿Puedes enviarme algunos?" Como un padrino, haz lo que puedas para que tu jugador se sienta cómodo y crear un relación donde este convertirse mas fácil por el jugador.
            </li>
                </ul>
                <h3>Tus Responsibilidades</h3>
                <ul>
                    <li>
                        <span className="list-label bold">Desinterés:</span>
                        Nuestros padrinos obran solo por el bien de los jugadores que están patrocinando. <span className="bold">Bajo ninguna circunstancia nos permiten padrinos preguntarse a un jugador cualquier cosa a cambio por ser un miembro de esta comunidad.</span> Probablemente esté bien expectar un "gracias" - pero preguntando cualquier cosa más de tu jugador no es permiso y motivos para la terminación del patrocinio.
            </li>
                    <li>
                        <span className="list-label bold">Normas Financieras:</span>
                        A nuestros padrinos les preguntamos crean un patricinio que durará al menos hasta el próximo Spring Training, siempre que sea. Aproximademente el 8% por ciento del tiempo, sin embargo, estás a punto de crear un relación por vida.<br /><br /> Alentamos a los patrocinadores <span className="bold">Aproximademente USD $100-150 por mes</span> por su jugador - pero no impedirá que los padrinos apasionados sean más amables.<br /><br />Si en algún momento te sientes tu propio beinestar financiero está en peligro porque tu obligaciones de tu jugador, por favor contactanos para que podemos ayudar.
            </li>
                    <li>
                        <span className="list-label bold">Si Algo no es Correcto, Dinos:</span>
                Estamos aquí por ti si algo no es correcto con la relación que estás construyendo con tu jugador. No dudaremos obrar si indicas que hay una problema que necesita solución que está que podemos controlar.
            </li>
                </ul>
            </section>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Formulario de Registro de Padrino</h1>
                <label htmlFor="firstName">Nombre de Pila</label>
                <input type="text" name="firstName" ref={register({ required: true, maxLength: 80 })} style={errors.firstName ? { borderColor: '#CC0001' } : null} />
                {errors.firstName && <p className="error">Se requiere un numbre.</p>}
                <label htmlFor="lastName">Apellido</label>
                <input type="text" name="lastName" ref={register({ required: true, maxLength: 100 })} style={errors.lastName ? { borderColor: '#CC0001' } : null} />
                {errors.lastName && <p className="error">Se requiere un apellido.</p>}
                <label htmlFor="email">Email</label>
                <input type="text" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} style={errors.email ? { borderColor: '#CC0001' } : null} />
                {errors.email && <p className="error">Se requiere un email válido.</p>}
                <label htmlFor="phoneNumber">Número de Teléfono</label>
                <input type="tel" name="phoneNumber" ref={register({ required: true, minLength: 10, maxLength: 10 })} style={errors.phoneNumber ? { borderColor: '#CC0001' } : null} />
                {errors.phoneNumber && <p className="error">Se requiere un número de teléfono de 10 dígitos.</p>}
                <h2>Equipos Preferidos</h2>
                {fields.map((elem, index) => (
                    <div key={index} className="container-checkbox">
                        <input className="checkbox" type="checkbox" value={elem.value} name={`teams[${index + 1}]`} ref={register} />
                        <label htmlFor={`teams[${index}]`} className="checkbox-label">{elem.value}</label>
                    </div>
                ))}
                {Object.values(watch()).filter((elem => elem === false)).length === 31 && <p className="error">Debes seleccionar al menos una organización.</p>}
                <input className="honeypot" name="honeypot" ref={register()} />

                <button type="submit" className="submit-button">Enviar</button>
            </form>
        </>
    )
}