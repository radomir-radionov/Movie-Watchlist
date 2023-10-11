type TProps = {
  selected: boolean
  onClick: () => void
}

const Star = ({selected, onClick}: TProps) => <span onClick={onClick}>{selected ? '★' : '☆'}</span>

export default Star
