import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate()
  const data = JSON.parse(sessionStorage.getItem("user"))
  console.log(data);

  const handleLogout=()=>{
    sessionStorage.removeItem("user")
    navigate('/')
  }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">LOG</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <button onClick={handleLogout} className='ms-auto btn btn-danger'>Logout</button>
        </Container>
      </Navbar>
      <div className='log d-flex flex-column justify-content-center align-items-center' style={{height:"100vh"}}>
        <div className='d-flex align-items-center'>
          <h1 className='me-2 mb-0'>Hey {data.name.toUpperCase()}</h1>
          <img className='pic' src={data.picture} alt="" />
        </div>
        <h5 className='mt-1'>Welcome to Website</h5>
        <img className='img-fluid' src="https://cdni.iconscout.com/illustration/premium/thumb/online-registration-7964198-6381808.png?f=webp" alt="" />
      </div>
    </>
  )
}

export default Home