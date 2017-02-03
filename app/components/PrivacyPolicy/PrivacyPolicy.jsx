/* eslint-disable react/no-danger */
import React from 'react';
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import './PrivacyPolicy.scss';

const PrivacyPolicy = () => (
  <Container className="privacy-policy__outer-container">
    <Panel className="privacy-policy__inner-container">
      <div>
        <h1>Privacy Policy</h1>
        <p>
          This Privacy Policy applies to the Backbone product ("Device"), the Backbone mobile
          app ("App"), and website located at gobackbone.com ("Site"). The Device, App, and
          Site are collectively referred to in this Policy as the "Backbone Service."
        </p>
        <p>
          The Backbone Service collects some Personal Data from its users. Personal Data is any
          data through which you can be directly or indirectly identified, e.g., your name,
          email address, or the activities that we collect via the Backbone Service.
        </p>
        <p>
          We do not share, sell, rent, or trade Personal Data with third parties for their
          commercial purposes.
        </p>
      </div>
      <div>
        <h2>Personal Data we collect and what we use it for</h2>
        <p>
          The Personal Data we collect and the purposes for which we use it include the following:
        </p>
        <ul>
          <li>
            <h3>General account data</h3>
            <p>
              When you use our App, we will collect data such as a nickname, email address,
              gender, date of birth, height, weight, and your password to create and manage your
              account. Data such as your gender, date of birth, height, and weight may be used to
              help improve your experience with the App and Device.
            </p>
          </li>
          <li>
            <h3>Analytics</h3>
            <p>
              We may aggregate and de-identify data so that the data does not identify you and use
              it for a variety of analytical purposes, such as understanding and improving the
              Backbone Service and analyzing fitness trends.
            </p>
          </li>
          <li>
            <h3>Customer support</h3>
            <p>
              Whenever you contact Backbone for help, we collect your email address along with any
              additional information you provide in your request so we can provide you with
              assistance and improve the Backbone Service.
            </p>
          </li>
          <li>
            <h3>Emails</h3>
            <p>
              We will send you emails related to the administration of your account, such as a
              confirmation email when you create your account through the App and emails if you
              forgot your password and need assistance changing it.
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h2>Services we use</h2>
        <p>
          We use the following third party platforms to improve the Backbone Service in a variety
          of ways:
        </p>
        <ul>
          <li>
            <h3>Mixpanel</h3>
            <p>
              We use Mixpanel as our analytics tool to understand how users use the Backbone
              Service so that we can better improve the Backbone Service. You can read
              the <a href="https://mixpanel.com/privacy/">Mixpanel Privacy Policy</a> for more
              information and <a href="https://mixpanel.com/optout/">opt out</a>.
            </p>
          </li>
          <li>
            <h3>Mailgun</h3>
            <p>
              We use Mailgun as our email platform to send you emails related to your account and
              to the Backbone Service. You can read
              the <a href="http://www.mailgun.com/privacy">Mailgun Privacy Policy</a> for more
              information.
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h2>Data retention and deletion</h2>
        <p>We will retain your Personal Data for as long as your account is active.</p>
        <p>
          When you delete your account, we will also delete your Personal Data from our systems,
          except any de-identified data. You can delete your account by contacting Customer
          Support.
        </p>
      </div>
      <div>
        <h2>Your rights</h2>
        <p>
          Users have the right, at any time, to request information about whether their Personal
          Data has been stored and to correct or update any information which is incorrect.
          Requests should be sent to the contact information at the end of this Privacy Policy.
        </p>
      </div>
      <div>
        <h2>Changes to this Privacy Policy</h2>
        <p>
          This Privacy Policy is effective as of January 24, 2017 and may be updated from time to
          time, but any future changes will not affect data that was collected under a previous
          version of this Policy. If any modifications substantially change your rights, we will
          notify you through email or by posting a notice in the App or Site.
        </p>
      </div>
      <div>
        <h2>Contact us</h2>
        <p>
          You can email us with any questions or comments about our Privacy Policy
          at <a href="mailto:support@gobackbone.com?subject=Privacy Policy">
            support@gobackbone.com
          </a>.
        </p>
      </div>
    </Panel>
  </Container>
);

export default PrivacyPolicy;
