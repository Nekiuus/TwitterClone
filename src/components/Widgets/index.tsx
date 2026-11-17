import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import CloseIcon from '@mui/icons-material/Close'
import type { User } from 'firebase/auth'
import avatar from '../../assets/avatar.png'
import type { ProfileAccount } from '../AuthenticatedApp'
import { useUserSearch } from '../../hooks/useUserSearch'
import { Widget, Header, DivIcon, DivContent, Card, PremiumButton, Trend, ShowMore, SubscribeOverlay, SubscribeDialog, SearchResults } from './styled'

const trends = [
  'Cúcuta',
  'Suaza',
  'Hollman Morris',
  'Poncho Zuleta',
]

export const Widgets = ({ user, onOpenProfile }: { user: User | null; onOpenProfile: (profile: ProfileAccount) => void }) => {
  const [showPremiumInfo, setShowPremiumInfo] = useState(false)
  const { term, results, loading, error, search } = useUserSearch(user)

  return (
    <Widget>
      <Header>
        <DivIcon>
          <SearchIcon className="searchIcon" />
          <input
            value={term}
            onChange={(event) => search(event.target.value)}
            placeholder="Search users"
            aria-label="Search users"
          />
        </DivIcon>
        {term.trim() && (
          <SearchResults>
            {loading && <p>Searching...</p>}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && !results.length && <p>No users found.</p>}
            {results.map((person) => {
              const username = (person.username || person.email?.split('@')[0] || 'user').replace(/^@/, '')
              const name = person.displayName && person.displayName !== person.email ? person.displayName : username
              return (
                <button key={person.uid} type="button" onClick={() => { search(''); onOpenProfile(person) }}>
                  <img src={person.customPhotoURL || person.photoURL || avatar} alt="" onError={(event) => { event.currentTarget.src = avatar }} />
                  <span><strong>{name}</strong><small>@{username}</small></span>
                </button>
              )
            })}
          </SearchResults>
        )}
      </Header>

      <DivContent>
        <Card>
          <h2>Subscribe to Premium</h2>
          <p>
            Get rid of ads, see your analytics, boost your replies
            and unlock 20+ features.
          </p>
          <PremiumButton type="button" onClick={() => setShowPremiumInfo(true)}>Subscribe</PremiumButton>
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
      {showPremiumInfo && (
        <SubscribeOverlay onClick={() => setShowPremiumInfo(false)}>
          <SubscribeDialog role="dialog" aria-modal="true" aria-labelledby="premium-title" onClick={(event) => event.stopPropagation()}>
            <header>
              <h2 id="premium-title">Starling Premium</h2>
              <button type="button" onClick={() => setShowPremiumInfo(false)} aria-label="Close"><CloseIcon /></button>
            </header>
            <p>Upgrade your experience with extra tools for your account.</p>
            <ul>
              <li>Ad-free browsing</li>
              <li>Post analytics</li>
              <li>More visibility for your replies</li>
              <li>Access to 20+ additional features</li>
            </ul>
            <button className="dismiss" type="button" onClick={() => setShowPremiumInfo(false)}>Got it</button>
          </SubscribeDialog>
        </SubscribeOverlay>
      )}
    </Widget>
  )
}
 