import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: t('footer.company.about'), to: "/about" },
      { label: t('footer.company.contact'), to: "/contact" },
      { label: t('footer.company.careers'), to: "/careers" },
      { label: t('footer.company.blog'), to: "/blog" },
    ],
    legal: [
      { label: t('footer.legal.terms'), to: "/terms" },
      { label: t('footer.legal.privacy'), to: "/privacy" },
      { label: t('footer.legal.responsible'), to: "/responsible-gaming" },
      { label: t('footer.legal.aml'), to: "/aml-policy" },
    ],
    support: [
      { label: t('footer.support.help'), to: "/help" },
      { label: t('footer.support.faqs'), to: "/faqs" },
      { label: t('footer.support.chat'), to: "/chat" },
      { label: t('footer.support.tickets'), to: "/support" },
    ],
  };

  const sectionTitles = {
    company: t('footer.company.title'),
    legal: t('footer.legal.title'),
    support: t('footer.support.title'),
  };

  const socialLinks = [
    { icon: <FacebookOutlined />, href: "https://facebook.com" },
    { icon: <TwitterOutlined />, href: "https://twitter.com" },
    { icon: <InstagramOutlined />, href: "https://instagram.com" },
    { icon: <LinkedinOutlined />, href: "https://linkedin.com" },
  ];

  return (
    <AntFooter className="bg-bg-footer border-t border-border-base py-12 px-6 text-text-primary">
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={12} md={6}>
          <div className="mb-6">
            <img src="/vite.svg" alt="Logo" className="h-8 mb-4" />
            <p>{t('footer.description')}</p>
          </div>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-2xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </Col>

        {Object.entries(footerLinks).map(([section, links]) => (
          <Col xs={24} sm={12} md={6} key={section}>
            <h4 className="font-semibold mb-4">
              {sectionTitles[section]}
            </h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>

      <div className="mt-8 pt-8 border-t border-border-base">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>{t('footer.rights', { year: currentYear })}</div>
          <div className="mt-4 md:mt-0">
            <img src={"/vite.svg"} alt="Payment Methods" className="h-6" />
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
