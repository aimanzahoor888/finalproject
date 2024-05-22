import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons'; // Import Instagram icon
import { faLink } from '@fortawesome/free-solid-svg-icons'; // Use a generic link icon for LinkTree

const Donate = () => {
    const holdLogoUrl = 'https://scontent.flhe3-2.fna.fbcdn.net/v/t39.30808-6/326747410_5551738534955252_2793589331529178095_n.png?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=fhRnSxQ9hM0Q7kNvgHmD5rg&_nc_oc=AdjXuBuAKob9z56T2sNqGMmgFAHBy4NtNhQJXeqngj6eEdLREsuJSu2EVT1MdDaVFz4&_nc_ht=scontent.flhe3-2.fna&oh=00_AYBQsbBVuE97Kkn0ZqvtP-1o97ULYt6yfokSx1ybXNu-BA&oe=6652A8FE';
    const leftImage1Url = 'https://scontent.flhe3-1.fna.fbcdn.net/v/t39.30808-6/213472096_120411620265812_6603966833509669355_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rnwFW2BUY4IQ7kNvgHC9Q09&_nc_ht=scontent.flhe3-1.fna&oh=00_AYCRbuf9-TyWA5ZI8gQygwXMjEcsJrQLlE1Fe8Nl09xueA&oe=6653F517';
    const leftImageUrl = 'https://scontent.flhe3-2.fna.fbcdn.net/v/t39.30808-6/259657149_197665695873737_332819355220117109_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DWnA2Q2vObYQ7kNvgHA_EOJ&_nc_ht=scontent.flhe3-2.fna&oh=00_AYDGKVNi7B4vrJmdqFN9z7tFqnY7M4d7jAqmW1ZZrstSHA&oe=6652998F';
    const rightImageUrl = 'https://scontent.flhe3-2.fna.fbcdn.net/v/t39.30808-6/243226260_163229325984041_931219247887007197_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FppJwgl8uDgQ7kNvgEvzV4q&_nc_ht=scontent.flhe3-2.fna&oh=00_AYB73SDfr8F2tehcn7n2JlHUmFri53poffecz2rRnDs6hw&oe=66529ADA';
    const rightImage1Url = 'https://scontent.flhe3-2.fna.fbcdn.net/v/t1.6435-9/197854114_113178217655819_6736985013192601927_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=sI8h8q25aIYQ7kNvgFdTV9J&_nc_ht=scontent.flhe3-2.fna&oh=00_AYDSrL_hybhWY2fvfKrX0aerIuQ82F2yzYHxho6L3ltohw&oe=6675853E';
    const image1Url = 'https://scontent.flhe3-1.fna.fbcdn.net/v/t39.30808-6/281047559_309078534732452_5299100742185973801_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=sK5TIn9zNasQ7kNvgHZ2Epb&_nc_ht=scontent.flhe3-1.fna&oh=00_AYDJqjeojF9Ozf6LgbNa783LZgycthNJfH9NOCTazKtIaw&oe=6652C046';
    const image2Url = 'https://scontent.flhe3-1.fna.fbcdn.net/v/t39.30808-6/280621782_309078538065785_4087674666147412090_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FLYN9ZfymakQ7kNvgEKS8LK&_nc_ht=scontent.flhe3-1.fna&oh=00_AYCZw0uFiCJJZlb-N1200XZ--dJ6nU7FqRRcFwJeBIwjVA&oe=6652A9B8';
    const image3Url = 'https://scontent.flhe3-1.fna.fbcdn.net/v/t39.30808-6/279551005_299665795673726_4478296317447972805_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=48IWCI874tEQ7kNvgG_nBYa&_nc_ht=scontent.flhe3-1.fna&oh=00_AYCGOcdpoH4kpeqInp-EkwMdqmUy1dSoBRae-uLYjFVMCA&oe=6652951D';
    const image4Url = 'https://scontent.flhe3-1.fna.fbcdn.net/v/t39.30808-6/228794057_128560866117554_2206450136647889702_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=mlJclNFoBn8Q7kNvgGlWbmx&_nc_ht=scontent.flhe3-1.fna&oh=00_AYDDlBgDqybGit9d4ZVO3LzmEouOPrSIatoLzyGef0foAQ&oe=66540A95';

    return (
        <>
            <Header />
            <div className="content">
                <div className="image-row">
                    <img src={leftImageUrl} alt="Left side image" className="instagramimg" />
                    <img src={leftImage1Url} alt="Left side image" className="instagramimg1" />
                    <img src={holdLogoUrl} alt="HOLD Logo" className="hold-logo" />    
                    <img src={rightImageUrl} alt="Right side image" className="instagram-img" />
                    <img src={rightImage1Url} alt="Right side image" className="instagram-img" />
                </div>
                <div className="intro-section">
                    <p className="intro-text">
                        <strong>Thriftn'</strong> is proud to collaborate with <strong>HOLD (Hope for Lively Days)</strong>, an NGO dedicated to creating lasting solutions for the community. Your donations of shoes and clothes can make a significant impact on the lives of those in need.
                    </p>
                </div>
                <p>
                    <FontAwesomeIcon icon={faInstagram} /> {/* Instagram Icon */}
                    <a href="https://www.instagram.com/hopeforlivelydays/" target="_blank" rel="noopener noreferrer">Hope for Lively Days on Instagram</a>
                </p>
                <p>
                    <FontAwesomeIcon icon={faLink} /> {/* Link Icon for LinkTree */}
                    <a href="https://linktr.ee/HOLD_" target="_blank" rel="noopener noreferrer">HOLD LinkTree</a>
                </p>
                <div className="imagerow">
                    <img src={image1Url} alt="Donation image 1" className="donation-image" />
                    <img src={image2Url} alt="Donation image 2" className="donation-image" />
                    <img src={image3Url} alt="Donation image 3" className="donation-image" />
                    <img src={image4Url} alt="Donation image 3" className="donation-image" />
                </div>
                <ul>
                    <li><h2>How You Can Donate</h2></li>
                </ul>
                <ol>
                    <li>Email the items you wish to donate to <a href="mailto:donate@thriftn.com">donate@thriftn.com</a>.</li>
                    <li>Wait for a reply of approval from our admin team.</li>
                    <li>Once approved, your parcel will be picked up from your home and delivered to HOLD.</li>
                </ol>
                <p>You can also choose to donate directly to HOLD. For more details, visit their Instagram page.</p>
                <ul><li><h2>Items We Currently Accept</h2></li></ul>
                <p>We are currently accepting donations of shoes and clothes only.</p>
                <ul><li><h2>Items We Cannot Accept</h2></li></ul>
                <ol>
                    <li>Mattresses, water beds, bedding & linens, towels</li>
                    <li>Medical supplies, built-in appliances</li>
                    <li>Children’s toys & books (varies per location)</li>
                    <li>TV sets and appliances over three years old</li>
                    <li>Printers, scanners, fax machines</li>
                    <li>Children’s clothing & accessories (car seats, cribs, high chairs, etc.)</li>
                    <li>Automobiles, office furniture/corporate items</li>
                </ol>
                <p className="intro-text"><strong>Join us in this initiative to create lasting solutions for the community. Your generosity can make a world of difference.</strong></p>
            </div>
            <Footer />
        </>
    );
};

export default Donate;
