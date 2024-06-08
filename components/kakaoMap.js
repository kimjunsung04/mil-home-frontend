import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { MarkerClusterer } from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState } from 'react';
import clusterPositionsData from '../data/markers';
import pxData from '../data/px';
import BottomSheetComponent from './bottomSheet';

export default function KakaoMapComponent({ TopMenu }) {
    const mapRef = useRef();
    const clusterRef = useRef();
    const [orgMarkers, setOrgMarkers] = useState([]);
    const [resultMarkers, setResultMarkers] = useState([]);

    const [nowClusterNum, setNowClusterNum] = useState(0);

    const [nowChoiceChip, setNowChoiceChip] = useState([]); // 0: 관광지, 1: 영외 PX, 2: 가격

    const [nowBottomSheet, setNowBottomSheet] = useState(false);

    const [nowLocation, setNowLocation] = useState({
        // 지도의 초기 위치
        center: {
            // 지도의 중심좌표
            lat: 36.2683,
            lng: 127.6358,
        },
        // 지도 위치 변경시 panto를 이용할지에 대해서 정의
        isPanto: false,
    });

    const [sliderValue, setSliderValue] = useState(0);
    const [gradient, setGradient] = useState(
        'linear-gradient(to right, #3e5247 0%, #3e5247 0%, #d4d4d4 0%, #d4d4d4 100%)'
    );

    const handleChange = (event) => {
        const { max, value } = event.target;
        const gradientPercentage = (value / max) * 100;
        const newGradient = `linear-gradient(to right, #3e5247 0%, #3e5247 ${gradientPercentage}%, #d4d4d4 ${gradientPercentage}%, #d4d4d4 100%)`;
        setGradient(newGradient);
        setSliderValue(value);
        let tempMarkers = [];
        for (let i = 0; i < orgMarkers.length; i++) {
            if (orgMarkers[i].price < value) {
                tempMarkers.push(orgMarkers[i]);
            }
        }
        setResultMarkers(tempMarkers);
    };

    useEffect(() => {
        setOrgMarkers(clusterPositionsData.positions);
        setResultMarkers(clusterPositionsData.positions);
    }, []);

    const searchAddToLatLng = async (searchText) => {
        return new Promise((resolve, reject) => {
            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(searchText, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    resolve({
                        lat: result[0].y,
                        lng: result[0].x,
                    });
                } else {
                    reject(
                        new Error('Failed to convert address to coordinates.')
                    );
                }
            });
        });
    };

    const onClusterclick = (_target, cluster) => {
        const map = mapRef.current;
        // 현재 지도 레벨에서 1레벨 확대한 레벨
        const level = map.getLevel() - 1;

        // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
        console.log(cluster.getCenter());
        map.setLevel(level, {
            anchor: cluster.getCenter(),
            animate: { duration: 500 },
        });
    };

    const onClusterChange = () => {
        // const cluster = clusterRef.current;
        // if (!cluster) return;
        // console.log(cluster.getMarkers());
    };

    const nowGpsLocationGet = () => {
        // 위치 허용 요청

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                console.log(lat, lng);
                setNowLocation({
                    center: { lat, lng },
                    isPanto: true,
                });
                const map = mapRef.current;
                setTimeout(() => {
                    map.setLevel(8, {
                        animate: {
                            duration: 500,
                        },
                    });
                }, 500);
            },
            (error) => {
                // 위치 허용 거부
                alert('위치 정보를 허용해주세요!');
            }
        );
    };

    return (
        <>
            <BottomSheetComponent
                open={nowBottomSheet}
                setOpen={setNowBottomSheet}
            >
                <div style={{ width: '100%', height: '100%', padding: '1rem' }}>
                    <img
                        src="https://img.allurekorea.com/allure/2021/12/style_61b2036654ae1-1200x800.jpg"
                        alt="img"
                        style={{ width: '100%', height: '100%' }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <span
                                style={{
                                    fontSize: '30px',
                                    fontWeight: 'bold',
                                }}
                            >
                                데모 밀집
                            </span>
                        </div>
                        <div>
                            <div>
                                <span
                                    style={{
                                        fontSize: '25px',
                                        fontWeight: 'bold',

                                        //취소선
                                        textDecoration: 'line-through',
                                    }}
                                >
                                    \75,000원
                                </span>
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontSize: '25px',
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}
                                >
                                    \60,000원
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr
                        style={{
                            border: '2px solid gray',
                            width: '100%',
                        }}
                    />

                    {/* <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '1rem',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                margin: '0 1rem',
                                flexDirection: 'column',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                주변 맛집
                            </span>

                            <div
                                style={{
                                    background: 'orange',
                                    width: '4rem',
                                    height: '2rem',
                                    borderRadius: '35%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: '1rem',
                                    padding: '1rem',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    5개
                                </span>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                margin: '0 1rem',
                                flexDirection: 'column',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                주변 관광지
                            </span>
                            <span
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                3 
                            </span>
                        </div>
                    </div> */}
                </div>
            </BottomSheetComponent>
            <div style={{ width: '100%', height: '100%' }}>
                <TopMenu
                    nowGpsLocationGet={nowGpsLocationGet}
                    nowChoiceChip={nowChoiceChip}
                    setNowChoiceChip={setNowChoiceChip}
                    sliderValue={sliderValue}
                    setSliderValue={setSliderValue}
                    gradient={gradient}
                    setGradient={setGradient}
                    handleChange={handleChange}
                />

                <Map // 지도를 표시할 Container
                    center={nowLocation.center} // 지도의 중심 위치
                    style={{
                        // 지도의 크기
                        width: '100%',
                        height: '100vh',
                    }}
                    level={13} // 지도의 확대 레벨
                    isPanto={nowLocation.isPanto} // 지도 위치 변경시 panto를 이용할지에 대해서 정의
                    //업데이트 될 때마다 호출되는 콜백함수
                    onCenterChanged={onClusterChange}
                    ref={mapRef}
                >
                    <MarkerClusterer
                        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                        minLevel={10} // 클러스터 할 최소 지도 레벨
                        disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
                        calculator={[10, 30, 50]} // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
                        onClusterclick={onClusterclick}
                        styles={[
                            {
                                width: '40px',
                                height: '40px',
                                background: '#83ad97',
                                borderRadius: '20px',
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                lineHeight: '41px',
                            },
                            {
                                width: '50px',
                                height: '50px',
                                background: '#688475',
                                borderRadius: '25px',
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                lineHeight: '51px',
                            },
                            {
                                width: '60px',
                                height: '60px',
                                background: '#3e5247',
                                borderRadius: '30px',
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                lineHeight: '61px',
                            },
                        ]}
                        ref={clusterRef}
                    >
                        {resultMarkers.map((pos) => (
                            <CustomOverlayMap
                                key={`${pos.lat}-${pos.lng}`}
                                position={{
                                    lat: pos.lat,
                                    lng: pos.lng,
                                }}
                            >
                                <div
                                    style={{
                                        color: 'white',
                                        textAlign: 'center',
                                        background: '#83ad97',
                                        width: '2rem',
                                        height: '2rem',
                                        borderRadius: '50%',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    onClick={() => {
                                        setNowBottomSheet(true);
                                    }}
                                >
                                    1
                                </div>
                            </CustomOverlayMap>
                        ))}
                        {nowChoiceChip.includes(1) &&
                            pxData.map((pos) => (
                                <CustomOverlayMap
                                    key={`${pos.lat}-${pos.lng}`}
                                    position={{
                                        lat: pos.lat,
                                        lng: pos.lng,
                                    }}
                                >
                                    <div
                                        style={{
                                            color: 'white',
                                            textAlign: 'center',
                                            background: 'orange',
                                            width: '2rem',
                                            height: '2rem',
                                            borderRadius: '50%',
                                            justifyContent: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        PX
                                    </div>
                                </CustomOverlayMap>
                            ))}
                        {nowLocation.isPanto && (
                            <CustomOverlayMap position={nowLocation.center}>
                                <div
                                    style={{
                                        color: 'white',
                                        textAlign: 'center',
                                        background: 'white',
                                        width: '2rem',
                                        height: '2rem',
                                        borderRadius: '50%',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        boxShadow: '0 0 10px rgba(0,0,0,0.8)',
                                    }}
                                >
                                    <div
                                        style={{
                                            background: '#fc4217',
                                            width: '1.3rem',
                                            height: '1.3rem',
                                            borderRadius: '50%',
                                        }}
                                    ></div>
                                </div>
                            </CustomOverlayMap>
                        )}
                    </MarkerClusterer>
                </Map>
            </div>
        </>
    );
}
