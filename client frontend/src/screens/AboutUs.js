import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs = () => {

    return (
        <>
            <Header />
            <div className="content">
                <div className="intro-section">
                    <h2>Welcome to Thriftn' — Where Values Meet Value</h2>
                </div>
                <div className="mission-vision">
                    <div className="mission">
                        <h2>Our Mission</h2>
                        <p>Thriftn' isn't just a marketplace; it's a movement. Born in the bustling heart of Pakistan, our mission is to empower economic resilience and environmental responsibility through the reuse of items. In a world where both wallets and waste bins are overflowing, we offer a sustainable solution that helps our community save money and the planet.</p>
                    </div>
                    <div className="vision">
                        <h2>Our Vision</h2>
                        <p>We envision a future where the cycle of use and reuse becomes the norm, not the exception. At Thriftn', every transaction is a step towards a sustainable future. By reconnecting with our cultural roots of sharing and caring, we aim to transform the way people think about ownership and consumption.</p>
                    </div>
                </div>
                <ul>
                    <li><h2>Why Thriftn'?</h2></li>
                </ul>
                <ol>
                    <li><strong>Quality and Trust:</strong> Our advanced technology ensures that every item listed is exactly as described, thanks to our innovative camera system with low light and blur sensors that encourage high-quality image uploads.</li>
                    <li><strong>Ease and Efficiency:</strong> Our platform is designed with user experience in mind. From trusted seller badges and direct negotiation features to a smart recommendation system, we make buying and selling seamless and efficient.</li>
                    <li><strong>Community and Charity:</strong> Sellers have the option to either sell for profit or donate their earnings to one of our linked NGOs. We make sure every donation is transparent and meaningful.</li>
                    <li><strong>Support and Accessibility:</strong> With our 24/7 chatbot, adaptive text options, and real-time notifications, we ensure that every user's experience is accessible and supported.</li>
                </ol>
                <div className="join-contact">
                    <div className="join-us">
                        <h2>Join Us</h2>
                        <p>Whether you're looking to declutter your home, find a bargain, or contribute to a charitable cause, Thriftn' provides a platform where every deal is a deed for change. Together, we can make a difference—one item at a time.</p>
                    </div>
                    <div className="contact-us">
                        <h2>Contact Us</h2>
                        <p>For support or information:</p>
                        <ol>
                            <li>Email: help@thriftn.com</li>
                            <li>Phone: 03136408768</li>
                        </ol>
                    </div>
                </div>
                <p className="centered"><strong>Thriftn': Transforming Items, Empowering People.</strong></p>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
