import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const FarmstayImageBox = () => {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const images = [
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
        "https://random.imagecdn.app/800/600",
    ];

    const handleImageClick = (index: number) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    return (
        <>
            {images.map((image, index) => (
                <li className="col-xl-3 col-md-4 col-sm-4" key={index}>
                    <img
                        src={image}
                        alt={`media${index + 1}`}
                        onClick={() => handleImageClick(index)}
                        className="img-responsive br-5"
                    />
                </li>
            ))}

            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                />
            )}
        </>
    );
};

export default FarmstayImageBox;
