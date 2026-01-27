import { useGroup } from '../context/GroupContext'

function People() {
  const { group, config } = useGroup()

  // Witness team members
  const witnessMembers = [
    { name: '김지훈', role: '대학부 부장', bio: '대학부를 섬기며 학생들의 신앙 성장을 돕고 있습니다.' },
    { name: '박서연', role: '예배 팀장', bio: '은혜로운 예배를 위해 찬양과 경배를 인도합니다.' },
    { name: '이준영', role: '선교 팀장', bio: '캠퍼스 전도와 해외 선교를 담당하고 있습니다.' },
    { name: '최민지', role: '양육 팀장', bio: '새신자 양육과 제자훈련을 섬기고 있습니다.' },
    { name: '정수아', role: '미디어 팀장', bio: '영상과 SNS를 통해 복음을 전하고 있습니다.' },
    { name: '강동혁', role: '행사 팀장', bio: '각종 행사와 수련회를 기획하고 진행합니다.' },
    { name: '윤하은', role: '소그룹 팀장', bio: '소그룹 모임을 통해 교제와 나눔을 이끕니다.' },
    { name: '한재민', role: '총무', bio: '대학부의 전반적인 행정과 재정을 담당합니다.' }
  ]

  // Fishermen team members
  const fishermenMembers = [
    { name: '이성민', role: '청년부 부장', bio: '청년부를 이끌며 하나님 나라를 세워가고 있습니다.' },
    { name: '김예진', role: '예배 팀장', bio: '예배를 통해 하나님을 만나는 시간을 준비합니다.' },
    { name: '박준혁', role: '선교 팀장', bio: '직장인 전도와 지역사회 섬김을 이끌고 있습니다.' },
    { name: '정지원', role: '교육 팀장', bio: '청년들의 신앙 성장을 위한 교육을 담당합니다.' },
    { name: '최현우', role: '소그룹 팀장', bio: '소그룹을 통한 친밀한 교제와 성장을 돕습니다.' },
    { name: '송미라', role: '봉사 팀장', bio: '사회 봉사와 섬김의 사역을 담당하고 있습니다.' },
    { name: '오태영', role: '총무', bio: '청년부의 행정과 재정을 관리하고 있습니다.' }
  ]

  const members = group === 'witness' ? witnessMembers : fishermenMembers

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          {group === 'witness' ? (
            <div className="header-content">
              <h1>대학부원</h1>
              <p>하나님의 부르심에 응답한 대학생 공동체입니다</p>
            </div>
          ) : (
            <div className="header-content">
              <h1>청년부원</h1>
              <p>사람을 낚는 어부가 되어가는 청년 공동체입니다</p>
            </div>
          )}
        </div>
      </section>

      {/* Culture Section */}
      <section className="culture-section">
        <div className="container">
          {group === 'witness' ? (
            <div className="culture-content">
              <div className="culture-text">
                <h2>우리의 신앙</h2>
                <p className="large-text">
                  말씀과 기도로 세워지는 대학생 신앙 공동체입니다.
                </p>
                <p>
                  대학이라는 캠퍼스에서 만난 우리는 함께 예배하고, 말씀을 나누며,
                  서로를 격려합니다. 학업과 진로 고민 속에서도 하나님을 신뢰하며,
                  각자의 자리에서 빛과 소금의 역할을 감당하고자 합니다.
                </p>
              </div>
              <div className="culture-values">
                <div className="value-item">
                  <h3>말씀</h3>
                  <p>성경 말씀을 삶의 기준으로 삼습니다</p>
                </div>
                <div className="value-item">
                  <h3>기도</h3>
                  <p>기도로 하나님과 동행합니다</p>
                </div>
                <div className="value-item">
                  <h3>교제</h3>
                  <p>진실한 나눔과 격려로 함께 성장합니다</p>
                </div>
                <div className="value-item">
                  <h3>전도</h3>
                  <p>캠퍼스에서 복음을 전합니다</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="culture-content">
              <div className="culture-text">
                <h2>우리의 비전</h2>
                <p className="large-text">
                  사람을 낚는 어부가 되어가는 청년 신앙 공동체입니다.
                </p>
                <p>
                  직장과 사회에서 하나님 나라를 꿈꾸는 청년들이 모였습니다.
                  각자의 삶의 자리에서 믿음으로 살아가며, 함께 예배하고 섬기며,
                  이 땅에 하나님의 사랑을 전하는 사명을 감당합니다.
                </p>
              </div>
              <div className="culture-values">
                <div className="value-item">
                  <h3>예배</h3>
                  <p>하나님을 예배하는 것이 최우선입니다</p>
                </div>
                <div className="value-item">
                  <h3>나눔</h3>
                  <p>삶의 고민을 함께 나누며 위로합니다</p>
                </div>
                <div className="value-item">
                  <h3>성장</h3>
                  <p>말씀과 양육으로 신앙이 자랍니다</p>
                </div>
                <div className="value-item">
                  <h3>섬김</h3>
                  <p>이웃과 사회를 섬기며 사랑을 실천합니다</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="leadership-section">
        <div className="container">
          <div className="section-header">
            <h2>Leadership Team</h2>
          </div>
          <div className="team-grid">
            {members.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-photo"></div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="careers-section">
        <div className="container">
          <div className="careers-content">
            <div className="careers-text">
              <h2>함께하실래요?</h2>
              <p>
                {group === 'witness'
                  ? '대학부 Witness와 함께 신앙의 여정을 시작하세요'
                  : '청년부 Fishermen과 함께 믿음의 공동체를 만들어가세요'}
              </p>
              <a href="#contact" className="btn-primary">문의하기</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default People
