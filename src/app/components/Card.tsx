"use client";
import React from 'react';
import Image from 'next/image';


type CardProps = {
    Name: string;
    Set: string;
    Cost: number;
    Power: number;
    HP: string;
    Type: string;
    Traits: string[];
    Rarity: string;
    FrontArt: string;
};

export default function Card({ Name, Set, Cost, Power, HP, Type, Traits, Rarity, FrontArt }: CardProps) {
    return (
        <div className="card border border-gray-400 rounded-lg p-2 m-2 flex items-center bg-gray-800 text-white shadow-lg">
            {/* Left Image Section */}
            <div className="w-32 h-32 flex-shrink-0 mr-4">
                <Image width={128} height={128} src={FrontArt} alt={Name} className="w-full h-full object-cover rounded-lg" />
            </div>

            {/* Right Text Section */}
            <div className="flex flex-col justify-center">
                <h2 className="text-lg font-bold">{Name}</h2>
                <p className="text-sm">Set: {Set}</p>
                <p className="text-sm">Type: {Type}</p>
                <p className="text-sm">Traits: {Traits?.join(', ')}</p>
                <p className="text-sm">Cost: {Cost}</p>
                <p className="text-sm">Power: {Power}</p>
                <p className="text-sm">HP: {HP}</p>
                <p className="text-sm">Rarity: {Rarity}</p>
            </div>
        </div>
    );
}
