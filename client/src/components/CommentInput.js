import React from 'react';
import styled from 'styled-components';
import {FormControl, Button, TextField} from '@material-ui/core';
import { Send } from "@material-ui/icons";
import UserAvatar from "./UserAvatar";

const ContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CommentTextField = styled(TextField)`
  flex: 1;
  textarea {
   min-height: 60px;
  }
  
  & > div {
    font-size: 14px;
  }
`;

const SendButton = styled(Button)`
  && {
    max-width: 100px;
    margin: 0.5em 0 0.5em 40px;
    .MuiSvgIcon-root {
      margin-right: 0.5em;
    }
  }
`;

const CommentInput = ({avatarId, value, onChange, submitComment}) => {
  return (
    <FormControl fullWidth>
      <ContentWrapper>
        <UserAvatar type={avatarId} small/>
        <CommentTextField aria-describedby="my-helper-text" value={value} onChange={onChange} multiline margin="dense" type="text"/>
      </ContentWrapper>
      <SendButton
        color="secondary"
        onClick={submitComment}
        size="small"
      >
        <Send/>
        Dodaj
      </SendButton>
    </FormControl>
  );
};

export default CommentInput;
