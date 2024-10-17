import React from 'react';
import { X } from 'lucide-react';

interface TradeImageHandlerProps {
  pastedImage: string | null;
  onRemoveImage: () => void;
}

const TradeImageHandler: React.FC<TradeImageHandlerProps> = ({ pastedImage, onRemoveImage }) => {
  return pastedImage ? (
    <div>
      <img src={pastedImage} alt="Pasted" />
      <X onClick={onRemoveImage} />
    </div>
  ) : null;
}

export default TradeImageHandler;