// ===========================
// News Page JavaScript (news.html)
// 뉴스 페이지 전용 기능
// ===========================

// ===========================
// News Data
// ===========================
let newsData = [
    // 기본 데이터 (관리자 페이지에서 등록 전까지 표시)
    // Witness News (8)
    {
        group: 'witness',
        category: 'announcement',
        title: '2026년 1학기 대학부 일정 안내',
        date: '2026.01.15',
        excerpt: '새 학기를 맞아 대학부 주요 일정과 활동 계획을 안내드립니다.',
        description: '새 학기를 맞아 Witness 대학부의 주요 일정과 활동 계획을 안내드립니다. 매주 주일 오전 11시 예배, 수요일 저녁 소그룹 모임이 진행되며, 2월에는 새학기 맞이 오리엔테이션과 비전 세미나가 예정되어 있습니다. 3월에는 캠퍼스 전도 주간이, 4월에는 부활절 연합예배가 준비되어 있습니다. 5월에는 중간고사 기간 특별 기도회와 봄 야외예배를 계획하고 있으며, 6월에는 여름 수련회 준비 모임이 시작됩니다. 함께 성장하고 은혜 가운데 한 학기를 보내길 소망합니다.',
        img: '',
    },
    {
        group: 'witness',
        category: 'event',
        title: '겨울 수련회 후기',
        date: '2026.01.10',
        excerpt: '강원도에서 진행된 겨울 수련회의 감동적인 순간들을 나눕니다.',
        description: '강원도 평창에서 2박 3일간 진행된 겨울 수련회가 큰 은혜 가운데 마무리되었습니다. "청년아 일어나라"는 주제로 진행된 이번 수련회에는 120여 명의 대학부원들이 참석했습니다. 첫날 저녁 개회예배를 시작으로 새벽기도회, 말씀 집회, 소그룹 나눔이 이어졌습니다. 특별히 설산 속에서 가진 야외 찬양예배는 참석자 모두에게 깊은 감동을 주었습니다. 마지막 날 저녁에는 결단 예배를 통해 많은 학생들이 신앙의 새로운 결단을 다짐했습니다. 참가자들은 "하나님의 임재를 경험한 시간", "평생 잊지 못할 은혜로운 시간"이었다는 소감을 나누었습니다.',
        img: '',
    },
    {
        group: 'witness',
        category: 'testimony',
        title: '김지훈 학생 간증 - 캠퍼스에서 만난 하나님',
        date: '2025.12.20',
        excerpt: '대학 생활 중 경험한 신앙의 여정을 나누어 주셨습니다.',
        description: '경영학과 3학년 김지훈 학생이 주일예배 시간에 캠퍼스에서의 신앙 여정을 간증했습니다. 대학 입학 후 신앙이 흔들리던 시기를 겪었지만, Witness 대학부를 통해 다시 신앙을 회복하게 된 과정을 진솔하게 나누었습니다. 특히 학교 동아리 활동과 신앙생활 사이에서 고민하던 중, 선배들의 조언과 기도로 균형을 찾게 되었다고 합니다. 현재는 캠퍼스 내 기독교 동아리를 이끌며 적극적으로 복음을 전하고 있으며, "대학 생활이 신앙의 황금기가 될 수 있다"는 메시지를 후배들에게 전했습니다. 간증을 듣는 많은 부원들이 감동받았으며, 여러 명이 캠퍼스 전도에 동참하기로 결심했습니다.',
        img: '',
    },
    {
        group: 'witness',
        category: 'mission',
        title: '캠퍼스 전도 집회 개최',
        date: '2025.12.05',
        excerpt: '대학 캠퍼스에서 진행된 전도 집회 소식을 전합니다.',
        description: '서울 시내 주요 대학 캠퍼스에서 점심시간을 이용한 전도 집회가 성황리에 개최되었습니다. 매주 수요일 정오에 진행되는 이 집회는 찬양팀의 공연으로 시작해 5분간의 짧은 복음 메시지와 간증으로 이어집니다. 12월 첫 주 집회에는 300여 명의 학생들이 멈춰 서서 관심을 보였으며, 20여 명이 전도지를 받아갔습니다. 특별히 이번 집회에서는 "대학 생활의 의미"라는 주제로 메시지를 전했고, 많은 학생들이 공감을 표했습니다. 집회 후 개인 상담 부스를 운영하여 7명의 학생과 깊이 있는 대화를 나눴으며, 그 중 2명이 교회 방문을 약속했습니다. 앞으로도 매주 꾸준히 진행할 계획입니다.',
        img: '',
    },
    {
        group: 'witness',
        category: 'event',
        title: '대학부 체육대회 성료',
        date: '2025.11.15',
        excerpt: '즐겁고 은혜로운 체육대회 현장을 공유합니다.',
        description: '가을 단풍이 아름다운 올림픽공원에서 대학부 체육대회가 열렸습니다. 100여 명의 부원들이 참가한 가운데, 4개 팀으로 나뉘어 족구, 피구, 줄다리기, 릴레이 등 다양한 종목에서 열띤 경기를 펼쳤습니다. 오전 10시 시작된 행사는 개회 기도와 준비운동으로 문을 열었고, 정오까지 본 경기가 진행되었습니다. 점심시간에는 교회에서 준비한 김밥과 샌드위치를 나눠 먹으며 즐거운 교제의 시간을 가졌습니다. 오후에는 단체 게임과 레크리에이션이 이어졌고, 저녁에는 바비큐 파티로 하루를 마무리했습니다. 우승팀에게는 소정의 상품이 수여되었지만, 승패를 떠나 모두가 하나 되는 즐거운 시간이었다는 평가입니다.',
        img: '',
    },
    {
        group: 'witness',
        category: 'announcement',
        title: '말씀 암송 대회 안내',
        date: '2025.10.30',
        excerpt: '다음 달 진행될 말씀 암송 대회 참가 신청을 받습니다.',
        description: '12월 둘째 주 주일에 제5회 Witness 말씀 암송 대회가 개최됩니다. 이번 대회는 개인전과 팀전으로 나뉘어 진행되며, 개인전은 지정된 성경 구절(시편 23편, 요한복음 3:16-21, 로마서 8:28-39) 중 택일하여 암송하면 됩니다. 팀전은 3-5명이 한 팀을 이루어 자유 구절을 선택해 창의적으로 암송하는 방식입니다. 참가 신청은 11월 15일까지이며, 각 부문 1위부터 3위까지 시상합니다. 심사는 정확성, 유창성, 표현력을 기준으로 진행됩니다. 작년 대회에서는 30여 명이 참가하여 큰 호응을 얻었습니다. 말씀을 마음에 새기는 귀한 시간이 되길 바랍니다. 많은 관심과 참여 부탁드립니다.',
        img: '',
    },
    {
        group: 'witness',
        category: 'testimony',
        title: '이수연 학생 간증 - 시험 기간의 기적',
        date: '2025.10.18',
        excerpt: '어려운 시기에 경험한 하나님의 은혜를 나누었습니다.',
        description: '간호학과 2학년 이수연 학생이 수요예배에서 중간고사 기간에 경험한 놀라운 하나님의 은혜를 간증했습니다. 4개 전공과목 시험을 일주일 안에 치러야 하는 극도의 압박 속에서 불안과 두려움에 사로잡혔던 그는, 새벽기도회에 참석하며 하나님께 모든 것을 맡기기로 결단했다고 합니다. "공부할 시간도 부족한데 기도회에 가는 게 맞나" 고민했지만, 매일 새벽 하나님 앞에 나아가 기도하며 평안을 얻었습니다. 놀랍게도 시험 문제들이 자신이 집중적으로 공부한 부분에서 출제되었고, 전 과목 A학점이라는 기적 같은 결과를 받았습니다. 이 간증을 들은 많은 학생들이 큰 위로와 도전을 받았으며, 시험 기간에도 신앙생활을 우선순위에 두겠다는 다짐을 나누었습니다.',
        img: '',
    },
    {
        group: 'witness',
        category: 'mission',
        title: '필리핀 단기선교 출발',
        date: '2025.10.05',
        excerpt: '대학부 단기선교팀이 필리핀으로 출발했습니다.',
        description: 'Witness 대학부 단기선교팀 15명이 필리핀 마닐라로 출발했습니다. 이번 선교는 2주간 진행되며, 현지 교회와 협력하여 다양한 사역을 펼칠 예정입니다. 주요 사역으로는 어린이 성경학교(VBS), 의료봉사, 가정 방문 전도, 건축봉사 등이 계획되어 있습니다. 팀원들은 6개월간 매주 모여 기도하며 선교를 준비해왔으며, 각자 달란트를 활용한 프로그램을 준비했습니다. 의대생들은 의료봉사를, 교육학과 학생들은 어린이 교육을, 건축학과 학생들은 현지 교회 건축을 담당합니다. 출국 전 파송예배에서 담임목사님은 "젊은 날의 선교 경험이 평생의 신앙에 큰 영향을 미친다"며 격려했습니다. 선교팀은 매일 현장 소식을 SNS로 전하며, 귀국 후 선교 보고회를 가질 예정입니다.',
        img: '',
    },
    // Fishermen News (9)
    {
        group: 'fishermen',
        category: 'announcement',
        title: '2026년 청년부 비전 선포식',
        date: '2026.01.18',
        excerpt: '새해를 맞아 청년부 비전과 목표를 선포합니다.',
        description: '새해를 맞아 Fishermen 청년부의 2026년 비전 선포식이 성대하게 거행되었습니다. "사람을 낚는 어부"라는 청년부의 정체성을 재확인하며, 올해의 표어를 "직장에서 빛 되는 청년"으로 정했습니다. 선포식에서는 각 부서별 사역 계획이 발표되었습니다. 예배부는 매주 수준 높은 예배를 드리기 위한 워십팀 강화를, 전도부는 직장 내 전도와 거리 전도 활성화를, 양육부는 새신자 정착과 제자훈련 강화를, 친교부는 소그룹 활성화와 청년 간 유대 강화를 목표로 세웠습니다. 또한 올해 특별 목표로 ①분기별 전도집회 개최 ②100명 청년부 달성 ③해외 단기선교 2회 실시를 제시했습니다. 모든 청년들이 한마음으로 비전에 동참하기로 다짐했습니다.',
        img: '',
    },
    {
        group: 'fishermen',
        category: 'event',
        title: '신년 연합예배 및 친교의 밤',
        date: '2026.01.12',
        excerpt: '새해 첫 연합예배와 친교 시간을 가졌습니다.',
        description: '2026년 새해를 맞아 Fishermen 청년부와 타 교회 청년부가 함께하는 연합예배가 열렸습니다. 총 250여 명의 청년들이 참석한 가운데, "새해, 새 출발"이라는 주제로 은혜로운 예배를 드렸습니다. 담임목사님의 말씀에 이어 5개 교회 청년부 대표들이 새해 포부를 나누는 시간을 가졌습니다. 예배 후에는 친교의 밤 행사가 이어졌습니다. 각 교회에서 준비한 음식을 나누고, 테이블별로 자기소개와 신앙 간증을 나누는 시간을 가졌습니다. 이어진 레크리에이션에서는 교회 대항 게임으로 큰 웃음꽃이 피었습니다. 마지막으로 전체가 손을 잡고 새해 기도를 드리며 행사를 마무리했습니다. 참가자들은 "다른 교회 청년들과 교제하며 신앙의 폭을 넓힌 귀한 시간"이었다고 소감을 밝혔습니다.',
        img: '',
    },
    {
        group: 'fishermen',
        category: 'testimony',
        title: '박민수 청년 간증 - 직장에서의 신앙생활',
        date: '2025.12.28',
        excerpt: '직장 생활 속에서 지켜온 신앙의 이야기를 들려주셨습니다.',
        description: 'IT기업에 재직 중인 박민수 청년(28세)이 주일예배에서 직장 생활 3년간의 신앙 여정을 간증했습니다. 입사 초기 야근과 회식 문화 속에서 신앙생활을 유지하기가 어려웠지만, 새벽기도로 하루를 시작하며 힘을 얻었다고 합니다. 특히 "일요일은 반드시 예배 드리는 날"이라는 원칙을 지키며, 주말 근무를 요청받을 때도 정중히 거절하는 용기를 냈습니다. 처음에는 동료들의 시선이 부담스러웠지만, 성실한 근무 태도와 정직한 삶으로 신뢰를 얻게 되었고, 최근에는 팀장이 먼저 일요일 일정을 피해주신다고 합니다. 또한 점심시간을 이용한 직장 내 성경공부 모임을 시작해, 현재 5명의 동료가 함께하고 있습니다. 그는 "직장이야말로 가장 중요한 선교지"라며 청년들에게 담대한 신앙을 격려했습니다.',
        img: '',
    },
    {
        group: 'fishermen',
        category: 'mission',
        title: '직장인 전도집회 성황리에 마쳐',
        date: '2025.12.15',
        excerpt: '회사 동료들을 초청한 전도집회가 은혜롭게 진행되었습니다.',
        description: '강남역 인근 업무지역에서 직장인 대상 점심 전도집회가 성황리에 개최되었습니다. "직장 생활의 의미와 목적"이라는 주제로 진행된 이번 집회는 평일 정오 30분간 진행되었으며, 바쁜 일정 중에도 50여 명의 직장인들이 자리를 함께했습니다. 집회는 워십팀의 잔잔한 찬양으로 시작해, 한 청년 사업가의 간증과 15분간의 복음 메시지로 이어졌습니다. "경쟁과 스트레스 속에서 참된 안식을 찾는 법", "성공의 진정한 의미"에 대한 메시지가 많은 공감을 얻었습니다. 집회 후 개인 상담 시간에는 10여 명이 줄을 서서 상담을 요청했으며, 그 중 3명이 예수님을 영접하는 결단을 했습니다. 또한 12명이 교회 방문을 약속했습니다. 청년부는 이러한 직장인 전도를 분기별로 정례화할 계획입니다.',
        img: '',
    },
    {
        group: 'fishermen',
        category: 'event',
        title: '청년부 가을 산행',
        date: '2025.11.23',
        excerpt: '북한산에서 가진 힐링 산행의 아름다운 순간들입니다.',
        description: '가을의 마지막을 맞아 북한산 백운대 코스로 청년부 산행이 진행되었습니다. 70여 명의 청년들이 참여한 가운데, 아침 8시 북한산 입구에 모여 함께 기도로 산행을 시작했습니다. 단풍으로 물든 산길을 걸으며 하나님의 창조 세계를 만끽하는 시간을 가졌습니다. 등산 중간중간 쉬는 시간마다 자연스럽게 찬양이 터져 나왔고, 다른 등산객들도 함께 즐거워하는 모습이 인상적이었습니다. 정상에 도착해서는 전체가 원을 만들어 야외예배를 드렸습니다. 푸른 하늘 아래서 드린 예배는 그 어느 때보다 감동적이었다는 후기가 많았습니다. 하산 후에는 인근 식당에서 함께 식사하며 교제의 시간을 가졌습니다. 평소 바쁜 일상 속에서 만나기 어려웠던 부원들과 깊은 대화를 나누며 친밀감을 높인 의미 있는 시간이었습니다.',
        img: '',
    },
    {
        group: 'fishermen',
        category: 'announcement',
        title: '청년부 소그룹 리더 모집',
        date: '2025.11.08',
        excerpt: '2026년 소그룹 리더를 모집합니다. 많은 관심 부탁드립니다.',
        description: '2026년 청년부 소그룹 사역을 이끌어갈 리더를 모집합니다. 소그룹은 청년부의 핵심 사역으로, 8-10명이 한 그룹을 이루어 매주 만나 말씀을 나누고 삶을 나누며 서로를 격려하는 모임입니다. 리더의 역할은 소그룹원들의 영적 성장을 돕고, 주간 모임을 인도하며, 개인적인 고민과 기도 제목을 나누는 것입니다. 지원 자격은 ①신앙생활 3년 이상 ②주일예배 및 소그룹 모임 성실히 참석 ③타인을 섬기고 돌보는 마음이 있는 자입니다. 선발된 리더들에게는 12월 한 달간 리더십 훈련이 제공되며, 매월 리더 모임을 통해 지속적인 교육과 지원이 이루어집니다. 지원 마감은 11월 30일까지이며, 서류 심사와 면접을 거쳐 12월 초 최종 발표됩니다. 청년부의 미래를 함께 만들어갈 헌신된 리더들의 많은 지원 바랍니다.',
        img: '',
    },
    {
        group: 'fishermen',
        category: 'testimony',
        title: '최지영 청년 간증 - 결혼 준비와 신앙',
        date: '2025.10.25',
        excerpt: '결혼을 준비하며 배운 신앙의 교훈들을 나누었습니다.',
        description: '다음 달 결혼을 앞둔 최지영 청년(29세)이 수요예배에서 결혼 준비 과정을 통해 배운 신앙의 교훈을 나누었습니다. 신앙이 좋은 남편감을 만나기 위해 3년간 기도했고, 청년부 소개로 만난 예비 신랑과 1년간 교제하며 결혼을 결심했다고 합니다. 준비 과정에서 양가 부모님의 의견 차이, 예산 문제, 신혼집 마련 등 여러 어려움이 있었지만, 매번 기도로 극복해왔다고 합니다. 특히 "결혼식보다 결혼 생활이 중요하다"는 목사님의 조언을 마음에 새기고, 예비부부 성경공부에 참여하며 신앙적 토대를 다졌습니다. 두 사람은 결혼 후에도 함께 새벽기도를 드리고, 가정예배를 드리며, 청년부 사역에 적극 참여하기로 약속했습니다. 이 간증을 들은 많은 미혼 청년들이 "결혼도 신앙 안에서 준비해야 함"을 깨달았다며 큰 은혜를 받았습니다.',
        img: '',
    },
    {
        group: 'fishermen',
        category: 'mission',
        title: '무료급식 봉사활동',
        date: '2025.10.12',
        excerpt: '노숙인 급식소에서 진행한 봉사활동 현장입니다.',
        description: '매월 첫째 토요일, Fishermen 청년부는 서울역 인근 노숙인 급식소에서 봉사활동을 진행하고 있습니다. 이번 달에도 30여 명의 청년들이 아침 일찍 모여 200인분의 식사를 준비했습니다. 메뉴는 김치찌개, 계란찜, 나물 반찬이었으며, 청년들이 직접 재료를 다듬고 조리했습니다. 오전 11시부터 배식을 시작해 정오까지 약 180명의 노숙인분들께 따뜻한 식사를 대접했습니다. 식사 후에는 설거지와 급식소 청소까지 마무리했습니다. 단순히 음식을 나눠주는 것을 넘어, 식사하시는 분들과 대화를 나누며 관심과 사랑을 전하려 노력했습니다. 한 노숙인 어르신은 "젊은 친구들이 이렇게 수고해주니 감사하고 힘이 난다"며 눈시울을 붉히셨습니다. 봉사에 참여한 청년들은 "섬김을 통해 오히려 더 큰 은혜를 받았다"며 매달 이 사역을 계속하자고 다짐했습니다.',
        img: '',
    },
    {
        group: 'fishermen',
        category: 'event',
        title: '청년부 워십나이트',
        date: '2025.09.28',
        excerpt: '특별 워십나이트를 통해 하나님을 뜨겁게 예배했습니다.',
        description: '추석 연휴를 앞둔 금요일 저녁, Fishermen 청년부 특별 워십나이트가 개최되었습니다. "하나님을 향한 열정"이라는 주제로 진행된 이번 행사에는 120여 명의 청년들이 참석했습니다. 저녁 8시에 시작된 워십은 밤 11시까지 3시간 동안 이어졌습니다. 전반부에는 워십팀의 인도로 찬양과 경배의 시간을 가졌습니다. "주 여호와는 광대하시니", "왕이신 나의 하나님", "예수 전하러 이 땅에 왔네" 등 20여 곡의 찬양이 쉼 없이 이어졌습니다. 중반부에는 자유기도 시간으로, 청년들이 각자의 자리에서 또는 무릎 꿇고 간절히 기도했습니다. 후반부에는 간단한 말씀 나눔 후, 다시 찬양과 기도로 예배를 마무리했습니다. 참석한 청년들은 "일상의 분주함을 멈추고 온전히 하나님께 집중한 시간", "영적으로 재충전된 은혜로운 밤"이었다고 입을 모았습니다.',
        img: '',
    }
];

