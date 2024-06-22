
export const MarkerType =  {
  Triangle : 'triangle',
  Rectangle : 'rectangle',
  Circle : 'circle',
  Hexagon : 'hexagon',
}

export const BlockType =  {
  Enum : 'enum',
  Table : 'table'
}

export const Block =  {
  type: BlockType,
}

export const BlockData =  {
  type: BlockType,
};

export const Connection =  {
  marker: MarkerType // Specify the marker types
}



export const LegendItemProps =  {
  marker: MarkerType
}

export const EditorTypeEnum =  {
  ROW : 'row',
  BLOCK : 'block'
}


export const EditorProps =  { close: () => {} }

export const UMLEditorProps =  {
  connections: Connection
}