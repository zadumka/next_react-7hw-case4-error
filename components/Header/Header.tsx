'import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';

export default function Header() {

  return (
    <div className={css.container}>
      <Link href="/" aria-label="Home" className={css.headerLink}>
        NoteHub
      </Link>

      <ul className={css.navigation}>
        <li className={css.navigationItem}>
          <Link className={css.navigationLink} href="/">
            Home
          </Link>
        </li>
        <li className={css.navigationItem}>
          <TagsMenu />
        </li>
      </ul>
    </div>
  );
}
