import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const GroupContext = createContext()

export const GROUP_CONFIG = {
  witness: {
    theme: 'witness-theme',
    logo: 'WITNESS',
    hero: {
      image: '/images/witness.png',
      lines: ['성령의 권능으로', '세상의 증인이 되는', 'Witness'],
      subtitle: '내수동교회 대학부와 함께 믿음의 여정을 시작하세요'
    },
    ceo: {
      header: '담당사역자 메시지',
      quote: '"오직 성령이 너희에게 임하시면 너희가 권능을 받고... 땅 끝까지 이르러 내 증인이 되리라" (사도행전 1:8)',
      paragraphs: [
        'Witness는 사도행전 1장 8절 말씀처럼, 성령의 권능을 받아 이 땅에서 그리스도의 증인으로 살아가고자 하는 대학생들의 공동체입니다.',
        '우리는 함께 예배하고, 말씀을 나누며, 서로 사랑하고 격려합니다. 대학생으로서 캠퍼스와 사회 속에서 복음을 증거하며, 각자의 달란트를 발견하고 개발하여 하나님 나라를 위해 사용합니다.',
        '내수동교회 대학부 Witness와 함께 믿음의 여정을 시작하시길 초대합니다. 주님 안에서 함께 성장하고, 서로를 세우며, 땅 끝까지 복음을 전하는 대학부 공동체가 되기를 소망합니다.'
      ],
      blockquote: '"땅 끝까지 이르러 내 증인이 되리라"',
      signature: '내수동교회 대학부 목사'
    },
    sections: {
      companyInfo: '대학부 소개',
      businessAreas: '대학부 사역',
      memberTitle: '대학부원'
    },
    footer: {
      title: 'Witness',
      description: '내수동교회 대학부 - 땅 끝까지 이르러 내 증인이 되리라',
      copyright: '© 2026 Witness 내수동교회 대학부. All Rights Reserved.',
      followUs: '소통채널',
      social: {
        instagram: 'https://www.instagram.com/witnessofchrist/',
        youtube: 'https://youtube.com/@naesoo_witness?si=Wtpkn_RkcNlRV-rk',
        kakao: 'https://pf.kakao.com/_qZZbxb'
      }
    },
    contact: {
      description: '내수동교회 대학부 Witness가 여러분을 환영합니다'
    },
    stats: {
      year: '1973',
      members: '175',
      groups: '6',
      events: '15'
    }
  },
  fishermen: {
    theme: '',
    logo: 'FISHERMEN',
    hero: {
      image: '/images/fishermen.png',
      lines: ['사람을 낚는', '어부가 되리라', 'Fishermen'],
      subtitle: '내수동교회 청년부와 함께 믿음의 여정을 시작하세요'
    },
    ceo: {
      header: '담당사역자 메시지',
      quote: '"나를 따라오라 내가 너희를 사람을 낚는 어부가 되게 하리라" (마태복음 4:19)',
      paragraphs: [
        'Fishermen은 예수님의 이 말씀처럼, 주님의 부르심에 응답하여 세상 속에서 빛과 소금의 역할을 감당하고자 하는 청년들의 공동체입니다.',
        '우리는 함께 예배하고, 말씀을 나누며, 서로 사랑하고 격려합니다. 각자의 달란트를 발견하고 개발하여 하나님 나라를 위해 사용하며, 이 시대의 청년으로서 복음을 전하는 삶을 살아갑니다.',
        '내수동교회 청년부 Fishermen과 함께 믿음의 여정을 시작하시길 초대합니다. 주님 안에서 함께 성장하고, 서로를 세우며, 세상을 변화시키는 청년 공동체가 되기를 소망합니다.'
      ],
      blockquote: '"사람을 낚는 어부가 되리라"',
      signature: '내수동교회 청년부 목사'
    },
    sections: {
      companyInfo: '청년부 소개',
      businessAreas: '청년부 사역',
      memberTitle: '청년부원'
    },
    footer: {
      title: 'Fishermen',
      description: '내수동교회 청년부 - 사람을 낚는 어부가 되리라',
      copyright: '© 2026 Fishermen 내수동교회 청년부. All Rights Reserved.',
      followUs: 'Follow Us',
      social: {
        instagram: 'https://www.instagram.com/naesoofishermen/',
        youtube: 'https://youtube.com/@naesoofishermen?si=ok791-vDT4c4XJIC',
        kakao: 'https://pf.kakao.com/_xibZxhC'
      }
    },
    contact: {
      description: '내수동교회 청년부 Fishermen이 여러분을 환영합니다'
    },
    stats: {
      year: '1979',
      members: '213',
      groups: '8',
      events: '17'
    }
  }
}

export const GroupProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [group, setGroup] = useState(() => {
    return searchParams.get('group') || 'fishermen'
  })

  useEffect(() => {
    const groupParam = searchParams.get('group') || 'fishermen'
    setGroup(groupParam)

    // Apply theme class to body
    if (groupParam === 'witness') {
      document.body.classList.add('witness-theme')
    } else {
      document.body.classList.remove('witness-theme')
    }
  }, [searchParams])

  const toggleGroup = () => {
    const newGroup = group === 'witness' ? 'fishermen' : 'witness'
    setGroup(newGroup)
    setSearchParams({ group: newGroup })
  }

  const config = GROUP_CONFIG[group]

  return (
    <GroupContext.Provider value={{ group, toggleGroup, config }}>
      {children}
    </GroupContext.Provider>
  )
}

export const useGroup = () => {
  const context = useContext(GroupContext)
  if (!context) {
    throw new Error('useGroup must be used within GroupProvider')
  }
  return context
}
