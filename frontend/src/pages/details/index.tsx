import style from './style.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft as icon } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setupAPIClientTmdb } from '@/src/services/apiTmdb';
//import notFound from '../../../public/notFound.svg'
import React from "react";
import { setupAPIClient } from '@/src/services/api';

type MovieDetailsProps = {
    id: number;
    adult: boolean;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    title: string;
    vote_average: number;
    production_companies: string;
    runtime: number;
};

type MovieTrailerProps = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: string;
    published_at: string;
    id: string;
};

type CommentsProps = {
    id: string;
    name: string;
    comment: string;
};

export default function Details() {

    const [details, setDetails] = useState<MovieDetailsProps>({
        id: 0,
        adult: false,
        original_language: "",
        original_title: "",
        overview: "",
        release_date: "",
        poster_path: "",
        title: "",
        vote_average: 0,
        production_companies: "",
        runtime: 0,
    });

    const [comment, setComment] = useState<CommentsProps[]>([]);

    //const [trailer, setTrailer] = useState<MovieTrailerProps[]>([]);

    const router = useRouter();
    let id = parseInt(router.query.id as string);

    useEffect(() => {

        async function getDetailMovies(id?: any) {
            try {
                const key = process.env.NEXT_PUBLIC_API_KEY;
                const apiClient = setupAPIClientTmdb();
                const response = await apiClient.get(`/${id}?api_key=${key}&language=pt-br`);
                setDetails(response.data);
            } catch (error) {
                console.error(error);
                // error manipulation
            }
        }

        async function getMoviesTrailer(id?: any) {
            try {
                const key = process.env.NEXT_PUBLIC_API_KEY;
                const apiClient = setupAPIClientTmdb();
                const response = await apiClient.get(`/${id}/videos?api_key=${key}&language=en-US`);
                //setTrailer(response.data.results)
            } catch (error) {
                console.error(error);
                // error manipulation
            }
        }

        async function getCommentById(id?: any) {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/search/comment/id?idMovie=${id}`);
                setComment(response.data);
            } catch (error) {
                console.error(error);
                // error manipulation
            }
        }

        if (id) {
            getDetailMovies(id);
        }

        if (id) {
            getMoviesTrailer(id);
        }

        if (id) {
            getCommentById(id);
        }

    }, [id]);

    let dataStr = details.release_date
    let dataObj = new Date(dataStr);
    let dia = dataObj.getDate().toString().padStart(2, '0');
    let mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    let ano = dataObj.getFullYear().toString();
    let formatDate = dia + "-" + mes + "-" + ano;

    return (
        <>
            <Head>
                <title>Detalhes</title>
            </Head>

            <Link className={style.headerContent} href="/dashboard">
                <FontAwesomeIcon className={style.icon} icon={icon} />
            </Link>

            <main className={style.mainDetail}>
                <h1 className={style.title}>{details.title}</h1>
                <div className={style.mainRow}>
                    <div className={style.poster}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                            className={style.posterImg}
                            alt='poster'
                        />
                    </div>
                    <div className={style.detail}>
                        <div className="card-body">
                            <p className={style.cardsTitles}>
                                <strong className={style.titlesDetail}>Assessment: </strong>
                                <span className={style.resultDetails} id="avalicao">{details.vote_average}</span>
                            </p>

                            <p className={style.cardsTitles}>
                                <strong className={style.titlesDetail}>Language: </strong>
                                <span className={style.resultDetails} id="linguagem">{details.original_language}</span>
                            </p>

                            <p className={style.cardsTitles}>
                                <strong className={style.titlesDetail}>Launch: </strong>
                                <span className={style.resultDetails} id="data">{formatDate}</span>
                            </p>

                            <p className={style.cardsTitles}>
                                <strong className={style.titlesDetail}>Description: </strong>
                                <span className={style.resultDetails} id="descricao">{details.overview}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <div className={style.mainComment}>
                <h1 className={style.titleForm}>Comente algo sobre este conteúdo</h1>

                <form className={style.formComment}>
                    <p className={style.rowForm}>
                        <input
                            type="text"
                            id="nome_user"
                            placeholder="Seu nome"
                            className={style.inputForm}
                        />
                    </p>
                    <p className={style.rowForm}>
                        <textarea
                            id="comentario_user"
                            placeholder="Digite seu comentario"
                            className={style.textAreaForm}
                        />
                    </p>
                    <button
                        type="button"
                        className={style.btnForm}
                        id="botao_coment"
                    //onclick="{createdComment()}"
                    >
                        Enviar comentario
                    </button>
                </form>

                {comment.map((comment) => {
                    return (
                        <form action="" className={style.formResultComment}>
                            <div className={style.mainComment} key={comment.id}>
                                <p className={style.rowResultForm}>
                                    <h3 className={style.labelForm}>{comment.name}</h3>
                                </p>
                                <p className={style.rowResultForm}>
                                    <h3 className={style.labelForm}>{comment.comment}</h3>
                                </p>
                            </div>
                        </form>
                    );
                })}

            </div>


            {/*             <div className={style.carouselContainer}>
                <Carousel className={style.carousel}>
                    {trailer.map((item) => {
                        return (
                            <Carousel.Item key={item.id} className={style.carouselItem}>
                                <ReactPlayer
                                    url={`https://youtu.be/${item.key}}`}
                                    pip={true}
                                    controls={true}
                                    playing={true}
                                />
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </div> */}

        </>
    );
}
