import React from "react";
import HeaderContainer from "../containers/HeaderContainer";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: inline-block;
  font-size: 1.25rem;
  height: 100%;
  min-height: 100%;
  padding-top: 10em;
  text-align: center;
`;

function Main() {
  return (
    <>
      <HeaderContainer></HeaderContainer>
      <Container>
        <p>
          <a href="/login">Go to login</a>
        </p>
        <p>
          <a href="/file/ucmsSetup.exe">Go to Download</a>
        </p>
      </Container>
    </>
  );
}

// 1. 다운로드 링크 ? 버튼 ? (지원 플랫폼도 적으면 좋으려나요 windows 7 이상, 64bits)
// 2. 간단히 기능, 명령, 장점 같은거 설명
// 3. 사진으로 기능 보여주기 ? (명령 날리는거나 gui 등)
// 4. 사용 중인 학교 수나 그 학교 로고(물론 세종대밖에 없지만...상용화됐다는 가정으로)
// 5. 그냥 배경으로 학교 강의실 사진 있으면 몇개 써도 나쁘지 않을 것 같기도
export default Main;
