export default function NavElement({ name, href }) {
    return (
        <a href={href} className="nav-href">
            <div className="nav-item">
                <span className="nav-span">
                    {name}
                </span>

            </div>
        </a>
    );
}