// Category display names
const categoryNames = {
    announcement: '공지',
    event: '행사',
    testimony: '간증',
    mission: '선교'
};

// ===========================
// Render News Cards
// ===========================
function renderNewsCards() {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;
    
    // 카테고리 이름 매핑
    const categoryNames = {
        announcement: '공지',
        event: '행사',
        testimony: '간증',
        mission: '선교',
        notice: '공지' // alias
    };
    
    newsGrid.innerHTML = newsData.map((item, index) => `
        <article class="news-card" data-category="${item.category}" data-group="${item.group}" data-description="${item.description || item.content}" data-index="${index}">
            <div class="news-image">${item.image ? `<img src="/${item.image}" alt="${item.title}" onerror="this.parentElement.style.display='none'">` : ''}</div>
            <div class="news-content">
                <span class="news-tag">${categoryNames[item.category] || item.category}</span>
                <h3>${item.title}</h3>
                <p class="news-date">${item.date || new Date(item.createdAt).toLocaleDateString('ko-KR')}</p>
                <p>${item.excerpt || (item.content ? item.content.substring(0, 100) + '...' : '')}</p>
                <a href="#" class="read-more" data-index="${index}">더 보기 →</a>
            </div>
        </article>
    `).join('');
    
    // Attach click events to "더 보기" buttons (공통 모달 시스템 적용)
    if (window.initModal) {
        // 일반 뉴스 카드용
        initModal({
            modalId: 'newsModal',
            triggerSelector: '.news-card .read-more',
            parentSelector: '.news-card',
            titleSelector: 'h3',
            categorySelector: '.news-tag',
            dateSelector: '.news-date',
            descriptionAttr: 'data-description'
        });
        // Featured News(최신 소식)용
        initModal({
            modalId: 'newsModal',
            triggerSelector: '.featured-article .read-more',
            parentSelector: '.featured-article',
            titleSelector: 'h2',
            categorySelector: '.news-category',
            dateSelector: '.news-date',
            descriptionAttr: '' // featured는 data-description이 아니라 p.excerpt 등에서 가져옴
        });
    }
    
    // Re-initialize filters
    initializeFilterButtons();
    showPage();
}

