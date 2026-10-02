import React from "react";
import { StoryBookReaderModal } from "./StoryBookReaderModal";

/**
 * JournalReaderModal - Backward-compatible wrapper around the high-end StoryBookReaderModal
 */
export function JournalReaderModal({ article, isOpen, onClose }) {
  return <StoryBookReaderModal article={article} isOpen={isOpen} onClose={onClose} />;
}

export default JournalReaderModal;
