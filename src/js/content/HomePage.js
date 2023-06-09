import "../../css/content/HomePage.css";

export default function HomePage() {
    return (
        <div id="homepage">
            <h1>
                Welcome to home page!
            </h1>
            <div id="homepage-content">
                The online bookstore is a project based on Java and the Spring Boot framework.
                There are 2 accounts with user and admin roles.
                As a user, you can browse books, add books to the cart, order them and edit your account details.
                As an administrator, you can add books to databases and view available users.

                <ul>
                    The application was created based on the following technologies:
                    <li>- Java</li>
                    <li>- Spring Boot</li>
                    <li>- Spring Security</li>
                    <li>- JPA (Hibernate)</li>
                    <li>- H2 database</li>
                    <li>- Redis</li>
                    <li>- RabbitMQ</li>
                    <li>- Liquibase</li>
                    <li>- AOP</li>
                </ul>
                <ul>
                    Some libraries used for this project:
                    <li>- Slf4j</li>
                    <li>- Lombok</li>
                    <li>- Swagger</li>
                    <li>- Passay</li>
                    <li>- Jwt</li>
                    <li>- Ehcache</li>
                    <li>- Json (dev.mccue)</li>
                </ul>
            </div>
        </div>
    );
}