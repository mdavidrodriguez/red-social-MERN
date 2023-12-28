import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
export const PublicationList = ({
  publications,
  deletePublications,
  more,
  nextPage,
}) => {
  const { auth } = useAuth();
  return (
    <>
      <div className="content__posts">
        {publications.map((publication) => {
          return (
            <article className="posts__post" key={publication._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <Link
                    to={"/social/perfil/" + publication.user._id}
                    className="post__image-user"
                  >
                    <a href="#" className="post__image-link">
                      {publication.user.image != "default.png" && (
                        <img
                          src={
                            Global.url + "user/avatar/" + publication.user.image
                          }
                          className="post__user-image"
                          alt="Foto de perfil"
                        />
                      )}
                      {publication.user.image == "default.png" && (
                        <img
                          src={avatar}
                          className="post__user-image"
                          alt="Foto de perfil"
                        />
                      )}
                    </a>
                  </Link>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {publication.user.name + " " + publication.user.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      <ReactTimeAgo
                        date={publication.created_at}
                        locale="es-Es"
                      />
                    </a>
                  </div>

                  <h4 className="post__content">{publication.text}</h4>
                  {publication.file && (
                    <img
                      src={Global.url + "publication/media/" + publication.file}
                    />
                  )}
                </div>
              </div>
              {auth._id == publication.user._id && (
                <div className="post__buttons">
                  <button
                    className="post__button"
                    onClick={() => deletePublications(publication._id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
      {more && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver mas publicaciones
          </button>
        </div>
      )}
    </>
  );
};
