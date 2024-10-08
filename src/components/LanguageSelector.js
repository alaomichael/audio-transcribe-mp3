import React from 'react';

const LanguageSelector = ({ language, setLanguage }) => {
    return (
        <div>
            <label htmlFor="language">Select Language:</label>
            <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                {/* Add other languages */}
            </select>
        </div>
    );
};

export default LanguageSelector;
