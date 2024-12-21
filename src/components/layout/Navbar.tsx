import styles from '@styles/layout/Navbar.module.scss';
import TitlePage from './TitlePage';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <TitlePage />
        </nav>
    );
}