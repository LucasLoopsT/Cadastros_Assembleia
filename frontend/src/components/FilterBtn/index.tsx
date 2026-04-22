import { Container } from "./style";

interface FilterBtnProps {
  name: string;
  active?: boolean;
  onClick: () => void;
}

function FilterBtn({ name, active, onClick }: FilterBtnProps) {
  return (
    <Container>
      <button type="button" data-active={active ? "true" : "false"} onClick={onClick}>
        {name}
      </button>
    </Container>
  );
}

export default FilterBtn;
