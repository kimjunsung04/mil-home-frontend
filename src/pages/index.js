import KakaoMapComponent from '../../components/kakaoMap';
import TopMenu from '../../components/topMemu';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <KakaoMapComponent TopMenu={TopMenu}></KakaoMapComponent>
        </main>
    );
}
