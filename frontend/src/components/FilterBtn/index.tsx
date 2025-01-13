import { Container } from "./style";

interface FilterBtnProps {
  name: string;
  className?: string;
  onClick: any;
}

function FilterBtn({ name, className, onClick }: FilterBtnProps) {
  return (
    <Container>
      <button id={name} className={className} onClick={onClick}>
        {name}
      </button>
    </Container>
  );
}

export default FilterBtn;
