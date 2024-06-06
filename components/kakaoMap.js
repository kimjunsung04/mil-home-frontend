import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { MarkerClusterer } from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState } from 'react';
import clusterPositionsData from '../data/markers';

export default function KakaoMapComponent({ TopMenu }) {
    const mapRef = useRef();
    const clusterRef = useRef();
    const [positions, setPositions] = useState([]);
    const [orgMarkers, setOrgMarkers] = useState([]);
    const [resultMarkers, setResultMarkers] = useState([]);

    const [nowClusterNum, setNowClusterNum] = useState(0);

    const [nowChoiceChip, setNowChoiceChip] = useState(-1); // 0: 관광지, 1: 영외 PX, 2: 가격

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

    useEffect(() => {
        setPositions(clusterPositionsData.positions);
        setOrgMarkers(clusterPositionsData.positions);
    }, []);

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
        <div style={{ width: '100%', height: '100%' }}>
            <TopMenu
                nowGpsLocationGet={nowGpsLocationGet}
                nowChoiceChip={nowChoiceChip}
                setNowChoiceChip={setNowChoiceChip}
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
                    {positions.map((pos) => (
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
                            >
                                1
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
    );
}
