import styled from "@emotion/styled";
import {COLORS} from '../../styles/colors'

export const StyledTextarea = styled.textarea`
    width: 100%;
    border-radius: 5px;
    background-color: #27283f;
    border: none;
    outline: none;
    padding: 10px 0 0 15px;
    color: #fff;
    font-size: 1rem;
    height: 100px;
    font-family: inherit;
    ::placeholder,
    ::-webkit-input-placeholder {
      color: #cccccc;
      
     
    }
    :-ms-input-placeholder {
       color: #000;
    }

`