import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Policy = () => {

    //const policyLogoUrl = 'https://cdn-icons-png.freepik.com/512/6389/6389245.png';
    return (
        <>
            <Header />
            <div className="content">
            <div className="intro-section">
                <h1>Our Policies</h1>
                </div>
                <ul><li><h2>Return Policy</h2></li></ul>
                <p>No returns are allowed, but if the seller sends the wrong item, you can write reviews and they'll be noticed or send an email with proof at <a href="mailto:help@thriftn.com">help@thriftn.com</a>. We'll consider it and ask the seller for a refund. If the seller is at fault and denies it, he/she will be blocked from posting further products on Thriftn'.</p>

                <ul><li><h2>Exchange Policy</h2></li></ul>
                <p>No exchange policy.</p>

                <ul><li><h2>Payment and Delivery</h2></li></ul>
                <p>Payment Method: Cash on Delivery (COD) only. Delivery company: Trax.pk.</p>

                <ul><li><h2>Contact Information</h2></li></ul>
                <p>For any complaints: <a href="mailto:help@thriftn.com">help@thriftn.com</a></p>
                <p>For any information: <a href="mailto:info@thriftn.com">info@thriftn.com</a> or call 03136408</p>

                <ul><li><h2>Restricted Items</h2></li></ul>
                <ol>
                    <li>Illegal items cannot be listed for sale or donation.</li>
                    <li>Pets or animals cannot be listed for sale or donation.</li>
                    <li>Food items or beverages cannot be listed for sale and donation.</li>
                    <li>Expired health and beauty items cannot be listed for sale and donation.</li>
                    <li>Big items that require proper documentation like cars or houses cannot be listed.</li>
                </ol>

                <h2></h2>
                <p></p>
            </div>
            <Footer />
        </>
    );
};

export default Policy;
