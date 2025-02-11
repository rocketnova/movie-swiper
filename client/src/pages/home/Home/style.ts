import styled from 'styled-components';
import Cinema from '../../../assets/movie-posters.jpg';
import { Button } from '../../../styles';

export const Container = styled.section`
    position: relative;
    z-index: 1;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        background-image: url(${Cinema});
        background-size: cover;
        background-position: top;
        background-repeat: no-repeat;
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: hsl(211deg 43% 13% / 90%);
        width: 100%;
        height: 100%;
        z-index: -1;
    }
`;

export const CTA = styled.section`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 1.5rem;
    min-height: 500px;

    @media (min-width: 450px) {
        margin: auto;
    }

    @media (min-width: 700px) {
        align-items: flex-start;
        min-height: 600px;
    }

    @media (min-width: 1500px) {
        padding: 6rem 1rem;
        min-height: 700px;
    }
`;

export const MainTitle = styled.h1`
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    max-width: 650px;
    letter-spacing: 1px;
    line-height: 1.4;
    color: #b3c4d8;
    margin: 0 0 4rem;
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
    position: relative;

    &::after {
        /* content: ''; */
        position: absolute;
        height: 2px;
        background: #cecece54;
        background: #aaaaaa;
        width: 100%;
        bottom: -0.5rem;
        left: 0;
    }

    @media (min-width: 700px) {
        font-size: 2.25rem;
    }
`;

export const Bold = styled.span`
    color: var(--white);
    font-weight: 700;
    font-size: 2.75rem;
    text-transform: none;
    line-height: 1.2;

    @media (min-width: 700px) {
        font-size: 3.5rem;
    }
`;

export const Subtitle = styled.h2`
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 500;
    color: #d8d8d8;
    margin-bottom: 1rem;
    letter-spacing: 2px;
    margin-right: auto;
    position: relative;
    text-align: center;
`;

export const BR = styled.br`
    display: inline;
    @media (min-width: 500px) {
        display: none;
    }
`;

export const GetStartedButton = styled(Button)`
    flex: 0;
    background: var(--blue-action);
    padding: 1rem 3rem;
    font-weight: 500;
    transition: background 100ms ease-in;
    width: 100%;
    margin: auto;

    &:hover {
        background: var(--blue-action-90);
    }
`;
