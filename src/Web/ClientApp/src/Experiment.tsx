import React, { useState, useCallback, useRef, FC } from "react"
import { useDrag, useDrop, DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';

const DND_GROUP = "list"

interface DragItem {
  type: string
  index: number
}

interface ListProps {
  index: number
  text: string
  swapList: (sourceIndex: number, targetIndex: number) => void
}

const List: FC<ListProps> = ({ index, text, swapList }) => {
  const ref = useRef<HTMLLIElement>(null)
  const [, drop] = useDrop({
    accept: DND_GROUP,
    drop(item: DragItem) {
      console.log('drop function is called')
      if (!ref.current || item.index === index) {
        return
      }
      swapList(item.index, index)
    }
  })
  const [, drag] = useDrag({
    type: DND_GROUP,
    item: { type: DND_GROUP, index: index },
  })
  drag(drop(ref));
  return <li ref={ref}>{text}</li>
}

const ListView = () => {
  const [list, setList] = useState(["foo", "bar", "baz", "hoge", "huga"])
  const swapList = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      [list[targetIndex], list[sourceIndex]] = [list[sourceIndex], list[targetIndex]]
      setList(list.splice(0))
      console.log('call back is called')
    },
    [list]
  )
  return (
    <ul>
      {list.map((text, index) => (
        <List key={index} text={text} index={index} swapList={swapList} />
      ))}
    </ul>
  )
}

/**
 *
 * @returns
 */
export const Experiment: FC = () : JSX.Element => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ListView />
    </DndProvider>
  )
}