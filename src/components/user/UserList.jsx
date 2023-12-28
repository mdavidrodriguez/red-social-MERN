import { Link } from "react-router-dom";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import ReactTimeAgo from "react-time-ago";
export const UserList = ({ users, following, follow, unFollow, loading, more, page, setPage,getUsers }) => {
  const { auth } = useAuth();
  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
  };
  return (
    <>
      <div className="content__posts">
        {users.map((user) => {
          return (
            <article key={user._id} className="posts__post">
              <div className="post__container">
                <Link to={"/social/perfil/" + user._id} className="post__image-user">
                  <a href="#" className="post__image-link">
                    {user.image != "default.png" && (
                      <img
                        src={Global.url + "user/avatar/" + user.image}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                    {user.image == "default.png" && (
                      <img
                        src={avatar}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                  </a>
                </Link>

                <div className="post__body">
                  <div className="post__user-info">
                  <Link to={"/social/perfil/" + user._id} className="user-info__name">
                      {user.name} {user.surname}
                    </Link>
                    <span className="user-info__divider"> | </span>
                    <Link to={"/social/perfil/" + user._id} className="user-info__create-date">
                    <ReactTimeAgo
                        date={user.created_at}
                        locale="es-Es"
                      />
                      
                    </Link>
                  </div>

                  <h4 className="post__content">{user.bio}</h4>
                </div>
              </div>
              {/* Solo mostrar cuando el usuario no sea el autenticado */}
              {user._id != auth._id && (
                <div className="post__buttons">
                  {!following.includes(user._id) && (
                    <button
                      className="post__button post__button--green"
                      onClick={() => follow(user._id)}
                    >
                      Seguir
                    </button>
                  )}
                  {following.includes(user._id) && (
                    <button
                      className="post__button"
                      onClick={() => unFollow(user._id)}
                    >
                      Dejar de Seguir
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
      {loading ? "Cargando" : ""}
      {more && (
        <div className="content__container-btn">
          <button onClick={nextPage} className="content__btn-more-post">
            Ver mas Personas
          </button>
        </div>
      )}
    </>
  );
};
