import styles from './HintMessage.module.css';



const HintMessage: React.FC = ({  }) => {





  return (
    <>
      <div className={styles.hint_message}>
        <p>Si necesitas ayuda o tips hazme clic o presiona el botón de ayuda</p>
      </div>
      <div className={styles.arrowDialog}></div>

    </>
  );
};

export default HintMessage;