import styles from '@styles/layout/Sidebar.module.scss';
import { SideBarI } from '@interfaces/props';
import Image from 'next/image';
import LogoWhite from '@assets/logo_white_cropped.png';

export default function SideBar({ display }: SideBarI) {
    return (
        <aside
            className={`${styles.sidebar} hidden lg:block`}
            style={{ display: display ? display : undefined }}
        >
            <div className={`flex flex-col gap-2 ${styles['sidebar-content']}`}>
                <figure className='p-4'>
                    <Image 
                        src={LogoWhite}
                        alt="logo"
                        width={100}
                        height={100}
                    />
                </figure>
            </div>
        </aside>
    );
}