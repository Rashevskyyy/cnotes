import React, {useEffect, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import {
    Search,
    SearchIconWrapper,
    StyledAppBar, StyledFormControl,
    StyledInputBase,
    StyledLanguageIcon,
    StyledSearchIcon,
    StyledSelect,
    StyledSelectChangeLanguage
} from './HeaderStyle';
import { fetchAllNotes, fetchNotesByUser } from '../../api/routes';
import { useHref, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {IconButton, MenuItem, Button, Box, Select, OutlinedInput, Chip, FormControl} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import {useTranslation} from 'react-i18next';

export const tags = {
    work: "work",
    personal: "personal",
    education: "education",
    hobbies: "hobbies",
    finance: "finance",
    technology: "technology",
    family: "family",
    travel: "travel",
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
    const [selectedTags, setSelectedTags] = useState([]);

    const applyFilter = () => {
        if (selectedCategory !== 'tag' && searchTerm.trim() !== "") {
            navigate(`${href}?${selectedCategory}=${searchTerm}`);
        } else if (selectedCategory === 'tag' && selectedTags.length > 0) {
            navigate(`${href}?tag=${selectedTags.join(",")}`);
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
        const tagString = queryParams.get('tag');
        const title = queryParams.get('title');

        const tagsArray = tagString ? tagString.split(",") : [];
        const payload = tagsArray.length > 0 ? { category: 'tag', value: tagsArray } : { category: 'title', value: title };

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

    const resetFilter = () => {
        setSearchTerm('');
        setSelectedTags([])
        navigate(href);
    };

    const handleTagChange = (event) => {
        setSelectedTags(event.target.value);
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
                        <StyledFormControl size="small">
                            <Select
                                labelId="tag-label"
                                multiple
                                value={selectedTags}
                                onChange={handleTagChange}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip
                                                key={value}
                                                label={t(`${value}`)}
                                                style={{background: '#C4AE78'}}
                                            />
                                        ))}
                                    </Box>
                                )}
                            >
                                {Object.keys(tags).map((category, index) => (
                                    <MenuItem key={index} value={category}>
                                        {t(`${category}`)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </StyledFormControl>
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
                    (searchTerm || (selectedCategory === 'tag' && selectedTags)) && (
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