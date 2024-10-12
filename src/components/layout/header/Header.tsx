import styled from "styled-components";
import colors from "constants/colors";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <div className="logo-container">
        <img src="images/logo.svg" alt="logo" />
      </div>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.basic850};
  background-color: #fff;
  .logo-container {
    padding: 26px 80px;
  }
`;
