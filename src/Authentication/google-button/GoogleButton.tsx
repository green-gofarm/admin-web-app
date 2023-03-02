import { MouseEventHandler } from 'react';
import "./google-button.scss";

interface IGoogleButton {
    text?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>
}

function GoogleButton({
    text,
    onClick,
}: IGoogleButton) {
    return (
        <div className="google">
            <button
                className="google__button"
                type="button"
                onClick={onClick}
            >
                <span className="google__icon"></span>
                <span className="google__text font-weight-semibold">{text}</span>
            </button>
        </div>
    )
}

export default GoogleButton;