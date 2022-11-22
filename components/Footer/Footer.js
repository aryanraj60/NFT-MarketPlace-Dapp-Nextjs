import React from "react";
import { SiTwitter, SiLinkedin } from "react-icons/si";

const Footer = () => {
  return (
    <div>
      <div className="mt-5 text-center text-white">
        <div className="container p-3">
          <section className="mb-4">
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="https://twitter.com/aryanraj_60"
              src="../../assests/twitter.png"
            >
              <SiTwitter />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              src="../../assests/linkedin.png"
              href="https://www.linkedin.com/in/aryan-rajput-3a0760204/"
            >
              <SiLinkedin />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="https://goerli.etherscan.io/address/0x26B2F09c2e10Dc56fe48fbc69d667207Ec92E48E"
              role="button"
            >
              <span>EtherScan</span>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Footer;
