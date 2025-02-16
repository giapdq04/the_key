import { forwardRef, useState } from "react"
import image from '../../assets/images';
import styles from './Image.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types'

const Image = forwardRef(({ src, alt, className, errorImage = '', ...props }, ref) => {
    const [fallback, setFallback] = useState(errorImage);

    const handleError = () => {
        setFallback(image.noImage);
    }
    return (
        <img className={classNames(styles.wrapper, className)} ref={ref} src={fallback || src} alt={alt} {...props} onError={handleError} />
    )
})

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    errorImage: PropTypes.string
}

export default Image;