// ...existing code...

// ===========================
// Pagination and Filter
// ===========================
const itemsPerPage = 6;
let currentPage = 1;
let currentFilter = 'all';

function getCurrentGroup() {
    const urlParams = new URLSearchParams(window.location.search);
    const groupParam = urlParams.get('group');
    if (groupParam === 'witness' || groupParam === 'fishermen') {
        return groupParam;
    }
    return document.body.classList.contains('witness-theme') ? 'witness' : 'fishermen';
}

function getFilteredCards() {
    const newsCardsAll = document.querySelectorAll('.news-card');
    const currentGroup = getCurrentGroup();
    return Array.from(newsCardsAll).filter(card => {
        const category = card.getAttribute('data-category');
        const group = card.getAttribute('data-group');
        const matchesGroup = group === currentGroup;
        const matchesFilter = currentFilter === 'all' || category === currentFilter;
        return matchesGroup && matchesFilter;
    });
}

function renderPagination() {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;
    
    const filteredCards = getFilteredCards();
    const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
    
    paginationContainer.innerHTML = '';
    
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.textContent = '← Prev';
        prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
        paginationContainer.appendChild(prevBtn);
    }
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-btn';
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => goToPage(i));
        paginationContainer.appendChild(pageBtn);
    }
    
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.textContent = 'Next →';
        nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
        paginationContainer.appendChild(nextBtn);
    }
}


