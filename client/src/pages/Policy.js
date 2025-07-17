import React from "react";
import Layout from "../components/layout/layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="policy-page">
        <div className="policy-content">
          <h1 id="policy-head">Privacy Policy</h1>

          <h2>Introduction</h2>

          <p>
            Welcome to our Recipe Website. At our website, we are committed to
            protecting your privacy and ensuring the security of your personal
            information. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your personal information when you use our
            website or services.
          </p>

          <p>
            By accessing or using our website or services, you consent to the
            practices described in this Privacy Policy. If you do not agree with
            the practices described here, please do not use our website or
            services.
          </p><br />

          <h2>Information We Collect</h2>

          <p>
            Personal Information: We may collect personal information, such as
            your name and email address, when you sign up for an account or
            subscribe to our newsletter.
          </p>

          <p>
            Usage Information: We may collect non-personal information about
            your use of our website, including your IP address, browser type,
            operating system, and browsing behavior. We may use cookies and
            similar technologies to collect this information.
          </p><br />

          <h2>How We Use Your Information</h2>

          <p>
            We use the information we collect for various purposes, including
            but not limited to:
          </p>

          <ul>
            <li>
              Providing Recipes: To provide you with recipes and cooking tips
              based on your preferences.
            </li>
            <li>
              Personalization: To personalize your experience on our website and
              tailor content to your interests.
            </li>
            <li>
              Improvement: To analyze website usage and improve our website and
              services.
            </li>
          </ul><br/>

          <h2>Disclosure of Your Information</h2>

          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent. However, we may
            disclose your information in the following circumstances:
          </p>

          <ul>
            <li>
              Service Providers: We may share your information with trusted
              third-party service providers who assist us in operating our
              website and providing our services.
            </li>
            <li>
              Legal Compliance: We may disclose your information if required by
              law or in response to a legal request.
            </li>
          </ul><br/>

          <h2>Data Security</h2>

          <p>
            We implement reasonable security measures to protect your personal
            information. However, no data transmission over the internet can be
            guaranteed to be 100% secure. While we strive to protect your
            information, we cannot guarantee the security of any information you
            transmit to us.
          </p><br />

          <h2>Your Choices</h2>

          <p>You have choices regarding your personal information:</p>

          <ul>
            <li>
              Account Information: You may access and update your account
              information at any time.
            </li>
            <li>
              Email Subscriptions: You can opt out of receiving marketing
              communications from us by following the unsubscribe instructions
              provided in our emails.
            </li>
          </ul><br/>

          <h2>Changes to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We encourage you to review this Privacy Policy
            periodically to stay informed about our data practices.
          </p><br/> 

          <h2>Contact Us</h2>

          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at your@email.com.
          </p>

          <p>
            Please remember that this is a generic privacy policy template, and
            you should consult with a legal professional to ensure that it
            complies with the specific laws and regulations applicable to your
            website and the jurisdictions in which you operate. Additionally,
            you should update the document as needed to reflect any changes in
            your data practices.
          </p><br />
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
