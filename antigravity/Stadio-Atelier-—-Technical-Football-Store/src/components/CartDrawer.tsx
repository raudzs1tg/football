import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItemConfig } from './ProductDetailModal';
import { ResilientImage } from './ResilientImage';

export interface ConfirmedOrder {
  orderNumber: string;
  timestamp: string;
  items: CartItemConfig[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'card' | 'cod';
  customer: {
    fullName: string;
    phone: string;
    address: string;
    postalCode: string;
    clubOrNotes: string;
  };
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemConfig[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  lastOrder: ConfirmedOrder | null;
  onSaveOrder: (order: ConfirmedOrder) => void;
}

const FREE_DELIVERY_THRESHOLD = 250;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lastOrder,
  onSaveOrder,
}) => {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('cod');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [clubOrNotes, setClubOrNotes] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const shipping =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 18;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - subtotal
  );

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !postalCode.trim()) {
      setFormError('Please complete your full name, phone number, street address, and postal code.');
      return;
    }
    setFormError('');
    const orderNum = `SA-${Math.floor(1040 + Math.random() * 8900)}`;
    const newOrder: ConfirmedOrder = {
      orderNumber: orderNum,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...items],
      subtotal,
      shipping,
      total,
      paymentMethod,
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        postalCode: postalCode.trim(),
        clubOrNotes: clubOrNotes.trim(),
      },
    };
    onSaveOrder(newOrder);
    onClearCart();
    setStep('confirmed');
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex justify-end bg-stone-950/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Match Bag and Checkout"
    >
      <div className="w-full max-w-lg bg-white h-full flex flex-col shadow-2xl border-l border-stone-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              {step === 'bag' && 'Match Bag'}
              {step === 'checkout' && 'Courier Dispatch & Payment'}
              {step === 'confirmed' && 'Order Verification'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {step === 'bag' &&
                (remainingForFreeShipping === 0 && subtotal > 0
                  ? 'Qualified for Complimentary 48-Hour Express Courier'
                  : subtotal > 0
                  ? `Add $${remainingForFreeShipping}.00 more for complimentary express delivery`
                  : 'Free express courier on orders over $250')}
              {step === 'checkout' && 'Direct dispatch from Montebelluna Atelier'}
              {step === 'confirmed' && 'Official equipment dispatch receipt'}
            </p>
          </div>
          <button
            onClick={() => {
              setStep('bag');
              onClose();
            }}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'bag' && (
            <>
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <p className="text-base font-medium text-stone-800">
                    Your Match Bag is currently empty.
                  </p>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                    Select your pitch surface, boot size, or player-issue match shirt from the catalog to configure your kit.
                  </p>
                  {lastOrder && (
                    <div className="pt-6 border-t border-stone-200 mt-6">
                      <button
                        type="button"
                        onClick={() => setStep('confirmed')}
                        className="text-xs font-semibold text-rose-700 hover:text-rose-800 underline underline-offset-4"
                      >
                        View Recent Order #{lastOrder.orderNumber} Status
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.sizeDisplay}-${item.variantCode}-${item.customName}-${idx}`}
                      className="flex gap-4 pb-5 border-b border-stone-200"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                        <ResilientImage
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-stone-900 truncate">
                            {item.product.name}
                          </h3>
                          <span className="text-sm font-semibold text-stone-900 font-mono-tabular shrink-0">
                            ${item.unitPrice * item.quantity}.00
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-stone-500 flex flex-wrap items-center gap-1.5">
                          <span className="font-mono-tabular">{item.sizeDisplay}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.variantCode}</span>
                          {(item.customName || item.customNumber) && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-stone-800 font-mono-tabular">
                                ID: {item.customName} {item.customNumber ? `#${item.customNumber}` : ''}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-stone-200 rounded-md">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(idx, -1)}
                              className="p-1.5 text-stone-600 hover:text-stone-900"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-mono-tabular font-medium text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(idx, 1)}
                              className="p-1.5 text-stone-600 hover:text-stone-900"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(idx)}
                            className="p-1.5 text-stone-400 hover:text-rose-700 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-2">
                  Select Settlement Method
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-stone-900 bg-stone-50'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="text-xs font-semibold text-stone-900">
                      Cash on Delivery (COD)
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      Inspect gear on courier arrival
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-50'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="text-xs font-semibold text-stone-900">
                      Direct Club / Card Invoice
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      Instant priority authorization
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Verification Fields */}
              <div className="space-y-3.5 pt-2">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Marco Rossi"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Phone Number (For Courier SMS Verification) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+39 0423 601928"
                    className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Delivery Street Address / Training Ground *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Via Monte Grappa 42, Montebelluna"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="31044"
                      className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Club / Locker Gate Note
                    </label>
                    <input
                      type="text"
                      value={clubOrNotes}
                      onChange={(e) => setClubOrNotes(e.target.value)}
                      placeholder="Pitch Gate B"
                      className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>
              </div>

              {formError && (
                <p className="text-xs text-rose-700 font-medium">{formError}</p>
              )}

              <div className="p-4 rounded-lg bg-[#F4F3EF] space-y-1.5 text-xs text-stone-600">
                <div className="font-semibold text-stone-900">
                  Payment & Delivery Terms
                </div>
                <p>
                  Total Amount Due:{' '}
                  <span className="font-mono-tabular font-semibold text-stone-900">
                    ${total}.00
                  </span>{' '}
                  ({paymentMethod === 'cod' ? 'Payable upon courier handover' : 'Direct settlement'}).
                  Orders above ${FREE_DELIVERY_THRESHOLD} include complimentary 48-hour armored courier shipping.
                </p>
              </div>
            </form>
          )}

          {step === 'confirmed' && lastOrder && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-stone-900 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs text-stone-300 font-mono-tabular">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Order #{lastOrder.orderNumber} Confirmed — Preparing Shipment</span>
                </div>
                <p className="text-sm font-medium">
                  Assigned to Montebelluna Bootroom Bench · Dispatching within 24h
                </p>
                <p className="text-xs text-stone-400">
                  Recipient: {lastOrder.customer.fullName} · {lastOrder.customer.address} ({lastOrder.customer.postalCode})
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-stone-800">
                  Itemized Equipment Manifest
                </h3>
                <div className="divide-y divide-stone-200 border border-stone-200 rounded-lg px-4">
                  {lastOrder.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-semibold text-stone-900">
                          {item.quantity}x {item.product.name}
                        </div>
                        <div className="text-stone-500 font-mono-tabular mt-0.5">
                          {item.sizeDisplay} · {item.variantCode}
                          {item.customName || item.customNumber
                            ? ` · Custom: ${item.customName} ${item.customNumber}`
                            : ''}
                        </div>
                      </div>
                      <div className="font-mono-tabular font-semibold text-stone-900">
                        ${item.unitPrice * item.quantity}.00
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 text-xs pt-2 border-t border-stone-200">
                <div className="flex justify-between text-stone-600">
                  <span>Payment Method</span>
                  <span className="font-medium text-stone-900">
                    {lastOrder.paymentMethod === 'cod'
                      ? 'Cash on Delivery (COD)'
                      : 'Direct Card Settlement'}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Courier Shipping</span>
                  <span className="font-mono-tabular">
                    {lastOrder.shipping === 0 ? 'Complimentary ($0.00)' : `$${lastOrder.shipping}.00`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2">
                  <span>Total Verified</span>
                  <span className="font-mono-tabular">${lastOrder.total}.00</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {step === 'bag' && items.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-[#F9F8F6] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono-tabular font-medium text-stone-900">
                  ${subtotal}.00
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>48-Hour Express Courier</span>
                <span className="font-mono-tabular font-medium text-stone-900">
                  {shipping === 0 ? 'Free ($0.00)' : `$${shipping}.00`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total</span>
                <span className="font-mono-tabular">${total}.00</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep('checkout')}
              className="w-full py-3.5 px-6 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Proceed to Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 'checkout' && (
          <div className="p-6 border-t border-stone-200 bg-[#F9F8F6] flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep('bag')}
              className="px-4 py-3 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:text-stone-900 whitespace-nowrap shrink-0"
            >
              Back to Bag
            </button>
            <button
              type="submit"
              form="checkout-form"
              className="flex-1 py-3 px-6 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Confirm Order — ${total}.00
            </button>
          </div>
        )}

        {step === 'confirmed' && (
          <div className="p-6 border-t border-stone-200 bg-[#F9F8F6]">
            <button
              type="button"
              onClick={() => {
                setStep('bag');
                onClose();
              }}
              className="w-full py-3 px-6 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              Continue Exploring Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
