import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import logo from '../images/dsc-logo-large.png'
import FooterWidget from './FooterWidget'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '../icons'

const Footer = () => {
  const widgets = [];
  const mail = 'xyz@gmail.com';
  const social = {
    twitter: 'https://twitter.com/yourprofile',
  facebook: 'https://facebook.com/yourprofile',
  instagram: 'https://instagram.com/yourprofile',
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourprofile',
  };
  return (
    <footer className="section-spacer footer-section">
      <Container>
        <Row className="flex-column-reverse flex-sm-row flex-lg-row">
          <Col xs={12} md={4}>
            <div className="footer-widget first-of-footer-widget">
              <img src={logo} alt="dsc logo" className="logo-sm mb-10" />
              <p>&copy; {new Date().getFullYear()} | All Rights Reserved.</p>
              {mail === '' ? null : (
                <>
                  <span>Feel free to drop us an email at </span>
                  <a href={`mailto:${mail}`}> {mail} </a>{' '}
                </>
              )}
              <ul className="social-list__inline mt-10">
                {Object.entries(social)
                  .filter(([, link]) => link != null)
                  .map(([name, link]) => (
                    <li key={name}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={icons[name]} />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </Col>

          <Col md={8} xs={10}>
            <Row>
              {widgets.map((widget, i) => (
                <FooterWidget {...widget} key={i} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
