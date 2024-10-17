import React from 'react';

interface TradeFormProps {
  currentTrade: Omit<Trade, 'id'>;
  onChange: (field: keyof Omit<Trade, 'id'>, value: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  error: string | null;
}

const TradeForm: React.FC<TradeFormProps> = ({ currentTrade, onChange, onSubmit, onCancel, error }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <input type="text" value={currentTrade.symbol} onChange={(e) => onChange('symbol', e.target.value)} />
      <select value={currentTrade.type} onChange={(e) => onChange('type', e.target.value as 'buy' | 'sell')}>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <input type="number" value={currentTrade.lotSize} onChange={(e) => onChange('lotSize', parseFloat(e.target.value))} />
      <input type="datetime-local" value={currentTrade.tradeDateTime} onChange={(e) => onChange('tradeDateTime', e.target.value)} />
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
      {error && <span>{error}</span>}
    </form>
  );
}

export default TradeForm;