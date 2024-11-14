import { Container } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router/router';
import { connector } from './connector/connector';

function App() {
  const drawConnector = connector;
  return (
    <>
      <Container fluid className='h-max'>
        <RouterProvider router={appRouter} />
      </Container>
    </>
  )
}

export default App
