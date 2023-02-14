import React from 'react';
import classes from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
export default function Footer() {
  return (
    <div className={classes.main}>
      <div className={classes['top-footer']}>
        <div className={classes['app-links']}>
          <div className={classes['links-box']}>
            <h3>Company</h3>
            <a
              href="https://www.spotify.com/de/about-us/impressum/"
              target="_blank"
              rel="noReferrer"
            >
              Impressum
            </a>
            <a
              href="https://www.spotify.com/de/about-us/contact/"
              target="_blank"
              rel="noReferrer"
            >
              About
            </a>
            <a
              href="https://www.lifeatspotify.com/"
              target="_blank"
              rel="noReferrer"
            >
              Jobs
            </a>
            <a
              href="https://newsroom.spotify.com/"
              target="_blank"
              rel="noReferrer"
            >
              For the Record
            </a>
          </div>
          <div className={classes['links-box']}>
            <h3>Communities</h3>
            <a
              href="https://artists.spotify.com/"
              target="_blank"
              rel="noReferrer"
            >
              For Artists
            </a>
            <a
              href="https://developer.spotify.com/"
              target="_blank"
              rel="noReferrer"
            >
              Developers
            </a>
            <a href="https://ads.spotify.com/" target="_blank" rel="noReferrer">
              Advertising
            </a>
            <a
              href="https://investors.spotify.com/"
              target="_blank"
              rel="noReferrer"
            >
              Investors
            </a>
            <a
              href="https://spotifyforvendors.com/"
              target="_blank"
              rel="noReferrer"
            >
              Vendors
            </a>
          </div>
          <div className={classes['links-box']}>
            <h3>Useful Links</h3>
            <a
              href="https://support.spotify.com/"
              target="_blank"
              rel="noReferrer"
            >
              Support
            </a>
            <a
              href="https://www.spotify.com/de/download/"
              target="_blank"
              rel="noReferrer"
            >
              Free Mobile App
            </a>
            <a
              href="https://www.spotify.com/de/account/cancel/"
              target="_blank"
              rel="noReferrer"
            >
              Verträge hier kündigen
            </a>
          </div>
        </div>
        <div className={classes.social}>
          <div className={classes.icon}>
            <FontAwesomeIcon icon={faFacebook} />
          </div>
          <div className={classes.icon}>
            <FontAwesomeIcon icon={faTwitter} />
          </div>
          <div className={classes.icon}>
            <FontAwesomeIcon icon={faInstagram} />
          </div>
        </div>
      </div>
      <div className={classes.line}></div>
      <div className={classes['bottom-footer']}>
        <div className={classes['bottom-links']}>
          <a
            href="https://www.spotify.com/de/legal/"
            target="_blank"
            rel="noReferrer"
          >
            Legal
          </a>
          <a
            href="https://www.spotify.com/de/privacy/"
            target="_blank"
            rel="noReferrer"
          >
            Privacy Center
          </a>
          <a
            href="https://www.spotify.com/de/legal/privacy-policy/"
            target="_blank"
            rel="noReferrer"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.spotify.com/de/legal/privacy-policy/#s3"
            target="_blank"
            rel="noReferrer"
          >
            About Ads
          </a>
        </div>
        <div></div>
      </div>
    </div>
  );
}