function goToPage(page) {
    currentPage = page;
    showPage();
    
    const newsSection = document.querySelector('.news-grid-section');
    if (newsSection) {
        window.scrollTo({
            top: newsSection.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

function showPage() {
    const newsCardsAll = document.querySelectorAll('.news-card');
    const filteredCards = getFilteredCards();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    newsCardsAll.forEach(card => {
        const cardIndex = filteredCards.indexOf(card);
        
        if (cardIndex >= startIndex && cardIndex < endIndex) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    renderPagination();
}

function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                currentFilter = button.getAttribute('data-filter');
                currentPage = 1;
                showPage();
            });
        });
    }
}

// ===========================
// Initialize on Page Load
// ===========================
document.addEventListener('DOMContentLoaded', async () => {
    // JSON 데이터 로드 (있으면 기본 데이터를 대체)
    if (typeof loadJSONData !== 'undefined') {
        const jsonData = await loadJSONData('news.json');
        if (jsonData && jsonData.length > 0) {
            newsData = jsonData;
        }
    }



    // 그룹별 최신글 1개만 노출하는 함수
    function getLatestByGroup(group) {
        return [...newsData]
            .filter(item => item.group === group)
            .sort((a, b) => {
                const parseDate = d => new Date((d.date || d.createdAt || '').replace(/\./g, '-'));
                return parseDate(b) - parseDate(a);
            })[0];
    }

    function renderFeaturedNews(group) {
        const latest = getLatestByGroup(group);
        let html = '';
        if (latest) {
            html = `
            <div class="featured-article" data-group="${group}">
                <div class="featured-image"></div>
                <div class="featured-content">
                    <span class="news-category">최신 소식</span>
                    <h2>${latest.title}</h2>
                    <p class="news-date">${latest.date || ''}</p>
                    <p class="news-excerpt">${latest.excerpt || latest.description || ''}</p>
                    <a href="#" class="read-more">더 보기 →</a>
                </div>
            </div>
            `;
        }
        const featuredContainer = document.getElementById('featuredNewsContainer');
        if (featuredContainer) featuredContainer.innerHTML = html;
        // 최신 소식 더보기 버튼에 모달 이벤트 재바인딩
        if (window.initModal) {
            initModal({
                modalId: 'newsModal',
                triggerSelector: '.featured-article .read-more',
                parentSelector: '.featured-article',
                titleSelector: 'h2',
                categorySelector: '.news-category',
                dateSelector: '.news-date',
                descriptionAttr: ''
            });
        }
    }

    // Fishermen이 기본
    renderFeaturedNews('fishermen');

    // 그룹 토글 시 최신글 변경
    document.addEventListener('groupChanged', (e) => {
        const group = e.detail.group;
        renderFeaturedNews(group);
    });

    renderNewsCards();
});
