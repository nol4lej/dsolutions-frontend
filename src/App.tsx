import { Container, Navbar } from '@/components/common'
import { UserTable } from '@/components/Users';

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <UserTable />
      </Container>
    </>
  );
}

export default App;