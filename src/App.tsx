import { styled } from 'styled-components';
import GlobalDialog from './components/GlobalDialog';
import './index.css';

function App() {
  return (
    <Wrapper>
      <h1>DIALOG EXAMPLE</h1>
      <GlobalDialog />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  max-width: 600px;
  min-height: 100vh;
  margin: auto;
  padding: 24px;
  background-color: white;
`;
