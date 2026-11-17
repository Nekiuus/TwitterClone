import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {db, toggleFollow} from '../../Config';
import { Container } from './styled';
import { collection, onSnapshot } from 'firebase/firestore';
import avatar from '../../assets/avatar.png';
import type { User } from 'firebase/auth';
import type { ProfileAccount } from '../AuthenticatedApp'
import { useUserSearch } from '../../hooks/useUserSearch'
import { newsByCategory, type NewsCategory } from './news'

const tabs = ['Explore', 'Trending', 'News', 'Sports', 'Entertainment'] as const
type ExploreTab = typeof tabs[number]

export const Explore = ({ user, onOpenProfile }: { user: User | null; onOpenProfile: (profile: ProfileAccount) => void }) => {
    const { term: terms, results, loading, error: searchError, search } = useUserSearch(user)
    const [activeTab, setActiveTab] = useState<ExploreTab>('Explore')
    const [following, setFollowing] = useState<Set<string>>(new Set());
    const [busyUid, setBusyUid] = useState<string | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user?.uid) return;

  return onSnapshot(
    collection(db, 'users', user.uid, 'following'),
    (snapshot) => {
        setFollowing(new Set(snapshot.docs.map((item) => item.id)));
    },
    (snapshotError) => {
        console.log('Error fetching following list:', snapshotError);
        setError('Error fetching following list');
    }
  );
}, [user?.uid]);

async function handleFollow(targetUid: string) {
    if (!user?.uid) return;
    setBusyUid(targetUid);
    setError('');

    try {
        await toggleFollow(user.uid, targetUid);
    } catch (followError) {
        console.error('Error following/unfollowing user:', followError);
        setError('Error following/unfollowing user');
    } finally {
        setBusyUid(null);
    };
}

const stories = activeTab === 'Explore'
  ? [newsByCategory.Trending[0], newsByCategory.News[0], newsByCategory.Sports[0], newsByCategory.Entertainment[0]]
  : newsByCategory[activeTab as NewsCategory]

return (
    <Container>
      <header className="explore-search">
        <label className="search-box">
          <SearchIcon />
          <input
            value={terms}
            onChange={(event) => {
              search(event.target.value)
              setError('')
            }}
            placeholder="Search users"
            aria-label="Buscar usuarios"
          />
        </label>
        <button type="button" aria-label="Settings">
          <SettingsOutlinedIcon />
        </button>
      </header>

      <nav className="explore-tabs">
        {tabs.map((tab) => (
          <button key={tab} className={activeTab === tab ? 'active' : ''} type="button" onClick={() => setActiveTab(tab)}>{tab}</button>
        ))}
      </nav>

      <section className="news-section">
        <h2>{activeTab === 'Explore' ? 'Latest headlines' : activeTab}</h2>
        <p className="news-updated">Selección actualizada el 15 de noviembre de 2026</p>
        {stories.map((item) => (
          <article className="news-card" key={item.title}>
            <a href={item.url} target="_blank" rel="noreferrer">
              <span className="news-meta">{item.source} · {new Date(`${item.date}T12:00:00`).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}</span>
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
              <span className="news-link">Leer noticia ↗</span>
            </a>
          </article>
        ))}
      </section>

      <section className="results-section">
        <h2>Find people</h2>

        {!terms.trim() && <p>Busca por nombre de usuario, por ejemplo: test2.</p>}
        {loading && <p>Buscando...</p>}
        {(searchError || error) && <p className="error-message" role="alert">{searchError || error}</p>}

        {!loading && terms.trim() && results.length === 0 && !searchError && !error && (
          <p>No se encontraron usuarios.</p>
        )}

        {results.map((person) => {
          const username = person.username || person.email?.split("@")[0] || "user";
          const displayName =
            person.displayName && person.displayName !== person.email
              ? person.displayName
              : username;
          const isFollowing = following.has(person.uid);

          return (
            <article className="user-result" key={person.uid}>
              <button className="profile-link" type="button" onClick={() => onOpenProfile(person)} aria-label={`Open ${displayName}'s profile`}>
              <img
                src={person.customPhotoURL || person.photoURL || avatar}
                alt=""
                onError={(event) => {
                  event.currentTarget.src = avatar;
                }}
              />
              <div className="user-details">
                <strong>{displayName}</strong>
                <span>@{username}</span>
              </div>
              </button>
              <button
                type="button"
                disabled={busyUid === person.uid}
                onClick={() => handleFollow(person.uid)}
              >
                {busyUid === person.uid
                  ? "..."
                  : isFollowing
                    ? "Following"
                    : "Follow"}
              </button>
            </article>
          );
        })}
      </section>
    </Container>
  );
};