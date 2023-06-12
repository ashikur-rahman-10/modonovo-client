import React from "react";
import logo from "../../assets/logo/logo3.svg";
const Footer = () => {
    return (
        <div className="bg-base-200">
            <footer className="footer p-10 w-full max-w-7xl mx-auto  text-base-content">
                <div>
                    <img src={logo} alt="" />
                    <p>ModoNovo Academy</p>
                </div>

                <div>
                    <span className="footer-title">Contacts</span>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
                <div>
                    <span className="footer-title">Address</span>
                    <ul className="space-y-2">
                        <li>
                            <p>123 ABS Street, Uni 21, Bangladesh</p>
                        </li>
                        <li>
                            <p>+88 123456789</p>
                        </li>
                        <li>
                            <p>Mon - Fri: 08:00 - 22:00</p>
                        </li>
                        <li>
                            <p>Sat - Sun: 10:00 - 23:00</p>
                        </li>
                    </ul>
                </div>
            </footer>
            <div className="text-center pb-10">
                <p>Copyright © 2023 - All right reserved by ModoNovo Academy</p>
            </div>
        </div>
    );
};

export default Footer;
