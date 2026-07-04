'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { CartLine, Category, Colorway } from '@/lib/types';

export interface AddToCartInput {
  slug: string;
  name: string;
  category: Category;
  colorway: Colorway;
  unitPrice: number;
  lensId: string;
  lensName: string;
}

interface CartState {
  lines: CartLine[];
}

type CartAction =
  | { type: 'ADD'; input: AddToCartInput }
  | { type: 'REMOVE'; lineId: string }
  | { type: 'SET_QTY'; lineId: string; quantity: number }
  | { type: 'CLEAR' };

function lineIdFor(slug: string, lensId: string): string {
  return `${slug}::${lensId}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const lineId = lineIdFor(action.input.slug, action.input.lensId);
      const existing = state.lines.find((line) => line.lineId === lineId);
      if (existing) {
        return {
          lines: state.lines.map((line) =>
            line.lineId === lineId
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          ),
        };
      }
      const newLine: CartLine = {
        lineId,
        slug: action.input.slug,
        name: action.input.name,
        category: action.input.category,
        colorway: action.input.colorway,
        unitPrice: action.input.unitPrice,
        lensName: action.input.lensName,
        quantity: 1,
      };
      return { lines: [...state.lines, newLine] };
    }
    case 'REMOVE':
      return { lines: state.lines.filter((line) => line.lineId !== action.lineId) };
    case 'SET_QTY': {
      if (action.quantity <= 0) {
        return { lines: state.lines.filter((line) => line.lineId !== action.lineId) };
      }
      return {
        lines: state.lines.map((line) =>
          line.lineId === action.lineId
            ? { ...line, quantity: action.quantity }
            : line,
        ),
      };
    }
    case 'CLEAR':
      return { lines: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddToCartInput) => void;
  removeItem: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((input: AddToCartInput) => {
    dispatch({ type: 'ADD', input });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback(
    (lineId: string) => dispatch({ type: 'REMOVE', lineId }),
    [],
  );

  const setQuantity = useCallback(
    (lineId: string, quantity: number) =>
      dispatch({ type: 'SET_QTY', lineId, quantity }),
    [],
  );

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const count = useMemo(
    () => state.lines.reduce((sum, line) => sum + line.quantity, 0),
    [state.lines],
  );

  const subtotal = useMemo(
    () => state.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0),
    [state.lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines: state.lines,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    }),
    [
      state.lines,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
