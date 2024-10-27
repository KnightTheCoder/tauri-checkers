interface PositionType {
  x: number;
  y: number;
}

interface BoardElementType {
  is_background: boolean;
  player: string; // empty=none, otherwise white or black
  position: PositionType;
}
