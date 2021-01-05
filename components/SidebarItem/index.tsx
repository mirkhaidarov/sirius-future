// Core
import { useContext } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

// Instruments
import { ContextApp } from '../../init/reducer'

// Types
import { OptionsTypes } from '../../data/sidebarData';

type SidebarItemPropsTypes = OptionsTypes

type ItemTypes= {
  tabIndex: number;
}

type ItemLabelTypes = {
  isSidebarToggle: boolean;
}

type ItemLinkTypes = ItemLabelTypes

// Styled components
const Item = styled('li')<ItemTypes>`
  color: #6F6F6F;
  margin-top: 2px;
  border-left: 3px solid transparent;
  
  :hover {
    border-left: 3px solid #2E71F3;
  }
`

const ItemLink = styled('a')<ItemLinkTypes>`
  display: flex;
  font-size: 0.8rem;
  padding: ${({ isSidebarToggle }) => 
    isSidebarToggle ? '0.6rem' : '0.78rem 0.6rem'};
  cursor: pointer;
  
  :hover, :focus {
    background: #EDF0F5;
    color: #000000;
  }
`

const ItemIcon = styled('img')`
  padding: 0 0.5rem 0 1rem;
`

const ItemLabel= styled('span')<ItemLabelTypes>`
  display: none;

  @media (min-width: 780px) {
    display: ${({ isSidebarToggle }) => 
      isSidebarToggle ? 'block' : 'none'};
  }
`

// Component
export function SidebarItem(props: SidebarItemPropsTypes) {
  const { title, path, icon } = props;
  const { state } = useContext(ContextApp);
  const { sidebar } = state;

  return (
    <Item key={title} tabIndex={0}>
      <Link href={`/[name]`} as={`/${path}`}>
        <ItemLink isSidebarToggle={sidebar}>
          <ItemIcon src={icon} alt={title}>
          </ItemIcon>
          <ItemLabel
            isSidebarToggle={sidebar}
          >
            {title}
          </ItemLabel>
        </ItemLink>
      </Link>
    </Item>
  );
}