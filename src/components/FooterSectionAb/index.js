import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const FooterSection = () => (
  <div className="footer-containerab">
    <ul className="contact-icons-containerab">
      <li className="contact-iconab">
        <FaGoogle />
      </li>
      <li className="contact-iconab">
        <FaTwitter />
      </li>
      <li className="contact-iconab">
        <FaInstagram />
      </li>
      <li className="contact-iconab">
        <FaYoutube />
      </li>
    </ul>
    <p className="contact-textab">Contact us</p>
  </div>
)

export default FooterSection
