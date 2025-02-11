import { Participant } from './room';

// Generated by https://quicktype.io
export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Movie {
    adult: boolean;
    backdrop_path: null | string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: null | string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface AddedMovie extends Movie {
    addedByUserId: string;
    swipes: { user: Participant; liked: boolean }[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface MovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: null;
    budget: number;
    genres?: GenresEntity[] | null;
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies?: ProductionCompaniesEntity[] | null;
    production_countries?: ProductionCountriesEntity[] | null;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages?: SpokenLanguagesEntity[] | null;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    videos: Videos;
    images: Images;
}
export interface GenresEntity {
    id: number;
    name: string;
}
export interface ProductionCompaniesEntity {
    id: number;
    logo_path?: string | null;
    name: string;
    origin_country: string;
}
export interface ProductionCountriesEntity {
    iso_3166_1: string;
    name: string;
}
export interface SpokenLanguagesEntity {
    english_name: string;
    iso_639_1: string;
    name: string;
}
export interface Videos {
    results?: ResultsEntity[] | null;
}
export interface ResultsEntity {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
}
export interface Images {
    backdrops?: BackdropsEntityOrPostersEntity[] | null;
    posters?: BackdropsEntityOrPostersEntity[] | null;
}
export interface BackdropsEntityOrPostersEntity {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1?: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
}
