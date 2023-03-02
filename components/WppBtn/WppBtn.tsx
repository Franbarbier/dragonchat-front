import styles from './WppBtn.module.css';


export interface IWppBtn {
    
}




const WppBtn: React.FC<IWppBtn> = ({  }) => {


    return (
            <div id={styles.wpp_btn_cont}>
                <div>
                    <div>
                        <a href="https://wa.me/5491156958765?text=Hola!%20Me%20contacto%20desde%20dragonchat%20por%20" target="_blank">
                            <img src="/whatsapp.png" />
                        </a>
                    </div>
                    {/* {wppMessage && */}
                        {/* <span>Sacate cualquier duda de la plataforma! ❓😊</span> */}
                    {/* // } */}
                </div>
            </div>
    
    );
}

export default WppBtn;

