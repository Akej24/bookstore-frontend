import "../../css/components/Header.css"

export default function Header({ content }) {
    return (
        <header>
            <h1 className="header-h1">
                <span className="header-span">
                    {content}
                </span>
            </h1>
        </header>
    )
}