import styled from 'styled-components';
import { makeStyles, createStyles } from '@material-ui/core';

export const Container = styled.div`
    height: 100%;
`;

export const FormContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Button = styled.button`
    border-style: none;
`;

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
);