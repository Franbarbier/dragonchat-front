import React from "react";
import { IChat } from "./ConversationPremium";
import styles from './ConversationPremium.module.css';


type TreeProps = {
  chat: IChat[];
};

const TreeNodeComponent: React.FC<{ message: IChat }> = ({ message }) => {
  

  const colorSide:string = message.color 

  return (
    <>
                {/* {JSON.stringify(message)} */}
                {message.type == "texto" &&
                    <div className={styles.singleMessageCont}>
                        <p className={styles[colorSide]}>{message.info}</p>
                    </div>
                }
                {message.type == "any" &&
                    <div className={styles.singleMessageCont}>
                        <p className={styles[colorSide]}><i>Cualquier respuesta.</i></p>
                    </div>
                }
                {message.type == "followup" &&
                <div className={styles.singleMessageCont}>

                        <p className={styles[colorSide]}>{message.info.message}</p>
                        <span>
                            <img src="/timer.svg"
                                style={{ opacity: 0.7 }}
                                />
                        </span>
                </div>
                }
            {(message.type == "include" || message.type == "exclude") && 
            <div className={styles.splitCont}>
                <div>

                    <p>{message.info.name }</p>
                    <div className={styles.keyWordsContPrev}>
                    {message.info?.key_words?.map((key_word) => {  return <span className={ message.type == "exclude" ? styles.excludeKey : styles.includeKey } >{key_word}</span> })}

                    </div>
                    <div>
                        <div className={styles.breadcrumbMessages}>
                            {message.info?.split_chat?.map((splitMessage, index) => {  return <TreeNodeComponent message={splitMessage} /> })}
                        </div>
                    </div>
                    
                </div>
            </div>
            }
            
      </>
  );
};

const Breadcrumb: React.FC<TreeProps> = ({ chat }) => {
  return (
        <div className={styles.breadcrumbMessages}>
        {chat.map((message, index) => (
            <TreeNodeComponent message={message} />
            ))}
        </div>
  );
};

export default Breadcrumb;