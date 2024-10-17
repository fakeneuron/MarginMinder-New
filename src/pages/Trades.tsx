import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import { Pencil, Trash2, X } from 'lucide-react'
import { handleImagePaste } from '../utils/imageHandling'

interface Trade {
  id: number
  symbol: string
  type: 'buy' | 'sell'
  lotSize: number
  price: number
  stopLoss: number | null
  takeProfit: number | null
  tradeDateTime: string
  imageUrl: string | null
  note: string
}

const Trades: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([])
  const [currentTrade, setCurrentTrade] = useState<Omit<Trade, 'id'>>({
    symbol: '',
    type: 'buy',
    lotSize: 0,
    price: 0,
    stopLoss: null,
    takeProfit: null,
    tradeDateTime: new Date().toISOString().slice(0, 16),
    imageUrl: null,
    note: '',
  })
  const [editingTradeId, setEditingTradeId] = useState<number | null>(null)
  const [pastedImage, setPastedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const noteRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    fetchTrades()
  }, [])

  const fetchTrades = async () => {
    try {
      const { data, error } = await supabase.from('trades').select('*')
      if (error) throw error
      setTrades(data || [])
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user logged in')

      const tradeData = {
        ...currentTrade,
        imageUrl: pastedImage,
        user_id: user.id,
      }

      if (editingTradeId !== null) {
        const { error } = await supabase
          .from('trades')
          .update(tradeData)
          .eq('id', editingTradeId)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('trades')
          .insert([tradeData])
        if (error) throw error
      }

      resetForm()
      fetchTrades()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const resetForm = () => {
    setCurrentTrade({
      symbol: '',
      type: 'buy',
      lotSize: 0,
      price: 0,
      stopLoss: null,
      takeProfit: null,
      tradeDateTime: new Date().toISOString().slice(0, 16),
      imageUrl: null,
      note: '',
    })
    setEditingTradeId(null)
    setPastedImage(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentTrade(prev => ({ ...prev, [name]: value }))
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this trade?')) {
      try {
        const { error } = await supabase.from('trades').delete().eq('id', id)
        if (error) throw error
        fetchTrades()
      } catch (err: any) {
        setError(err.message)
      }
    }
  }

  const handleEdit = (trade: Trade) => {
    setEditingTradeId(trade.id)
    setCurrentTrade({
      ...trade,
      tradeDateTime: new Date(trade.tradeDateTime).toISOString().slice(0, 16)
    })
    setPastedImage(trade.imageUrl)
  }

  const handleNoteImagePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    handleImagePaste(e, (imageDataUrl) => {
      setPastedImage(imageDataUrl)
    })
  }

  const handleRemoveImage = () => {
    setPastedImage(null)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Trades</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="symbol"
            value={currentTrade.symbol}
            onChange={handleChange}
            placeholder="Symbol"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <select
            name="type"
            value={currentTrade.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <input
            type="number"
            name="lotSize"
            value={currentTrade.lotSize || ''}
            onChange={handleChange}
            placeholder="Lot Size"
            className="w-full px-3 py-2 border rounded placeholder-gray-400"
            required
          />
          <input
            type="number"
            name="price"
            value={currentTrade.price || ''}
            onChange={handleChange}
            placeholder="Price"
            className="w-full px-3 py-2 border rounded placeholder-gray-400"
            required
          />
          <input
            type="number"
            name="stopLoss"
            value={currentTrade.stopLoss || ''}
            onChange={handleChange}
            placeholder="Stop Loss"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            name="takeProfit"
            value={currentTrade.takeProfit || ''}
            onChange={handleChange}
            placeholder="Take Profit"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="datetime-local"
            name="tradeDateTime"
            value={currentTrade.tradeDateTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <textarea
          name="note"
          value={currentTrade.note}
          onChange={handleChange}
          onPaste={handleNoteImagePaste}
          ref={noteRef}
          placeholder="Note (You can paste images here)"
          className="w-full px-3 py-2 border rounded"
          rows={4}
        />
        {pastedImage && (
          <div className="mt-2 relative inline-block">
            <img src={pastedImage} alt="Pasted" className="max-h-40" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          {editingTradeId !== null ? 'Update Trade' : 'Add Trade'}
        </button>
      </form>
      <div className="space-y-4">
        {trades.map(trade => (
          <div key={trade.id} className="border p-4 rounded">
            <h3 className="font-bold">{trade.symbol} - {trade.type.toUpperCase()}</h3>
            <p>Lot Size: {trade.lotSize}</p>
            <p>Price: {trade.price}</p>
            <p>Stop Loss: {trade.stopLoss || 'N/A'}</p>
            <p>Take Profit: {trade.takeProfit || 'N/A'}</p>
            <p>Date: {new Date(trade.tradeDateTime).toLocaleString()}</p>
            <p>Note: {trade.note}</p>
            {trade.imageUrl && <img src={trade.imageUrl} alt="Trade" className="mt-2 max-h-40" />}
            <div className="mt-2">
              <button onClick={() => handleEdit(trade)} className="mr-2 text-blue-600">
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDelete(trade.id)} className="text-red-600">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Trades

/*

THIS WAS THE NEW STRUCTURE BASED ON TRADES AS COMPONENENTS. THE PAGE DOESN'T CURRENTLY USE THE COMPONENTS IN THE COMPONENTS FOLDER. THEY CAN BE DELETED UNTIL I FIGURE OUT HOW TO USE THEM.


import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import TradeForm from '../components/TradeForm';
import TradeList from '../components/TradeList';
import TradeImageHandler from '../components/ImageHandler';
import { handleImagePaste } from '../utils/imageHandling';

const Trades: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentTrade, setCurrentTrade] = useState<Omit<Trade, 'id'>>({
    symbol: '',
    type: 'buy',
    lotSize: 0,
    price: 0,
    stopLoss: null,
    takeProfit: null,
    tradeDateTime: new Date().toISOString().slice(0, 16),
    imageUrl: null,
    note: '',
  });
  const [editingTradeId, setEditingTradeId] = useState<number | null>(null);
  const [pastedImage, setPastedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      const { data, error } = await supabase.from('trades').select('*');
      if (error) throw error;
      setTrades(data || []);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleTradeChange = (field: keyof Omit<Trade, 'id'>, value: any) => {
    setCurrentTrade(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // logic for creating/updating a trade
  };

  const handleCancel = () => {
    // logic for canceling/resetting the form
  };

  const handleRemoveImage = () => {
    setPastedImage(null);
  };

  return (
    <div>
      <h1>Trades</h1>
      <TradeForm
        currentTrade={currentTrade}
        onChange={handleTradeChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        error={error}
      />
      <TradeList
        trades={trades}
        onEdit={setEditingTradeId}
        onDelete={() => {}}
      />
      <TradeImageHandler
        pastedImage={pastedImage}
        onRemoveImage={handleRemoveImage}
      />
    </div>
  );
};

export default Trades;
*/