import SearchIcon from '@mui/icons-material/Search'
import { Container, DivIcon, Header } from './styled'


export const Widgets = () => {
  return (
    <Container>
      <Header>
        <DivIcon>
          <SearchIcon className="searchIcon" />
          <input placeholder="Buscar en twitter colone" />
        </DivIcon>
      </Header>

    </Container>
  )
}
 