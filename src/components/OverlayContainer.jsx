import { useDndContext } from "@dnd-kit/core";

import { useDnD } from "../hooks/useDnD";

import OverlayBookmark from "./OverlayBookmark";
import OverlayFolder from "./OverlayFolder";

export default function({ activeBookmark, activeFolder, overlayColor }) {
  const { active } = useDndContext();
  const { itemData } = useDnD();

  const dragItem = active && itemData(active.id);

  if (dragItem && dragItem.type === 'bookmark') {
    return <OverlayBookmark title={activeBookmark.title} overlayColor={overlayColor} />;
  }

  if (dragItem && dragItem.type === 'folder') {
    return <OverlayFolder name={activeFolder.name} />;
  }
}