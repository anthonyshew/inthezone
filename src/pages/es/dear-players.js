import React, { useState } from "react"
import '../../styles/audience-forms.scss'
import { useForm } from 'react-hook-form'

import Layout from "../../components/layout"
import SEO from "../../components/seo"

export default ({ location }) => {
    const [success, setSuccess] = useState(false)

    return (
        <Layout location={location}>
            <SEO title="Registro de Jugador">
                <meta name="og:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image:alt" content="Registro de Jugador - Adopt a Minor Leaguer" />
            </SEO>
            <div className="page-dear-players">
                {success ? <SuccessMessage /> : <SignUpForm setSuccess={setSuccess} />}
            </div>
        </Layout>
    )
}

const SuccessMessage = ({ lastName }) => (
    <p>¡Gracias por registrarte, {lastName}! En breve estarás escuchando de nosotros (generalmente en menos que 48 horas).</p>
)

const SignUpForm = ({ setSuccess }) => {
    const { register, errors, handleSubmit } = useForm()
    const onSubmit = data => {
        if (data.honeypot.length > 0) return console.log('¡Hola, roboto!')
        fetch("/.netlify/functions/api/player-registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => setSuccess(true))
    }

    return (
        <>
            <section className="obligations">
                <h2>Querido Jugador,</h2>
                <p>Estás aquí para ayuda y nos vamos a asegurar lo recibes.<span className="bold"> Por favor, lee todo en esta página antes de registrando para que sabes esperar.</span></p>
                <h3>Que Pasaré</h3>
                <p>Nos dejarás que quieres ser patrocinado. Vamos a ver tu mensaje, informar nuestra comijndad que un jugador está disponible por patrocinado, y tenerás un 1-a-1 relación nuevo con un compañero aficionado del beisbol por ayudarte en tu camina a Las Grandes Ligas. Generalmente, el proceso toma menos que 48 horas.</p>
                <h3>Tus Responsibilidades</h3>
                <ul>
                    <li>
                        <span className="list-label bold">Anónimo:</span>
                        Respetamos que algunos judagores quieren quedarse anónimo durante este proceso. La sola persona que vamos a compartir tu identidad es tu padrino. Tu padrino ha recibido instrucciones que tiene que respetar to anonimato también.<br /><br />Si eliges, puedes dejar tu padrino que no te importas si se compartir tu identidad con familia y amigos. También, puedes dejarnos que no te importas si te referimos tu nombre (por publicaciones en redes socials, por ejemplo).
                We respect that some players will want to stay anonymous through this process. The only person we will share your identity with is your sponsor. Your sponsor has received instructions that they need to respect your anonymity as well.<br /><br />If you choose, you can let your sponsor know that you don't mind if they share your identity with family and friends. Additionally, you can let us know at any point that you don't mind if we refer to your name (for social media posts, for example).
            </li>
                    <li>
                        <span className="list-label bold">Casamentro:</span>
                        Generalmente, emparejamos jugadores con padrinos en menos que 48 horas pero seramos pacient si significa esperando por un ajuste correcto. Algunos padrions nos dicen que prefieren jugadores de ciertas organizaciones o que tienen cierto conjunto necesidades financieras. Por lo tanto, si no cabes con los padrinos que están disponibles ahora, vamos a esperar hasta encuentramos uno que te cabe.<br /><br />Confía con nosotros: emparejar persons por el bien de haciendo un casamiento no es la camina. Nos aseguraramos que el casamiento es correcto primero y, si en cualquier punto, crees que tu casamiento es menos que perfecto, haznos saber.
            </li>
                </ul>
                <h3>Responsibilidades de Padrinos</h3>
                <ul>
                    <li>
                        <span className="list-label bold">Anónimo:</span>
                        Cómo dicemos arriba, padrinos están instruidos mantener tu identidad un secreto. Sin embargo, si estás comodo con ellos mencionando to nombre, puedes dejarles.
            </li>
                    <li>
                        <span className="list-label bold">Desinterés:</span>
                        Nuestros padrinos están informados que a ellos no se les debe nada para sus servicio a un jugador. No tienen un hoja de tu salario del futuro, no es obligatrio que comprás boletos por juegos, y no les debes información del dentro sobre tu club. Ellos están ayudandote como un acto de bonda y nada más. (Pero deberias decir gracias.)
            </li>
                    <li>
                        <span className="list-label bold">Ayuda Financiera o Superdotada:</span>
                        La dejamos a cada padrino individual para decidir como quieres ayudarte. Tipicamente, padrinos ayudan enviando paquetes de cuidado, tarjetas de regalo por ristorantes o comestibles, o, aveces, pagos de Venmo. Recomiendas que padrinos el total de los dolares cuestan cerca de $100-150 USD por mes hasta el proximo Spring Training del año siguiente. La mayoría de las veces, sin embargo, estas relaciones duran much más.

            </li>
                </ul>
                <h3>Tus Responsibilidades</h3>
                <ul>
                    <li>
                        <span className="list-label bold">Agradecimiento:</span>
                        Un fanático de beisbol está a punto de ayudarte puromente porque tiene el pasión por el juego y quieren hacer una diferencia en la vida de un jugador del beisbol. Sabemos que la vida de las ligas mernoes pueden ser agotador pero<span className="bold"> alguien quiere aliviar su carge - y estamos agradecidos por ellos.</span>
                    </li>
                    <li>
                        <span className="list-label bold">¡No seas tímido!</span>
                        A veces, es dificil pedir ayuda incluso cuando tu y todos a tu alrededor saben que la necesitas. Entendemos que torpe puede ser decir "No he podido comer mi bocadillo favorito por mucho tiempo porque no lo vender in la ciudad be mi equipo. ¿Puedes enviarme algunos?" Pero, por favor recuerde, tu padrino fichó por esta razón exacta. Está bien preguntar (con razón).<br /><br />También, <span className="bold">¡conoce a tu padrino!</span> ¡Si no sabes sobre sus mascotas y niños, lo estás haciendo mal!
            </li>
                    <li>
                        <span className="list-label bold">Difundir la Palabra:</span>
                        Lo más probable es que muchose de tus compañeros puedan usar un padrino, también. Siéntate libre de difundir la palabra en el clubhouse sobre tu padrino, nuestro organización, y como ayudamos. También, puedes crear un publicación en los medios de comunicación social si te sientes. ¡Puestes de apreciación con los paquetes de cuidados de tus padrinos son nuestros favoritos!
            </li>
                    <li>
                        <span className="list-label bold">Si Algo No es Correcto, dinos</span>
                        Estámos aquí para ti si algo no parece correcto con la relación estás construyendo con tu padrino. No dudaremos pbrar si indicas que hay una problema que necisitamos arreglar que podemos controlar.
            </li>
                </ul>
            </section>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Formulario de Registro de Jugador</h1>
                <label htmlFor="firstName">Nombre de Pila</label>
                <input type="text" name="firstName" ref={register({ required: true, maxLength: 80 })} style={errors.firstName ? { borderColor: '#CC0001' } : null} />
                {errors.firstName && <p className="error">Se requiere un nombre.</p>}
                <label htmlFor="lastName">Apellido</label>
                <input type="text" name="lastName" ref={register({ required: true, maxLength: 100 })} style={errors.lastName ? { borderColor: '#CC0001' } : null} />
                {errors.lastName && <p className="error">Se requiere un apellido.</p>}
                <label htmlFor="organization">Organización</label>
                <select name="organization" ref={register({ required: true, minLength: 5 })} style={errors.organization ? { borderColor: '#CC0001' } : null}>
                    <option></option>
                    <option value="Arizona Diamondbacks">Arizona Diamondbacks</option>
                    <option value="Atlanta Braves">Atlanta Braves</option>
                    <option value="Baltimore Orioles">Baltimore Orioles</option>
                    <option value="Boston Red Sox">Boston Red Sox</option>
                    <option value="Chicago Cubs">Chicago Cubs</option>
                    <option value="Chicago White Sox">Chicago White Sox</option>
                    <option value="Cincinnati Reds">Cincinnati Reds</option>
                    <option value="Cleveland Indians">Cleveland Indians</option>
                    <option value="Colorado Rockies">Colorado Rockies</option>
                    <option value="Detroit Tigers">Detroit Tigers</option>
                    <option value="Houston Astros">Houston Astros</option>
                    <option value="Kansas City Royals">Kansas City Royals</option>
                    <option value="Los Angeles Angels">Los Angeles Angels</option>
                    <option value="Los Angeles Dodgers">Los Angeles Dodgers</option>
                    <option value="Miami Marlins">Miami Marlins</option>
                    <option value="Milwaukee Brewers">Milwaukee Brewers</option>
                    <option value="Minnesota Twins">Minnesota Twins</option>
                    <option value="New York Mets">New York Mets</option>
                    <option value="New York Yankees">New York Yankees</option>
                    <option value="Oakland Athletics">Oakland Athletics</option>
                    <option value="Philadelphia Phillies">Philadelphia Phillies</option>
                    <option value="Pittsburgh Pirates">Pittsburgh Pirates</option>
                    <option value="San Diego Padres">San Diego Padres</option>
                    <option value="San Francisco Giants">San Francisco Giants</option>
                    <option value="Seattle Mariners">Seattle Mariners</option>
                    <option value="St. Louis Cardinals">St. Louis Cardinals</option>
                    <option value="Tampa Bay Rays">Tampa Bay Rays</option>
                    <option value="Texas Rangers">Texas Rangers</option>
                    <option value="Toronto Blue Jays">Toronto Blue Jays</option>
                    <option value="Washington Nationals">Washington Nationals</option>
                </select>
                {errors.organization && <p className="error">Se requiere un organización.</p>}
                <label htmlFor="email">Email</label>
                <input type="text" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} style={errors.email ? { borderColor: '#CC0001' } : null} />
                {errors.email && <p className="error">Se requiere un email válido.</p>}
                <label htmlFor="phoneNumber">Número de Teléfono</label>
                <input type="tel" name="phoneNumber" ref={register({ required: true, minLength: 10, maxLength: 10 })} style={errors.phoneNumber ? { borderColor: '#CC0001' } : null} />
                {errors.phoneNumber && <p className="error">Se requiere un número de teléfono de 10 dígitos.</p>}
                <input className="honeypot" name="honeypot" ref={register()} />

                <button type="submit" className="submit-button">Enviar</button>
            </form>
        </>
    )
}