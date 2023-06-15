import React from 'react';
import styles from './NotFound.module.css';

interface INotFound {

}

const NotFound: React.FC<INotFound> = ({ }) => {

    return (
        <div className={styles.errCont}>
            <div>
                <h4>Algo salio mal! No encontramos la pagina :(</h4>
                <h6>Error</h6>
                {/* <h3>404</h3> */}
                <div>
                    <h2>4</h2>
                    <img src={'/dragon_anim.gif'} alt="dragon-chat"/>
                    <h2>4</h2>
                </div>
                <button className={styles.goBack}
                    onClick={() => {
                        location.href = "/"
                    }}
                >Volver</button>
            </div>
        </div>
        );
};

export default NotFound;