import SearchIcon from '@mui/icons-material/Search'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
  Widget,
  Header,
  DivIcon,
  DivContent,
  Card,
  PremiumButton,
  Trend,
  ShowMore,
} from './styled'

const trends = [
  'Cúcuta',
  'Suaza',
  'Hollman Morris',
  'Poncho Zuleta',
]

export const Widgets = () => {
  return (
    <Widget>
      <Header>
        <DivIcon>
          <SearchIcon className="searchIcon" />
          <input placeholder="Search" />
        </DivIcon>
      </Header>

      <DivContent>
        <Card>
          <h2>Subscribe to Premium</h2>
          <p>
            Get rid of ads, see your analytics, boost your replies
            and unlock 20+ features.
          </p>
          <PremiumButton>Subscribe</PremiumButton>
        </Card>

        <Card>
          <h2>What&apos;s happening</h2>

          {trends.map((trend) => (
            <Trend key={trend}>
              <div>
                <span>Trending in Colombia</span>
                <strong>{trend}</strong>
              </div>

              <MoreHorizIcon />
            </Trend>
          ))}

          <ShowMore>Show more</ShowMore>
        </Card>
      </DivContent>
    </Widget>
  )
}
 