import React from 'react';
import styled from 'styled-components';
import Posts from '../components/Posts';

const Title = styled.h1`
  text-align: center;
  padding-bottom: 16px;
  border-bottom: 5px solid #F58C49;
`;

const LandingPage = () => (
  <div id="main">
    <Title>Pomysły na biznes</Title>
    <Posts />
  </div>
);

export default LandingPage;
