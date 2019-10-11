import React from 'react';
import styled from 'styled-components';
import Avatars from '../assets/images/avatars.png';

const Avatar = styled.div`
  background: url(${Avatars}) no-repeat ${(props) => props.config.position};
  width: ${(props) => props.config.width};
  height: 50px;
  margin: 2px auto;
  transition: transform .3s ease-out;
  
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

const AvatarWrapper = styled.div`
  overflow: hidden;
  width: ${(props) => props.small ? '45px' : '55px'};
  height: ${(props) => props.small ? '45px' : '55px'};
  border-radius: ${(props) => props.small ? '25px' : '8px'};
  background: ${(props) => props.small ? 'none' : '#fff'};
  box-shadow: ${(props) => props.small ? 'none' : props.active ? '1px 1px 10px #F58C49' : '1px 1px 5px rgba(0, 0, 0, 0.4)'};
  transition: box-shadow .3s ease-out;
  
  &:hover {
    cursor: pointer;
    box-shadow: ${(props) => props.small ? 'none' :'1px 1px 5px #F58C49'};
  }
`;

const UserAvatar = ({type, active, onClick, small}) => {
  const avatarConfig =  (() => {
    switch (type) {
      case 'female-1': return { position: '0 0', width: '37px' };
      case 'female-2': return { position: '0 -60px', width: '44px' };
      case 'female-3': return { position: '0 -120px', width: '47px' };
      case 'female-4': return { position: '0 -180px', width: '50px' };
      case 'male-1': return { position: '-3px -240px', width: '33px' };
      case 'male-2': return { position: '0 -300px', width: '42px' };
      case 'male-3': return { position: '0 -360px', width: '50px' };
      case 'male-4': return { position: '0 -420px', width: '50px' };
      default: return { position: '-3px -240px', width: '33px' };
    }
  })();
  return (
    <AvatarWrapper small={small} active={active} onClick={onClick}>
      <Avatar config={avatarConfig}/>
    </AvatarWrapper>

  );
};

export default UserAvatar;
