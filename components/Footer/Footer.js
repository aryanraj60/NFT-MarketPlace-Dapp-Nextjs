import React from "react";

const Footer = () => {
  return (
    <div>
      <div class="mt-5 text-center text-white">
        <div class="container p-3">
          <section class="mb-4">
            <a
              class="btn btn-outline-light btn-floating m-1"
              href="https://twitter.com/aryanraj_60"
              role="button"
            >
              <i class="fa-brands fa-twitter"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="https://www.linkedin.com/in/aryan-rajput-3a0760204/"
              role="button"
            >
              <i class="fa-brands fa-linkedin"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
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
