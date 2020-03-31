import React, { useState, useEffect  } from "react"
import '../styles/audience-forms.scss'
import { useForm, useFieldArray } from 'react-hook-form'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ location }) => {
    const [success, setSuccess] = useState(false)

    return (
        <Layout location={location}>
        <SEO title="Sponsor Sign Up Form">
        <meta name="og:image" content="/media/aaml-logo.png" />
        <meta name="twitter:image" content="/media/aaml-logo.png" />
        <meta name="twitter:image:alt" content="Sponsor Sign Up to Adopt a Minor Leaguer" />
            </SEO>
            <div className="page-dear-sponsors">
            {success ? <SuccessMessage  /> : <SignUpForm setSuccess={setSuccess} />}
            </div>
        </Layout>
    )
}

const SuccessMessage = () => (
    <p>Thank you for signing up! You'll be hearing from us shortly (usually within the next 24 hours).</p>
)

const SignUpForm = ({setSuccess}) => {
    const { register, control, reset, watch, errors, handleSubmit } = useForm({
        defaultValues: {
            teams: ["Any of them!",
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
            <h2>Dear Sponsors,</h2>
        <p>You're here to help a player in need and we couldn't be happier. <span className="bold"> Please read everything on this page before signing up so you know what to expect.</span></p>
        <h3>What is About to Happen</h3>
        <p>You're about to let us know that you would like to be a player sponsor. We will get your message, check out our list of players in need, and you will begin building your 1-to-1 relationship with your player. This usually takes less than 48 hours.</p>
        <h3>Our Responsibilities</h3>
        <ul>
            <li>
                <span className="list-label bold">Anonymity:</span>
                Our organization is player-first. We know that some players want to remain anonymous about receiving outside financial help while they are a part of a professional baseball organization. We respect that and strictly require sponsors respect that as well. <span className="bold">Make sure to ask your player if he wants to be anonymous. If you don't know, allow your player to be anonymous to everyone other than you.</span>
            </li>
            <li>
            <span className="list-label bold">Matchmaking:</span>
                We usually match sponsors to players within 48 hours but we will be patient if it means waiting for the right fit. When we have reason to believe that a certain relationship may not be the best one for player, sponsor, or AaML, we may wait for a better one. For instance, if you are interested in a particular team(s), we'll wait to have a player from that organization.<br /><br />Trust us: matching people up just for the sake of getting a match made isn't the way to go. We will make sure things are right, and, if at any point you believe you aren't matched up well, let us know.
            </li>
        </ul>
        <h3>Player Responsibilities</h3>
        <ul>
        <li>
                <span className="list-label bold">If something is not right, tell us:</span>
                We will not hesitate to remove a sponsorship if a player asks us to. We are here for the players and, if for any reason they ask us to terminate a sponsorship, we will.
            </li>
            <li>
            <span className="list-label bold">Reasonable Requests:</span>
                We have never had an issue with this but we do believe it is worth stating: Our players are required to be reasonable with their aid requests. If you, as a sponsor, believe your player is asking for too much, please do not hesistate to let us know.
            </li>
            <li>
            <span className="list-label bold">Don't Be Shy!</span>
            Sometimes it is hard to ask for help even when you and everyone around you knows you need it. We understand how awkward it can be to say "I haven't been able to eat my favorite snack for a long time because they don't sell it in my team's town. Can you send me some?" As a sponsor, do what you can to make your player comfortable and create a relationship where this becomes easier for a player.
            </li>
        </ul>
        <h3>Your Responsibility</h3>
        <ul>
            <li>
                <span className="list-label bold">Selflessness:</span>
                Our sponsors act purely out of the well-being of the players they are sponsoring. <span className="bold">Under no circumstance are sponsors owed anything by a player in return for being a part of this community.</span> It's probably okay to expect a "thank you" - but asking for anything else back from your player is not allowed and grounds for termination of sponsorship.
            </li>
            <li>
                <span className="list-label bold">Financial Standards:</span>
                We ask for our sponsors to create a sponsorship that will last at least until the player's next Spring Training, whenever that is. About 95% of the time, though, you're about to create a life-long relationship.<br /><br /> We encourage sponsors to use <span className="bold">about $100-150 per month</span> on their player - but won't stop passionate sponsors from being more gracious. That dollar amount can take the shape of anything from care packages, gift cards, equipment, grocery money, or many other options.<br /><br />If at any time you feel your own finanical well-being is in danger because of your obligation to your player, please contact us so we can help.
            </li>
            <li>
                <span className="list-label bold">If something is not right, tell us:</span>
                We are here for you if something doesn't seem quite right with the relationship you are building with your player. We will not hesitate to act if you indicate that there is a problem that needs fixing that is within our control.
            </li>
        </ul>
    </section>
    <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sponsor Sign Up Form</h1>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" ref={register({ required: true, maxLength: 80 })} style={errors.firstName ? { borderColor: '#CC0001' } : null} />
        {errors.firstName && <p className="error">First Name required.</p>}
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" ref={register({ required: true, maxLength: 100 })} style={errors.lastName ? { borderColor: '#CC0001' } : null} />
        {errors.lastName && <p className="error">Last Name required.</p>}
        <label htmlFor="email">Email</label>
        <input type="text" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} style={errors.email ? { borderColor: '#CC0001' } : null} />
        {errors.email && <p className="error">Valid email required.</p>}
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="tel" name="phoneNumber" ref={register({ required: true, minLength: 10, maxLength: 10 })} style={errors.phoneNumber ? { borderColor: '#CC0001' } : null} />
        {errors.phoneNumber && <p className="error">10 Digit Phone Number required.</p>}
        <h2>Preferred Teams</h2>
        {fields.map((elem, index) => (
            <div key={index} className="container-checkbox">
            <input className="checkbox" type="checkbox" value={elem.value} name={`teams[${index + 1}]`} ref={register} />
            <label htmlFor={`teams[${index}]`} className="checkbox-label">{elem.value}</label>
            </div>
        ))}
        {Object.values(watch()).filter((elem => elem === false)).length === 31 && <p className="error">You must select at least one organization.</p>}
        <input className="honeypot" name="honeypot" ref={register()} />

        <input type="submit" className="submit-button" />
    </form>
    </>
    )
}