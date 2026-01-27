import { Link } from 'react-router-dom'
import { useGroup } from '../context/GroupContext'

function Footer() {
  const { group, config } = useGroup()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <h4>{config.footer.title}</h4>
            <p>{config.footer.description}</p>
          </div>
          <div className="footer-col">
            <h4>바로가기</h4>
            <ul>
              <li><Link to={`/?group=${group}`}>Home</Link></li>
              <li><Link to={`/work/?group=${group}`}>사역</Link></li>
              <li><Link to={`/news/?group=${group}`}>소식</Link></li>
              <li><Link to={`/people/?group=${group}`}>{config.sections.memberTitle}</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>연락처</h4>
            <ul>
              <li>Email: fishermen@naesoodong.com</li>
              <li>Tel: 02-737-6351</li>
              <li>서울 종로구 경희궁2길 5-6 내수동교회</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{config.footer.followUs}</h4>
            <div className="social-links">
              <a href={config.footer.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href={config.footer.social.youtube} target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
              <a href={config.footer.social.kakao} target="_blank" rel="noopener noreferrer">
                KakaoTalk
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{config.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
