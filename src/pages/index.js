import React, { useState } from "react"
import { Link } from "gatsby"
// import { useSpring, animated } from "react-spring"
import "../styles/global.scss"

import { Accordion, AccordionItem } from "../components/accordion"
import ReturnToTop from "../components/returnToTop"
import PlayerCard from "../components/playerCard"
import ContactForm from "../components/contactForm"
import Field from "../components/field"
import Logo from "../components/logo"

const clients = [
  {
    href: "https://pushperformancegym.com",
    src: "push-performance.png",
    name: "Push Performance Gym",
  },
  {
    href: "https://customizer.flatbillbaseball.com",
    src: "flatbill.png",
    name: "Flatbill Jersey Customizer"
  },
  {
    href: "https://adoptaminorleaguer.com",
    src: "aaml.jpg",
    name: "Adopt a Minor Leaguer"
  },
  {
    href: "https://comero.netlify.app",
    src: "comero.png",
    name: "Comero"
  },
  {
    href: "https://missionmechanicalservices.com",
    src: "mmsi.png",
    name: "Mission Mechanical Services Inc."
  },
  {
    href: "https://roguebaseballperformance.com",
    src: "rogue.png",
    name: "Rogue Baseball Performance"
  },
]

export default () => {
  const [hoveredClient, setHoveredClient] = useState("")

  return (
    <div>
      <Logo />
      <Field />
      <ReturnToTop />
      <Link className="contact-button" to="#contact-form">CONTACT US</Link>

      <section className="hero">
        <h2>Painting the corners on your website.</h2>
      </section>

      <section className="services">
        <h2>What can we do for you?</h2>
        <h3>(Click or tap for more information)</h3>
      </section>

      <Accordion>
        <AccordionItem header="Website Builds">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus ratione maiores adipisci molestiae fugiat facere, quam est non repellat ea reiciendis cupiditate deleniti aut accusamus ipsum eaque aspernatur. Numquam consectetur placeat voluptatum architecto quod iusto ex sunt omnis tenetur magni!
        </AccordionItem>
        <AccordionItem header="App Builds">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus ratione maiores adipisci molestiae fugiat facere, quam est non repellat ea reiciendis cupiditate deleniti aut accusamus ipsum eaque aspernatur. Numquam consectetur placeat voluptatum architecto quod iusto ex sunt omnis tenetur magni!
        </AccordionItem>
        <AccordionItem header="Maintenance Work">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus ratione maiores adipisci molestiae fugiat facere, quam est non repellat ea reiciendis cupiditate deleniti aut accusamus ipsum eaque aspernatur. Numquam consectetur placeat voluptatum architecto quod iusto ex sunt omnis tenetur magni!
        </AccordionItem>
      </Accordion>

      <section className="previous-work">
        <h2>Previous Work</h2>
        <p className="client-hover-label" style={hoveredClient === "" ? { opacity: 0 } : { opacity: 1 }}> {hoveredClient}</p>
        <div className="flex">
          {clients.map(client => (
            <a key={client.href} className="client-link" href={client.href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredClient(client.name)} onMouseLeave={() => setHoveredClient("")}>
              <img className="client-image" src={`/images/${client.src}`} alt={client.name} />
            </a>)
          )}
        </div>
      </section>

      <section className="staff">
        <h2>Who We Are</h2>
        <div className="flex">
          <PlayerCard
            header="Your Starter"
            position="Client Outreach & Design"
            name="Mitch Horacek"
            imagePath="me.png"
          >
            Mitch Horacek is the gentleman in charge of getting us work and I bet he can do some of the design work we need if he knew all the functionality in Figma here. Words take up space.
          </PlayerCard>
          <PlayerCard
            header="Your Closer"
            position="Development Lead"
            name="Anthony Shew"
            imagePath="me.png"
          >
            Anthony Shew takes the work that Mitch started and turns it into the product that you are going to love. As a full-stack Javascript developer, he’s able to create almost anything you can dream up.
          </PlayerCard>
        </div>
      </section>

      <section id="contact-form" className="contact">
        <h2>Get In Touch</h2>
        <p>Whether you need a custom application or a Wordpress site (or don't even know what you need!), we want to hear how we can add value to your business. Fill in the form below and we'll respond to you within 48 hours (unless we're on the road and the hotel wifi is out.)</p>
        <ContactForm />
      </section>

    </div>
  )
}