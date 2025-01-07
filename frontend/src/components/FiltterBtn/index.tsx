import { Container } from "./style";

interface FillterBtnProps {
  name: string;
  onClick: any;
}

function FillterBtn({ name, onClick }: FillterBtnProps) {
  return (
    <Container>
      <button id={name} onClick={onClick}>
        {name}
      </button>
    </Container>
  );
}

export default FillterBtn;
