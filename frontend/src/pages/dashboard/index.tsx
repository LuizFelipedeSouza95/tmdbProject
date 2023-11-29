import { useContext } from 'react';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ButtonSearch } from '../../components/ui/Button'
import style from './style.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { setupAPIClientTmdbSearch } from '../../services/apiTmdb';
import { useState } from 'react';
import Head from 'next/head';

type MovieProps = {
    id: number;
    adult: boolean;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    title: string;
    vote_average: number;
}

export default function Dashboard() {

    const { singOut } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState('');
    const [searchResults, setSearchResults] = useState<MovieProps[]>([]);
    const [loading, setLoading] = useState(false);

    async function getMovies(search: string) {
        const key = process.env.NEXT_PUBLIC_API_KEY;
        const apiClient = setupAPIClientTmdbSearch();
        const response = await apiClient.get(`/movie?api_key=${key}&language=en-US&query=${search}&include_adult=false`);
        setSearchResults(response.data.results);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleButtonClick = async () => {
        setLoading(true);
        await getMovies(inputValue);
        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>Filmes e Series</title>
            </Head>

            <header className={style.headerContainer}>
                <div className={style.headerContent}>
                    <Link href="/dashboard">
                        <h1>Filmes e Series</h1>
                    </Link>
                    <div className={style.sessionSearch}>
                        <input
                            className={style.inputSearch}
                            placeholder='Pesquisar'
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleButtonClick();
                                }
                            }}
                        />
                        <ButtonSearch
                            type="submit"
                            loading={loading}
                            onClick={handleButtonClick}
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </ButtonSearch>
                    </div>
                    <nav className={style.menuNav}>
                        <button onClick={singOut}>
                            <FiLogOut color='#FFF' size={24} />
                        </button>
                    </nav>
                </div>
            </header>

            <main className={style.containerMain}>
                <section className={style.sectionMain}>
                    {searchResults.map(item => (
                        <div className={style.post} key={item.id}>
                            <section className={style.sectionPost}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    className={style.sessionImg}
                                    alt='poster'
                                />
                                {/* {item.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                        className={style.sessionImg}
                                        alt='poster'
                                    />
                                ) : (
                                    <img
                                        src={'/notFound.jpg'}
                                        className={style.imgNotFound}
                                        alt='Not Found'
                                    />
                                )} */}
                                <h6 className="card-title">{item.title}</h6>
                            </section>
                            <section className={style.sectionRodape}>
                                <h3 className="title p-1">classificação: {item.vote_average}</h3>
                                <Link href={`/details?id=${item.id}`}>
                                    <button>Detalhes</button>
                                </Link>
                            </section>
                        </div>
                    ))}
                </section>

            </main>
        </>
    )
}