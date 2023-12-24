import { useDndContext } from "@dnd-kit/core";

import { useDragAndDrop } from "../hooks/useDragAndDrop";

import OverlayBookmark from "./OverlayBookmark";
import OverlayFolder from "./OverlayFolder";

export default function OverlayContainer({ activeBookmark, activeFolder, overlayColor }) {
  const { active } = useDndContext();
  const { itemData } = useDragAndDrop();

  const dragItem = active && itemData(active.id);

  if (dragItem && dragItem.type === 'bookmark') {
    return <OverlayBookmark title={activeBookmark.title} overlayColor={overlayColor} />;
  }

  if (dragItem && dragItem.type === 'folder') {
    return <OverlayFolder name={activeFolder.name} />;
  }
}