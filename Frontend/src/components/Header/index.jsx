import React from "react";
import "./Header.css";
import styled from 'styled-components'

// const [buttonClicked, setButtonClicked] = useState(false);

// const handdleButtonClick = () => {
//     setButtonClicked(true);
// }

class Header extends React.Component{
    render(){
        return (
            <nav className="Nav">
                <div className="Nav-menus">
                <div className="Nav-brand">
                    {/* <a className="Nav-brand-logo" href="/"> */}
                    FreeSpace
                    {/* </a> */}
                </div>
                
                <Button onClick={alert(1)}>
                    Upload Post
                </Button>
                
                </div>
            </nav>
        );
    }   
}

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

export default Header;