import styles from './BaseTemplate.module.css';

export interFace IBaseTemplate {
    sampleTextProp : string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTextProp }) => {
    return <div className={styles.container}>{sampleTextProp}</div>;
}

export default BaseTemplate;