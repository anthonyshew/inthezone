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
                <p>Estamos felices por tu interés en apadrinar a un Jugador de Ligas Menores. <span className="bold">Por favor, te invitamos a leer el contenido de esta sección para saber que te espera en el camindo del apadrinamiento.</span></p>
                <h3>¿Qué va a suceder?</h3>
                <p>Estas a punto de dejarnos saber que estas interesado en apadrinar a un jugador. Apenas recibamos tu mensaje, revisaremos la lista de jugadores disponibles. Una vez tengamos un jugador, te pondremos en contacto con él para que comiencen a construir una relación. El proceso de iniciación usualmente toma menos de 48 horas.</p>
                <h3>Nuestra Responsabilidad</h3>
                <ul>
                    <li>
                        <span className="list-label bold">Anonimato:</span>
                        Nuestra organización se enfoca en darle prioridad al jugador. Sabemos que algunos jugadores desean permanecer anónimos y no desean revelar que están recibiendo ayuda financiera mientras son parte de una organización de béisbol profesional. Nosotros respetamos eso y exigimos de manera estricta que los padrinos también respeten el deseo del jugador de permanecer en anonimato.  <span className="bold">Asegúrate de preguntarle a tu jugador si desea mantenerse de manera anónima, si no estas seguro de lo que el jugador quiere, entonces permite que tu jugador permanezca bajo el anonimato para todos, excepto para usted.</span>
                    </li>
                    <li>
                        <span className="list-label bold">Establecimiento de Contacto:</span>
                        Es nuestro deseo que el enlace entre un jugador y su padrino se genere dentro de un lapso de 48 horas, pero también debemos decir que seremos pacientes si eso significa que ese jugador y ese padrino son perfectos el uno para el otro. Cuando tenemos motivos para creer que una relación no será la mejor para uno de nuestros jugadores, para el padrino o para nuestra organización, entonces esperaremos para asegurarnos de hacer el movimiento adecuado. Esto último podría suceder cuando, por ejemplo, un padrino esta interesado en ayudar a un jugador de una organización en particular.<br /><br />Confía en nosotros: Enlazar a un jugador y a un padrino por el simple hecho de hacerlo no es el camino a seguir. Nos aseguraremos de hacer y mantener bien las cosas y, si en algún momento siente que su relación de apadrinamiento no es la mejor, entonces no dude en comunicárnoslo.

            </li>
                </ul>
                <h3>Responsabilidad del Jugador</h3>
                <ul>
                    <li>
                        <span className="list-label bold">Déjanos Saber si Algo no Está Bien:</span>
                        Para nosotros es fundamental que la relación este los jugadores y los padrinos sea la mejor. Por eso, no dudaremos en tomar acciones que beneficien a nuestros jugadores. Si un jugador no se siente 100% satisfecho con un patrocinador entonces es nuestra responsabilidad anular ese apadrinamiento.
            </li>
                    <li>
                        <span className="list-label bold">Peticiones razonables:</span>
                        Nunca hemos tenido algún problema al respecto, pero consideramos que es necesario hacerle saber a nuestros jugadores que deben ser razonables con las peticiones que tengan. Así mismo, es nuestro deseo que los padrinos nos notifiquen si sienten que su jugador esta siendo muy exigente con sus peticiones.
            </li>
                    <li>
                        <span className="list-label bold">¡No seas tímido!</span>
                        A veces, es difícil pedir ayuda incluso cuando tu y todos a tu alrededor saben que la necesitas. Sabemos que para algunos jugadores puede ser incomodo y vergonzoso admitir que esta atravesando por una situación difícil. Sin embargo, exhortamos a nuestro padrinos a crear un vinculo de amistad que le permita a su jugador hablar manera clara y honesta; esa es la única manera en la que un padrino podrán saber que tipo de ayuda un jugador realmente necesita.
            </li>
                </ul>
                <h3>Tus Responsabilidad</h3>
                <ul>
                    <li>
                        <span className="list-label bold">Desinterés:</span>
                        Nuestros padrinos actuan exclusivamente en pro del beinestar de los jugadores que patrocinan. <span className="bold">Bajo ninguna circunstancia un jugador le debe algo a un padrino.</span> Estamos seguros que los padrinos recibirán el agradecimiento de parte de los jugadores; pero esta terminantemente prohibido pedir algún favor y/o regalo a un jugador. El padrino que incumpla esta norma, será removido inmediatamente de nuestro programa.
            </li>
                    <li>
                        <span className="list-label bold">Estándares financieros:</span>
                        Solicitamos que nuestros padrinos que su compromiso de apadrinamiento dure como mínimo una temporada, sin embargo, sabemos que el 95% de esas relaciones serán de por vida.<br /><br />Igualmente, alentamos a que <span className="bold">la ayuda financiera que un padrino le provee a un jugador este entre los $100 y $150 mensuales.</span> Esa ayuda en dólares puede darse en paquetes o tarjetas de regalos, transferencias vía PayPal o Venmo, etc.<br /><br />Si en algún momento siente que su propio bienestar financiero está en peligro debido a la obligación que usted tiene con su jugador, por favor, contáctenos para que podamos ayudarlo a usted y a su jugador de la mejor manera posible.
            </li>
                    <li>
                        <span className="list-label bold">Déjanos Saber si Algo no Está Bien:</span>
                        Estamos aquí para usted, si algo parece no estar bien con la relación que está construyendo con su jugador, es nuestro deseo que nos los notifique de manera inmediata. No dudaremos en actuar para solucionar cualquier problema que pueda surgir.
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