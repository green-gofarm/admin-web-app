
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useRef, useState } from 'react';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';
import { Box, CircularProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import useDelayLoading from '../../../../../../hooks/useDelayLoading';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import EscapeWrapper from '../../../../../General/Wrapper/EscapeWrapper';


const searchUrl = "https://nominatim.openstreetmap.org/search?";


async function searchApi(searchText: string) {
    const params = {
        q: searchText,
        format: "json",
        addressdetails: "1",
    };

    const paramUrl = new URLSearchParams(params).toString();
    const url = searchUrl + paramUrl;

    const response = await fetch(url);
    return await response.json();
}


interface SearchLocationProps {
    onSelect: (position: any) => void
}

function SearchLocation({ onSelect }: SearchLocationProps) {

    const [searchText, setSearchText] = useState<string>("");
    const [searchItems, setSearchItems] = useState<any[]>([])
    const [loading, setLoading] = useState(false);
    const delay = useDelayLoading(loading);

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const response = await searchApi(searchText);
            if (isAvailableArray(response)) {
                setSearchItems(response);
            } else {
                setSearchItems([]);
            }
        } catch (error) {
            console.log(error);
            setSearchItems([]);
        }

        setLoading(false);
    }

    const timer: any = useRef();
    const handleOnChange = (value?: string) => {
        setSearchText(value ?? "");

        if (!searchText) {
            setSearchItems([]);
            return;
        }

        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(handleSubmit, 500);
    }

    return (
        <EscapeWrapper
            onEscape={() => {
                setSearchText("");
                setSearchItems([]);
            }}
        >
            <Box>
                <Paper
                    component="div"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50vw" }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        value={searchText}
                        onChange={(e) => handleOnChange(e.target.value)}
                        placeholder="Tìm kiếm"
                        inputProps={{ 'aria-label': 'search maps' }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                        onFocus={() => handleSubmit()}
                    />
                    {searchText
                        ? <IconButton
                            type="button"
                            sx={{ p: '10px' }}
                            aria-label="search"
                            onClick={() => {
                                setSearchText("");
                                setSearchItems([]);
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        : null
                    }
                    <IconButton
                        type="button"
                        sx={{ p: '10px' }}
                        aria-label="search"
                        onClick={handleSubmit}
                    >
                        {delay
                            ? <CircularProgress size={16} thickness={4} />
                            : <SearchIcon />
                        }

                    </IconButton>
                </Paper>
                {isAvailableArray(searchItems) || (searchText && !delay)
                    ? <Paper
                        sx={{
                            p: '2px 4px',
                            width: "50vw",
                            marginTop: "4px"
                        }}
                    >
                        <List
                            sx={{
                                maxHeight: "400px",
                                overflow: "auto"
                            }}
                        >
                            {searchItems.map((item, index) =>
                                <ListItem key={index}>
                                    <ListItemButton onClick={() => {
                                        onSelect(item);
                                        setSearchItems([]);
                                    }}>
                                        <ListItemIcon>
                                            <LocationOnIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={item.display_name} />
                                    </ListItemButton>
                                </ListItem>
                            )}
                            {searchItems.length < 1 && !delay
                                ? <Box component="i" padding="8px">Không tìm thấy</Box>
                                : null
                            }
                        </List>
                    </Paper>
                    : null
                }
            </Box>
        </EscapeWrapper>
    )
}

export default SearchLocation