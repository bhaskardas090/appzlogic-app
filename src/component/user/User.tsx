import { FC, useEffect } from 'react'
import styles from './user.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addFirstName, addLastName, asyncGetUser, asyncUpdateUser, cancel } from '../../features/userSlice';
import { asyncGetUsers, asyncSaveUser } from '../../features/userListSlice';
import Authorization from '../authorization/Authorization';
import { AppState } from '../../features/store'
import { v4 as uuidv4 } from 'uuid';
import Userlist from '../users/Userlist';
import { useParams } from 'react-router-dom';

const User: FC = () => {
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams()

  useEffect(() => { // FETCHING USER FOR EDIT PAGE
    if (id) {
      dispatch(asyncGetUser(id))
    }
  }, [id, dispatch])

  useEffect(() => { // FETCHING ALL USERS
    dispatch(asyncGetUsers())
  }, [dispatch])


  // EVENT HANDLERS
  const handleSave = async () => {
    await dispatch(asyncSaveUser({ ...user, userId: uuidv4(), id: uuidv4() }))
    dispatch(asyncGetUsers())
  }

  const handleCancel = () => {
    dispatch(cancel())
  }

  const handleFirstName = (e: any) => {
    if (id) {
      dispatch(asyncUpdateUser({ id: id, data: { firstName: e.target.value } }))
    } else {
      dispatch(addFirstName({ firstName: e.target.value }))
    }
  }

  const handleLastName = (e: any) => {
    if (id) {
      dispatch(asyncUpdateUser({ id: id, data: { lastName: e.target.value } }))
    } else {
      dispatch(addLastName({ lastName: e.target.value }))
    }
  }

  return (
    <div className={styles.user}>
      <form className={styles.form}>
        <label>First Name: </label>
        <input type="text" value={user.firstName} onChange={handleFirstName} className={styles.firstName} placeholder="First Name" />
        <label>Last Name: </label>
        <input type="text" value={user.lastName} onChange={handleLastName} className={styles.lastName} placeholder="Last Name" />
      </form>
      <Authorization param={id} user={user} />
      {!id && (
        <div className={styles.buttons}>
          <button onClick={handleSave} className={styles.save}>Save</button>
          <button onClick={handleCancel} className={styles.cancel}>Cancel</button>
        </div>
      )
      }
      <Userlist />

    </div >
  )
}

export default User
