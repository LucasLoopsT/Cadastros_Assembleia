import { Container } from "./style";

interface MemberProps {
  name: any;
  cargo: any;
  picture: any;
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
