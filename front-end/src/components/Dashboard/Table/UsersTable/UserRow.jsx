function UserRow({ usuario }) {
    return (
        <tr>
            <td>{usuario.id}</td>

            <td>{usuario.fullname}</td>
            <td>{usuario.email}</td>
        </tr>
    )
}

export default UserRow
