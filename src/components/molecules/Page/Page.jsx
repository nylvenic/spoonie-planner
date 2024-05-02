import Container from "../../atoms/Container/Container";
import './Page.css';

export default function Page({children, title}) {
    return <Container>
        <div className="page">
            <h2 className="heading">{title}</h2>
            {children}
        </div>
    </Container>
}