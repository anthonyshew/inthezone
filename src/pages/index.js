import React, { useState } from "react"
import "../styles/global.scss"

import SEO from "../components/seo"
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
      <SEO
        title="Home"
      >
        <meta name="og:image" content="/images/agency-logo.png" />
        <meta name="twitter:image" content="/images/agency-logo.png" />
        <meta name="twitter:image:alt" content="In the Zone Development" />
      </SEO>
      <Logo />
      <ReturnToTop />

      <a className="contact-button" href="#contact-form">CONTACT US</a>

      <section className="hero">
        <Field />
        <h2>Painting the corners on your website.</h2>
        <p>In the Zone development is committed to adding value to your business through the power of digital media.</p>
      </section>

      <section className="services">
        <h2>What can we do for you?</h2>
        <h3>(Click or tap for more information)</h3>
      </section>

      <Accordion>
        <AccordionItem header="Website Builds">
          <div className="container">
            <h4>We understand how important your web presence is to your business. We'll add as much value to you and your customers as we can - and we'll do it for the right price.</h4>
            <ul>
              <li>
                <h5>Modern Design</h5>
                <p>Beautiful, elegant, and usable design is a major part of what we do. If it doesn't look good, we won't make it.</p>
              </li>
              <li>
                <h5>User Experience</h5>
                <p>Technology constantly changes. That means the way your users' behavior and expectations change, too. In fractions of a second, your site visitors can decide if they love your site or not. We'll make sure they do.</p>
              </li>
              <li>
                <h5>User Interface</h5>
                <p>Fonts, spacing, colors, and a plethora of other design elements give users a certain idea about your business. We tie together these basic design elements tastefully to make your visitors' impression of your site a good one.</p>
              </li>
              <li>
                <h5>Content and Content Management</h5>
                <p>We can give you control of your content and make it as easy to update as your Facebook status. Seriously.</p>
              </li>
              <li>
                <h5>SEO</h5>
                <p>Your people are trying to use Google to find you. We'll use the latest in search engine optimization techniques to make sure that they can.</p>
              </li>
              <li>
                <h5>Speed</h5>
                <p>The slower your site is, the less people will enjoy it. As a matter of fact, they will click away from your site entirely. With us, high performance is a given.</p>
              </li>
              <li>
                <h5>Accessibility</h5>
                <p>You have an amazing website and we'll make sure everyone can use it. If your site visitors have visual or audio impairments, they'll still be able to enjoy your content. (And you'll avoid a nasty lawsuit!)</p>
              </li>

              <li>
                <h5>Branding</h5>
                <p>We put your brand first and foremost. Our design will reflect what your business is all about, from the way you treat your customers to the people that run it.</p>
              </li>
              <li>
                <h5>Security</h5>
                <p>It really doesn't matter how great your site is if it isn't safe from the rest of the internet. We'll keep you safe and we'll tell you how, too.</p>
              </li>
            </ul>
          </div>
        </AccordionItem>
        <AccordionItem header="App Builds">
          <div className="container">
            <h4>A custom application can create an unforgettable experience - and accelerate your business to new heights. If you've got a business problem that an app can fix, we can help.</h4>
            <ul>
              <li>
                <h5>Speed</h5>
                <p>Even the best apps can be ruined by poor performance. We create our apps with the highest performance we can get at every turn.</p>
              </li>
              <li>
                <h5>Security</h5>
                <p>Your users need to trust your security which means you need to trust your developers. We can prove how your app will stay secure. Just ask us how.</p>
              </li>
              <li>
                <h5>User Experience</h5>
                <p>Technology constantly changes. That means the way your users' behavior and expectations change, too. In fractions of a second, your site visitors can decide if they love your site or not. We'll make sure they do.</p>
              </li>
              <li>
                <h5>User Interface</h5>
                <p>Fonts, spacing, colors, and a plethora of other design elements give users a certain idea about your business. We tie together these basic design elements tastefully to make your visitors' impression of your site a good one.</p>
              </li>
              <li>
                <h5>Modern Design</h5>
                <p>Beautiful, elegant, and usable design is a major part of what we do. If it doesn't look good, we won't make it.</p>
              </li>
              <li>
                <h5>User Management</h5>
                <p>These days, nearly every app requires user management. Log in, log out, roles, and permissions. You need it and we've got it.</p>
              </li>
              <li>
                <h5>Databasing Capabilities</h5>
                <p>Join the Age of Data with our database management and architecture. Using only the latest approaches, we'll make sure your data is persistent, performant, and meaningful.</p>
              </li>
              <li>
                <h5>Accessibility</h5>
                <p>You have an amazing app and we'll make sure everyone can use it. If your site visitors have visual or audio impairments, they'll still be able to enjoy your content. (And avoid a nasty lawsuit!)</p>
              </li>
              <li>
                <h5>Scalability</h5>
                <p>What happens when you tweet about your new app and it goes viral? Will it crash? Not with In the Zone. Your app will be able to handle the traffic flawlessly.</p>
              </li>
            </ul>
          </div>
        </AccordionItem>
        <AccordionItem header="Maintenance Work">
          <div className="container">
            <h4>It takes work to make sure that your project stays as awesome as the day it was built. Entrust us with our tailored-to-you maintenance packages to keep your software up-to-date, fast, secure, and amazing.</h4>
            <ul>
              <li>
                <h5>Hosting</h5>
                <p>We utilize several different hosting types depending on your build and your needs. Whatever the case may be, we can get the right hosting for you and your business.</p>
              </li>
              <li>
                <h5>Security</h5>
                <p>Our hosting platforms are always up to date with the latest upgrades, software, firewalls, and every other security measure out there. Your project is safe with us.</p>
              </li>
              <li>
                <h5>Scalablility</h5>
                <p>We always ensure that we set up your hosting to respond to high traffic. If your great idea gets the recognition it deserves and people start usin g it like crazy, you'll be prepared.</p>
              </li>
              <li>
                <h5>Accessibility Updates</h5>
                <p>Today, web accessibility for the visual and hearing impaired is constantly changing (for the better). Not only is it great for your business for your tech to be usable by anyone, but it's also the law!</p>
              </li>
              <li>
                <h5>Bug Fixing</h5>
                <p>Every software has bugs. It's just a matter of if they get fixed or not. With In the Zone handling your maintenance, we will always fix your problems.</p>
              </li>
              <li>
                <h5>Speed</h5>
                <p>Many think that a fast website or app will always stay that way. However, the truth is that it takes work and monitoring to keep your project that way.</p>
              </li>
              <li>
                <h5>Tech Stack Updates</h5>
                <p>We monitor the web development space to ensure that your project is always on the cutting edge. The longer your project goes ignored, the less it works the way you want it to.</p>
              </li>
            </ul>
          </div>
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
            imagePath="mitch.png"
          >
            Mitch Horacek specializes in website design and client management. His job is to understand exactly how your website should look, feel, and operate, so that you can thrive in the online marketplace.
          </PlayerCard>
          <PlayerCard
            header="Your Closer"
            position="Development Lead"
            name="Anthony Shew"
            imagePath="anthony.png"
          >
            Anthony Shew takes the work that Mitch started and turns it into the product that you are going to love. As a full-stack Javascript developer, he’s able to create almost anything you can dream up.
          </PlayerCard>
        </div>
      </section>

      <section id="contact-form" className="contact">
        <h2>Get In Touch</h2>
        <p>Whether you need a custom application or a basic Wordpress site (or don't even know what you need!), we want to hear how we can add value to your business. Fill in the form below and we'll respond to you within 48 hours (unless we're on the road and the hotel wifi is out.)</p>
        <ContactForm />
      </section>

    </div>
  )
}