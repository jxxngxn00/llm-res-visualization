# :bar_chart: LLM 응답 시각화 도구

## 프로젝트 소개

이 React TypeScript 애플리케이션은 대형 언어 모델(LLM) 스트리밍 응답 데이터의 종합적인 시각화 및 분석을 제공합니다. JSON 파일에서 LLM 청크 데이터를 처리하고 다양한 차트와 시각화를 생성하여 응답 패턴, 성능 메트릭 및 언어적 특성을 분석합니다.

## 주요 기능

### 데이터 처리 및 분석
- **다중 형식 LLM 데이터 지원**: event/data 구조를 가진 스트리밍 LLM 응답 청크 처리
- **합성 타임스탬프 생성**: 일관된 시간적 분석을 위한 타임스탬프 추가
- **한국어 텍스트 분석**: 형태소 분석을 포함한 한국어 콘텐츠 전문 분석

### 시각화 카테고리

#### 1. 모델 성능 차트
- **막대 차트**: 모델 사용량 분포 및 청크 통계
- **파이 차트**: 모델 성능 분석
- **선 차트**: 시간적 성능 추세

#### 2. 언어 분석 차트
- **단어 길이 분포**: 한국어 단어 길이 패턴 분석
- **문장 길이 분석**: 단어 수별 문장 길이 분포
- **문장 구성**: 한국어 텍스트의 명사, 동사, 형용사 비율
- **워드 클라우드**: 가장 빈번한 한국어 단어의 시각적 표현

#### 3. 성능 메트릭 차트
- **딜레이 분포**: 청크 간 응답 딜레이 히스토그램
- **생성 속도**: 실시간 초당 토큰 분석
- **처리량 분석**: 시간 간격별 토큰 처리 비율
- **속도 저하 탐지**: 스트리밍의 성능 병목 지점 식별

### 기술적 특징
- **TypeScript**: 포괄적인 인터페이스를 통한 완전한 타입 안전성 구현
- **반응형 디자인**: 다양한 화면 크기에 적응하는 그리드 기반 레이아웃
- **Recharts 통합**: 상호작용 가능한 툴팁과 범례를 가진 전문적인 차트
- **D3.js 워드 클라우드**: 고급 단어 빈도 시각화
- **오류 처리**: 사용자 피드백을 포함한 강력한 오류 관리
- **모듈형 아키텍처**: 유지보수를 위한 컴포넌트 기반 설계

## 기술 스택

- **프론트엔드**: React 18 with TypeScript
- **시각화**: Recharts, D3.js, d3-cloud
- **테스팅**: Jest, React Testing Library
- **빌드 도구**: Create React App, TypeScript 컴파일러
- **배포**: GitHub Pages 지원

## 필수 요구사항

- Node.js >= 16.0.0 (LTS 버전 권장)
- npm >= 8.0.0 (Node.js와 함께 설치됨)
- ES6+ 지원하는 최신 웹 브라우저

## 설치 방법

1. 저장소를 클론합니다:
   ```bash
   git clone https://github.com/jxxngxn00/llm-res-visualization.git
   cd llm-res-visualization
   ```

2. 의존성을 설치합니다:
   ```bash
   npm install
   ```

## 사용법

### 개발 모드

개발 서버를 시작합니다:
```bash
npm start
```
애플리케이션이 브라우저의 `http://localhost:3000`에서 열립니다.

### 프로덕션 빌드

프로덕션 빌드를 생성합니다:
```bash
npm run build
```

### 테스트

테스트 슈트를 실행합니다:
```bash
npm test
```

### 배포

GitHub Pages에 배포합니다:
```bash
npm run deploy
```

## 데이터 구조

애플리케이션은 다음 형식의 LLM 응답 데이터를 기대합니다:

```typescript
interface LLMChunk {
  event?: {
    id?: string;
    choices?: Array<{
      delta: { content?: string; role?: string; };
      finish_reason?: string | null;
    }>;
    model?: string;
    created?: number;
  };
  data?: {
    id: string;
    choices: Array<{
      delta: { content?: string; role?: string; };
      finish_reason: string | null;
    }>;
    model: string;
    created: number;
  };
  timestamp?: number;
}
```

### 샘플 데이터 파일

`src/response/` 디렉토리에 LLM 응답 데이터를 배치하세요:
- `another_response.json` - 기본 데이터셋
- `response.json` - 보조 데이터셋  
- `real_response.json` - 실제 응답 샘플

## 프로젝트 구조

```
src/
├── App.tsx                 # 메인 애플리케이션 컴포넌트
├── index.tsx              # 애플리케이션 진입점
├── components/
│   ├── Visualization.tsx  # 메인 시각화 컨테이너
│   └── charts/            # 개별 차트 컴포넌트들
│       ├── ChartVisualization.tsx
│       ├── DelayDistributionChart.tsx
│       ├── GenerationSpeedChart.tsx
│       ├── LineChartVisualization.tsx
│       ├── PieChartVisualization.tsx
│       ├── SentenceCompositionChart.tsx
│       ├── SentenceLengthVisualization.tsx
│       ├── SlowdownDetectionChart.tsx
│       ├── ThroughputChart.tsx
│       ├── WordCloudVisualization.tsx
│       └── WordLengthVisualization.tsx
├── response/              # JSON 데이터 파일들
├── types/
│   └── index.d.ts        # TypeScript 타입 정의
```

## 상세 기능

### 한국어 텍스트 분석
- **형태소 분석**: 정규식 패턴을 사용하여 한국어 명사, 동사, 형용사 식별
- **단어 분할**: 유니코드 범위를 사용하여 한국어 단어 추출
- **문장 파싱**: 한국어 문장 부호로 텍스트 분할

### 성능 분석
- **실시간 메트릭**: 초당 토큰 수와 처리량 계산
- **딜레이 분석**: 청크 간 딜레이 측정 및 병목 지점 식별
- **시간적 패턴**: 시간에 따른 성능 변화 추적

### 상호작용 시각화
- **반응형 차트**: 모든 차트가 컨테이너 크기에 맞춰 조정
- **상호작용 요소**: 호버 툴팁 및 클릭 가능한 범례
- **색상 코딩**: 관련 시각화 간 일관된 색상 체계

## 브라우저 지원

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 기여하기

1. 저장소를 포크합니다
2. 기능 브랜치를 생성합니다: `git checkout -b feature-name`
3. 변경사항을 커밋합니다: `git commit -am 'Add new feature'`
4. 브랜치에 푸시합니다: `git push origin feature-name`
5. 풀 리퀘스트를 제출합니다

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.

## 라이브 데모

라이브 애플리케이션 방문: [https://jxxngxn00.github.io/llm-res-visualization](https://jxxngxn00.github.io/llm-res-visualization)

