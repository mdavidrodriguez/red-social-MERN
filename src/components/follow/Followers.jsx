import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "../user/UserList";
import { useParams } from "react-router-dom";
import { getProfile } from "../../helpers/getProfile";
export const Followers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const params = useParams();

  useEffect(() => {
    getUsers(1);
    getProfile(params.userId, setUserProfile);
  }, []);
  const getUsers = async (nextPage) => {
    // efecto de carga
    setLoading(true);

    // Sacar userId de la url
    const userId = params.userId;

    // Petición para sacar usuarios
    const request = await fetch(
      Global.url + "follow/followers/" + userId + "/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = await request.json();
    // Recorrer y limpiar followers
    let cleanUsers = [];
    data.follows.forEach((follow) => {
      cleanUsers = [...cleanUsers, follow.user];
    });
    data.users = cleanUsers;

    // Crear un estado para poder listarlos
    if (data.users && data.status == "success") {
      let newUsers = data.users;
      setUsers(newUsers);
      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }
      setUsers(newUsers);
      setFollowing(data.user_following);
      setLoading(false);
      // paginación
      if (users.length >= data.total - data.users.length) {
        setMore(false);
      }
    }
  };

  const follow = async (userId) => {
    // Peticion al backend
    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify({ followed: userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();

    // cuando todo este correcto
    if (data.status == "success") {
      // Actualizar el estado de following. agregando un nuevo follow
      setFollowing([...following, userId]);
    }
  };
  const unFollow = async (userId) => {
    // Peticion al backend
    const request = await fetch(Global.url + "follow/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();

    // cuando todo este correcto
    if (data.status == "success") {
      // Actualizar el estado de following. agregando un nuevo follow

      // Filtrando los datos para eliminar el antiguo useId
      // que acabo de seguir
      let fiterFollowings = following.filter(
        (followindUserId) => userId !== followindUserId
      );
      setFollowing(fiterFollowings);
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">
          Seguidores de{userProfile.name} {userProfile.surname}
        </h1>
      </header>

      <UserList
        users={users}
        following={following}
        follow={follow}
        unFollow={unFollow}
        page={page}
        setPage={setPage}
        loading={loading}
        more={more}
        getUsers={getUsers}
      />

      <br />
    </>
  );
};
