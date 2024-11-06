import { Container } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router/router';

function App() {

  return (
    <>
      <Container fluid>
        <RouterProvider router={appRouter} />
      </Container>
    </>
  )
}

export default App
