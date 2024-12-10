import { HeaderProps} from '../types';

const Header = ({ todosAmount }: HeaderProps) => {
  return (
    <header>
      {/* <label htmlFor="sidebar_toggle">
        <img src="images/hamburger.png" alt="Toggle Sidebar" />
      </label> */}
      <dl>
        <dt><time>All Todos</time></dt>
        <dd>{todosAmount}</dd>
      </dl>
    </header>
  )
}

export default Header;