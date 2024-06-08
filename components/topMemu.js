import { useState } from 'react';
import Chip from './chip';
import { FaFilter } from 'react-icons/fa';
import { MdMyLocation } from 'react-icons/md';

export default function TopMenu({
    nowGpsLocationGet,
    nowChoiceChip,
    setNowChoiceChip,
    sliderValue,
    setSliderValue,
    gradient,
    setGradient,
    handleChange,
}) {
    const chips = [
        {
            text: '주변 관광지',
            onClick: () => {
                //원래 0이 있었으면 0을 없애고 없었으면 0을 추가  리스트형태임
                if (nowChoiceChip.includes(0)) {
                    setNowChoiceChip(
                        nowChoiceChip.filter((chip) => chip !== 0)
                    );
                } else {
                    setNowChoiceChip([...nowChoiceChip, 0]);
                }
            },
        },
        {
            text: '주변 영외 PX',
            onClick: () => {
                if (nowChoiceChip.includes(1)) {
                    setNowChoiceChip(
                        nowChoiceChip.filter((chip) => chip !== 1)
                    );
                } else {
                    setNowChoiceChip([...nowChoiceChip, 1]);
                }
            },
        },
        {
            text: '가격',
            onClick: () => {
                if (nowChoiceChip.includes(2)) {
                    setNowChoiceChip(
                        nowChoiceChip.filter((chip) => chip !== 2)
                    );
                } else {
                    setNowChoiceChip([...nowChoiceChip, 2]);
                }
            },
        },
    ];

    return (
        <div>
            <div className="top-logo">
                <img src="/img/logo.png" alt="logo" width={70} height={70} />
            </div>
            <div className="top-menu">
                <div className="top-menu-chip">
                    <FaFilter size={25} color="#83ad97" />
                    {chips.map((chip, index) => (
                        <Chip
                            key={index}
                            onClick={chip.onClick}
                            checked={nowChoiceChip.includes(index)}
                        >
                            {chip.text}
                        </Chip>
                    ))}
                </div>
                {nowChoiceChip.includes(2) && (
                    <div className="top-menu-price">
                        <div className="price-text">
                            나의 범위 설정(0원 ~{' '}
                            {sliderValue
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            원)
                        </div>
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
                        <div className="price-guide-container">
                            <div className="price-guide-left">0원</div>
                            <div className="price-guide-right">100,000원</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="now-location" onClick={nowGpsLocationGet}>
                <MdMyLocation size={30} color="#83ad97" />
            </div>
        </div>
    );
}
