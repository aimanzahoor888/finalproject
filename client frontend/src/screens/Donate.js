import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Donate = () => {
    //const holdLogoUrl = 'https://holdhope.org/cdn/shop/files/5._Hold_Hope_logo_file.png?v=1702578847&width=280';

    return (
        <>
            <Header />
            <div className="content">
                <div className="intro-section">
                    <p className="intro-text">
                        <strong>Thriftn'</strong> is proud to collaborate with <strong>HOLD (Hope for Lively Days)</strong>, an NGO dedicated to creating lasting solutions for the community. Your donations of shoes and clothes can make a significant impact on the lives of those in need.
                    </p>
                </div>
                <h2>About HOLD</h2>
                <p>HOLD (Hope for Lively Days) is committed to improving the lives of individuals and communities through sustainable initiatives. Follow their journey and verify their work on Instagram:</p>
                <p>
                    <a href="https://www.instagram.com/hopeforlivelydays/" target="_blank" rel="noopener noreferrer">Hope for Lively Days on Instagram</a>
                </p>
                <p>
                    <a href="https://linktr.ee/HOLD_" target="_blank" rel="noopener noreferrer">HOLD LinkTree</a>
                </p>
                
                <h2>How You Can Donate</h2>
                <ol>
                    <li>Email the items you wish to donate to <a href="mailto:donate@thriftn.com">donate@thriftn.com</a>.</li>
                    <li>Wait for a reply of approval from our admin team.</li>
                    <li>Once approved, your parcel will be picked up from your home and delivered to HOLD.</li>
                </ol>
                <p>You can also choose to donate directly to HOLD. For more details, visit their Instagram page.</p>
                <h2>Items We Currently Accept</h2>
                <p>We are currently accepting donations of shoes and clothes only.</p>
                <h2>Items We Cannot Accept</h2>
                <ul>
                    <li>Mattresses, water beds, bedding & linens, towels</li>
                    <li>Medical supplies, built-in appliances</li>
                    <li>Children’s toys & books (varies per location)</li>
                    <li>TV sets and appliances over three years old</li>
                    <li>Printers, scanners, fax machines</li>
                    <li>Children’s clothing & accessories (car seats, cribs, high chairs, etc.)</li>
                    <li>Automobiles, office furniture/corporate items</li>
                </ul>
                <p className="initiative-text">Join us in this initiative to create lasting solutions for the community. Your generosity can make a world of difference.</p>
            </div>
            <Footer />
        </>
    );
};

export default Donate;
