"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      {/* Main product image */}
      <div className="relative overflow-hidden bg-white">
        <Link href={`/san-pham/${product.slug}`} className="block">
          <div className="relative aspect-square bg-white flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[activeImg] ?? product.thumbnail}
              alt={`${product.name} - Sơn nước Vũng Tàu Hoàng Quang Minh`}
              className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>

      {/* Info section */}
      <div className="p-3 border-t border-gray-100 text-center flex-1 flex flex-col justify-between">
        {/* Color swatches / thumbnail gallery */}
        {product.images.length > 1 && (
          <div className="flex justify-center gap-1 mb-2 flex-wrap">
            {product.images.slice(0, 5).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative w-[40px] h-[40px] flex-shrink-0 border p-[2px] transition-colors ${
                  activeImg === i
                    ? "border-[rgb(232,184,0)]"
                    : "border-gray-200 hover:border-[rgb(232,184,0)]"
                }`}
                aria-label={`Xem ảnh ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`${product.name} màu ${i + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        )}

        {/* Product name - fixed height to guarantee horizontal alignment across cards */}
        <div className="h-[56px] sm:h-[62px] flex items-center justify-center mb-1">
          <Link
            href={`/san-pham/${product.slug}`}
            title={product.name}
            className="font-medium text-[rgb(26,58,143)] text-[13.5px] sm:text-[14.5px] leading-snug hover:text-[rgb(232,184,0)] transition-colors line-clamp-3 text-center"
          >
            {product.name.toUpperCase()}
          </Link>
        </div>

        {/* Price */}
        <div className="my-2 text-sm leading-none flex items-center justify-center gap-1.5">
          <span className="text-gray-600 text-xs">Giá:</span>
          <span className="font-bold text-red-600 text-[18px] sm:text-[20px] leading-none">
            {product.price}
          </span>
        </div>

        {/* Actions row - always pinned to the bottom */}
        <ul className="flex items-center justify-between pt-2 border-t border-gray-200 text-[12px] sm:text-[13px] mt-auto">
          <li className="flex-1">
            {product.inStock ? (
              <span className="text-[rgb(2,166,77)] flex items-center justify-center gap-1">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Còn hàng
              </span>
            ) : (
              <span className="text-red-500">Hết hàng</span>
            )}
          </li>
          <li className="flex-1">
            <button
              onClick={() => addItem(product)}
              className="text-[rgb(232,184,0)] hover:underline flex items-center justify-center gap-1 w-full font-medium"
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Thêm vào giỏ
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
