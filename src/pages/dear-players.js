import React, { useState } from "react"
import '../styles/audience-forms.scss'
import { useForm } from 'react-hook-form'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ location }) => {
    const [success, setSuccess] = useState(false)

    return (
        <Layout location={location}>
        <SEO title="Player Sign Up Form">
        <meta name="og:image" content="/media/aaml-logo.png" />
        <meta name="twitter:image" content="/media/aaml-logo.png" />
        <meta name="twitter:image:alt" content="Player Sign Up - Adopt a Minor Leaguer Page" />
            </SEO>
            <div className="page-dear-players">
            {success ? <SuccessMessage /> : <SignUpForm setSuccess={setSuccess} />}
            </div>
        </Layout>
    )
}

const SuccessMessage = ({lastName}) => (
<p>Thank you for signing up, {lastName}! You'll be hearing from us shortly (usually within the next 24 hours).</p>
)

const SignUpForm = ({setSuccess}) => {
    const { register, errors, handleSubmit } = useForm()
    const onSubmit = data => {
        if (data.honeypot.length > 0) return console.log('Hello, robot!')
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
            <h2>Dear Players,</h2>
        <p>You're here for some help and we will make sure you get it. <span className="bold"> Please read everything on this page before signing up so you know what to expect.</span></p>
        <h3>What is About to Happen</h3>
        <p>You're about to let us know that you would like to be sponsored. We will get your message, let our community know about your interest in being sponsored, and you will have a brand new, 1-to-1 relationship with a fellow baseball lover to help you on your way to The Show. This usually takes less than 48 hours.</p>
        <h3>Our Responsibilities</h3>
        <ul>
            <li>
                <span className="list-label bold">Anonymous:</span>
                We respect that some players will want to stay anonymous through this process. The only person we will share your identity with is your sponsor. Your sponsor has received instructions that they need to respect your anonymity as well.<br /><br />If you choose, you can let your sponsor know that you don't mind if they share your identity with family and friends. Additionally, you can let us know at any point that you don't mind if we refer to your name (for social media posts, for example).
            </li>
            <li>
            <span className="list-label bold">Matchmaking:</span>
                We usually math players to sponsors within 48 hours but we will be patient if it means waiting for the right fit. Some sponsors tell us that they only are interested in players from certain organizations or that have a certain set of financial needs. Therefore, if you don't fit with the sponsors that are available right now, we will wait until we find one that does fit with you.<br /><br />Trust us: matching people up just for the sake of getting a match made isn't the way to go. We will make sure things are right, and, if at any point you believe you aren't matched up well, let us know.
            </li>
        </ul>
        <h3>Sponsor Responsibilities</h3>
        <ul>
            <li>
                <span className="list-label bold">Anonymous:</span>
                As we have mentioned above, sponsors are instructed by us to keep your identity a secret. However, if you are comfortable with them mentioning your name, you can let them know.
            </li>
            <li>
            <span className="list-label bold">Selflessness:</span>
                Our sponsors are informed that they are not owed anything for their service to a player. They don't own a piece of your future salary, you aren't required to buy them tickets, and you don't owe them inside information about your club. They are helping you as an act of kindness and nothing more. (But you probably should say thank you.)
            </li>
            <li>
            <span className="list-label bold">Financial or Gifted Aid:</span>
                We leave it up to each individual sponsor to decide how they want to help you. Typically, sponsors help by sending care packages, restaurant or grocery gift cards, or, sometimes, Venmo payments. We recommend to sponsors that the total dollar cost of what they give you end up somewhere near $100-150 per month until the next Spring Training of the following year. Most of the time, though, these relationships last far longer.
            </li>
        </ul>
        <h3>Your Responsibility</h3>
        <ul>
            <li>
                <span className="list-label bold">Gratefulness:</span>
                A baseball fan is about to help you purely out of passion for the game and wanting to make a difference in your life as a baseball player. We know that minor league baseball can be quite punishing but<span className="bold"> someone wants to ease your burden - and we are thankful for them.</span>
            </li>
            <li>
                <span className="list-label bold">Don't Be Shy!</span>
                Sometimes it is hard to ask for help even when you and everyone around you knows you need it. We understand how awkward it can be to say "I haven't been able to eat my favorite snack for a long time because they don't sell it in my team's town. Can you send me some?" But, please remember, your sponsor signed up for this exact reason. It is okay to ask for something (...within reason).<br /><br />Also, <span className="bold">get to know your sponsor!</span> If you don't know about their pets and kids, you're doing it wrong!
            </li>
            <li>
                <span className="list-label bold">Spread the Word:</span>
                Odds are many of your teammates could use a sponsor, too. Feel free to spread the word around the clubhouse about your sponsorship, our organization, and how we help out. You can also make a post on social media about us if you feel strongly enough. Appreciation posts with care packages from your sponsors are our favorite!
            </li>
            <li>
                <span className="list-label bold">If something is not right, tell us:</span>
                We are here for you if something doesn't seem quite right with the relationship you are building with your sponsor. We will not hesitate to act if you indicate that there is a problem that needs fixing that is within our control.
            </li>
        </ul>
    </section>
    <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Player Sign Up Form</h1>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" ref={register({ required: true, maxLength: 80 })} style={errors.firstName ? { borderColor: '#CC0001' } : null} />
        {errors.firstName && <p className="error">First Name required.</p>}
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" ref={register({ required: true, maxLength: 100 })} style={errors.lastName ? { borderColor: '#CC0001' } : null} />
        {errors.lastName && <p className="error">Last Name required.</p>}
        <label htmlFor="organization">Organization</label>
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
        {errors.organization && <p className="error">Organization required.</p>}
        <label htmlFor="email">Email</label>
        <input type="text" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} style={errors.email ? { borderColor: '#CC0001' } : null} />
        {errors.email && <p className="error">Valid email required.</p>}
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="tel" name="phoneNumber" ref={register({ required: true, minLength: 10, maxLength: 10 })} style={errors.phoneNumber ? { borderColor: '#CC0001' } : null} />
        {errors.phoneNumber && <p className="error">10 Digit Phone Number required.</p>}
        <input className="honeypot" name="honeypot" ref={register()} />

        <input type="submit" className="submit-button" />
    </form>
    </>
    )
}