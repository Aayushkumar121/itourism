import React, { useEffect, useState } from 'react'
import styles from './table.module.css'
const Table = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:5000/auth/users');
          
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching users", error);
        }
      };
  
      fetchUsers();
    }, []);
  
    return (
        <div className={styles.tableContainer}>
          <div className={styles.headerContainer}>
    <h1 className={styles.header}>User Data - </h1>
    <h1 className={styles.subheader}>(Registered)</h1>
</div> 
            <table className={styles.table}>
                <thead className={styles.tableHead}>
                    <tr>
                        <th className={styles.tableHeader}>Username</th>
                        <th className={styles.tableHeader}>Email</th>
                        <th className={styles.tableHeader}>Is Admin</th>
                        <th className={styles.tableHeader}>Registered At</th>
                        <th className={styles.tableHeader}>Password</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {users.map(user => (
                        <tr key={user._id} className={styles.tableRow}>
                            <td className={styles.tableData}>{user.username}</td>
                            <td className={styles.tableData}>{user.email}</td>
                            <td className={styles.tableData}>{user.isAdmin ? "Yes" : "No"}</td>
                            <td className={styles.tableData}>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className={styles.tableData}>{user.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
}

export default Table