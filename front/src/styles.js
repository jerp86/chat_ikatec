import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  max-height: 500px;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  background: #eee;
  padding: 30px;
  margin: 20px auto;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    svg {
      margin-right: 10px;
    }
  }

  label {
    font-size: 20px;
  }
`;
