import { Container } from "./style.tsx";

export default function Footer() {
  return (
    <Container>
      <p>
        Assembleia de Deus – Cubatão © {new Date().getFullYear()}
      </p>
    </Container>
  );
}