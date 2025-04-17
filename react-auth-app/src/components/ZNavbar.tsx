import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import useSWR from 'swr';
import type {UserResponse} from "../utils/types";
import {fetcher} from "../utils/axios";
import Nav from 'react-bootstrap/Nav';


function NavRight({ username }: { username: string | undefined }) {
  if (username == null) {
    return (
      <div>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
      </div>
    );
  }
  return (<Navbar.Text>
            Signed in as: <a href="/profile">{username}</a>
          </Navbar.Text>);
}


function ZNavbar() {
  const account = useSelector((state: RootState) => state.auth.account);
  const userId = account?.user?.id;
  const user = useSWR<UserResponse>(`/api/user/${userId}/`, fetcher);

  return (
    <div>
      <Navbar className="bg-blue-400">
        <Container>
          <Navbar.Brand href="/">Squaddie</Navbar.Brand>
          <Navbar.Toggle />
          <Nav.Link href="/newSquad" hidden={user.data?.username == null}>New Squad</Nav.Link>
          <Navbar.Collapse className="justify-content-end">
            <NavRight 
              username={user.data?.username}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default ZNavbar;
