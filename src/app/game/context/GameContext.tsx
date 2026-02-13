"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type GamePhase = 'upload' | 'level1' | 'question' | 'level2' | 'card';

interface GameState {
    creatorPhoto: string | null;
    partnerPhoto: string | null;
    creatorName: string;
    partnerName: string;
    dateChoices: string[];
    currentPhase: GamePhase;
}

interface GameContextType {
    state: GameState;
    setCreatorPhoto: (photo: string) => void;
    setPartnerPhoto: (photo: string) => void;
    setCreatorName: (name: string) => void;
    setPartnerName: (name: string) => void;
    addDateChoice: (choice: string) => void;
    setPhase: (phase: GamePhase) => void;
    resetGame: () => void;
}

const defaultState: GameState = {
    creatorPhoto: null,
    partnerPhoto: null,
    creatorName: '',
    partnerName: '',
    dateChoices: [],
    currentPhase: 'upload',
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<GameState>(defaultState);

    const setCreatorPhoto = (photo: string) => setState(prev => ({ ...prev, creatorPhoto: photo }));
    const setPartnerPhoto = (photo: string) => setState(prev => ({ ...prev, partnerPhoto: photo }));
    const setCreatorName = (name: string) => setState(prev => ({ ...prev, creatorName: name }));
    const setPartnerName = (name: string) => setState(prev => ({ ...prev, partnerName: name }));
    const addDateChoice = (choice: string) => setState(prev => ({ ...prev, dateChoices: [...prev.dateChoices, choice] }));
    const setPhase = (phase: GamePhase) => setState(prev => ({ ...prev, currentPhase: phase }));

    const resetGame = () => setState(defaultState);

    return (
        <GameContext.Provider value={{
            state,
            setCreatorPhoto,
            setPartnerPhoto,
            setCreatorName,
            setPartnerName,
            addDateChoice,
            setPhase,
            resetGame
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
