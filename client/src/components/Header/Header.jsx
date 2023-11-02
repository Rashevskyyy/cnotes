import React, {useEffect, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import {
    Search,
    SearchIconWrapper,
    StyledAppBar,
    StyledInputBase,
    StyledLanguageIcon,
    StyledSearchIcon,
    StyledSelect,
    StyledSelectChangeLanguage
} from './HeaderStyle';
import { fetchAllNotes, fetchNotesByUser } from '../../api/routes';
import { useHref, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {IconButton, MenuItem, Button, Box} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import {useTranslation} from 'react-i18next';

const tags = {
    Development: 'development',
    Design: 'design',
    Management: 'management',
};

const Header = () => {
    const href = useHref();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

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
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            applyFilter();
        }
    };

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tag = queryParams.get('tag');
        const title = queryParams.get('title');

        const payload = tag ? { category: 'tag', value: tag } : { category: 'title', value: title };

        if (href === "/notes") {
            dispatch(fetchNotesByUser(payload));
        } else if (href === "/publish") {
            dispatch(fetchAllNotes(payload));
        }
    }, [location.search, dispatch, href]);

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
        navigate(href);
    };

    return (
        <StyledAppBar position="static">
            <Toolbar>
                <StyledSelect
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    displayEmpty
                >
                    <MenuItem value={'title'}>{t('title')}</MenuItem>
                    <MenuItem value={'tag'}>{t('tag')}</MenuItem>
                </StyledSelect>
                {
                    selectedCategory === 'tag' && (
                        <StyledSelect
                            value={selectedTag}
                            onChange={handleTagChange}
                            displayEmpty
                            renderValue={(value) => t(tags[value] || 'selectTag')}
                        >
                            {Object.keys(tags).map(tagValue => (
                                <MenuItem key={tagValue} value={tagValue}>
                                    {t(tags[tagValue])}
                                </MenuItem>
                            ))}
                        </StyledSelect>
                    )
                }
                {
                    selectedCategory !== 'tag' ? (
                        <Search>
                            <StyledInputBase
                                placeholder={`${t('search')}...`}
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                inputProps={{"aria-label": "search"}}
                            />
                            <SearchIconWrapper>
                                <StyledSearchIcon />
                            </SearchIconWrapper>
                        </Search>
                    ) : null
                }
                <Button onClick={applyFilter} variant="contained" color="primary" sx={{ marginLeft: 1 }}>
                    {t('search')}
                </Button>
                {
                    (searchTerm || (selectedCategory === 'tag' && selectedTag)) && (
                        <IconButton onClick={resetFilter} size="small" sx={{ marginLeft: 1 }}>
                            <CloseIcon />
                        </IconButton>
                    )
                }
                <Box display="flex" alignItems="center" sx={{ marginLeft: 'auto' }}>
                    <StyledLanguageIcon />
                    <StyledSelectChangeLanguage
                        value={i18n.language}
                        onChange={changeLanguage}
                        displayEmpty
                    >
                        <MenuItem value="en">EN</MenuItem>
                        <MenuItem value="ua">UA</MenuItem>
                    </StyledSelectChangeLanguage>
                </Box>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Header;