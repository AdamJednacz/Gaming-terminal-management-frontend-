import { UserRole } from '../../../../common/enums/userRoles';
import styles from './RolesTable.module.scss';

type RoleInfo = {
  label: string;
  permissions: string;
  grantedBy: string;
};

const roleInfo: Record<UserRole, RoleInfo> = {
  [UserRole.OPERATOR]: {
    label: 'Operator',
    permissions:
      'Views terminals, locations and incidents. Reports new incidents.',
    grantedBy: 'Automatically on sign-up',
  },
  [UserRole.TECHNICIAN]: {
    label: 'Technician',
    permissions:
      'Everything an operator can do. Takes over incidents, changes their status and puts terminals into maintenance mode.',
    grantedBy: 'An administrator',
  },
  [UserRole.ADMIN]: {
    label: 'Administrator',
    permissions:
      'Everything a technician can do. Manages users, roles, locations and terminals.',
    grantedBy: 'Another administrator',
  },
};

const DEFAULT_ROLE = UserRole.OPERATOR;

const RolesTable = () => (
  <section className={styles.card} aria-labelledby="roles-table-title">
    <h2 id="roles-table-title" className={styles.title}>
      Roles in GTMS
    </h2>
    <p className={styles.summary}>
      New accounts get the operator role. An administrator can grant a higher
      role, and the backend checks it on every request.
    </p>

    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Role</th>
          <th scope="col">What it can do</th>
          <th scope="col">Granted by</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(UserRole).map((role) => {
          const { label, permissions, grantedBy } = roleInfo[role];
          const isDefault = role === DEFAULT_ROLE;

          return (
            <tr key={role}>
              <th scope="row">
                <span className={isDefault ? styles.current : styles.role}>
                  {label}
                </span>
              </th>
              <td>{permissions}</td>
              <td className={styles.muted}>{grantedBy}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </section>
);

export default RolesTable;

