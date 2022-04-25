import { FC } from 'react'
import { useSelector } from 'react-redux';
import { AppState } from '../../features/store'
import { useNavigate } from "react-router-dom";
import styles from './users.module.css';

const Userlist: FC = () => {
  const { users } = useSelector((state: AppState) => state.userlist);
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/user/${id}`, { replace: true })
  }

  return (
    <div className={styles.userlist}>
      <div className={styles.userlistContainer}>
        <h1 className={styles.title}>Top on User to Edit</h1>
        {users.map(user => (
          <h2 className={styles.userName} key={user.userId} onClick={() => handleEdit(user.id)}>{user.firstName} {user.lastName}</h2>
        ))}
      </div>
    </div>
  )
}

export default Userlist
