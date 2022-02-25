import React, { useEffect } from 'react';

import AboutView from './view';
import { AboutModalProps } from './types';

import './StyledComponent/style.css';

const About: React.FunctionComponent<AboutModalProps> = ({
    open,
    handleClose,
    style,
}) => {
    const [jsonData, setJsonData] = React.useState('');
    useEffect(() => {
        const fetchJSON = async (): Promise<void> => {
            const response = await fetch('manifest.json', {
                headers: { 'Content-Type': 'application/json' },
            });
            const json = await response.json();
            setJsonData(json.version);
        };

        fetchJSON();
    }, []);

    return (
        <AboutView
            open={open}
            handleClose={handleClose}
            style={style}
            jsonData={jsonData}
        />
    );
};

export default About;
