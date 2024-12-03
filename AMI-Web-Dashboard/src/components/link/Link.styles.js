import styled from "@emotion/styled";
import {Link} from 'react-router-dom';
import {COLORS} from '../../styles/colors';

export const StyledLink = styled(Link)`
  color:${COLORS.primary} ;
  text-decoration:none;
  transition: all 0.5s ease-out;
  cursor: pointer;
  &:hover {
  color: ${(props)=> props.variant === 'linkhover' ?'#eeeeee' : COLORS.primary};
  }
`;