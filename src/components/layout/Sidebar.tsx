import styles from '@styles/layout/Sidebar.module.scss';
import { SideBarI } from '@interfaces/props';

export default function SideBar({ display }: SideBarI) {
    return (
        <aside
            className={`${styles.sidebar} hidden lg:block`}
            style={{ display: display ? display : undefined }}
        >
            <div className={`flex flex-col gap-2 ${styles['sidebar-content']}`}>

            </div>
        </aside>
    );
}