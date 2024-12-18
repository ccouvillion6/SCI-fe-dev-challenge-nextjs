"use client";
import React from 'react';

export default function CardSkeleton() {
    return (
        <div className="card border border-gray-400 rounded-lg p-2 m-2 flex items-center bg-gray-800 text-white shadow-lg">
            {/* Left Image Section */}
            <div className="w-32 h-32 flex-shrink-0 mr-4">
                <div className="animate-pulse w-full h-full bg-gray-600 rounded-lg" />
            </div>

            {/* Right Text Section */}
            <div className="flex flex-col justify-center space-y-2 w-full">
                <div className="animate-pulse h-6 bg-gray-600 rounded w-3/4" />
                <div className="animate-pulse h-4 bg-gray-600 rounded w-1/2" />
                <div className="animate-pulse h-4 bg-gray-600 rounded w-2/3" />
                <div className="animate-pulse h-4 bg-gray-600 rounded w-3/4" />
                <div className="animate-pulse h-4 bg-gray-600 rounded w-1/4" />
                <div className="animate-pulse h-4 bg-gray-600 rounded w-1/4" />
                <div className="animate-pulse h-4 bg-gray-600 rounded w-1/4" />
                <div className="animate-pulse h-4 bg-gray-600 rounded w-1/3" />
            </div>
        </div>
    );
}