import React, {useEffect, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import { Search, SearchIconWrapper, StyledAppBar, StyledInputBase, StyledSearchIcon, StyledSelect } from './HeaderStyle';
import { fetchAllNotes, fetchNotesByUser } from '../../api/routes';
import { useHref, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IconButton, MenuItem, Button } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
    const href = useHref();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);
    const [searchTerm, setSearchTerm] = useState(queryParams.get('title') || '');
    const [selectedCategory, setSelectedCategory] = useState("title");
    const [selectedTag, setSelectedTag] = useState("");

    const applyFilter = () => {
        if (selectedCategory !== 'tag' && searchTerm.trim() !== "") {
            navigate(`${href}?${selectedCategory}=${searchTerm}`);
        } else if (selectedCategory === 'tag' && selectedTag) {
            navigate(`${href}?tag=${selectedTag}`);
        } else {
            navigate(href);
        }

        if (selectedCategory === 'tag') {
            if (href === "/notes") {
                dispatch(fetchNotesByUser({value: selectedTag, category: 'tag'}));
            }
            if (href === "/publish") {
                dispatch(fetchAllNotes({value: selectedTag, category: 'tag'}));
            }
        } else {
            if (href === "/notes") {
                dispatch(fetchNotesByUser({value: searchTerm, category: 'title'}));
            }
            if (href === "/publish") {
                dispatch(fetchAllNotes({value: searchTerm, category: 'title'}));
            }
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSearchTerm('');
    };

    const handleTagChange = (event) => {
        setSelectedTag(event.target.value);
    };

    const resetFilter = () => {
        setSearchTerm('');
        setSelectedTag('');
        if (href === "/notes") {
            dispatch(fetchNotesByUser(''));
        }
        if (href === "/publish") {
            dispatch(fetchAllNotes(''));
        }
        navigate(href);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tag = queryParams.get('tag');
        const title = queryParams.get('title');

        if (tag) {
            dispatch(fetchNotesByUser({ category: 'tag', value: tag }));
        } else if (title) {
            dispatch(fetchNotesByUser({ category: 'title', value: title }));
        }

    }, []);


    return (
        <StyledAppBar position="static">
            <Toolbar>
                <StyledSelect
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    displayEmpty
                >
                    <MenuItem value={'title'}>Название заметки</MenuItem>
                    <MenuItem value={'tag'}>Категория</MenuItem>
                </StyledSelect>
                {
                    selectedCategory === 'tag' && (
                        <StyledSelect
                            value={selectedTag}
                            onChange={handleTagChange}
                            displayEmpty
                            renderValue={(value) => value || "Выберите тег"}
                        >
                            <MenuItem value={'Development'}>Development</MenuItem>
                            <MenuItem value={'Design'}>Design</MenuItem>
                            <MenuItem value={'Management'}>Management</MenuItem>
                        </StyledSelect>
                    )
                }
                {
                    selectedCategory !== 'tag' ? (
                        <Search>
                            <StyledInputBase
                                placeholder="Поиск…"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                inputProps={{"aria-label": "search"}}
                            />
                            <SearchIconWrapper>
                                <StyledSearchIcon />
                            </SearchIconWrapper>
                        </Search>
                    ) : null
                }
                <Button onClick={applyFilter} variant="contained" color="primary" sx={{ marginLeft: 1 }}>
                    Поиск
                </Button>
                {
                    (searchTerm || (selectedCategory === 'tag' && selectedTag)) && (
                        <IconButton onClick={resetFilter} size="small" sx={{ marginLeft: 1 }}>
                            <CloseIcon />
                        </IconButton>
                    )
                }
            </Toolbar>
        </StyledAppBar>
    );
};

export default Header;