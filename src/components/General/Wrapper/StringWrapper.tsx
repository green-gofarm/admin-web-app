import { Box } from '@mui/material';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    text?: string;
}

const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
const phoneRegex = /^\d{10,}$/;
const linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

const isEmail = (text?: string) => {
    return !!text && emailRegex.test(text);
}
const isPhoneNumber = (text?: string) => {
    return !!text && phoneRegex.test(text);
}
const isLink = (text?: string): text is string => {
    return !!text && linkRegex.test(text);
}

const StringWrapper: React.FC<Props> = ({ text }) => {

    if (isEmail(text)) {
        return (
            <Link
                to={`mailto:${text}`}
                className='tag tag-rounded'
            >
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"
                >
                    <i className='fa fa-envelope'></i>
                    {text}
                </Box>
            </Link>
        );
    }

    if (isPhoneNumber(text)) {
        return (
            <Link
                to={`tel:${text}`}
                className='tag tag-rounded'
            >
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"
                >
                    <i className='fa fa-phone'></i>
                    {text}
                </Box>
            </Link>
        );
    }

    if (isLink(text)) {
        return (
            <Link
                to={text}
                className='tag tag-rounded'
                target="_blank"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    gap="8px"
                >
                    <i className='fa fa-link'></i>
                    {text}
                </Box>
            </Link>
        );
    }

    return text ? <>{text}</> : <></>;
}

export default memo(StringWrapper);