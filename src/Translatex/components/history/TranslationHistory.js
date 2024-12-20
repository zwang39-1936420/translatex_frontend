import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Latex from 'react-latex';
import CopyToClipboard from '../buttons/CopyToClipboard';
import './TranslationHistory.css';

const HISTORY_MAX_SIZE = 50; // Limit history size
const STORAGE_KEY = 'latex_translation_history';

function TranslationHistory({ history, onHistoryChange }) {
    const [showHistory, setShowHistory] = useState(false);
    const dropdownRef = useRef(null);

    // Memoize history items to prevent unnecessary re-renders
    const historyItems = useMemo(() => {
        return history.slice(0, HISTORY_MAX_SIZE).map((item, index) => ({
            id: `${index}-${item}`,
            latex: item
        }));
    }, [history]);

    // Optimized localStorage handling
    const saveHistory = useCallback(() => {
        try {
            const historyToSave = history.slice(0, HISTORY_MAX_SIZE);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(historyToSave));
        } catch (error) {
            console.error('Failed to save history:', error);
        }
    }, [history]);

    // Load history from localStorage on mount
    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem(STORAGE_KEY);
            if (savedHistory) {
                const parsedHistory = JSON.parse(savedHistory);
                onHistoryChange(parsedHistory);
            }
        } catch (error) {
            console.error('Failed to load history:', error);
        }
    }, []);

    // Save to localStorage when history changes
    useEffect(() => {
        if (history.length) {
            saveHistory();
        }
    }, [history, saveHistory]);

    // Optimized click outside handler
    const handleClickOutside = useCallback((event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowHistory(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [handleClickOutside]);

    const clearHistory = useCallback(() => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            onHistoryChange([]);
        } catch (error) {
            console.error('Failed to clear history:', error);
        }
    }, [onHistoryChange]);

    return (
        <div className="history-container" ref={dropdownRef}>
            <div className="history-controls">
                <button 
                    className="history-button" 
                    onClick={() => setShowHistory(!showHistory)}
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    History
                </button>
                {history.length > 0 && (
                    <button 
                        className="clear-history-button" 
                        onClick={clearHistory}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        Clear
                    </button>
                )}
            </div>

            {showHistory && (
                <div className="history-dropdown">
                    {historyItems.length ? (
                        historyItems.map(({ id, latex }) => (
                            <div key={id} className="history-item">
                                <div className="latex-wrapper">
                                    <Latex>{`$${latex}$`}</Latex>
                                </div>
                                <CopyToClipboard 
                                    textToCopy={latex} 
                                    buttonClass="copy-button" 
                                    textOnButton="Copy"
                                />
                            </div>
                        ))
                    ) : (
                        <div className="history-item empty">No history yet</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default React.memo(TranslationHistory);
