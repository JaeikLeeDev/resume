'use client';

import ResumeLayout from '@/components/layout/ResumeLayout';
import PDFExport from '@/components/ui/PDFExport';
import ContactInfo from '@/components/sections/ContactInfo';
import TechChips from '@/components/ui/TechChips';
import ExperienceItem from '@/components/sections/ExperienceItem';
import SkillSection from '@/components/sections/SkillSection';
import ValueSection from '@/components/sections/ValueSection';
import { addPageBreakStyles } from '@/lib/pdf';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    addPageBreakStyles();
  }, []);

  // Contact information data
  const contactInfo = {
    email: 'jaeiklee@gmail.com',
    phone: '+82 10-1234-1234',
    blog: {
      url: 'https://velog.io/@jaeiklee-dev',
      display: 'velog.io/@jaeiklee-dev'
    },
    github: {
      url: 'https://github.com/jaeikleedev',
      display: 'github.com/jaeikleedev'
    }
  };

  // Skills data
  const skillsData = [
    {
      category: 'App, Web',
      skills: [
        { name: 'Flutter', summary: 'Riverpod 상태관리, MVVM 설계, 스토어 출시' },
        { name: 'Unity, C#', summary: '태블릿용 페인팅 앱 1건' },
        { name: 'Cafe24 SDK, Cafe24 Admin API', summary: '쇼핑몰 커스텀 1건' }
      ]
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'React, Next.js', summary: '컴포넌트 기반 개발, SSG/SSR 구현' },
        { name: 'TypeScript', summary: '타입 안전성을 통한 안정적인 개발' },
        { name: 'Tailwind CSS, Styled Components', summary: '반응형 UI 구현, 컴포넌트 기반 스타일링' }
      ]
    },
    {
      category: 'Backend, Database',
      skills: [
        { name: 'Firebase, GCP', summary: 'Firestore, Cloud Functions, 인증 시스템 구축' },
        { name: 'Node.js', summary: 'RESTful API 개발 및 서버 구축' }
      ]
    },
    {
      category: 'Data Science, ML',
      skills: [
        { name: 'Python', summary: 'pandas, numpy를 활용한 데이터 전처리 및 분석' },
        { name: 'PyTorch', summary: '딥러닝 모델 개발 및 훈련' }
      ]
    }
  ];

  // Core competencies data
  const coreCompetencies = [
    {
      title: 'Flutter로 크로스플랫폼 앱 개발.',
      items: [
        'iOS, Android 동시 배포 가능한 앱 개발',
        'Riverpod을 활용한 상태 관리 및 MVVM 아키텍처 설계',
        '네이티브 기능 연동 및 성능 최적화'
      ]
    },
    {
      title: 'Firebase, GCP로 백엔드 구성.',
      items: [
        'Firestore를 활용한 NoSQL 데이터베이스 설계',
        'Cloud Functions으로 서버리스 API 구축',
        '인증 시스템 및 보안 규칙 설정'
      ]
    },
    {
      title: '협업 체계 설계 및 도입.',
      items: [
        '디자이너 없는 Flutter 개발팀을 위한 UI 개발 체계 구축',
        'Notion을 사용하여 소규모 SI 개발팀을 위한 문서화 및 협업 시스템 설계',
        'Teamgantt, Trello, 카카오워크 등을 사용한 업무 공유 및 인사관리 체계 도입'
      ]
    }
  ];

  // Values data
  const valuesData = [
    {
      title: '개발 철학.',
      items: [
        '사용자 중심의 직관적인 인터페이스를 설계합니다.',
        '재사용 가능하고 확장 가능한 코드를 작성합니다.',
        '지속적인 학습을 통해 최신 기술을 적용합니다.',
        '팀원과의 소통을 중요시하며 지식을 공유합니다.'
      ]
    },
    {
      title: '업무 방식.',
      items: [
        '문제를 정확히 파악하고 근본적인 해결책을 찾습니다.',
        '효율적인 개발 프로세스를 구축하고 개선합니다.',
        '테스트와 문서화를 통해 안정적인 코드를 작성합니다.',
        '피드백을 적극적으로 수용하고 개선합니다.'
      ]
    }
  ];

  // Other tools data
  const otherToolsData = [
    {
      category: '협업 및 관리',
      skills: [
        { name: 'Notion', summary: '문서화, 프로젝트 관리, 지식 베이스 구축' },
        { name: 'Teamgantt', summary: '프로젝트 일정 관리 및 간트차트 작성' },
        { name: 'Trello', summary: '칸반 보드를 활용한 업무 흐름 관리' },
        { name: 'Figma', summary: 'UI/UX 디자인 및 프로토타이핑' }
      ]
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <PDFExport />
      <ResumeLayout>
        <div className="container" style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}>
          
          {/* Header Section */}
          <div style={{ marginBottom: 'var(--space-3xl)' }}>
            <h1 className="text-hero">이재익 이력서</h1>
            <p className="text-item-subtitle">Frontend Developer</p>
            
            <ContactInfo {...contactInfo} />
            
            <p className="text-body">
              스타트업 개발자로 4년간 다양한 기술 스택을 경험했습니다. 임베디드에서 웹, 앱, 머신러닝까지 폭넓은 영역을 다루며 **새로운 기술을 빠르게 습득하고 제품화하는 역량**을 키웠습니다.
              <br />    
            SI 개발 2년간 Flutter, Unity, 머신러닝 등 **서로 다른 기술스택의 제품 4건을 성공적으로 개발**했습니다. 처음 접하는 기술로도 정확한 견적과 일정 예측이 가능합니다.
            <br />
            업무 능력 향상을 위한 자기 계발을 좋아합니다. 어제 배운 지식이 오늘 회사 제품을 더 낫게 만들 때 짜릿함을 느낍니다.
            <br />
            대화만큼이나 글을 통한 소통을 중요하게 생각합니다. **Notion으로 문서화하고, 협업**하기를 좋아합니다. 목표 결과물에 대해 팀원 모두가 같은 이해를 갖도록 하는 데 집중합니다.
            <br />
            UI 및 그래픽디자인 경험이 있습니다. 간단한 디자인 작업이 가능하며 디자이너와 협업시 소통이 원활합니다.
            </p>
          </div>

          {/* 사용한 기술 Section */}
          <div className="section">
            <h2 className="text-section-title">사용한 기술.</h2>
            <SkillSection categories={skillsData} />
          </div>

          {/* 핵심 역량 Section */}
          <div className="section">
            <h2 className="text-section-title">핵심 역량.</h2>
            <ValueSection values={coreCompetencies} />
          </div>

          {/* 업무 경험 Section */}
          <div className="section">
            <h2 className="text-section-title">업무 경험.</h2>
            
            <div className="item">
              <h3 className="text-subsection-title">(주)라이브스톡 | Frontend Developer</h3>
              <p className="text-meta">2021.01 ~ 2024.11 (3년 11개월)</p>
              
              <p className="text-body">
                스타트업에서 다양한 기술 스택을 활용한 SI 개발, 임베디드 소프트웨어 개발, 팀 협업 체계 설계를 담당했습니다.
              </p>
              
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <h4 className="text-item-title">SI 개발</h4>
                <p className="text-meta">2022.11 ~ 2024.11</p>
                
                <div className="tech-container" style={{ marginBottom: 'var(--space-md)' }}>
                  <span className="tech-chip">Pandas</span>
                  <span className="tech-chip">Numpy</span>
                  <span className="tech-chip">Pytorch</span>
                  <span className="tech-chip">Flutter</span>
                  <span className="tech-chip">Unity</span>
                  <span className="tech-chip">Firebase</span>
                  <span className="tech-chip">GCP</span>
                  <span className="tech-chip">Cafe24 SDK</span>
                </div>
                
                <ul className="list">
                  <li className="list-item">(2024) '네츠모빌리티' 서비스 소요시간 예측 AI 개발</li>
                  <li className="list-item">(2024) '네츠모빌리티' 서비스 예약 앱 개발</li>
                  <li className="list-item">(2023) '아트봇' 태블릿용 3D 페인팅 앱 및 관리자페이지 개발</li>
                  <li className="list-item">(2023) '아하소풍' 웰다잉 앱 '엔딩노트' 개발</li>
                  <li className="list-item">(2022) '쭙' 자사 쇼핑몰 Cafe24 커스텀 개발</li>
                </ul>
              </div>
              
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <h4 className="text-item-title">펌웨어 및 임베디드 SW 개발</h4>
                <p className="text-meta">2021.01 ~ 2022.11</p>
                
                <div className="tech-container" style={{ marginBottom: 'var(--space-md)' }}>
                  <span className="tech-chip">STM32</span>
                  <span className="tech-chip">C</span>
                  <span className="tech-chip">Python</span>
                  <span className="tech-chip">Raspberry Pi</span>
                  <span className="tech-chip">LoRa</span>
                </div>
                
                <ul className="list">
                  <li className="list-item">저전력 무선 통신 장비의 STM32L433 MCU 기반 펌웨어 개발</li>
                  <li className="list-item">전력 소모 최적화 알고리즘 및 LoRa 통신망 라우팅 알고리즘 개발</li>
                  <li className="list-item">Raspberry Pi, C, Python 사용한 LoRa 게이트웨이의 임베디드 SW 개발</li>
                  <li className="list-item">CE, KC 인증 대응</li>
                  <li className="list-item">제품별 사용자 매뉴얼 및 릴리즈 문서 제작</li>
                </ul>
              </div>
              
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <h4 className="text-item-title">협업 체계 설계 및 도입</h4>
                <p className="text-meta">2021.12 ~ 2024.11</p>
                
                <div className="tech-container" style={{ marginBottom: 'var(--space-md)' }}>
                  <span className="tech-chip">Notion</span>
                  <span className="tech-chip">Teamgantt</span>
                  <span className="tech-chip">Trello</span>
                  <span className="tech-chip">Figma</span>
                </div>
                
                <ul className="list">
                  <li className="list-item">디자이너 없는 Flutter 개발팀을 위한 UI 개발 체계 구축</li>
                  <li className="list-item">Notion을 사용하여 소규모 SI 개발팀을 위한 문서화 및 협업 시스템 설계</li>
                  <li className="list-item">Teamgantt, Trello, 카카오워크 등을 사용한 업무 공유 및 인사관리 체계 도입</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 프로젝트 경험 Section */}
          <div className="section">
            <h2 className="text-section-title">프로젝트 경험.</h2>
            
            <div className="item">
              <h3 className="text-subsection-title">휠체어 이용자 전용 교통 서비스 플랫폼</h3>
              <p className="text-meta">2024.01 ~ 2024.11 | 네츠모빌리티(netsmobility.com) 발주 | 라이브스톡 근무</p>
              
              <p className="text-body">
                휠체어 이용 고객을 위한 특별 교통 서비스의 예약 시스템과 AI 예측 모델을 개발했습니다.
              </p>
              
              <p className="text-meta">8인 | 기획 1, 디자인 1, 웹 1, 앱 4, ML 1 | 기여도 <strong>ML 100%, 앱 20%</strong></p>
              
              <div className="tech-container" style={{ marginBottom: 'var(--space-md)' }}>
                <span className="tech-chip">Pytorch</span>
                <span className="tech-chip">Cloud Functions</span>
                <span className="tech-chip">Flutter</span>
                <span className="tech-chip">Firebase</span>
                <span className="tech-chip">GetX</span>
                <span className="tech-chip">Naver API</span>
              </div>
              
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <h4 className="text-item-title">ML Pipeline</h4>
                
                <ul className="list">
                  <li className="list-item">Pytorch로 휠체어 고객 차량 탑승 소요시간 예측 AI 개발, Cloud Functions에 배포</li>
                  <li className="list-item">Naver API 사용하여 불량 주소 데이터 정제 알고리즘 개발</li>
                  <li className="list-item">DB(Firestore)에서 최신 데이터를 가져와 재학습하는 파이프라인 개발</li>
                  <li className="list-item">모델 성능(MAE)에 따라 AI 예측의 가중치가 달라지도록 하는 알고리즘 개발</li>
                  <li className="list-item">예약 시스템에 적용하여 서비스 스케줄링 효율 10% 향상</li>
                </ul>
              </div>
              
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <h4 className="text-item-title">Mobile App</h4>
                
                <ul className="list">
                  <li className="list-item">Flutter 기반 Android/iOS 크로스플랫폼 앱 개발</li>
                  <li className="list-item">복잡한 요금, 환불, 약관 등의 서비스 정책을 반영한 예약/결제 시스템 구현</li>
                  <li className="list-item">GetX 사용하여 예약, 결제, 배차 상태 등을 관리, 동기화</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 포트폴리오 Section */}
          <div className="section">
            <h2 className="text-section-title">포트폴리오.</h2>
            
            <div className="item">
              <h3 className="text-subsection-title">Personal Blog System.</h3>
              <p className="text-meta">2022.01 - 현재</p>
              
              <p className="text-body">
                Next.js와 TypeScript를 활용하여 구축한 개인 블로그입니다. 마크다운 기반의 콘텐츠 관리와 SEO 최적화에 중점을 두었습니다.
              </p>
              
              <p className="text-meta">1인 | 기획, 디자인, 개발 | 기여도 <strong>100%</strong></p>
              
              <div className="tech-container" style={{ marginBottom: 'var(--space-md)' }}>
                <span className="tech-chip">Next.js</span>
                <span className="tech-chip">TypeScript</span>
                <span className="tech-chip">Tailwind CSS</span>
                <span className="tech-chip">Vercel</span>
                <span className="tech-chip">Markdown</span>
                <span className="tech-chip">GitHub</span>
              </div>
              
              <ul className="list">
                <li className="list-item">Next.js App Router를 활용한 정적 사이트 생성</li>
                <li className="list-item">마크다운 파싱 및 문법 하이라이팅 구현</li>
                <li className="list-item">SEO 최적화 및 메타데이터 관리</li>
                <li className="list-item">다크모드 및 반응형 디자인 구현</li>
              </ul>
              
              <p className="text-meta" style={{ marginTop: 'var(--space-sm)' }}>
                <a href="https://github.com/jaeiklee/blog" className="link" target="_blank" rel="noopener noreferrer">GitHub</a> | 
                <a href="https://jaeik.dev" className="link" target="_blank" rel="noopener noreferrer">Live Demo</a>
              </p>
            </div>
          </div>

          {/* 가치관 Section */}
          <div className="section">
            <h2 className="text-section-title">가치관.</h2>
            <ValueSection values={valuesData} />
          </div>

          {/* 개발 외 툴 활용 역량 Section */}
          <div className="section">
            <h2 className="text-section-title">개발 외 툴 활용 역량.</h2>
            <SkillSection categories={otherToolsData} />
          </div>

          {/* 학력 Section */}
          <div className="section">
            <h2 className="text-section-title">학력.</h2>
            
            <div className="item">
              <h3 className="text-subsection-title">한국대학교.</h3>
              <p className="text-meta">컴퓨터공학과 학사 2018.03 - 2022.02</p>
              <p className="text-body">
                컴퓨터공학을 전공하며 프로그래밍 기초와 알고리즘, 데이터구조 등을 학습했습니다.
              </p>
            </div>
          </div>

          {/* 자격증 및 어학 Section */}
          <div className="section">
            <h2 className="text-section-title">자격증 및 어학.</h2>
            
            <div className="item">
              <h3 className="text-item-title">자격증.</h3>
              <ul className="list">
                <li className="list-item">정보처리기사 (2021.08)</li>
                <li className="list-item">SQLD (2021.05)</li>
                <li className="list-item">컴활 1급 (2020.12)</li>
              </ul>
            </div>

            <div className="item">
              <h3 className="text-item-title">어학.</h3>
              <ul className="list">
                <li className="list-item">TOEIC 850점 (2021.03)</li>
                <li className="list-item">OPIc IM2 (2021.06)</li>
              </ul>
            </div>
          </div>

          {/* 병역 Section */}
          <div className="section">
            <h2 className="text-section-title">병역.</h2>
            
            <div className="item">
              <h3 className="text-subsection-title">육군 병장 만기전역.</h3>
              <p className="text-meta">2016.03 - 2018.01</p>
              <p className="text-body">
                육군에서 병장으로 만기전역했습니다.
              </p>
            </div>
          </div>
        </div>
      </ResumeLayout>
    </div>
  );
}