import React, { useState } from 'react';

const DirectionDropDown = () => {
    const [showDirections, setShowDirections] = useState(false);
    const [mode, setMode] = useState('Optimal');

    const optimalDirections = [
        "Walk for 153 m",
        "Take the first right on 56th St",
        "Keep left for 57 m",
        "Walk for another 231 m",
        "Take the next left on Boulevard Stand continue for 89 m"
    ];

    const avoidanceDirections = [
        "Walk",
        "Take",
        "Keep",
        "Walk",
        "Take"
    ];

    const directions = mode === 'Optimal' ? optimalDirections : avoidanceDirections;

    return (
        <div>
            <button onClick={() => setShowDirections(!showDirections)}>Directions</button>
            {showDirections && (
                <div>
                    <button 
                        style={{color: mode === 'Optimal' ? '836262' : '908B8B'}} 
                        onClick={() => setMode('Optimal')}
                    >
                        Optimal
                    </button>
                    <button 
                        style={{color: mode === 'Avoidance' ? '836262' : '908B8B'}} 
                        onClick={() => setMode('Avoidance')}
                    >
                        Avoidance
                    </button>
                    <ul>
                        {directions.map((direction, index) => (
                            <li key={index}>{direction}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DirectionDropDown;
