import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface TradeListProps {
  trades: Trade[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TradeList: React.FC<TradeListProps> = ({ trades, onEdit, onDelete }) => {
  return (
    <div>
      {trades.map(trade => (
        <div key={trade.id} className="trade-item">
          <span>{trade.symbol}</span>
          {/* Add other trade details */}
          <Pencil onClick={() => onEdit(trade.id)} />
          <Trash2 onClick={() => onDelete(trade.id)} />
        </div>
      ))}
    </div>
  );
}

export default TradeList;