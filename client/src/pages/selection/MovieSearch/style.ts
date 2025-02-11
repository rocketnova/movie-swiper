import Select from 'react-select';
import styled from 'styled-components';

export const FormField = styled.div<{ show: boolean }>`
    display: ${(props) => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    margin-bottom: 1rem;

    label {
        margin-bottom: 1rem;
    }

    input {
        padding: 0.5rem;
        border-radius: 4px;
    }

    &:last-of-type {
        margin-bottom: 2rem;
    }
`;

export const StyledSelect = styled(Select)`
    z-index: 4;
`;

export const colorStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: 'white', color: 'var(--blue-dark-bg)' }),
    option: (styles: { [x: string]: any }, { data, isDisabled, isFocused, isSelected }: any) => {
        return {
            ...styles,
            backgroundColor: 'white',
            color: 'var(--blue-dark-bg)',
            cursor: isDisabled ? 'not-allowed' : 'default',
        };
    },
    multiValue: (styles: any, { data }: any) => {
        return {
            ...styles,
            backgroundColor: 'white',
        };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
        ...styles,
        color: 'white',
        backgroundColor: 'var(--blue-dark-bg)',
        padding: '4px 8px',
        borderRadius: '4px',
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
        ...styles,
        color: data.color,
        ':hover': {
            backgroundColor: 'white',
            color: 'var(--blue-dark-bg)',
        },
    }),
};
