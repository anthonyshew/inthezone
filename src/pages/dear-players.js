import React from "react"
import '../styles/dear-players.scss'
import { useForm } from 'react-hook-form'

import Layout from "../components/layout"

export default ({ location }) => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => console.log(data)
    console.log(errors)

    return (
        <Layout location={location}>
            <div className="page-dear-players">
                <div className="obligations">
                    Obligations.
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Player Sign Up Form</h1>
                    <label htmlFor="First name">First Name</label>
                    <input type="text" name="First name" ref={register({ required: true, maxLength: 80 })} />
                    <label htmlFor="Last name">Last Name</label>
                    <input type="text" name="Last name" ref={register({ required: true, maxLength: 100 })} />
                    <label htmlFor="Organization">Organization</label>
                    <select name="Organization" ref={register({ required: true })}>
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
                    <label htmlFor="Email">Email</label>
                    <input type="text" name="Email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                    <label htmlFor="Phone number">Phone Number</label>
                    <input type="tel" name="Phone number" ref={register({ required: true, minLength: 10, maxLength: 10 })} />
                    <input className="honeypot" name="Honeypot" />

                    <input type="submit" className="submit-button" />
                </form>
            </div>
        </Layout>
    )
}