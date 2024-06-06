import { useState } from 'react';
import Chip from './chip';
import { FaFilter } from 'react-icons/fa';
import { MdMyLocation } from 'react-icons/md';

export default function TopMenu({
    nowGpsLocationGet,
    nowChoiceChip,
    setNowChoiceChip,
}) {
    const chips = [
        { text: '주변 관광지', onClick: () => setNowChoiceChip(0) },
        { text: '주변 영외 PX', onClick: () => setNowChoiceChip(1) },
        { text: '가격', onClick: () => setNowChoiceChip(2) },
    ];

    const [gradient, setGradient] = useState(
        'linear-gradient(to right, #3e5247 0%, #3e5247 0%, #d4d4d4 0%, #d4d4d4 100%)'
    );
    const [sliderValue, setSliderValue] = useState(0);

    const handleChange = (event) => {
        const { max, value } = event.target;
        const gradientPercentage = (value / max) * 100;
        const newGradient = `linear-gradient(to right, #3e5247 0%, #3e5247 ${gradientPercentage}%, #d4d4d4 ${gradientPercentage}%, #d4d4d4 100%)`;
        setGradient(newGradient);
        setSliderValue(value);
    };

    return (
        <div>
            <div className="top-logo">
                <img src="/img/logo.png" alt="logo" width={80} height={80} />
            </div>
            <div className="top-menu">
                <div className="top-menu-chip">
                    <FaFilter size={25} color="#83ad97" />
                    {chips.map((chip, index) => (
                        <Chip
                            key={index}
                            onClick={chip.onClick}
                            checked={nowChoiceChip === index}
                        >
                            {chip.text}
                        </Chip>
                    ))}
                </div>
                {nowChoiceChip === 2 && (
                    <div className="top-menu-price">
                        <div className="price-text">나의 범위 설정</div>
                        <input
                            type="range"
                            className="price-range"
                            min="0"
                            max="100000"
                            step="1000"
                            value={sliderValue}
                            onChange={handleChange}
                            style={{ background: gradient }}
                        />
                    </div>
                )}
            </div>
            <div className="now-location" onClick={nowGpsLocationGet}>
                <MdMyLocation size={30} color="#83ad97" />
            </div>
        </div>
    );
}
