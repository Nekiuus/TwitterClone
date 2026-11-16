import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {db, toggleFollow} from '../../Config';
import { Container } from './styled';
import { collection, onSnapshot, endAt, limit, orderBy, query, startAt } from 'firebase/firestore';
import avatar from '../../assets/avatar.png';
import type { User } from 'firebase/auth';

interface SearchResult {
    uid: string;
    username?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
}

const news = [
    {
        title: "Nvidea CEO cheated on his wife with two baddies",
        detail: "Tecnology · Today",
        image: "https://static.toiimg.com/thumb/msid-135698868,imgsize-74958,width-400,height-225,resizemode-4/135698868.jpg"
    },
    {
        title: "Companies increase their investment in data centers",
        detail: "Tecnology · Today",
        image: "https://nevadanewsgroup.media.clients.ellingtoncms.com/img/photos/2025/07/30/NV1_Rendering_Vantage_Data_Centers_t670.jpg?b3f6a5d7692ccc373d56e40cf708e3fa67d9af9d"
    },
    {
        title: "Merchants are attending to the new trends in e-commerce",
        detail: "Business · Today",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTiPLjcTivPuv0piQ2DPfK9LDwuINMbPD23c-WEgWXmFRkAt3kG_uig722&s=10" 
    },
]


export const Explore = ({ user }: { user: User | null }) => {
    const [terms, setTerms] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [following, setFollowing] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(false);
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

useEffect(() => {
    const usernameKey = terms.trim().replace(/^@/, '').toLowerCase();
    if (!usernameKey || !user?.uid) return;

    const usersQuery = query(
        collection(db, 'users'),
        orderBy('usernameKey'),
        startAt(usernameKey),
        endAt(usernameKey + '\uf8ff'),
        limit(10)
    );

    return onSnapshot(
        usersQuery,
        (snapshot) => {
            setResults(
                snapshot.docs
                    .filter((item) => item.id !== user.uid)
                    .map((item) => ({ ...item.data(), uid: item.id }) as SearchResult)
            );
            setLoading(false);
        },
        (snapshotError) => {
            console.error('Unable to search users:', snapshotError);
            setError('Unable to search users');
            setLoading(false);
        }
    );
}, [terms, user?.uid]);

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

return (
    <Container>
      <header className="explore-search">
        <label className="search-box">
          <SearchIcon />
          <input
            value={terms}
            onChange={(event) => {
              const value = event.target.value;
              setTerms(value);

              if (!value.trim()) {
                setResults([]);
                setLoading(false);
                setError('');
              } else {
                setLoading(true);
                setError('');
              }
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
        <button className="active" type="button">Explore</button>
        <button type="button">Trending</button>
        <button type="button">News</button>
        <button type="button">Sports</button>
        <button type="button">Entertainment</button>
      </nav>

      <section className="news-section">
        <h2>Today&apos;s News</h2>

        {news.map((item) => (
          <article className="news-card" key={item.title}>
            <div>
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </div>
            <img className="news-image" src={item.image} alt={item.title} />
          </article>
        ))}
      </section>

      <section className="results-section">
        <h2>Find people</h2>

        {!terms.trim() && <p>Busca por nombre de usuario, por ejemplo: test2.</p>}
        {loading && <p>Buscando...</p>}
        {error && <p className="error-message" role="alert">{error}</p>}

        {!loading && terms.trim() && results.length === 0 && !error && (
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
              <img
                src={person.photoURL || avatar}
                alt=""
                onError={(event) => {
                  event.currentTarget.src = avatar;
                }}
              />
              <div className="user-details">
                <strong>{displayName}</strong>
                <span>@{username}</span>
              </div>
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