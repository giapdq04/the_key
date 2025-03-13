import {
    faCircleXmark,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import styles from './Search.module.scss';
import SearchResult from './SearchResult';
import useClickOutside from '../../hooks/useClickOutside';

const cx = classNames.bind(styles);

const Search = () => {
    const [showResult, setShowResult] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [placeholder, setPlaceholder] = useState('Tìm kiếm khóa học, bài viết, video...');
    const searchRef = useRef(null);

    const handleChange = (value) => {
        setSearchValue(value);
    };

    const handleDeleteAllSearch = () => {
        setSearchValue('');
    };

    // Kiểm tra kích thước màn hình để thay đổi placeholder
    useEffect(() => {
        const updatePlaceholder = () => {
            if (window.innerWidth <= 375) {
                setPlaceholder('Tìm...');
            } else if (window.innerWidth <= 480) {
                setPlaceholder('Tìm kiếm...');
            } else {
                setPlaceholder('Tìm kiếm khóa học, bài viết, video...');
            }
        };

        // Gọi hàm khi load và khi resize
        updatePlaceholder();
        window.addEventListener('resize', updatePlaceholder);

        // Cleanup listener khi component unmount
        return () => window.removeEventListener('resize', updatePlaceholder);
    }, []);

    useClickOutside(searchRef, () => setShowResult(false));

    return (
        <div className={cx('search-wrapper')} ref={searchRef}>
            <div className={cx('search')}>
                <div className={cx('search-icon')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                    value={searchValue}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={placeholder}
                    spellCheck={false}
                    onFocus={() => setShowResult(true)}
                />
                {searchValue.length > 0 && (
                    <button onClick={() => handleDeleteAllSearch()} className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
            </div>
            {showResult && <SearchResult />}
        </div>
    );
};

export default Search;
