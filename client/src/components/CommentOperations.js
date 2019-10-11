import {
  Button, Dialog,
  DialogActions,
  DialogContent, DialogContentText,
  DialogTitle,
  IconButton,
  TextField
} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import React, {useContext, useState, useRef} from "react";
import styled from "styled-components";
import {UserDataContext} from "../hoc/Authentication";

const ActionsWrapper = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
`;

const DescriptionField = styled(TextField)`
  & textarea {
    min-height: 80px;
  }
`;

const CommentOperations = ({comment, handleEditConfirm, handleDeleteConfirm}) => {
  const { content } = useContext(UserDataContext);
  const [openedModal, setOpenedModal] = useState(null);
  const commentEl = useRef(null);
  return content._id === comment.author._id && (
    <ActionsWrapper>
      <IconButton size="small" onClick={() => setOpenedModal('edit')}>
        <Edit/>
      </IconButton>
      <IconButton size="small" onClick={() => setOpenedModal('delete')}>
        <Delete/>
      </IconButton>
      <Dialog
        open={openedModal === 'edit'}
        onClose={() => setOpenedModal(null)}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Edytuj komentarz</DialogTitle>
        <DialogContent>
          <DescriptionField
            margin="dense"
            id="comment"
            label="Komentarz"
            type="text"
            fullWidth
            multiline
            defaultValue={comment.content}
            name="comment"
            inputProps={{ ref: commentEl }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenedModal(null)} color="primary">
            Anuluj
          </Button>
          <Button onClick={() => console.log(commentEl.current.value)} color="primary">
            Edytuj
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openedModal === 'delete'}
        onClose={() => setOpenedModal(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Usuń komentarz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Czy jesteś pewny, że chcesz usunąć ten komentarz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenedModal(null)} color="secondary">
            Anuluj
          </Button>
          <Button onClick={() => console.log(commentEl.current.value)} color="secondary">
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </ActionsWrapper>
  )
};

export default CommentOperations
