import { FC } from 'react'
import styles from './authorization.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserGroup, updateUserAuth, asyncUpdateUser } from '../../features/userSlice';
import { AppState } from '../../features/store'

interface AuthProps { param?: string; user?: any; }
const Authorization: FC<AuthProps> = ({ param, user }) => {
  const dispatch = useDispatch();
  const userAuthorizations = useSelector((state: AppState) => state.user.userAuthorizations)

  const handleCheckbox = (e: any) => {
    // ACCESSING THE OBJ 
    const newUserAuthorizations = [...userAuthorizations];
    const index = newUserAuthorizations.findIndex(auth => auth.authorizationKey === e.target.value)
    newUserAuthorizations[index] = { ...newUserAuthorizations[index], granted: e.target.checked }
    if (param) {
      dispatch(updateUserAuth({ userAuthorizations: newUserAuthorizations }))
      dispatch(asyncUpdateUser({ id: param, data: { userAuthorizations: newUserAuthorizations } }))
    } else {
      dispatch(updateUserAuth({ userAuthorizations: newUserAuthorizations }))
    }
  }

  const handleUpdateUserGroup = (e: any) => {
    if (param) {
      dispatch(asyncUpdateUser({ id: param, data: { userGroup: e.target.value } }))
    } else {
      dispatch(updateUserGroup({ userGroup: e.target.value }))
    }
  }

  return (
    <div className={styles.authorization}>
      <div className={styles.container}>
        <select name="group" className={styles.group} onChange={handleUpdateUserGroup}>
          <option value="Operator">Operator</option>
          <option value="Administrator">Administrator</option>
          <option value="Service">Service</option>
        </select>
        <form className={styles.permissons} >
          {userAuthorizations.map(userAuth => (
            <div key={userAuth.authorizationKey}>
              <input type="checkbox" value={userAuth.authorizationKey} onChange={handleCheckbox} checked={userAuth.granted} />
              <label>{userAuth.authorizationKey}</label><br />
            </div>
          ))}
        </form>
      </div>
    </div >
  )
}

export default Authorization
