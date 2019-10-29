import React, {useReducer, useEffect, useState} from 'react';
import styled from 'styled-components';
import { graphql} from 'react-apollo';

import {addIdea, getPostsQuery} from "../queries/queries";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";

import {CATEGORY_TYPES} from "../utils/constants";
import lodash from "lodash";

const SelectItem = styled(MenuItem)`
  text-transform: capitalize;
`;
const CategorySelect = styled(Select)`
  && {
    text-transform: capitalize;
    .MuiSelect-select:focus {
     background-color: #fff;
    }
  }
`;

const FieldsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & > * {
    flex: 1;
    
    &:first-of-type {
      margin-right: 1em;
    }
  }
`;

const DescriptionField = styled(TextField)`
  & textarea {
    min-height: 80px;
  }
`;

const initialState = {
  title: '',
  description: '',
  category: ''
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'setValue':
      return {
        ...state,
        [action.fieldName]: action.value
      };
    case 'resetValues':
      return initialState;
    default:
      throw new Error('Unexpected action');
  }
};

const AddIdeaDialog = ({open, onClose, onSubmit, addIdea}) => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);
  useEffect(() => {
    dispatch({type: 'resetValues'})
  }, [open]);

  const handleValueChange = ({target}) => {
    dispatch({
      type: 'setValue',
      fieldName: target.name,
      value: target.value
    })
  };
  const handleSubmit = () => {
    const emptyField = Object.entries(formState).find(entry => !entry[1].length)
    if (emptyField) {
      setError(`Pole ${emptyField[0]} Nie może być puste`)
    } else {
      addIdea({
        variables: formState,
        refetchQueries: [{ query: getPostsQuery }]
      }).then(onSubmit)
    }
  };

  const categoryOptions = CATEGORY_TYPES.map(category => (
    <SelectItem key={category} value={category}>{category}</SelectItem>))

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Stwórz Ideę</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Zanim dodasz pomysł na biznes skorzystaj z naszej wyszukiwarki u góry ekranu aby upewnić się, czy taki pomysł
          już istnieje. Znacznie większą wartość wniesiesz, jeśli podsuniesz kreatywny pomysł do istniejącego już
          modelu. :)
        </DialogContentText>
        {error}
        <FieldsWrapper>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Tytuł"
            type="text"
            value={formState.title}
            onChange={handleValueChange}
            name="title"
          />
          <FormControl>
            <InputLabel htmlFor="category">Kategoria</InputLabel>
            <CategorySelect
              value={formState.category}
              onChange={handleValueChange}
              inputProps={{
                name: 'category',
                id: 'category',
              }}
            >
              {categoryOptions}
            </CategorySelect>
          </FormControl>
        </FieldsWrapper>
        <DescriptionField
          margin="dense"
          id="description"
          label="Opis"
          type="text"
          fullWidth
          multiline
          value={formState.description}
          onChange={handleValueChange}
          name="description"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Stwórz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default lodash.flowRight(
  graphql(addIdea, { name: 'addIdea' }),
)(AddIdeaDialog);
