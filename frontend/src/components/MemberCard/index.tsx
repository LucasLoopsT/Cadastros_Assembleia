import { Container, Photo, Text } from "./style";

interface MemberProps {
  name: string;
  cargo: string;
  picture?: string;
}

function MemberCard({ name, cargo, picture }: MemberProps) {
  const url = picture?.trim();
  return (
    <Container>
      <Photo>
        {url ? <img src={url} alt="" /> : <span>{name.slice(0, 2).toUpperCase()}</span>}
      </Photo>
      <Text>
        <h3>{name}</h3>
        <p>{cargo}</p>
      </Text>
    </Container>
  );
}

export default MemberCard;
