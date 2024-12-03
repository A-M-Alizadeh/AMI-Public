import { styled } from "styled-components";

export const StyledInput = styled.input`
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: 3px;
  width: ${(props)=> props.variant ==='input-height' ? '100%' : '90%' };
  height: ${(props)=> props.variant ==='input-height' ? '40px' : '50px' };
  background-color: transparent;
  padding-left: 10px;
  color: #fff;
  font-size: 1.2rem;
  outline: none;

  &:focus {
        outline: none;
        box-shadow: 1px 1px 3px 2px rgba(0,186,135,.8);
        transition: all 0.5s ease;
    }

`;
