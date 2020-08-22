import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  
  openCreateForm :()=> void;
}

export const NavBar : React.FC<IProps> = ({openCreateForm}) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header >
          <img src="/assets/logo.png" alt="logo" style={{marginRight:10}} />
          Reactivities
          </Menu.Item> 
        <Menu.Item name="Activities" />
        <Menu.Item >
         <Button positive onClick={openCreateForm} content='Create Activity' />
          </Menu.Item>
      </Container>
    </Menu>
  );
};
export default NavBar;
