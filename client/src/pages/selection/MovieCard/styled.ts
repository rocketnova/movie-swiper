import styled from 'styled-components';
import PosterUnavailable from '../../../assets/poster_unavailable.png';

export const Card = styled.button<{ imageUrl: string | null }>`
    background: linear-gradient(to top, hsla(0, 0%, 0%, 0.25) 0%, hsla(0, 0%, 0%, 0) 100%),
        url(${(props) => (props.imageUrl ? props.imageUrl : PosterUnavailable)});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform ease-in 100ms;

    &:focus {
        transform: scale(1.01);
        outline: none;
    }
`;

export const Title = styled.h3`
    width: 100%;
    padding: 1rem;
    margin-top: auto;
    font-weight: 500;
    text-align: center;
    line-height: 1.3;
    background: #00000038;
    background: linear-gradient(180deg, rgba(247, 245, 252, 0) -10%, rgba(0, 0, 0, 1) 100%);
`;
