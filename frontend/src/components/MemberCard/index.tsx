import { Container } from "./style";

interface MemberProps {
  name: string;
  cargo: string;
  picture: string;
  onClick?: any;
}

function MemberCard({ name, cargo, picture, onClick }: MemberProps) {
  return (
    <Container onClick={onClick}>
      <div className={picture}></div>
      <h3>{name}</h3>
      <p>{cargo}</p>
    </Container>
  );
}

export default MemberCard;
