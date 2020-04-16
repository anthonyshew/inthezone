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
                <p>ELlegaste a nosotros en busca de ayuda, así que nos aseguraremos que recibas el apoyo que necesitas.<span className="bold"> Por favor, lee todo en esta sección antes de registrando para que sabes esperar.</span></p>
                <h3>¿Qué va a suceder?</h3>
                <p>Estas a punto de dejarnos saber que necesitas ayuda y que deseas ser apadrinado. Tan pronto recibamos tu mensaje, le informaremos a nuestra red de padrinos que tenemos a un jugador esperando ser apadrinado. Luego, tu padrino tendrá 48 horas para colocarse en contacto contigo y comenzar a construir una relación que hará que tu camino a las Grandes Ligas sea mas fácil.</p>
                <h3>Nuestra Responsabilidad</h3>
                <ul>
                    <li>
                        <span className="list-label bold">Anonimato:</span>
                        Respetamos el hecho de que algunos jugadores deseen permanecer en el anonimato, es por eso que el padrino será la única persona con la que compartiremos tu identidad. Es importante que sepas que tu padrino ha recibido instrucciones de que también deben respetar tu deseo de permanecer bajo el anonimato. Si por el contrario no tienes problema con el hecho de que tu padrino comparta tu identidad con sus familiares y amigos, entonces puedes dejárselo saber.
                        <br /><br />También puedes dejarnos saber si deseas que compartamos tu identidad en nuestras publicaciones de Redes Sociales; si por el contrario decides permanecer bajo el anonimato, nos encargaremos de cumplir con tu voluntad y proteger tu identidad..
            </li>
                    <li>
                        <span className="list-label bold">Establecimiento de Contacto:</span>
                        Por lo general, tratamos de enlazar a los padrinos y a los jugadores en un lapso de 48  horas, pero seremos pacientes si eso significa esperar por el padrino mas indicado para un jugador. Algunos padrinos están interesados ​​en jugadores de ciertas organizaciones o tienen un conjunto de necesidades financieras que no se adaptan a las necesidades de cualquier jugador. Por lo tanto, si un jugador no encaja con los padrinos que están disponible, entonces esperaremos hasta encontrar un padrino que se ajuste a las necesidades del jugador.<br /><br />Confía en nosotros: Conectar a un jugador y a un padrino por el simple hecho de hacerlo no es el camino a seguir. Nos aseguraremos de hacer y mantener bien las cosas. Si en algún momento siente que su relación de apadrinamiento no es la mejor, entonces no dude en comunicárnoslo.
            </li>
                </ul>
                <h3>Responsabilidades del Padrino</h3>
                <ul>
                    <li>
                        <span className="list-label bold">Anonimato:</span>
                        Como lo mencionamos anteriormente, siempre recomendamos que la identidad de nuestros jugadores y padrinos se mantengan en el anonimato. Cuando eres parte del programa de apadrinamiento, solo develaremos tu identidad a la persona que te estará apadrinando. Queda a discreción del jugador el querer revelar o no su identidad y dejarle saber a todos que forma parte de este proyecto. Si no tienes problema develando tu identidad entonces puedes comunicarle eso a tu padrino y a nosotros.
            </li>
                    <li>
                        <span className="list-label bold">Desinterés:</span>
                        Es nuestra obligación  dejarle saber a nuestros padrinos y a nuestros jugadores que la ayuda que le brindan y reciben, respectivamente, es de manera solidaria y desinteresada. Mas allá del un profundo agradecimiento, los jugadores NO tienen ningún tipo de obligación con los padrinos. El apadrinamiento no es un intercambio comercial, es una acto de bondad y solidaridad.
            </li>
                    <li>
                        <span className="list-label bold">Ayuda Financiera o Regalos:</span>
                        Dejamos a discreción de cada padrino la modalidad con la cual decida ayudar a su jugador. Algunos padrinos deciden ayudar enviándole paquetes de regalo a sus jugadores, otros envían tarjetas de regalo; y otros deciden transferirle dinero vía PayPal o Venmo. Hay muchas manera de ayudar y apoyar a un jugador y eso es algo que el padrino ira descubriendo a medida que crezca la comunicación entre este y el jugador. Consideramos que una ayuda mínima que este $100 y $150 mensuales es un monto que podría ayudar considerablemente a un jugador y como mínimo requerimos que el compromiso del padrino sea por una temporada; pero siempre a la espera de que el vinculo entre entre padrino y jugador sea de por vida.

            </li>
                </ul>
                <h3>Tus Responsabilidades</h3>
                <ul>
                    <li>
                        <span className="list-label bold">Agradecimiento:</span>
                        Un fanático del béisbol está a punto de ayudarte por pura pasión, amor y convicción. Este padrino quiere marcar una diferencia en tu vida. Sabemos que la vida en Ligas Menores puede ser bastante difícil,<span className="bold"> alguien quiere aliviar su carga - y sabemos que tnatoto como nosotros estamos agradecidos per eso.</span>
                    </li>
                    <li>
                        <span className="list-label bold">¡No seas tímido!</span>
                        A veces, es difícil pedir ayuda incluso cuando tu y todos a tu alrededor saben que la necesitas. Sabemos que para algunas personas puede ser incomodo y vergonzoso admitir que esta atravesando por una situación difícil. Sin embargo, exhortamos a nuestro jugadores a confiar y a hablar de manera clara y honesta con sus padrinos; esa es la única manera en la que ellos podrán saber que tipo de ayuda necesitas.<br /><br />También, <span className="bold">conversa con tu padrino sobre su familia, mascotas, y su vida, recuerda que se trata de formar un vinculo de amistad.</span>
                    </li>
                    <li>
                        <span className="list-label bold">¡Riega la Voz!</span>
                        Es muy posible que muchos de tus compañeros de equipo también estén atravesando por un momento difícil y estén necesitando el apoyo de un padrino. Te invitamos a regar la voz y a dejarle saber a tus compañeros sobre nuestra organización y de cómo podemos ayudarlos. Si te sientes cómodo haciéndolo, también puedes regar la voz en Redes Sociales. Una publicación en Redes Sociales sobre nosotros o sobre algún obsequio que recibas de tu padrino, ayudan a dar a conocer nuestro proyecto y al mismo tiempo motiva a más personas se sumarse al mismo.
            </li>
                    <li>
                        <span className="list-label bold">Déjanos saber si algo no esta bien</span>
                        Para nosotros es fundamental que la relación entre los jugadores y los padrinos sea la mejor. Por eso, no dudaremos en tomar acciones que beneficien a nuestros jugadores. Si un jugador tiene algún problema con su padrino entonces no dudaremos en anular ese apadrinamiento.
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