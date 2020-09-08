import React, { useState, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "../styles/gallery.scss"

import { useBodyScrollLock } from "../hooks/useBodyScrollLock"
import Layout from "../components/layout"

export default ({ location }) => {
    const { allGalleryImages, galleryItemsArray, colors } = useStaticQuery(graphql`
    query GalleryQuery{
        ...AllGalleryImages
        ...GalleryItemsArray
        ...Colors
    }
  `)

    const galleryImages = allGalleryImages.edges
    const galleryItems = galleryItemsArray.edges
    const { primaryColor, secondaryColor } = colors.childContentJson

    const [modalData, setModalData] = useState({})

    const handleModalOpen = (galleryObject) => {
        setModalData(galleryObject)
    }


    return (
        <Layout location={location} title="Gallery">
            {Object.keys(modalData).length > 0 && <GalleryModal modalData={modalData} setModalData={setModalData} imageSharps={galleryImages} primaryColor={primaryColor} secondaryColor={secondaryColor} />}
            <h1 className="page-title" style={{ color: secondaryColor }}>Gallery</h1>
            <div className="gallery-items-container">
                {
                    galleryItems.map(item => <button className="gallery-item" key={item.node.childGalleryJson.name} onClick={() => handleModalOpen(item.node.childGalleryJson)}>
                        <Image fluid={galleryImages.find(image => image.node.childImageSharp.fluid.originalName === item.node.childGalleryJson.imageList[0].image).node.childImageSharp.fluid} style={{ objectFit: "contain" }} />
                        <h2 className="event-title" style={{ color: primaryColor }}>{item.node.childGalleryJson.name}</h2>
                        <p className="event-date" style={{ color: secondaryColor }}>{item.node.childGalleryJson.datetime}</p>
                    </button>)
                }
            </div>
        </Layout>
    )
}

const GalleryModal = ({ imageSharps, modalData, setModalData, primaryColor, secondaryColor }) => {
    useBodyScrollLock()

    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, slider] = useKeenSlider({
        initial: 0,
        slideChanged(s) {
            setCurrentSlide(s.details().relativeSlide)
        }
    })
    const modalBackgroundContainer = useRef()
    const modalContainer = useRef()

    const galleryImages = imageSharps.filter(image => modalData.imageList.some(img => img.image === image.node.childImageSharp.fluid.originalName))

    const handleModalClose = () => {
        modalBackgroundContainer.current.classList.add("out")
        modalContainer.current.classList.add("out")

        setTimeout(() => {
            setModalData({})
        }, 600)
    }

    return (
        <div className="modal-background-container" ref={modalBackgroundContainer}>
            <button className="modal-background-button" onClick={handleModalClose} aria-label="Close button." ref={modalBackgroundContainer} />
            <div className="modal-container" ref={modalContainer}>
                <button className="close-button" onClick={handleModalClose} style={{ backgroundColor: primaryColor, color: secondaryColor }}>X</button>
                <div className="navigation-wrapper">
                    <div ref={sliderRef} className="keen-slider">
                        {galleryImages.map(image => <Image
                            key={image.node.childImageSharp.fluid.originalName}
                            fluid={image.node.childImageSharp.fluid}
                            alt={modalData.name}
                            className="keen-slider__slide"
                            imgStyle={{ objectFit: "contain" }}
                        />
                        )}
                    </div>
                    {slider && (
                        <>
                            <div className="arrow-container left">
                                <ArrowLeft
                                    onClick={e => e.stopPropagation() || slider.prev()}
                                    disabled={currentSlide === 0}
                                    primaryColor={primaryColor}
                                    secondaryColor={secondaryColor}
                                />
                            </div>
                            <div className="arrow-container right">
                                <ArrowRight
                                    onClick={e => e.stopPropagation() || slider.next()}
                                    disabled={currentSlide === slider.details().size - 1}
                                    primaryColor={primaryColor}
                                    secondaryColor={secondaryColor}
                                />
                            </div>
                        </>
                    )}
                    {slider && (
                        <div className="dots">
                            {[...Array(slider.details().size).keys()].map(idx => {
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            slider.moveToSlideRelative(idx)
                                        }}
                                        className={"dot" + (currentSlide === idx ? " active" : "")}
                                        aria-label={`Jump to Slide ${idx + 1}`}
                                        style={currentSlide === idx ? { backgroundColor: primaryColor } : {}}
                                    />
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const ArrowLeft = (props) => {
    const disabled = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={"arrow arrow--left" + disabled}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" fill="white" />
        </svg>
    )
}

const ArrowRight = (props) => {
    const disabled = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={"arrow arrow--right" + disabled}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" fill="white" />
        </svg>
    )
}